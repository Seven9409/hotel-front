<template>
    <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="50px"
             label-position="left"
             class="demo-ruleForm login-container">
        <h3 class="title"> 用户登录 </h3>
        <div class="avator">
            <img src="../assets/avator.jpg" alt="用户头像" class="avator1">
        </div>
        <el-form-item label="账号" prop="account">
            <el-input type="text" v-model="loginForm.account" autocomplete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="password ">
            <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width: 100%">
            <el-button type="primary" @click="submitForm('loginForm')" style="width: 100%">提交</el-button>
        </el-form-item>
        <a class="goRegister"   @click="$router.push('/Register')">还没有账号？马上注册</a>
        <!--<a class="Manager" href="/managerLoginPage">管理员登录</a>-->
    </el-form>
</template>

<script>

    import * as api from "../api/api"
    import storage from "../common/Util"
    import * as RestCode from "../common/RestCode"
    export default {
        name: "Login",
        data() {

            return {
                loginForm: {
                    account: '',
                    password: '',
                },
                loginRules: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                },
                checked: true
            };
        },
        methods: {
            submitForm(formName) {
                let vm = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var params = new URLSearchParams();
                        params.append('username', vm.loginForm.account);
                        params.append('password', vm.loginForm.password);
                        api.requestLogin(params).then((res) => {
                            // console.log(res)
                            let code = res.code;
                            let msg = res.msg;
                            if (code === RestCode.SUCCESS) {
                                let data = res.data;
                                let token = data.token;
                                let user = data.user;
                                // console.log(code, msg, data, token, user)

                                storage.setStorage("user", user, 1000 * 60 * 60 * 2);
                                storage.setStorage("token", token, 1000 * 60 * 60 * 2);
                                vm.$router.push("/home");
                            } else {
                                this.$message.error('登录失败。' + msg);
                            }


                        });

                        // alert('submit!');
                        // "$router.push('/home')"
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // resetForm(formName) {
            //     this.$refs[formName].resetFields();
            // }
        }
    }
</script>

<style scoped>
    .login-container {
        border: 1px solid #eaeaea;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        width: 300px;
        background-clip: padding-box;
        margin: 180px auto;
        padding: 35px 35px 15px 35px;
        background: #fff;

        box-shadow: 0 0 25px #cac6c6;
    }

    .title {
        margin: 0 auto 20px auto;
        text-align: center;
        color: #505458;
        letter-spacing: 5px;
        /*margin-top: 10px;*/
    }

    .avator {
        width: 96px;
        height: 96px;
        text-align: center;
        margin: 0 auto 20px auto;
    }

    .avator1 {
        width: 96px;
        height: 96px;
        /*text-align: center;*/
        /*margin: 0 auto 20px auto;*/
    }

    .remember {
        margin: 0 0 35px 0;
    }
    a:hover{
        cursor:pointer
    }
    .goRegister{
        /*float: right;*/
        margin-left: 150px;
        font-size: 14px;
    }

</style>