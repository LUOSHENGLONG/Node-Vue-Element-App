<template>
<!-- // Profile [type, describe, income, expend, cash, remark, date] -->
    <div class="dialog">
        <!-- <el-button type="text" @click="dialogFormVisible = true">添加</el-button> -->
            <el-dialog :title="operation.title" :visible.sync="operation.show" :modal-append-to-body="false" width="40%" style="text-align: center">
            <div class="form">
                <el-form 
                    ref="form"
                    :model="form" 
                    :rules="form_rules"
                    style="padding: 10px 140px;">
                    <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-select 
                        v-model="form.type" 
                        placeholder="收支类型"  
                        style="width: 380px;margin-left: 20px;"
                        >
                        <el-option 
                            :label="item" 
                            :value="item" 
                            v-for="(item, index) in format_type_list"
                            :key="index">
                        </el-option>
                    </el-select>
                    
                    </el-form-item>
                    <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input v-model="form.describe" autocomplete="off" style="margin-left: 20px;width: 380px;"></el-input>
                    </el-form-item>

                    <el-form-item label="收入" :label-width="formLabelWidth">
                    <el-input v-model="form.income" autocomplete="off" style="margin-left: 20px;width: 380px;"></el-input>
                    </el-form-item>

                    <el-form-item label="支出" :label-width="formLabelWidth">
                    <el-input v-model="form.expend" autocomplete="off" style="margin-left: 20px;width: 380px;"></el-input>
                    </el-form-item>

                    <el-form-item label="现金" :label-width="formLabelWidth">
                    <el-input v-model="form.cash" autocomplete="off" style="margin-left: 20px;width: 380px;"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="form.remark" autocomplete="off" style="margin-left: 20px;width: 380px;"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer"  style="padding: 10px 140px;">
                <el-button @click="operation.show = false">取 消</el-button>
                <el-button type="primary" @click='submit("form")'>提 交</el-button>
            </div>
        </el-dialog>
    </div>    

</template>

<script>
  export default {
    props: {
        form: Object,
        operation: Object
    },
    data() {
      return {
          format_type_list: [
            "提现",
            "提现手续费",
            "充值",
            "优惠券",
            "充值礼券",
            "转账"
        ],
        
        formLabelWidth: '100px',
        form_rules: {
            describe: [
                { required: true, message: "收支描述不能为空！", trigger: "blur"}
            ],
            income: [
                { required: true, message: "收支不能为空！", trigger: "blur"}
            ],
            expend: [
                { required: true, message: "支出不能为空！", trigger: "blur"}
            ],
            cash: [
                { required: true, message: "资金不能为空！", trigger: "blur"}
            ],
        }
      };
    },
    methods: {
        submit(form) {
            this.$refs[form].validate((valid) => {
            if (valid) {
                console.log(this.form)
                const url = this.operation.opera
                this.axios
                .post(`/api/profiles/${url}`, this.form)
                .then(result => {
                    const { code, message} = result.data
                    if (code === 0) {
                        this.$message.error(message)
                    }
                    if (code === 1) {
                        this.$message({
                          type: 'success',
                          message: message  
                        })
                        this.operation.show = false
                        this.$emit("updateData")
                    }
                })
            }
            });
        }
    }
  };
</script>

<style scoped>

</style>
