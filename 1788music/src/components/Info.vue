<template>
    <div class="info">
        <div class="left">
          <img src="https://image.flaticon.com/icons/svg/1055/1055659.svg" alt="">
        </div>

        <div class="right">
            <h1>用户信息</h1>
            <p>用户名：{{ user.name}}</p>
            <p>身份：{{ user.identity == 'manager' ? '管理员' : '员工'  }}</p>
        </div>
    </div>
  
</template>
<script>
  export default {
    data() {
      return {
        user: this.$store.getters.user
      }
    },

    methods: {

    }
  }
</script>

<style scoped>
.info {
    width: 100%;
    height: 100%;
    display: flex;
    flex: 2;

}
.left {
    height: 100%;
    flex: 1;
    background-color: rgba(223, 223, 223, 0.671);
    text-align: center;
}
.left img {
    width: 90%;
    height: 90%;
}
.right {
    height: 100%;
    flex: 1;
    background-color: #fcfcfc;
    color: #444;
}
.right h1 {
  margin-top: 30%;
  margin-left: 5%;
  margin-bottom: 2%;
  font-size: 26px;
}
.right p {
  margin-left: 5%;
  margin-bottom: 1%;
  font-size: 22px;
}
</style>
