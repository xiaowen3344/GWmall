<template>
    <div id="detail">
         <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
         <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
           
           <detail-swiper :top-images="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info ref="params" :paramInfo="paramInfo"/>
            <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
            <goods-list ref="recommend" :goods="recommends"/>
         </scroll>
         <detail-bottom-bar @addCart="addToCart"/>
         <back-top @click.native="backClick" v-show="isShowBackTop"/>
         <toast :message="message" :show="show"/>
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

   
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import Toast from 'components/common/toast/Toast'


import {getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail";
import {BACKTOP_DISTANCE} from 'common/const';
import {debounce} from "common/utils";
import {backTopMixin} from "common/mixin";

import {mapActions} from 'vuex'

export default {
    name:"Detail",
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo ,
        DetailCommentInfo,
        DetailBottomBar,
        Scroll,
        GoodsList,
        Toast
    },
    mixins: [backTopMixin],
    data() {
        return {
            iid:null,
            topImages: [] ,
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs: [],
            getThemeTopY:null,
            currentIndex: 0,
            isShowBackTop: false,
            showCounts: 1,
            message: '',
            show:false
        }
    },
    created() {
        //1.保存传入的iid
        this.iid = this.$route.params.iid

        //2.根据iid请求详情数据
        getDetail(this.iid).then(res => {
            //1.获取顶部轮播图数据
            const data = res.result;
            this.topImages = data.itemInfo.topImages

            //2.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

            //3.创建商家信息的对象
            this.shop = new Shop(data.shopInfo)

            //4.保存商品的详细数据  
            this.detailInfo = data.detailInfo;

            //5.商品参数
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

            //6.取出评论的信息
            if (data.rate.cRate !==0){
                this.commentInfo = data.rate.list[0]
            }
        })
        //3
        getRecommend().then(res => {
            this.recommends= res.data.list
        })
        
        //4
        this.getThemeTopY = debounce(() => {
            this.themeTopYs = []
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            this.themeTopYs.push(Number.MAX_VALUE)

        },100)
    },
    methods: {
        ...mapActions({
      add: "addCart"
    }),
        imageLoad() {
            this.$refs.scroll.refresh()
           

            this.getThemeTopY()
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)

            

        },
        contentScroll(position) {
            //1.获取y值
            const positionY = -position.y

            //2
            let length = this.themeTopYs.length
            for(let i = 0;i < length-1; i++){
                // if(this.currentIndex !==i &&(i < length - 1 && positionY > this.themeTopYs[i] && positionY < 
                // this.themeTopYs[i+1]) || (i === length - 1 && positionY > this.themeTopYs[i])){
                //    this.currentIndex = i;
                //    this.$refs.nav.currentIndex = this.currentIndex
                // }
                if ((positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
                    this.currentIndex = i;
                    this.$refs.nav.currentIndex = this.currentIndex
                }
                //是否显示回到顶部
               this.listenShowBackTop(position)
            }
            
        },
        addToCart() {            
            //1.获取购物车需要展示的数据
            const obj = {}
            obj.iid = this.iid;
            obj.imgURL = this.topImages[0]
            obj.title = this.goods.title
            obj.desc = this.goods.desc;
            obj.newPrice = this.goods.nowPrice;
            obj.count = this.showCounts;
            // 3.添加到Store中
            this.add(obj).then(res => {
                //  this.show = true;
                //  this.message = res;

                //  setTimeout(() => {
                //      this.show = false;
                //      this.message= ''
                //  },1500)
                this.$toast.show(res, 2000)
                
            });
        // this.$store.dispatch('addCart', obj).then(res => {
        //     console.log(res);
            
        // })
        }

    },
    mounted() {
     
    //2.获取tabControl的offsetTop
    },
    destroyed() {
        this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
}
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content {
        height: calc(100% - 44px);
    }
</style>