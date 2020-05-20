<template>
    <scroll id="tab-menu">
        <div class="menu-list"  v-if="Object.keys(categories).length !== 0">
            <div 
                class="menu-list-item" 
                v-for="(item, index) in categories" 
                :key="(index)" 
                :class="{active: index === CatesIndex}"
                @click="CatesClick(index, item.maitKey)">
                {{item.title}}
             </div>
            
        </div>

      
    </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
export default {
    name: "TabMenu",
    components: {
        Scroll
    },
    data() {
        return {
             CatesIndex: 0
        }
    },
    props:{
        categories:{
            type: Array,
            default() {
                 return []
            }
        }
    },
    methods: {
        CatesClick(index) {
            this.CatesIndex = index;
            this.$emit('CatesClick', index)
            
        },
        
    },
}
</script>

<style  scoped>
#tab-menu {
  background-color: #f6f6f6;
  height: calc(100% - 94px);
  width: 20%;
  box-sizing: border-box;
  overflow: hidden;
}

.menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}

.menu-list-item.active {
  font-weight: 700;
  color: #ff7174;
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>