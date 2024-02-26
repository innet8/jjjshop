<?php

namespace app\shop\model\plus\live;

use app\common\library\easywechat\AppWx;
use app\common\model\plus\live\WxLive as WxLiveModel;
use app\common\library\easywechat\wx\LiveRoom as WxLiveRoom;
use app\common\exception\BaseException;
use EasyWeChat\Kernel\Form\File;
use EasyWeChat\Kernel\Form\Form;

/**
 * 直播模型
 */
class WxLive extends WxLiveModel
{
    /**
     *列表
     */
    public function getList($params)
    {
        $model = $this;
        if (isset($params['search']) && $params['search'] != '') {
            $model = $model->like('name|anchor_name', $params['search']);
        }
        return $model
            ->where('is_delete', '=', 0)
            ->order([
                'is_top' => 'desc',
                'live_status' => 'asc',
                'create_time' => 'desc'
            ])->paginate($params);
    }

    /**
     * 同步直播间
     */
    public function syn($app_id = null)
    {
        // 小程序配置信息
        $app = AppWx::getApp($app_id);
        // 请求api数据
        $live_room = new WxLiveRoom($app);
        $response = $live_room->syn();
        $isEmpty = false;
        if ($response === false) {
            if ($live_room->getError() == 'empty') {
                $isEmpty = true;
            } else {
                throw new BaseException(['msg' => '获取直播房间列表请求失败：' . $live_room->getError()]);
            }
        }
        // 格式化返回的列表数据
        $roomList = [];
        if (!$isEmpty) {
            foreach ($response['room_info'] as $item) {
                $roomList[$item['roomid']] = $item;
            }
        }

        $roomIds = array_column($roomList, 'roomid');
        // 本地历史数据
        $hasRoomIds = $this->getRoomIds();
        // 新增数据库没有的
        $this->addRoom($hasRoomIds, $roomIds, $roomList);
        // 删除微信小程序已删除的房间
        $this->deleteRoom($hasRoomIds, $roomIds);
        // 更新本地直播间
        $this->updateRoom($hasRoomIds, $roomIds, $roomList);
        return true;
    }

    /**
     * 获取本地直播间
     */
    private function getRoomIds()
    {
        return $this->where('is_delete', '=', 0)->column('roomid', 'live_id');
    }

    /**
     * 同步新增直播间
     */
    private function addRoom($hasRoomIds, $roomIds, $roomList)
    {
        // 需要新增的直播间ID
        $ids = array_values(array_diff($roomIds, $hasRoomIds));
        if (empty($ids)) return true;

        // 整理新增数据
        $saveData = [];
        foreach ($ids as $roomId) {
            $item = $roomList[$roomId];
            $saveData[] = [
                'roomid' => $roomId,
                'name' => $item['name'],
                'cover_img' => $item['cover_img'],
                'share_img' => $item['share_img'],
                'feeds_img' => $item['feeds_img'],
                'anchor_name' => $item['anchor_name'],
                'start_time' => $item['start_time'],
                'end_time' => $item['end_time'],
                'live_status' => $item['live_status'],
                'close_goods' => $item['close_goods'],
                'close_like' => $item['close_like'],
                'close_comment' => $item['close_comment'],
                'close_replay' => $item['close_replay'],
                'app_id' => self::$app_id,
            ];
        }
        // 批量新增直播间
        return $this->saveAll($saveData);
    }


    /**
     * 同步删除直播间
     */
    private function deleteRoom($hasRoomIds, $roomIds)
    {
        // 需要删除的直播间ID
        $ids = array_values(array_diff($hasRoomIds, $roomIds));
        if (empty($ids)) return true;
        // 批量删除直播间
        return self::where('roomid', 'in', $ids)->delete();
    }

    /**
     * 修改本地直播间
     */
    private function updateRoom($hasRoomIds, $roomIds, $roomList)
    {
        // 需要新增的直播间ID
        $ids = array_values(array_intersect($roomIds, $hasRoomIds));
        if (empty($ids)) return true;

        // 整理新增数据
        $saveData = [];
        foreach ($ids as $roomId) {
            $item = $roomList[$roomId];
            $saveData[] = [
                'data' => [
                    'roomid' => $roomId,
                    'name' => $item['name'],
                    'cover_img' => $item['cover_img'],
                    'share_img' => $item['share_img'],
                    'feeds_img' => $item['feeds_img'],
                    'anchor_name' => $item['anchor_name'],
                    'start_time' => $item['start_time'],
                    'end_time' => $item['end_time'],
                    'live_status' => $item['live_status'],
                    'close_goods' => $item['close_goods'],
                    'close_like' => $item['close_like'],
                    'close_comment' => $item['close_comment'],
                    'close_replay' => $item['close_replay'],
                ],
                'where' => [
                    'live_id' => array_search($roomId, $hasRoomIds),
                ],
            ];
        }
        // 批量更新直播间
        return $this->updateAll($saveData);
    }

    /**
     * 设置直播间置顶状态
     */
    public function setTop($params)
    {
        return $this->save(['is_top' => (int)$params['is_top']]);
    }

