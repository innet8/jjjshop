import{_ as e}from"./Upload-0aceaca9.js";import{g as l,h as a,w as o,x as r,H as s,j as p,p as m,q as t}from"./element-plus-c8084613.js";import"./index-d4d4b8b8.js";import{d as u}from"./vuedraggable-a472da53.js";import{af as i,an as d,o as n,c as f,O as _,R as c,V as g,a as j,_ as V,a0 as b,S as h,P as y,a7 as v,X as x}from"./@vue-b57a05a6.js";import{_ as U}from"./_plugin-vue_export-helper-1b428a4d.js";import"./file-fcb8a0b9.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./cropperjs-86d7592f.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";import"./sortablejs-b4c145c4.js";const w={components:{Upload:e,draggable:u},data:()=>({isupload:!1}),inject:["form"],methods:{openUpload(){this.isupload=!0},returnImgsFunc(e){if(null!=e){let l=this.form.image.concat(e);this.form.image=l}this.isupload=!1},deleteImg(e){this.form.image.splice(e,1)}}},q={class:"product-add pb50"},k=j("div",{class:"common-form"},"基本信息",-1),I={key:0},C={key:1},Y={class:"draggable-list"},D={class:"item"},F=["onClick"],R=j("div",{class:"gray9"},"每个会员每日购买的最大数量，0为不限购",-1);const z=U(w,[["render",function(u,U,w,z,M,P){const B=l,E=a,G=o,H=r,J=s,K=i("Close"),O=p,S=i("draggable"),X=i("Plus"),A=m,L=t,N=e,Q=d("img-url");return n(),f("div",q,[k,_(E,{label:"团购名称",prop:"group_name",rules:[{required:!0,message:"请输入团购名称"}]},{default:c((()=>[_(B,{modelValue:P.form.group_name,"onUpdate:modelValue":U[0]||(U[0]=e=>P.form.group_name=e),placeholder:"请输入团购名称",class:"max-w460"},null,8,["modelValue"])])),_:1}),_(E,{label:"须知：",prop:"describe",rules:[{required:!0,message:"请输入须知"}]},{default:c((()=>[_(B,{type:"textarea",rows:"3",modelValue:P.form.describe,"onUpdate:modelValue":U[1]||(U[1]=e=>P.form.describe=e),class:"max-w460"},null,8,["modelValue"])])),_:1}),_(E,{label:"到期类型"},{default:c((()=>[_(H,{modelValue:P.form.expire_type,"onUpdate:modelValue":U[2]||(U[2]=e=>P.form.expire_type=e)},{default:c((()=>[_(G,{label:10},{default:c((()=>[g("购买后生效")])),_:1}),_(G,{label:20},{default:c((()=>[g("固定时间")])),_:1})])),_:1},8,["modelValue"])])),_:1}),10==P.form.expire_type?(n(),f("div",I,[_(E,{label:"有效天数",prop:"expire_day",rules:[{required:!0,message:"请输入有效天数"}]},{default:c((()=>[_(B,{modelValue:P.form.expire_day,"onUpdate:modelValue":U[3]||(U[3]=e=>P.form.expire_day=e),placeholder:"请输入有效天数",type:"number",class:"max-w460"},null,8,["modelValue"])])),_:1})])):(n(),f("div",C,[_(E,{label:"有效时间",prop:"time",rules:[{required:!0,message:"请输入有效时间"}]},{default:c((()=>[_(J,{modelValue:P.form.time,"onUpdate:modelValue":U[4]||(U[4]=e=>P.form.time=e),type:"daterange",align:"right","unlink-panels":"","value-format":"YYYY-MM-DD","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},null,8,["modelValue"])])),_:1})])),_(E,{label:"团购图片：",rules:[{required:!0,message:"请上传团购图片"}],prop:"image"},{default:c((()=>[j("div",Y,[_(S,{class:"wrapper",modelValue:P.form.image,"onUpdate:modelValue":U[5]||(U[5]=e=>P.form.image=e)},{item:c((({element:e,index:l})=>[j("div",D,[V(j("img",null,null,512),[[Q,e.file_path]]),j("a",{href:"javascript:void(0);",class:"delete-btn",onClick:b((e=>P.deleteImg(l)),["stop"])},[_(O,null,{default:c((()=>[_(K)])),_:1})],8,F)])])),_:1},8,["modelValue"]),j("div",{class:"item img-select",onClick:U[6]||(U[6]=(...e)=>P.openUpload&&P.openUpload(...e))},[_(O,null,{default:c((()=>[_(X)])),_:1})])])])),_:1}),_(E,{label:"划线价格",prop:"line_price",rules:[{required:!0,message:"请输入划线价格"}]},{default:c((()=>[_(B,{modelValue:P.form.line_price,"onUpdate:modelValue":U[7]||(U[7]=e=>P.form.line_price=e),placeholder:"请输入划线价格",class:"max-w460"},null,8,["modelValue"])])),_:1}),_(E,{label:"销售价格",prop:"group_price",rules:[{required:!0,message:"请输入销售价格"}]},{default:c((()=>[_(B,{modelValue:P.form.group_price,"onUpdate:modelValue":U[8]||(U[8]=e=>P.form.group_price=e),placeholder:"请输入销售价格",class:"max-w460"},null,8,["modelValue"])])),_:1}),_(E,{label:"虚拟销量",prop:"sales_initial",rules:[{required:!0,message:"请输入虚拟销量"}]},{default:c((()=>[_(B,{type:"number",modelValue:P.form.sales_initial,"onUpdate:modelValue":U[9]||(U[9]=e=>P.form.sales_initial=e),placeholder:"请输入虚拟销量",class:"max-w460"},null,8,["modelValue"])])),_:1}),_(E,{label:"适用门店"},{default:c((()=>[_(H,{modelValue:P.form.suit_type,"onUpdate:modelValue":U[10]||(U[10]=e=>P.form.suit_type=e)},{default:c((()=>[_(G,{label:10},{default:c((()=>[g("全部")])),_:1}),_(G,{label:20},{default:c((()=>[g("部分")])),_:1})])),_:1},8,["modelValue"])])),_:1}),20==P.form.suit_type?(n(),h(E,{key:2,label:"选择门店",prop:"shop_supplier_id",rules:[{required:!0,message:"请选择门店"}]},{default:c((()=>[_(L,{modelValue:P.form.shop_supplier_id,"onUpdate:modelValue":U[11]||(U[11]=e=>P.form.shop_supplier_id=e),multiple:"",placeholder:"请选择"},{default:c((()=>[(n(!0),f(y,null,v(P.form.supplier,((e,l)=>(n(),h(A,{key:l,label:e.name,value:e.shop_supplier_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})):x("",!0),_(E,{label:"团购状态"},{default:c((()=>[_(H,{modelValue:P.form.group_status,"onUpdate:modelValue":U[12]||(U[12]=e=>P.form.group_status=e)},{default:c((()=>[_(G,{label:1},{default:c((()=>[g("显示")])),_:1}),_(G,{label:0},{default:c((()=>[g("隐藏")])),_:1})])),_:1},8,["modelValue"])])),_:1}),_(E,{label:"每日限购数量"},{default:c((()=>[_(B,{type:"number",modelValue:P.form.limit_num,"onUpdate:modelValue":U[13]||(U[13]=e=>P.form.limit_num=e),placeholder:"请输入数字",class:"max-w460"},null,8,["modelValue"]),R])),_:1}),_(E,{label:"排序"},{default:c((()=>[_(B,{type:"number",modelValue:P.form.group_sort,"onUpdate:modelValue":U[14]||(U[14]=e=>P.form.group_sort=e),placeholder:"请输入数字",class:"max-w460"},null,8,["modelValue"])])),_:1}),M.isupload?(n(),h(N,{key:3,config:{total:9},isupload:M.isupload,onReturnImgs:P.returnImgsFunc},{default:c((()=>[g("上传图片")])),_:1},8,["isupload","onReturnImgs"])):x("",!0)])}]]);export{z as default};