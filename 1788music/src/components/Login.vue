<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">CatCaps在线后台管理系统登录</span>
            </div>
            
            <el-form label-position="left" :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm2.email"></el-input>
                </el-form-item>
                
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
                </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
                <router-link to="/register">
                    <el-button>去注册</el-button>
                </router-link>
            </el-form-item>
        </el-form>
        </section>
    </div>
</template>


<script>
import jwt_decode from 'jwt-decode'
  export default {
    data() {
      
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
          callback();
        }
      };
      
      return {
        ruleForm2: {
          password: '',
          email: ''
        },
        rules2: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          email: [
            { validator: checkEmail, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios
                .post('/api/users/login', this.ruleForm2)
                .then(result => {
                    const {code, msg, token} = result.data
                    // console.log(code,msg,token)
                    // 登录失败
                    if(code === 0) {
                        this.$message.error(msg);
                    }
                    // 登录成功
                    if(code === 1) {
                        this.$message({
                            message: msg,
                            type: 'success'
                        });
                        localStorage.setItem('token', token)
                        // 解析token
                        const decode = jwt_decode(token)
                        console.log(decode)
                        // 存储数据
                        this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decode))
                        this.$store.dispatch("setUser", decode)

                        // 页面跳转
                        this.$router.push({path: '/index'})
                        
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
      },
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

<style scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url(https://image.flaticon.com/icons/svg/1471/1471544.svg) no-repeat center center;
  background-size: 200% 200%;
  background-position: 48.5% 40%;
}
.form_container {
  width: 370px;
  height: 260px;
  background-color: #fff;
  position: absolute;
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


</style>
