<template>
  <div class="pr hh100 model-wrap">
    <div
      class="operate-pop"
      :class="{ disabled: form.selectedIndex == -1 }"
      v-if="diyData.items && diyData.items.length > 0"
    >
      <div class="iconbox d-c-c" @click="DeleteFunc">
        <el-icon><Delete /></el-icon>
      </div>
      <div class="iconbox d-c-c" @click="DocumentCopyFunc">
        <el-icon><DocumentCopy /></el-icon>
      </div>
      <div
        class="iconbox d-c-c"
        :class="{ disabled: form.selectedIndex == 0 }"
        @click="ArrowUpBoldFunc"
      >
        <el-icon><ArrowUpBold /></el-icon>
      </div>
      <div
        class="iconbox d-c-c"
        :class="{ disabled: form.selectedIndex == diyData.items.length - 1 }"
        @click="ArrowDownBoldFunc"
      >
        <el-icon><ArrowDownBold /></el-icon>
      </div>
    </div>
    <div
      class="scroll-ybox hh100"
      style="padding: 10px 0; box-sizing: border-box"
    >
      <div class="diy-phone-container">
        <!--顶部设置栏-->
        <div class="diy-phone-item" :class="{ active: form.selectedIndex < 0 }">
          <div
            @click="onEditer(-1)"
            class="draggable-title"
            style="left: auto; right: -90px; top: 20px"
          >
            页面设置
          </div>

          <Setcenter v-if="diyType == 'center'" :diyData="diyData"></Setcenter>
        </div>
        <draggable
          class="wrapper"
          v-model="diyData.items"
          :options="{ animation: 120, filter: '.drag__nomove' }"
        >
          <template #item="{ element, index }">
            <div
              class="diy-phone-item"
              :class="[{ active: form.selectedIndex == index },{static: element.type == 'videoLive'}]"
            >
              <div
                @click="onEditer(index)"
                v-if="element.type != 'service' || element.type != 'videoLive'"
                class="draggable-title"
                :class="{
                  right: element.type == 'guide' || element.type == 'blank',
                }"
              >
                {{ element.name }}
              </div>
              <!-- 图片轮播 -->
              <template v-if="element.type == 'banner'">
                <Banner
                  :item="element"
                  :index="index"
                  :selectedIndex="form.selectedIndex"
                ></Banner>
              </template>
              <!-- 图片-->
              <template v-else-if="element.type == 'imageSingle'">
                <ImageSingle
                  :item="element"
                  :index="index"
                  :selectedIndex="form.selectedIndex"
                ></ImageSingle>
              </template>
              <!-- 橱窗-->
              <template v-else-if="element.type == 'window'">
                <Window
                  :item="element"
                  :index="index"
                  :selectedIndex="form.selectedIndex"
                ></Window>
              </template>
              <!-- 视频组-->
              <template v-else-if="element.type == 'video'">
                <Video
                  :item="element"
                  :index="index"
                  :selectedIndex="form.selectedIndex"
                ></Video>
              </template>
              <!--文章-->
              <template v-else-if="element.type == 'article'">
                <Articleindex
                  :item="element"
                  :index="index"
                  :selectedIndex="form.selectedIndex"
                ></Articleindex>
              </template>
              <!--头条快报-->
              <template v-else-if="element.type == 'special'">
                <Special
                  :item="element"
                  :index="index"
                  :selectedIndex="form.selectedIndex"
                ></Special>
              </template>
              <!--公告组-->
              <template v-else-if="element.type == 'notice'">
                <Notice
                  :item="element"
                  :index="index"
                  :selectedIndex="form.selectedIndex"
                ></Notice>
              </template>
              <!--导航组-->
              <template v-else-if="element.type == 'navBar'">
                <NavBar
                  :item="element"
                  :index="index"
                  :selectedIndex="form.selectedIndex"
                ></NavBar>
              </template>
              <!--图文导航-->
              <template v-else-if="element.type == 'imageNav'">
                <Imagenav
                  :item="element"
                  :index="index"
                  :selectedIndex="form.selectedIndex"
                ></Imagenav>
              </template>
              <!--图文导航-->
              <!-- <template v-else-if="element.type == 'navBar'">
              <ImageNav :item="element" :index="index" :selectedIndex="form.selectedIndex"></ImageNav>
            </template> -->
              <!--商品组-->
              <!-- <template v-else-if="element.type == 'product'">
              <Productindex :item="element" :index="index" :selectedIndex="form.selectedIndex"></Productindex>
            </template> -->
              <!--优惠券-->
              <template v-else-if="element.type == 'coupon'">
                <Coupon
                  :item="element"
                  :index="index"
                  :selectedIndex="form.selectedIndex"
                ></Coupon>
              </template>
              <!--门店-->
              <template v-else-if="element.type == 'store'">
                <Store
                  :item="element"
                  :index="index"
                  :selectedIndex="form.selectedIndex"
                ></Store>
              </template>
              <!--客服-->
              <template v-else-if="element.type == 'service'">
                <Service
                  :item="element"
                  :index="index"
                  :selectedIndex="form.selectedIndex"
                ></Service>
              </template>
              <!--富文本-->
              <template v-else-if="element.type == 'richText'">
                <RichText
                  :item="element"
                  :index="index"
                  :selectedIndex="form.selectedIndex"
                ></RichText>
              </template>
              <!--辅助空白-->
              <template v-else-if="element.type == 'blank'">
                <Blank
                  :item="element"
                  :index="index"
                  :selectedIndex="form.selectedIndex"
                ></Blank>
              </template>
              <!--视频号直播-->
              <template v-else-if="element.type == 'videoLive'">
                <ShipinLiveindex
                  :item="element"
                  :index="index"
                  :selectedIndex="form.selectedIndex"
                ></ShipinLiveindex>
              </template>
              <!--辅助线-->
              <template v-else-if="element.type == 'guide'">
                <Guide
                  :item="element"
                  :index="index"
                  :selectedIndex="form.selectedIndex"
                ></Guide>
              </template>
              <!--拼团-->
              <template v-else-if="element.type == 'adNav'">
                <adNav
                  :item="element"
                  :index="index"
                  :selectedIndex="form.selectedIndex"
                ></adNav>
              </template>
              <!--标题-->
              <template v-else-if="element.type == 'title'">
                <Title
                  :item="element"
                  :index="index"
                  :selectedIndex="form.selectedIndex"
                ></Title>
              </template>
              <!--团购商品-->
              <template v-else-if="element.type == 'group'">
                <Groupindex
                  :item="element"
                  :index="index"
                  :selectedIndex="form.selectedIndex"
                ></Groupindex>
              </template>
              <!--砍价-->
              <template v-else-if="element.type == 'bargainProduct'">
                <BargainProduct
                  :item="element"
                  :index="index"
                  :selectedIndex="form.selectedIndex"
                ></BargainProduct>
              </template>
              <!--微信直播-->
              <template v-else-if="element.type == 'wxlive'">
                <Wxlive
                  :item="element"
                  :index="index"
                  :selectedIndex="form.selectedIndex"
                ></Wxlive>
              </template>
            </div>
          </template>
        </draggable>
        <div style="width: 100%; height: 150px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Setpages from "./model/Setpages.vue";
