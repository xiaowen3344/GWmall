<template>
<!-- <scroll id="cgitem"> -->
  <div class="classcation-content"  v-if="categoryItem.length !== 0">
    <div class="classification-item" v-for="(item, index) in categoryItem" :key="index">
      <img v-lazy="item.image" />
      <span>{{item.title}}</span>
    </div>
  </div>
<!-- </scroll> -->
</template>

<script>

// import Scroll from 'components/common/scroll/Scroll'
export default {
  name: "CategoryItem",
  // components:{
  //   Scroll  
  // },
  data() {
    return {};
  },
  props: {
    categoryItem: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
#cgitem {
  background-color: #f6f6f6;
  height: calc(100% - 94px);
  box-sizing: border-box;
  overflow: hidden;
}
.classcation-content {
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
}
.classification-item {
  display: flex;
  width: 33.3%;
  height: 80px;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}
.classification-item img{
  width: 60px;
}
</style>