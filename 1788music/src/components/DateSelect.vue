<template>
  <div class="block">
    <el-date-picker
      v-model="value13"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="timestamp"
      :default-time="['00:00:00', '23:59:59']">
    </el-date-picker>
  </div>
</template>

<script>
import moment from 'moment'
  export default {
    data() {
      return {
        value13: ''
      };
    },
    methods: {
      switchDate(startTime, endTime){
        this.$emit('switchDate', startTime, endTime)
      }
    },
    watch: {
      value13(newVal, oldVal) {
        let startTime = 0
        let endTime = 0
        if( newVal != null) {
          startTime = newVal[0]
          endTime = newVal[1]
        }
        this.switchDate(startTime, endTime)
      }
    }
  };
</script>