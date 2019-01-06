<template>
    <!--导航栏-->
    <el-row class="container">
        <el-col :span="24" class="header">
            <el-row class="btn">
                <el-button type="info" @click="$router.push('/info/setting')">{{ JSON.parse(getUser('user')).value.name}}</el-button>
                <el-button type="success" @click.native="logout">注销</el-button>
            </el-row>
        </el-col>

        <!--侧边栏导航-->
        <el-col :span="24" class="main">
            <aside class="sidebar">
                <div class="profile-user">
                    <div class="userpic">
                        <img :src="'http://192.168.31.60:8013'+JSON.parse(getUser('user')).value.avatar" alt="用户图片">
                    </div>
                    <div class="usertitle">
                        <div class="usertitle-name">{{ JSON.parse(getUser('user')).value.name}}</div>
                        <div class="usertitle-job">用户</div>
                    </div>
                </div>
                <el-menu default-active="1-1" class="el-menu-vertical-demo">
                    <el-menu-item index="1" @click="$router.push('/info/orderDetails')">
                        <i class="el-icon-menu"></i>
                        <span slot="title">订单详情</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="$router.push('/info/setting')">
                        <i class="el-icon-setting"></i>
                        <span slot="title">账户设置</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="$router.push('/info/help')">
                        <i class="el-icon-warning"></i>
                        <span slot="title">帮助</span>
                    </el-menu-item>
                </el-menu>
            </aside>


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
            <!--</el-main>-->
        </el-col>
        <!--</el-container>-->
    </el-row>

</template>

<script>
    import storage from "../common/Util"
    export default {
        name: 'Info',
        data() {
            return {

            };
        },
        methods: {
            getUser(user) {
                return window.localStorage.getItem(user)
            },
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
    .header {
        background-color: rgb(64, 158, 255);
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .btn {
        float: right;
        margin-right: 50px;
        padding-right: 50px;
    }

    .el-col {
        border-radius: 4px;
    }

    .grid-content {
        /*border-radius: 4px;*/
        min-height: 50px;
        line-height: 50px;
    }

    .main {
        display: flex;
        color: #333;
        padding: 30px 0;
    }

    .main .sidebar {
        padding: 30px 10px 10px 10px;
        width: 280px;
        margin-right: 25px;
        background-color: white;
        height: 450px;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        background-color: white;
    }

    .profile-user {
        text-align: center;
    }

    .userpic img {
        float: none;
        margin: 0 auto;
        width: 50%;
        height: 50%;
        -webkit-border-radius: 50% !important;
        -moz-border-radius: 50% !important;
        border-radius: 50% !important;
    }

    .usertitle {
        margin-top: 20px;
    }

    .usertitle-name {
        color: #5a7391;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 7px;
    }

    .usertitle-job {
        text-transform: uppercase;
        color: #5b9bd1;
        font-size: 13px;
        font-weight: 800;
        margin-bottom: 7px;
    }

    .el-menu-vertical-demo {
        margin-top: 30px;
        padding-bottom: 20px;
    }

    .main .content-container {
        flex: 1;
        /*position: absolute;*/
        /*overflow-y: scroll;*/
        padding: 0 20px;
    }

    .bg-purple-white {
        border-bottom: 1px solid #e7ecf1;
    }

</style>


