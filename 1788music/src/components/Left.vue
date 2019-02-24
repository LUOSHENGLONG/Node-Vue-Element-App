<template>
    <div class="left-nav">
        <el-col>
            <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
                <template slot="title">
                <span style="margin-left:30px">资金管理</span>
                </template>
                <el-menu-item-group>
                <router-link to="/home">
                    <el-menu-item index="1-1" class="is-active" style="padding-left:60px">首页</el-menu-item>
                </router-link>
                <router-link to="/foundList">
                    <el-menu-item index="1-2" style="padding-left:60px">我的资金</el-menu-item>
                </router-link>
                <!-- <el-menu-item index="1-2">选项2</el-menu-item> -->
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                <span style="margin-left:30px">个人信息</span>
                </template>
                <el-menu-item-group>
                <router-link to="/info">
                    <el-menu-item index="2-1" style="padding-left:60px">用户身份</el-menu-item>
                </router-link>
                <!-- <el-menu-item index="1-2">选项2</el-menu-item> -->
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                <span style="margin-left:30px">设置</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="3-1" @click="logout" style="padding-left:60px">退出</el-menu-item>
                <!-- <el-menu-item index="1-2">选项2</el-menu-item> -->
                </el-menu-item-group>
            </el-submenu>
            
            </el-menu>
        </el-col>
    </div>
</template>

<script>
export default {
    mounted() {
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        logout() {
            this.$store.dispatch("clearCurrentState")
            if (localStorage.token ) localStorage.removeItem("token");
            this.$router.push({path: '/login'})
        },
    }
}
</script>

<style scoped>
.left-nav {
    position: fixed;
    top: 60px;
    left: 0;
    width: 200px;
    height: 100%;
    background-color: rgb(84,92,100);
    overflow: hidden;
    /* border-right: 1px solid rgb(84,92,100); */
}
.el-col {
    width: 200px;
    height: 100%;
    overflow: hidden;
    border: 0;
}
ul li {
    background-color: none !important;
    overflow: hidden;
}

.el-submenu {
    width: 200px;;
}

a {
    text-decoration: none;
}
</style>
