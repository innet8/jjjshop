import{y as e,i as t,A as s}from"./element-plus-bf694ad1.js";import{F as a}from"./file-2652919b.js";import{_ as i}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as p,S as o,R as l,a as n,W as g,O as r,V as d}from"./@vue-b57a05a6.js";const m={props:{tips1:{type:String,default:$t("图片：支持JPG、JPEG、PNG格式，小于2MB，尺寸：1024*600px")},tips2:{type:String,default:$t("视频：支持AVI、MPEG、MOV、MP4格式，小于10MB，尺寸：1024*600px")},imgSize:{type:String,default:15},videoSize:{type:String,default:30}},methods:{fileChange(e){},onBeforeUploadImage(e){return e.size>1024*this.imgSize*1024&&e.type.includes("image")?(this.$ElMessage({message:$t("图片大小超出限制！"),type:"warning"}),!1):!(e.size>1024*this.videoSize*1024&&e.type.includes("video"))||(this.$ElMessage({message:$t("视频大小超出限制！"),type:"warning"}),!1)},UploadImage(t){let s=this;const i=e.service({lock:!0,text:"上传中,请等待",background:"rgba(0, 0, 0, 0.7)"});let p="";t.file.type.includes("video")&&(p="video"),t.file.type.includes("image")&&(p="image");const o=new FormData;o.append("iFile",t.file),o.append("file_type",p),a.uploadFile(o).then((e=>{i.close(),this.$ElMessage({message:$t("本次上传成功"),type:"success"}),s.$emit("upLoad",e.data)})).catch((e=>{i.close(),this.$ElMessage({message:$t("本次上传失败"),type:"warning"})}))}}},u={class:"el-upload__tip"};const c=i(m,[["render",function(e,a,i,m,c,f){const h=t,y=s;return p(),o(y,{class:"upload-demo",accept:"image/jpeg,image/png,image/jpg,video/*",action:"",multiple:"","show-file-list":!1,"before-upload":f.onBeforeUploadImage,"on-change":f.fileChange,"http-request":f.UploadImage},{tip:l((()=>[n("div",u,[n("p",null,g(i.tips1),1),n("p",null,g(i.tips2),1)])])),default:l((()=>[r(h,{type:"primary"},{default:l((()=>[d(g(e.$t("上传")),1)])),_:1})])),_:1},8,["before-upload","on-change","http-request"])}],["__scopeId","data-v-64f78aec"]]);export{c as f};
