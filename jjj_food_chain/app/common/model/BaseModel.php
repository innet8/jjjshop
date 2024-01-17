<?php

namespace app\common\model;

use think\Model;
use think\facade\Env;
use app\common\exception\BaseException;

/**
 * 模型基类
 */
class BaseModel extends Model
{
    public static $app_id;

    public static $base_url;

    protected $alias = '';

    protected $error = '';

    // 定义全局的查询范围
    protected $globalScope = ['app_id'];

    /**
     * 模型基类初始化
     */
    public static function init()
    {
        parent::init();
        // 获取当前域名
        self::$base_url = base_url();
        // 后期静态绑定app_id
        self::bindAppId();
    }


    /**
     * 后期静态绑定类名称
     */
    private static function bindAppId()
    {
        if ($app = app('http')->getName()) {
            if ($app != 'admin' && $app != 'job') {
                $callfunc = 'set' . ucfirst($app) . 'AppId';
                self::$callfunc();
            }
        }
    }

    /**
     * 设置app_id (shop模块)
     */
    protected static function setShopAppId()
    {
        self::$app_id = request()->header('appId');
    }

    /**
     * 设置app_id (api模块)
     */
    protected static function setApiAppId()
    {
        self::$app_id = request()->header('appId') ?: request()->param('app_id');
    }

    /**
     * 设置app_id (平板模块)
     */
    protected static function setTabletAppId()
    {
        self::$app_id = request()->header('appId') ?: request()->param('app_id');
    }

    /**
     * 设置app_id (cashier模块)
     */
    protected static function setCashierAppId()
    {
        self::$app_id = request()->header('appId');
    }

    /**
     * 定义全局的查询范围
     */
    public function scopeApp_id($query)
    {
        if (self::$app_id > 0) {
            $query->where($query->getTable() . '.app_id', self::$app_id);
        }
    }

    /**
     * 设置默认的检索数据
     */
    protected function setQueryDefaultValue(&$query, $default = [])
    {
        $data = array_merge($default, $query);
        foreach ($query as $key => $val) {
            if (empty($val) && isset($default[$key])) {
                $data[$key] = $default[$key];
            }
        }
        return $data;
    }

    /**
     * 设置基础查询条件（用于简化基础alias和field）
     */
    public function setBaseQuery($alias = '', $join = [])
    {
        // 设置别名
        $aliasValue = $alias ?: $this->alias;
        $model = $this->alias($aliasValue)->field("{$aliasValue}.*");
        // join条件
        if (!empty($join)) : foreach ($join as $item):
            $model->join($item[0], "{$item[0]}.{$item[1]}={$aliasValue}."
                . (isset($item[2]) ? $item[2] : $item[1]));
        endforeach; endif;
        return $model;
    }

    /**
     * 批量更新数据(支持带where条件)
     */
    public function updateAll($data)
    {
        return $this->transaction(function () use ($data) {
            $result = [];
            foreach ($data as $key => $item) {
                $result[$key] = self::update($item['data'], $item['where']);
            }
            return $this->toCollection($result);
        });
    }

    public static function onBeforeUpdate(Model $model)
    {
        self::checkEnv();
        if ($model->createTime && $model[$model->createTime]) {
            unset($model[$model->createTime]);
        }
        if ($model->updateTime && $model[$model->updateTime]) {
            $model[$model->updateTime] = $model->autoWriteTimestamp($model->updateTime);
        }
    }

    public static function onBeforeInsert(Model $model){
        self::checkEnv();
    }

    public static function onBeforeDelete(Model $model){
        self::checkEnv();
    }

    private static function checkEnv(){
        if (Env::get('env') == 'uat'
            && self::getCalledModule() == 'admin'
            && request()->ip() != Env::get('uat_ip')) {
            throw new BaseException(['msg' => '演示环境，数据不允许修改']);
        }
        if (Env::get('env') == 'uat'
            && self::getCalledModule() == 'shop'
            && self::$app_id == 10001
            && request()->ip() != Env::get('uat_ip')) {
            throw new BaseException(['msg' => '演示环境，数据不允许修改，如需测试修改请用test/123456登录或联系管理员']);
        }
        if (Env::get('env') == 'uat'
            && self::getCalledModule() == 'cashier'
            && self::$app_id == 10001
            && request()->ip() != Env::get('uat_ip')) {
            throw new BaseException(['msg' => '演示环境，数据不允许修改，如需测试修改请用test/123456登录或联系管理员']);
        }
    }

    /**
     * 获取当前调用的模块名称
     */
    protected static function getCalledModule()
    {
        if (preg_match('/app\\\(\w+)/', get_called_class(), $class)) {
            return $class[1];
        }
        return false;
    }

    /**
     * 返回模型的错误信息
     */
    public function getError()
    {
        return $this->error;
    }

    /**
     * 返回模型的错误信息
     */
    public function lists()
    {
        return $this->select();
    }
}
