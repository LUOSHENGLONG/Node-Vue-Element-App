<template>
    <div class="top-nav">
        <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <div class="logo-row">
                <!-- <img src="@/assets/images/logo.png" alt=""> -->
                <img src="https://image.flaticon.com/icons/svg/1055/1055659.svg" alt="">
                <span class="title">在线资金管理系统</span>
            </div>
            <div class="user-row">
                <img :src="user.avatar" alt="">
                <span class="name">{{ user.name }}</span>
                <el-dropdown trigger="click" @command='setInfo'>
                    <span class="el-dropdown-link">
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command='info'>个人信息</el-dropdown-item>
                        <el-dropdown-item command='logout'>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            
            
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1',
            user: this.$store.getters.user
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        setInfo(params) {
            console.log(params)
            switch (params) {
                case "info":
                    this.showInfoList();
                    break;
                case "logout":
                    this.logout()
                    break;
            }
        },
        logout() {
            this.$store.dispatch("clearCurrentState")
            if (localStorage.token ) localStorage.removeItem("token");
            this.$router.push({path: '/login'})
        },
        showInfoList() {
            this.$router.push({name: info})
        }
    }
}
</script>

<style scoped>
.top-nav {
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;;
    z-index: 0;
    max-height: 60px;
    overflow: hidden;
}
.logo-row {
    height: 60px;
    float: left;
    text-align: center;
}

.logo-row img, .user-row img {
    height: 70%;
    vertical-align: -35px;
    margin-left: 25px;
    border-radius: 50%
}
.title {
    font-size: 22px;
    margin-left: 20px;
    color: aliceblue;
    vertical-align: -22px;
    cursor: default;
}
.user-row {
    height: 60px;
    text-align: center;
    float: right;
    color: aliceblue;
}
.name {
    margin-left: 10px;
    vertical-align: -22px;
}
:focus {
    outline: none;
}
.el-dropdown {
    color: white;
    text-align: center;
    vertical-align: -20px;
    margin-right: 20px;
    cursor: pointer;
}

.el-menu.el-menu--horizontal {
    border-bottom: none;
}


</style>
