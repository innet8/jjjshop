<?php


namespace app\cashier\model\store;

use app\common\model\store\Table as TableModel;

/**
 * 桌位模型
 */
class Table extends TableModel
{
    /**
     * 获取列表数据
     */
    public function getList($area_id, $type_id, $user, $status = 0)
    {
        $model = $this;
        // 查询列表数据
        $total_num =  $model->with(['underwayOrder'])
            ->when(!empty($area_id), function ($query) use ($area_id) {
                return $query->where('area_id', '=', $area_id);
            })
            ->when(!empty($type_id), function ($query) use ($type_id) {
                return $query->where('type_id', '=', $type_id);
            })->count();

        $available_num =  $model->with(['underwayOrder'])
            ->when(!empty($area_id), function ($query) use ($area_id) {
                return $query->where('area_id', '=', $area_id);
            })
            ->when(!empty($type_id), function ($query) use ($type_id) {
                return $query->where('type_id', '=', $type_id);
            })
            ->where('status', '=', 10)
            ->count();

        $list = $model->with(['underwayOrder'])
            ->when(!empty($area_id), function ($query) use ($area_id) {
                return $query->where('area_id', '=', $area_id);
            })
            ->when(!empty($type_id), function ($query) use ($type_id) {
                return $query->where('type_id', '=', $type_id);
            })
            ->when(!empty($status), function ($query) use ($status) {
                return $query->where('status', '=', $status);
            })
            ->order(['sort' => 'asc', 'create_time' => 'desc'])
            ->select();

        return compact('total_num', 'available_num', 'list');
    }

    private function formatPayEndTime($leftTime)
    {
        if ($leftTime <= 0) {
            return '';
        }

        $str = '';
//        $day = floor($leftTime / 86400);
        $hour = floor($leftTime / 3600);
        $min = floor(($leftTime - $hour * 3600) / 60);
        $sec = floor($leftTime - $hour * 3600 - $min * 60);
//        if ($day > 0) $str .= $day . '天';
        if ($hour > 0) $str .= $hour . '小时';
        if ($min > 0) $str .= $min . '分';
        if ($sec > 0) $str .= $sec . '秒';
        return $str;
    }

    // 开台
    public static function open($table_id)
    {
        return self::where('table_id', '=', $table_id)->update(['status' => 30]);
    }

    // 关台
    public static function close($table_id)
    {
        return self::where('table_id', '=', $table_id)->update(['status' => 10]);
    }
}