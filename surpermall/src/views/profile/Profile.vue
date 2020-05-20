<template>
    <div class="profile">
      <nav-bar class="nav-bar">
        <div slot="center">我的档案</div>
      </nav-bar>
      <!-- 登录注册 -->
    <div class="profile-login">
      <img src="~assets/img/profile/perfile_portrait.jpg"/>
      <span>欢迎你： 算了吧</span>
    </div>

    <!-- 余额 优惠 -->
    <div class="profile-information">
      <div>
        <span>
          100000000.56
          <b>元</b>
        </span>
        <p>我的余额</p>
      </div>
      <div>
        <span>
          3
          <b>个</b>
        </span>
        <p>我的优惠</p>
      </div>
      <div>
        <span>
         10000
          <b>分</b>
        </span>
        <p>我的积分</p>
      </div>
    </div>

    <div class="profile-function">
      <ul>
        <li>我的消息</li>
        <li>积分商城</li>
        <li>会员卡</li>
        <li>我的购物车</li>
        <li>下载购物APP</li>
      </ul>
    </div>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'Profile',
  components: {
    NavBar
  }
}
</script>

<style scoped>
 .profile{
  width: 100%;
  height: 100vh;
  overflow: hidden;
 }

  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
    
  }

.profile {
  background-color: rgba(189, 189, 189, 0.1);
  height: 100vh;
  
}

.profile-login {
  width: 100%;
  height: 100px;
  display: flex;
  padding: 0 20px;
  align-items: center;
  background-color: var(--color-tint);
  
}
.profile-login img {
  width: 60px;
  height: 60px;
  background-color: #ffffff;
  border-radius: 50%;

}
.profile-login span {
  margin-left: 30px;
  color: #ffffff;
  font-size: 16px;
  
}
.profile-information {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #ffffff;
}
.profile-information > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
}
.profile-information > div:nth-child(2) {
  border-left: 1px solid rgba(214, 214, 214, 0.6);
  border-right: 1px solid rgba(214, 214, 214, 0.6);
  
}
.profile-information > div span {
  font-size: 20px;
  font-weight: 600;
  color: rgba(243, 45, 45, 0.774);
  
}
.profile-information p{
  width: 100%;
  
}
.profile-information > div span b {
  font-size: 1px;
  color: #000000;
  
}
.profile-function {
  margin-top: 5px;
}
.profile-function ul {
  display: flex;
  flex-direction: column;
}
.profile-function ul li {
  padding: 0 20px;
  background-color: #ffffff;
  height: 50px;
  line-height: 50px;
  font-size: 17px;
  color: #000000;
  border-bottom: 1px solid rgba(7, 7, 7, 0.1);
}
.profile-function ul li:nth-child(3) {
  border: none;
  margin-bottom: 10px;
}

</style>
