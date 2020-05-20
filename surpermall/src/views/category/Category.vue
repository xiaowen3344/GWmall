<template>
    <div class="category">
      <nav-bar class="nav-bar">
        <div slot="center">商品分类</div>
      </nav-bar>
      <div class="cates-content">
        <tab-menu :categories="categories"  @CatesClick="CatesClick" />
         <tab-control  :titles="['流行','新款','精选']" 
                  @tabClick="tabClick" 
                  ref="tabControl1" class="mycontrol" v-show="isTabFixed"/>
        <scroll ref="scroll" class="content">
          <category-item :categoryItem="categoryItem" />
          <TabControl :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"/>
          <CategoryDetails :currentType="currentType" :categoryDetails="CategoryDetails"/>
        </scroll>
      </div>
    </div>
   
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabMenu  from './clidComps/TabMenu'
import CategoryItem from './clidComps/CategoryItem'
import CategoryDetails from './clidComps/CategoryDetails'

import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";


import {
  getCategory,
  getSubcategory,
  getSortDetails
} from "network/category";


export default {
  name: 'Category',
  components: {
    NavBar,
    TabMenu,
    CategoryItem,
    CategoryDetails,
    Scroll,
    TabControl
  },
 data() {
    return {
      categories: [],
      categoryItem: [],
      miniWallkey: null,
      CategoryDetails: {
        pop: [],
        new: [],
        sell: []
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      isShowBackTop: false
    };
  },
  created() {
    this._getCategory();
  }, 
 
  methods: {
     _getCategory() {
      getCategory().then(res => {
        this.categories = res.data.category.list;
        // 使用_getSubcategory方法  参数为0 是为了第一次进来的时候能获取的数据
        this._getSubcategory(0);
      });
    },
    _getSubcategory(index) {
      // 把categories[index].maitKey 的 值赋值给maitKey
      const maitKey = this.categories[index].maitKey;
      // 拿到miniWallkey

      // getSubcategory 根据maitKey发起对应的网络请求
      getSubcategory(maitKey).then(res => {
        this.categoryItem = res.data.list;
        this.miniWallkey = this.categories[index].miniWallkey;
        // console.log(this.miniWallkey);
        this._getSortDetails("pop");
        this._getSortDetails("new");
        this._getSortDetails("sell");
      });
    },
    _getSortDetails(type) {
      const miniWallkey = this.miniWallkey;
      // console.log(miniWallkey);
      getSortDetails(miniWallkey, type).then(res => {
        // 保存值之前先把保存好的值清空  为了数据保存的是当前点击的
        // this.categoryDetaill[type].shift();
        this.CategoryDetails[type] = res;
        // console.log(this.categoryDetaill[type]);
        this.$refs.scroll.finishPullUp();
      });
    },
    
   CatesClick(index) {
      this._getSubcategory(index);
      this.$refs.scroll.scrollTo(0, 0, 0);
      
    },
     
    tabClick(index) {
 
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
        this.isShowBackTop = -position.y > 2000;
        
        // // 决定tabcontrol 是否吸顶 position:fixed
        this.isTabFixed = -position.y > this.$refs.tabControl2.$el.offsetTop;
        // console.log(position.y);
      }
  },
  
  
}
</script>

<style scoped>
.category {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
  .cates-content{
    display: flex;
    width: 100%;
    height: 100vh;
  }

  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
    
  }

  .content {
  flex: 1;
  height: calc(100% - 94px);
  overflow: hidden;
  position: absolute;
  top: 44px;
  left: 80px;
  right: 0;
  
}
.mycontrol{
 width: 80%;
  height: 44px;
  position: fixed;
  /* margin-top: 1px; */
  top: 6.5%;
  left: 21%;
  z-index: 1000;

}
</style>
