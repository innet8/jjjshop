import{r as e}from"./index-191c97f6.js";let l={fileCategory:(l,o)=>e._post("/shop/file.file/category",l,o),fileList:(l,o)=>e._post("/shop/file.file/lists",l,o),deleteFiles:(l,o)=>e._post("/shop/file.file/deleteFiles",l,o),addCategory:(l,o)=>e._post("/shop/file.file/addGroup",l,o),editCategory:(l,o)=>e._post("/shop/file.file/editGroup",l,o),deleteCategory:(l,o)=>e._post("/shop/file.file/deleteGroup",l,o),uploadFile:(l,o)=>e._upload("/shop/file.upload/image",l,o),moveFile:(l,o)=>e._upload("/shop/file.upload/moveFiles",l,o)};export{l as F};