    /**
     * 创建直播间
     */
    public function createRoom($data)
    {
        $roomId = $this->wxCreate($data);
        $data['start_time'] = strtotime($data['start_time']);
        $data['end_time'] = strtotime($data['end_time']);
        $data['roomid'] = $roomId;
        $data['app_id'] = self::$app_id;
        return $this->save($data);
    }

    /**
     * 修改直播间
     */
    public function editRoom($data)
    {
        $wxData = [
            'id' => $this['roomid'],
            'startTime' => strtotime($data['start_time']),
            'endTime' => strtotime($data['end_time']),
            'name' => $data['name'],
            'anchorName' => $data['anchor_name'],
            'anchorWechat' => $data['anchor_wechat'],
            'closeGoods' => $data['close_goods'],
            'closeLike' => $data['close_like'],
            'closeComment' => $data['close_comment'],
            'closeReplay' => $data['close_replay'],
            'coverImg' => $this->getMediaID($data['cover_img']),
            'shareImg' => $this->getMediaID($data['share_img']),
            'feedsImg' => $this->getMediaID($data['feeds_img']),
        ];
        $url = "wxaapi/broadcast/room/editroom?access_token=";
        $status = $this->wxHandle($wxData, $url);
        if ($status) {
            $data['start_time'] = strtotime($data['start_time']);
            $data['end_time'] = strtotime($data['end_time']);
            return $this->save($data);
        } else {
            return false;
        }

    }

    /**
     * 删除直播间
     */
    public function delRoom()
    {
        $wxData = [
            'id' => $this['roomid']
        ];
        $url = "wxaapi/broadcast/room/deleteroom?access_token=";
        $status = $this->wxHandle($wxData, $url);
        if ($status) {
            return $this->save(['is_delete' => 1]);
        } else {
            return false;
        }
    }

    /**
     * 创建微信直播间
     */
    public function wxCreate($data)
    {
        $data = [
            'startTime' => strtotime($data['start_time']),
            'endTime' => strtotime($data['end_time']),
            'name' => $data['name'],
            'anchorName' => $data['anchor_name'],
            'anchorWechat' => $data['anchor_wechat'],
            'closeGoods' => $data['close_goods'],
            'closeLike' => $data['close_like'],
            'closeComment' => $data['close_comment'],
            'closeReplay' => $data['close_replay'],
            'type' => 0,
            'coverImg' => $this->getMediaID($data['cover_img']),
            'shareImg' => $this->getMediaID($data['share_img']),
            'feedsImg' => $this->getMediaID($data['feeds_img']),
        ];
        $app = AppWx::getApp();
        $accessToken = $app->getAccessToken();
        $token = $accessToken->getToken();
        $api = $app->getClient();
        $response = $api->post("wxaapi/broadcast/room/create?access_token={$token}", $data);
        $result = $response->getContent();
        $result = json_decode($result, true);
        if (isset($result['errcode']) && $result['errcode'] == 0 && isset($result['roomId'])) {
            return $result['roomId'];
        } else {
            throw new BaseException(['msg' => '创建直播失败:' . $response['errmsg']]);
        }
    }

    /**
     * 修改微信直播间
     */
    public function wxHandle($data, $url)
    {
        $app = AppWx::getApp();
        $accessToken = $app->getAccessToken();
        $token = $accessToken->getToken();
        $api = $app->getClient();
        $response = $api->post($url . $token, $data);
        $result = $response->getContent();
        $result = json_decode($result, true);
        if (isset($result['errcode']) && $result['errcode'] == 0) {
            return true;
        } else {
            throw new BaseException(['msg' => '操作失败:' . $response['errmsg']]);
        }
    }

    /**
     * 获取微信图片mediaID
     */
    public function getMediaID($url)
    {
        $path = $this->saveTempImage(self::$app_id, $url);
        $app = AppWx::getApp();
        $accessToken = $app->getAccessToken();
        $token = $accessToken->getToken();
        $api = $app->getClient();
        $options = Form::create(
            [
                'media' => File::fromPath($path),
            ]
        )->toArray();
        $response = $api->post("cgi-bin/media/upload?access_token={$token}&type=image", $options);
        if (isset($response['errcode']) && $response['errcode']) {
            @unlink($path);
            throw new BaseException(['msg' => '获取微信mediaID失败:' . $response['errmsg']]);
        } else {
            @unlink($path);
            @unlink($path);
            return $response['media_id'];
        }
    }

    /**
     * 获取网络图片到临时目录
     */
    protected function saveTempImage($app_id, $url, $mark = 'live')
    {
        $dirPath = root_path('public') . "temp/{$app_id}/{$mark}";
        !is_dir($dirPath) && mkdir($dirPath, 0755, true);
        $savePath = $dirPath . '/' . $mark . '_' . md5($url) . '.png';
        if (file_exists($savePath)) return $savePath;
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER, 1);
        $img = curl_exec($ch);
        curl_close($ch);
        $fp = fopen($savePath, 'w');
        fwrite($fp, $img);
        fclose($fp);
        return $savePath;
    }
}
