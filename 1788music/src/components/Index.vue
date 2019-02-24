<template>
    <div class="index">
        <Nav></Nav>
        <left></left>
        <div class="rightContainer">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Nav from './Nav.vue'
import Left from './Left.vue'
export default {
    components: {
        Nav,
        Left
    }
}
</script>

<style scoped>
.index {
    width: 100%;
    height: 100%;
    overflow: hidden;

}
.rightContainer {
    position: fixed;
    width: calc(100% - 200px);
    height: calc(100% - 60px);
    top: 60px;
    left: 200px;
    overflow: auto;
}
</style>
