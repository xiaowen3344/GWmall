<template>
    <div class="details">
      <div class="detaill-item" v-for="(item, index) in categoryDetails[currentType]" :key="index">
      <DetailsItem :cItem="item"/>
    </div>
    </div>
</template>

<script>
import DetailsItem from './DetailsItem'
export default {
    name:"CategoryDetails",
    props: {
        currentType:{
            type: String,
            default:'pop'
        },
        categoryDetails: {
            type:Object,
            default() {
                return {}
            }
        }
    },
    components: {
        DetailsItem
    }
}
</script>

<style scoped>
.details {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.detaill-item {
  width: 46%;
  /* display: flex;
  flex-direction: column; */
  margin-top: 10px;
  font-size: 16px;
}
</style>