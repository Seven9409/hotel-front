<template>
    <el-form :model="registerForm" status-icon :rules="registerRules" ref="registerForm" label-width="80px"
             class="demo-ruleForm register-container">
        <h3 class="title"> 用户注册 </h3>
        <el-form-item label="邮箱" prop="email">
            <el-input type="text" v-model="registerForm.email" autocomplete="off" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
            <el-input type="text" v-model="registerForm.account" autocomplete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerForm.password" autocomplete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
            <el-input type="password" v-model="registerForm.checkPassword" autocomplete="off"
                      placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
            <el-button type="primary" @click="submitForm('registerForm')" style="width: 100%">注册</el-button>
            <!--<el-button @click="resetForm('loginForm')">重置</el-button>-->
        </el-form-item>
    </el-form>
</template>

<script>
    import * as api from "../api/api"
    import * as RestCode from "../common/RestCode"
    export default {
        name: "Register",
        data(){
        var validatePassword = (rule, value, callback) => {
            // if (value === '') {
            //     this.$message.error('请再次输入密码');
            // } else if (value !== this.registerRules.password) {
            //     this.$message.error('两次输入密码不一致');
            // }
            // var vm = this
            // console.log(value,this.registerForm.password)
            if (value === '' || typeof(value) == "undefined") {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }

        };

    return {
        registerForm: {
            email: '',
            account: '',
            password: '',
            checkPass: '',
        },
        registerRules: {
            email: [
                {required: true, message: '请输入邮箱', trigger: 'blur'},
                {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
            ],
            account: [
                {required: true, message: '请输入账号', trigger: 'blur'}
            ],
            password: [
                {required: true, message: '请输入密码', trigger: 'blur'}
            ],
            checkPassword: [
                {required: true, validator: validatePassword, trigger: 'blur'}
            ],
        },
    };

    },
    methods: {
        submitForm(formName) {
            let vm = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    api.requestRegister({
                        'email': vm.registerForm.email,
                        'name': vm.registerForm.account,
                        'password': vm.registerForm.password
                    }).then((res) => {
                        let code = res.code;
                        let msg = res.msg;
                        if (code === RestCode.SUCCESS) {


                            this.$message.success('注册成功');
                            vm.$router.push("/login");
                        } else if (code === RestCode.RECORD_ALREADY_EXISTS) {
                            this.$message.warning('用户已存在');
                        }
                        else {
                            this.$message.error('注册失败。' + msg);
                        }


                    });
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
    .register-container {
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

</style>