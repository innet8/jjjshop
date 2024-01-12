<?php

namespace help;

class XmlHelp
{

    /**
     * array转xml
     * @param $data
     * @param string $root 根节点
     * @return string
     */
    public static function array2xml($data, $root = '<xml>')
    {
        $str = "";
        if ($root) $str .= $root;
        foreach ($data as $key => $val) {
            if (is_array($val)) {
                $child = self::array2xml($val, false);
                $str .= "<$key>$child</$key>";
            } else {
                $str .= "<$key><![CDATA[$val]]></$key>";
            }
        }
        if ($root) $str .= '</xml>';
        return $str;
    }

    /**
     * xml转json
     * @param string $source 传的是文件，还是xml的string的判断
     * @return string
     */
    public static function xml2json($source)
    {
        if (is_file($source)) {
            $xml_array = @simplexml_load_file($source);
        } else {
            $xml_array = @simplexml_load_string($source, NULL, LIBXML_NOCDATA);
        }
        return json_encode($xml_array);
    }


}
