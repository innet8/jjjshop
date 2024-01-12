<?php

namespace help;

use Exception;

class ArrayHelp
{

    /**
     * 获取数组值
     * @param $obj
     * @param string $key
     * @param string $default
     * @return array|string
     */
    public static function val($obj, string $key = '', string $default = ''): array|string
    {
        if (!is_array($obj)) {
            return $default;
        }
        if (is_int($key)) {
            if (isset($obj[$key])) {
                $obj = $obj[$key];
            } else {
                $obj = "";
            }
        } elseif (!empty($key)) {
            $arr = explode(".", str_replace("|", ".", $key));
            foreach ($arr as $val) {
                if (isset($obj[$val])) {
                    $obj = $obj[$val];
                } else {
                    $obj = "";
                    break;
                }
            }
        }
        if ($default && empty($obj)) $obj = $default;
        return $obj;
    }

    /**
     * 将数组转换为字符串
     * @param array $data 数组
     * @param int $isformdata 如果为0，则不使用new_stripslashes处理，可选参数，默认为1
     * @return    string    返回字符串，如果，data为空，则返回空
     */
    public static function array2string($data, $isformdata = 1)
    {
        if ($data == '' || empty($data)) return '';
        if ($isformdata) $data = StringHelp::newStripslashes($data);
        if (version_compare(PHP_VERSION, '5.3.0', '<')) {
            return StringHelp::newAddslashes(json_encode($data));
        } else {
            return StringHelp::newAddslashes(json_encode($data, JSON_FORCE_OBJECT));
        }
    }



    /**
     * 将数组转换为字符串 (格式化)
     * @param array $data 数组
     * @param int $isformdata 如果为0，则不使用new_stripslashes处理，可选参数，默认为1
     * @return    string    返回字符串，如果，data为空，则返回空
     */
    public static function array2string_discard($data, $isformdata = 1)
    {
        if ($data == '' || empty($data)) return '';
        if ($isformdata) $data = StringHelp::newStripslashes($data);
        return var_export($data, TRUE);
    }


    /**
     * array转换成功json字符串
     * @param $array
     * @param int $options
     * @return string
     */
    public static function array2json($array, $options = 0)
    {
        if (!is_array($array)) {
            return $array;
        }
        try {
            return json_encode($array, $options);
        } catch (Exception $e) {
            return '';
        }
    }

    /**
     * 数组只保留数字的
     * @param $array
     * @return array
     */
    public static function arrayRetainInt($array)
    {
        foreach ($array as $k => $v) {
            if (!is_numeric($v)) {
                unset($array[$k]);
            }
        }
        return array_values($array);
    }




    /**
     * 叠加数组或对象
     * @param object|array $array
     * @param array $over
     * @return object|array
     */
    public static function array_over(&$array, $over = [])
    {
        if (is_array($over)) {
            foreach ($over as $key => $val) {
                if (is_array($array)) {
                    $array[$key] = $val;
                }
                if (is_object($array)) {
                    $array->$key = $val;
                }
            }
        }
        return $array;
    }


    /**
     * 获取数组第一个值
     * @param $array
     * @return mixed
     */
    public static function arrayFirst($array)
    {
        $val = '';
        if (is_array($array)) {
            foreach ($array as $item) {
                $val = $item;
                break;
            }
        }
        return $val;
    }


    /**
     * 获取数组最后一个值
     * @param $array
     * @return mixed
     */
    public static function arrayLast($array)
    {
        $val = '';
        if (is_array($array)) {
            foreach (array_reverse($array) as $item) {
                $val = $item;
                break;
            }
        }
        return $val;
    }


    /**
     * 阵列数组
     * @param $keys
     * @param $src
     * @param bool $default
     * @return array
     */
    public static function arrayElements($keys, $src, $default = FALSE)
    {
        $return = [];
        if (!is_array($keys)) {
            $keys = array($keys);
        }
        foreach ($keys as $key) {
            if (isset($src[$key])) {
                $return[$key] = $src[$key];
            } else {
                $return[$key] = $default;
            }
        }
        return $return;
    }

}
