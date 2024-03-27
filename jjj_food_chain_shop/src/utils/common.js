import  FileApi  from '@/api/file';
/**
 * @description 字符串转int数组
 * @param "6,5"
 * @returns [6,5]
 */
import { isString, isArray } from './validate';
export function strChangeInt(data){
	if(!isString(data) || data.length < 1){
		return '';
	}
	let strArr = data.split(',');
	let newStr = strArr.map((v)=>{
		return parseInt(v);
	});
	return newStr;
}
/**
 * @description 根据id查找上级id集合,更改数据某些字段
 * @param value
 * @returns 
 * {
 *    dataList //更改的数据集合
 *    idList //选择的id集合
 * }
 */
let categoryIdList = [];
let flag = false;
export function handCacader(data,idName,name,categoryId = null){
	if(data && data.length > 0){
		data.forEach(v => {
			v.value = v[idName];
			v.label = v[name];
			if(categoryId && !flag){
				categoryIdList.push(v[idName]);
				if(v[idName] == categoryId){
					flag = true;
				}
			}
			if(v.children && v.children.length > 0){
				handCacader(v.children,idName,name,categoryId);
			}
		});
	}
	return { dataList:data, idList:categoryIdList};
}
/**
 * @description 数据去重
 * @param value
 * @returns {boolean}
 */
export function handRepeat(data,idName){
	let obj = {};
	let list = data.reduce((prev,next)=>{
		obj[next[idName]] ? '' : obj[next[idName]] = true & prev.push(next);
		return prev;
	},[]);
	return list;
}
/**
 * @description 数据合并
 * @param value
 * @returns {boolean}
 */
export function assiginObj(target = {},sources= {}) {
	let obj = target;
	if(typeof target != 'object' || typeof sources != 'object'){
		return sources;
	}
	for(let key in sources){ 
		if(target.hasOwnProperty(key)){
			obj[key] = assiginObj(target[key],sources[key]);
		} else {
			obj[key] = sources[key];
		}
	}
	return obj;
}
/**
 * @description 处理内容中的分类数据 比如操作规程中的员工
 * @param value
 * @returns {boolean}
 */
export function handClassfiy(data,arrKey){
	const { id,name } = arrKey;
	data.forEach((v)=>{
		v.id = v[id];
		v.name = v[name];
		if(v.children && v.children.length > 0){
			handClassfiy(v.children,arrKey);
		}
	});
	return data;
}
/**
 * @description 图片上传
 * @param value
 * @returns {boolean}
 */
export async function upImg(param, fileType='image'){
	const formData = new FormData();
	formData.append('iFile', param.file);
	formData.append('groupId', 0);
	formData.append('fileType', fileType);
	formData.append('attachType', 0);
	const { msg,data } = await FileApi.uploadFile(formData);
	ElMessage({
		message: msg,
		type: 'success'
	});
	if(!data){
		return {};
	}
	return data;
}
/**
 * @description 数组字符串拼接
 * @param value
 * @returns {boolean}
 */
export function joinStr(data,props){
	if(!props.symbol){
		props.symbol = ',';
	}
	let name = '';
	if(isArray(data) && data.length > 0){
		name = [];
		data.forEach((v)=>{
			name.push(v[props.name])
		});
		if(props.type == 'array'){
			return name
		}
		name = name.join(props.symbol)
	}
	return name
}

/**
 * @description 刷新eeui
 */
export function EEUIRELOAD() {
	var userAgent = navigator.userAgent;
	if (userAgent.includes("android_kuaifan_eeui")) {
		let url = window.location.href;
		let key = '_='
		let reg = new RegExp(key + '\\d+');
		let timestamp = Math.round(new Date().getTime()/1000);
		if (url.indexOf(key) > -1) {
			url = url.replace(reg, key + timestamp);
		} else {
			if (url.indexOf('\?') > -1) {
				let urlArr = url.split('\?');
				if (urlArr[1]) {
					url = urlArr[0] + '?' + key + timestamp + '&' + urlArr[1];
				} else {
					url = urlArr[0] + '?' + key + timestamp;
				}
			} else {
				if (url.indexOf('#') > -1) {
					url = url.split('#')[0] + '?' + key + timestamp + location.hash;
				} else {
					url = url + '?' + key + timestamp;
				}
			}
		}
		requireModuleJs("webview").setUrl(url);
		// requireModuleJs("webview").setUrl(url)
	} else {
		window.location.reload()
	}
}