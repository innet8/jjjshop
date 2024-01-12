<?php
namespace help;

// 获取某月的时间列表 				DateHelp::getMonthDays($date);
// 获取本周的时间列表 				DateHelp::getWeeksDays();
// 获取某天的信息-包含星期几 		 DateHelp::getDayInfo($date);
// 返回字符串的毫秒数时间戳			 DateHelp::getMillisecond();

class DateHelp {
	
	//获取某月的时间列表
	public static function getMonthDays($time = '') {
		$time = $time != '' ? ( strstr($time,"-")  ? strtotime($time) : $time) : time();
		$week = date('d', $time);
		$weekarray=array("日","一","二","三","四","五","六");
		$dates = [];
		for ($i = 1; $i <= date('t', $time); $i++) {
			$date = date('Y-m-d', strtotime('+' . ($i - $week) . ' days', $time));
			$dates[] = [
				'date'=>$date,
				'day'=>date('d', strtotime('+' . ($i - $week) . ' days', $time)),
				'week'=>"星期".$weekarray[date("w",strtotime( $date  ))],
			];
		}
		return $dates;
	}
	
	//获取本周的时间列表
	public static function getWeeksDays() {
		$time = time();
		$weekarray= array("日","一","二","三","四","五","六");
		$dates = [];
		for ($i = 1; $i <= 7; $i++) {
			$date = date('Y-m-d', strtotime('+' . ($i-1) . ' days', $time));
			$dates[] = [
				'date'=>$date,
				'day'=>date('d', strtotime('+' . ($i-1) . ' days', $time)),
				'week'=>"星期".$weekarray[date("w",strtotime( $date  ))],
			];
		}
		return $dates;
	}
	
	
	//获取某天的信息-包含星期几
	public static function getDayInfo($time='') {
		$time = $time != '' ? ( strstr($time,"-")  ? strtotime($time) : $time) : time();
		$weekarray = array("日","一","二","三","四","五","六");
		$weekarray2 = array("7","1","2","3","4","5","6");
		$dates= [
			'date'=>$date = date('Y-m-d', strtotime('+' . 0 . ' days', $time)),
			'day'=> date('d', strtotime('+' . 0 . ' days', $time)),
			'wk'=>$weekarray2[date("w",strtotime( $date  ))],
			'week'=>"星期".$weekarray[date("w",strtotime( $date  ))],
		];
		return $dates;
	}
	
	
	/* 
	* 
	*返回字符串的毫秒数时间戳 
	*/  
	public static function getMillisecond()  
	{
	    list($msec, $sec) = explode(' ', microtime());
		return (float)sprintf('%.0f', (floatval($msec) + floatval($sec)) * 1000);
	}  
	
	
	
	
}