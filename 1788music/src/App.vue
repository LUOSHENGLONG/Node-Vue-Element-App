<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
  name: 'App',
  created() {
    if ( localStorage.token ) {
      const decode = jwt_decode(localStorage.token)
      // 存储数据
      this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decode))
      this.$store.dispatch("setUser", decode)
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
