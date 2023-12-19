<?php

namespace app\common\model\plus\group;

use app\common\model\BaseModel;

/**
 * 团购图片模型
 */
class GroupImage extends BaseModel
{
    protected $name = 'group_image';
    protected $updateTime = false;

    /**
     * 关联文件库
     */
    public function file()
    {
        return $this->belongsTo('app\\common\\model\\file\\UploadFile', 'image_id', 'file_id')
            ->bind(['file_path', 'file_name', 'file_url']);
    }

}
