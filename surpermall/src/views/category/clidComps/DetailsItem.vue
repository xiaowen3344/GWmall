<template>
  <div class="detail-item" v-if="Object.keys(cItem).length !== 0"  @click="itenClick"> 
    <img v-lazy="cItem.img" />
    <p>{{cItem.title}}</p>
    <div class="detail-info">
      <span class="price">¥{{cItem.price}}</span>
      <span class="collect">{{cItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetaillItem",
  props: {
    cItem: {
      type: Object,
      default() {
        return [];
      }
    }
  },
  methods: {
    itenClick() {
      this.$router.push("/detail/" + this.cItem.iid);
      // console.log( this.categoryDetaill[this.currentType]);
      // console.log();
    }
  }
};
</script>

<style scoped>
 .detaill-item img {
  width: 100%;
  border-radius: 5px;
}

.detaill-item p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.detaill-info {
  display: flex;
  justify-content: space-evenly;
}
.detaill-item .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.detaill-item .collect {
  position: relative;
}

.detaill-item .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 3px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>