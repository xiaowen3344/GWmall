<template>
    <tab-bar>
      <TabBarItem path="/home" activeColor="deepPink">
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" />
        <img slot="item-active" src="~assets/img/tabbar/home-active.svg" />
        <div slot="item-text">首页</div>
      </TabBarItem>
      <TabBarItem path="/category" activeColor="deepPink">
        <img slot="item-icon" src="~assets/img/tabbar/category.svg" />
        <img slot="item-active" src="~assets/img/tabbar/category-active.svg" />
        <div slot="item-text">分类</div>
      </TabBarItem>
      <TabBarItem path="/cart" activeColor="deepPink">
        <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" />
        <img slot="item-active" src="~assets/img/tabbar/shopcart-active.svg" />
        <div slot="item-text">购物车</div>
      </TabBarItem>
      <TabBarItem path="/profile" activeColor="deepPink">
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" />
        <img slot="item-active" src="~assets/img/tabbar/profile-active.svg" />
        <div slot="item-text">我的</div>
      </TabBarItem>
    </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>