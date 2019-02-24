
<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">CatCaps在线后台管理系统注册</span>
            </div>
            
            <el-form label-position="left" :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">

                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm2.username"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm2.email"></el-input>
                </el-form-item>
                
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选择身份" prop="identity">
                    <el-select v-model="ruleForm2.identity" placeholder="请选择">
                    <el-option label="管理员" value="manager"></el-option>
                    <el-option label="员工" value="employee"></el-option>
                  </el-select>
                </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
                <router-link to="/login">
                    <el-button>去登录</el-button>
                </router-link>
            </el-form-item>
        </el-form>
        </section>
    </div>
</template>


<script>
  export default {
    data() {
      const checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        callback();
      };
      const checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        }
        const re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; 
        if(!re.test(value)) {
          return callback(new Error('邮箱格式不正确'));
        }
        callback();
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const checkIdentity = (rule, value, callback) => {
        if(!value) {
          callback(new Error('请选择身份'));
        } else {
          callback();
        }
        

      };
      return {
        ruleForm2: {
          password: '',
          checkPass: '',
          username: '',
          email: '',
          identity: ''
        },
        
        rules2: {
          password: [
            { validator: validatePass, trigger: 'blur' },
            { min: 6, max: 18, message: '密码长度须在6-18位区间'}
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          username: [
            { validator: checkUsername, trigger: 'blur' },
            { min: 6, max: 18, message: '用户名长度须在6-18位区间'}
          ],
          email: [
            { validator: checkEmail, trigger: 'blur' }
          ],
          identity: [
            { validator: checkIdentity, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios
              .post('/api/users/register', this.ruleForm2)
              .then(result => {
                console.log(result.data)
                if(result.data.code === 0) {
                  this.$message.error(result.data.msg);
                }
                if(result.data.code === 1) {
                  this.$message({
                    message: result.data.msg,
                    type: 'success'
                  });
                  setTimeout(() => {
                    this.$router.push({path: '/login'})
                  }, 2000);
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url(https://image.flaticon.com/icons/svg/1471/1471543.svg) no-repeat center center;
  background-size: 200% 200%;
  background-position: 48.5% 40%;
}
.form_container {
  width: 370px;
  height: 430px;
  position: absolute;
  background-color: #fff;
  top: 20%;
  left: 50%;
  transform: translateX(-185px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #555;
  text-align: left;
}
.manage_tip {
  text-align: left;
  margin-bottom: 40px;
}

.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
.toRegister {
  vertical-align: -10px;
}
.el-select {
  width: 290px;
}

</style>