import Banner from "./model/Banner.vue";
import ImageSingle from "./model/ImageSingle.vue";
import Window from "./model/Window.vue";
import Video from "./model/Video.vue";
import Articleindex from "./model/Article.vue";
import Special from "./model/Special.vue";
import Notice from "./model/Notice.vue";
import NavBar from "./model/NavBar.vue";
import Title from "./model/Title.vue";
import Imagenav from "./model/Imagenav.vue";
import Productindex from "./model/Product.vue";
import Coupon from "./model/Coupon.vue";
import Store from "./model/Store.vue";
import Service from "./model/Service.vue";
import RichText from "./model/RichText.vue";
import Blank from "./model/Blank.vue";
import Guide from "./model/Guide.vue";
import adNav from "./model/adNav.vue";
import BargainProduct from "./model/BargainProduct.vue";
import Wxlive from "./model/Wxlive.vue";
import ShipinLiveindex from "./model/ShipinLive.vue";
import Groupindex from "./model/Group.vue";
import draggable from "vuedraggable";
export default {
  components: {
    /*顶部状态栏*/
    Setpages,
    /*图片轮播组件*/
    Banner,
    /*图片组件*/
    ImageSingle,
    /*图片橱窗*/
    Window,
    /*视频*/
    Video,
    /*文章*/
    Articleindex,
    /*头条快报*/
    Special,
    /*公告组*/
    Notice,
    /*导航组*/
    NavBar,
    /*优惠券*/
    Coupon,
    /*门店*/
    Store,
    /*客服*/
    Service,
    /*富文本*/
    RichText,
    /*辅助空白*/
    Blank,
    /*辅助线*/
    Guide,
    /*拖动*/
    draggable,
    /*图文导航*/
    Imagenav,
    /*拼团*/
    adNav,
    /*砍价*/
    BargainProduct,
    /*直播*/
    Wxlive,
    Groupindex,
    /*标题*/
    Title,
    ShipinLiveindex,
  },
  data() {
    return {};
  },
  props: {
    form: Object,
    defaultData: Object,
    diyData: Object,
    diyType: String,
  },
  created() {},
  methods: {
    swapArray(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },
    DeleteFunc() {
      let self = this;
      let n = self.form.selectedIndex;
      if (n < 0) {
        return;
      }
      self.diyData.items.splice(n, 1);
    },
    DocumentCopyFunc() {
      let self = this;
      let n = self.form.selectedIndex;
      if (n < 0) {
        return;
      }
      let item = self.diyData.items[n];
      self.diyData.items.splice(n, 0, item);
    },
    ArrowUpBoldFunc() {
      let self = this;
      let n = self.form.selectedIndex;
      if (n < 0) {
        return;
      }
      if (n != 0) {
        self.swapArray(self.diyData.items, n, n - 1);
        self.form.selectedIndex--;
      }
    },
    ArrowDownBoldFunc() {
      let self = this;
      let n = self.form.selectedIndex;
      if (n < 0) {
        return;
      }

      if (n + 1 != self.diyData.items.length) {
        self.swapArray(self.diyData.items, n, n + 1);
        self.form.selectedIndex++;
      }
    },
    /*删除diy元素*/
    onDeleleItem: function (index) {
      let self = this;
      ElMessageBox.confirm("确定要删除吗?", "提示", {
        type: "warning",
      }).then(() => {
        self.diyData.items.splice(index, 1);
        self.form.selectedIndex = -1;
      });
    },

    /*编辑当前选中的Diy元素*/
    onEditer: function (index) {
      let self = this;
      // 记录当前选中元素的索引
      self.form.selectedIndex = index;
      // 当前选中的元素数据
      self.form.curItem =
        self.form.selectedIndex < 0
          ? self.diyData.page
          : self.diyData.items[self.form.selectedIndex];
      // 注册编辑器事件
      //self.initEditor();
    },

    /* 注册编辑器事件*/
    initEditor: function () {
      let self = this;
      // 注册dom事件
      self.$nextTick(function () {
        // 销毁 umeditor 组件
        if (self.form.umeditor.hasOwnProperty("key")) {
          self.form.umeditor.destroy();
        }
        // 注册html组件
        self.editorHtmlComponent();
        // 富文本事件
        if (self.form.curItem.type === "richText") {
          //self.onRichText(self.form.curItem);
        }
      });
    },

    /*编辑器事件：html组件*/
    editorHtmlComponent: function () {
      let self = this;
      var editor = self.$refs["diy-editor"];
      // 单/多选框
      //editor.find('input[type=checkbox], input[type=radio]').uCheck();
      // select组件
      // $editor.find('select').selected();
    },
  },
};
</script>

