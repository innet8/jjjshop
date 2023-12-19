<?php

namespace app\shop\model\plus\agent;

use think\facade\Cache;
use app\common\model\plus\agent\Setting as SettingModel;

/**
 * 分销商设置模型
 */
class Setting extends SettingModel
{
    /**
     * 设置项描述
     */
    private $describe = [
        'basic' => '基础设置',
        'condition' => '分销商条件',
        'commission' => '佣金设置',
        'settlement' => '结算',
        'words' => '自定义文字',
        'license' => '申请协议',
        'background' => '页面背景图',
        'template_msg' => '模板消息',
        'qrcode' => '分销海报',
    ];

    /**
     * 更新系统设置
     */
    public function edit($data)
    {
        $this->startTrans();
        try {
            foreach ($data as $key => $values)
                $this->saveValues($key, $values);
            $this->commit();
            // 删除系统设置缓存
            Cache::delete('agent_setting_' . self::$app_id);
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 保存设置项
     */
    private function saveValues($key, $values)
    {
        $where['key'] = $key;
        $res = $this->where($where)->select()->count();
        $data = [
            'describe' => $this->describe[$key],
            'values' => $values,
            'app_id' => self::$app_id,
        ];
        if ($res == 1) {
            return self::update($data, $where);
        }
        if ($res == 0) {
            $data['key'] = $key;
            return self::create($data);
        }
        return false;
    }

    /**
     * 验证结算方式
     */
    private function validSettlement($values)
    {
        if (!isset($values['pay_type']) || empty($values['pay_type'])) {
            $this->error = '请设置 结算-提现方式';
            return false;
        }
        return true;
    }

}