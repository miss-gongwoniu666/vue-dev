<style lang='scss' scoped>
body {
  background: none !important;
}

@function rpx($size) {
  $template: $size/100;
  @if (unit($size) == "px") {
    @return $template/1px * 1rem;
  } @else if(unit($size) == "rem") {
    @return $template;
  } @else {
    @return $size;
  }
}

.index {
  width: 100%;
  height: 100%;
  background: white;
  overflow: hidden;
  // banner
  .banner {
    width: 100%;
    height: 3.2rem;
    background: pink;
  }
  //tab
  .tabs {
    width: 100%;
    height: 2rem;
    &.show{
      visibility: hidden;
    }
    &.top{
      visibility: visible;
    }
    .tab-list {
      width: 100%;
      height: 0.8rem;
      overflow: hidden;
      border-bottom: 1px solid grey;
      li {
        float: left;
        width: 25%;
        height: 100%;
        font-size: 0.26rem;
        text-align: center;
        line-height: 0.8rem;
        &[data-index="0"] {
          color: red;
        }
      }
    }
    .type-wrapper {
      padding-left: 0.4rem;
      padding-top: 0.15rem;
      width: 100%;
      height: 1.1rem;
      line-height: 1rem;
      .tab-list-type {
        width: 600%;
        height: 0.6rem;
        overflow: hidden;
        li {
          float: left;
          width: 1rem;
          height: 100%;
          font-size: 0.26rem;
          text-align: center;
          line-height: 0.6rem;
          border-radius: 0.5rem;
          &[data-index="0"] {
            background: #e8e6e6;
          }
        }
      }
    }
  }
  // 内容
  .tab-content {
    margin: 0 auto 0.5rem;
    width: 90%;
    height: 3rem;
    border: 1px solid red;
    border-radius: 0.5rem;
  }
}
</style>

<template>
  <div class="index">
    <div class="tabs show top" >
        <!-- 一级tab -->
        <ul class="tab-list">
          <li v-for='(item,index) in list' :key='index' :data-index='selectTab(index)' @click='changeTab(index)'>{{item.name}}</li>
        </ul>
        <!-- 二级tab -->
        <div class="type-wrapper" ref='top'>
          <ul class="tab-list-type">
            <li v-for='(item,index) in sub_tab' :key='index' :data-index='selectType(index)' @click='changeType(index)'>{{item.name}}</li>
          </ul>
        </div>
      </div>
    <div class="index-wrap" ref='indexwrap'>
      <div class="index-scroll">
        <!-- banner -->
      <div class="banner"></div>
      <!-- tab -->
      <div class="tabs center" >
        <!-- 一级tab -->
        <ul class="tab-list">
          <li v-for='(item,index) in list' :key='index' :data-index='selectTab(index)' @click='changeTab(index)'>{{item.name}}</li>
        </ul>
        <!-- 二级tab -->
        <div class="type-wrapper" ref='center'>
          <ul class="tab-list-type">
            <li v-for='(item,index) in sub_tab' :key='index' :data-index='selectType(index)' @click='changeType(index)'>{{item.name}}</li>
          </ul>
        </div>
      </div>
      <!-- 内容 -->
      <div class="tab-content" v-for='(item,index) in content' :key='index'>
        <div class="tab-content-title">{{item.title}}</div>
        <div class='tab-content-detail'>{{item.content}}</div>
      </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import data from "../../config/content.json";
// import $ from '../../config/zepto.js';
// import bscroll from "better-scroll";
import BScroll from 'better-scroll'
//console.log(bscroll)
console.log(data);
export default {
  name: "Scrollpages",
  data() {
    return {
      content: [],
      list: [],
      sub_tab: [],
      tab_select: 0, //默认点击的tab
      list_select: 0, //点击选中的二级tab
      scroll: null,
      scrollType: null,
      scrollTypeOther: null
    };
  },
  created() {
    this.content = data.contents;
    this.list = data.list;
    this.sub_tab = data.list[0].sub_tab;
  },
  mounted() {
    this.initScroll();
    this.initSecondScroll();
  },
  methods: {
    initSecondScroll() {
       this.$nextTick(() => {
        setTimeout(() => {
          if (this.scroll) {
            console.log("scroll");
            this.scroll.refresh();
          } else {
            console.log("else");
            this.scrollType = new BScroll(this.$refs.top, {
              click: true,
              useTransition: false,
              probeType: 3,
              preventDefault: true
            });
             this.scrollTypeOther = new BScroll(this.$refs.center, {
              click: true,
              useTransition: false,
              probeType: 3,
              preventDefault: true
            });
            this.scroll.on("scrollEnd", () => {
              console.log(22);
              if (this.y - this.maxScrollY < 2) {
                this.content.push(this.content);
              }
            });
        
          }
        }, 1000);
      });
    },
    initScroll() {
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.scroll) {
            console.log("scroll");
            this.scroll.refresh();
          } else {
            console.log("else");
            this.scroll = new BScroll(this.$refs.indexwrap, {
              click: true,
              useTransition: false,
              probeType: 3,
              preventDefault: true
            });
            this.scroll.on("scrollEnd", () => {
              console.log(22);
              if (this.y - this.maxScrollY < 2) {
                this.content.push(this.content);
              }
            });
            this.scroll.on('scroll', ()=>{

            })
          }
        }, 1000);
      });
    },
    // 选中态加样式
    selectTab(index) {
      return this.tab_select - index;
    },
    //点击切换一级tab
    changeTab(index) {
      this.tab_select = index;
    },
    // 选中态加样式
    selectType(index) {
      return this.list_select - index;
    },
    //点击切换一级tab
    changeType(index) {
      this.list_select = index;
    }
  }
};
</script>