<style lang="scss" scope>
.diy-phone-container {
  position: relative;
  height: 100%;
//   height: calc(100vh - 108px);
}

.diy-phone-container .wrapper {
  height: calc(100% - 88px);
}

.diy-phone-container .phone-top {
  padding: 0 20px;
  border-radius: 18px 18px 0 0;
}

.diy-phone-container .phone-top .status-bar {
  height: 20px;
  display: flex;
  justify-content: space-between;
}

.diy-phone-container .phone-top .svg-icon {
  width: 20px;
  height: 20px;
  color: #333333;
}

.diy-phone-container .phone-top .navigation {
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 18px;
}

.diy-phone-container .diy-phone-item {
  &.static{
    position: static;
  }
}

.diy-phone-container .diy-phone-item > div {
  position: relative;
  border: 2px solid #f1f1f2;
  border: none;
}

.diy-phone-container .diy-phone-item > div:hover,
.diy-phone-container .diy-phone-item.active > div {
  border: 2px dashed #3a8ee6;
}

.diy-phone-container img {
  width: 100%;
}
.operate-pop {
  position: absolute;
  width: 42px;
  background: #409eff;
  left: 50%;
  margin-left: 206px;
  top: 20%;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  z-index: 0;
  .iconbox {
    padding: 10px;
  }
  .el-icon {
    color: #fff;
    display: block;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
  }
  .iconbox.disabled .el-icon {
    opacity: 0.4;
    cursor: no-drop;
  }
}
.operate-pop.disabled {
  .el-icon {
    opacity: 0.4;
    cursor: no-drop;
  }
}
.hh100 {
  height: 100%;
}
.diy-phone-container .diy-phone-item.pstatic {
  position: static;
}
</style>
