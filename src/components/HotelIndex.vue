<template>
    <el-container>
        <el-header>
            <el-row>
                <h1>Welcome</h1>
                <div class="btn">
                <template v-if="fetch('token') == null">
                    {{fetch('token')}}
                    <el-button type="info" @click="$router.push('/login')">登录</el-button>
                    <el-button type="success" @click="$router.push('/register')">注册</el-button>
                </template>
                <template v-else>
                    <el-button type="info" @click="$router.push('/hotelIndex/info/setting')">{{
                        JSON.parse(getUser('user')).value.name}}
                    </el-button>
                    <el-button type="success" @click="logout">注销</el-button>
                </template>
                </div>
            </el-row>
        </el-header>
        <!--<el-main>-->
        <section class="content-container">
            <el-row>
                <el-col :span="24" class="content-wrapper">
                    <transition name="fade" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </el-col>
            </el-row>
        </section>

            <!--<transition name="fade" mode="out-in">-->
                <!--<router-view></router-view>-->
            <!--</transition>-->


        <!--</el-main>-->
    </el-container>
</template>
<script>
import storage from "../common/Util"
    export default {
        name: 'HotelIndex',
        methods: {
            fetch(key) {
                return window.localStorage.getItem(key)
            },
            getUser(user) {
                return window.localStorage.getItem(user)
            },
            // save(key, value) {
            //     window.localStorage.setItem(key, value);
            // },

            logout: function () {
                var vm = this;
                this.$confirm(
                    "确认退出？", "提示", {}).then(() => {
                    storage.removeStorage("user");
                    storage.removeStorage("token");
                    vm.$router.push('/login')
                }).catch(() => {
                });
            },
        }
    }
</script>

<style scoped>
    span {
        cursor: pointer
    }

    .el-header {
        background-color: #2cabc4;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    h1{
        float: left;
        margin-left: 70px;
        letter-spacing: 18px;
    }
    .btn {
        float: right;
        margin-right: 50px;
        padding-right: 50px;
    }
    .el-main {
        /*background-color: #E9EEF3;*/
        color: #333;
        /*text-align: center;*/
        /*line-height: 160px;*/
    }


</style>


