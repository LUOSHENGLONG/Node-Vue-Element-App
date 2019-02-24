<template>
  <div class="block">
    <el-pagination
        v-if="paginations.totalCount > 0"
        @size-change="handleSizeChange"
        @current-change="currentChange"
        :current-page="paginations.page_index"
        :page-sizes="paginations.page_sizes"
        :page-size="paginations.page_size"
        :layout="paginations.layout"
        :total="paginations.totalCount">
    </el-pagination>
  </div>
</template>
<script>
    export default {
        props:{
            paginations: Object
        },
        methods: {
        handleSizeChange(val) {
            this.$emit('handleSizeChange',val)
        },
        currentChange(val) {
            this.$emit('currentChange',val)
        }
        },
        data() {
            return {
                currentPage: 1,
            };
        },
        mounted() {
            console.log(this.paginations)
        }
    }
</script>