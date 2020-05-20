import BackTop from "components/content/backTop/BackTop";
import {BACKTOP_DISTANCE} from 'common/const';

export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return{
      isShowBackTop: false
    }
  },
  methods:{
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    listenShowBackTop(position){
        this.isShowBackTop = -position.y > BACKTOP_DISTANCE
    }
    
  }
  
}