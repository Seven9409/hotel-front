<template>
    <div class="page-container">
        <div class="page-content-wrapper">
            <div class="page-content">
                <h3 class="page-title">预定入住</h3>
                <div class="search-page search-content-3">
                    <el-row>
                        <el-col :span="8">
                            <div class="search-filter ">
                                <el-form :label-position="labelPosition" label-width="80px" :model="filters">
                                    <el-form-item label="房间规格搜索">
                                        <el-input v-model="filters.search"></el-input>
                                        <i class="el-icon-search icon-magnifier"></i>
                                    </el-form-item>
                                    <el-form-item label="入住人数">
                                        <el-select v-model="filters.CheckinNumber" placeholder="入住人数">
                                            <el-option label="全部" value="all"></el-option>
                                            <el-option label="1人" value="1person"></el-option>
                                            <el-option label="2人" value="2person"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item style="text-align: center">
                                        <el-button type="primary" @click="submitForm('filters')">查询</el-button>
                                        <el-button @click="resetForm('filters')">重置</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-col>
                        <el-col :span="16">
                            <el-row>
                                <el-col :span="8">
                                    <div class="tile-container">
                                        <div class="tile-thumbnail">
                                            <a><img src="../assets/avator.jpg"></a>
                                        </div>
                                        <div class="tile-title">
                                            <h3>
                                                <a>豪华单人间</a>
                                                <i class="iconfont icon-danren"></i>
                                            </h3>
                                            <a><i class="iconfont icon-jiahao2"></i></a>
                                            <div class="tile-desc">
                                                <p>
                                                    价格：
                                                    <a>500</a>
                                                    <i class="iconfont icon-wifi1"></i>
                                                    <i class="iconfont icon-iconfontkongtao"></i>
                                                    <i class="iconfont icon-diannao"></i>
                                                    <i class="iconfont icon-dianshi"></i>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="tile-container">
                                        <div class="tile-thumbnail">
                                            <a><img src="../assets/avator.jpg"></a>
                                        </div>
                                        <div class="tile-title">
                                            <h3>
                                                <a>豪华单人间</a>
                                                <i class="iconfont icon-danren"></i>
                                            </h3>
                                            <a><i class="iconfont icon-jiahao2"></i></a>
                                            <div class="tile-desc">
                                                <p>
                                                    价格：
                                                    <a>500</a>
                                                    <i class="iconfont icon-wifi1"></i>
                                                    <i class="iconfont icon-iconfontkongtao"></i>
                                                    <i class="iconfont icon-diannao"></i>
                                                    <i class="iconfont icon-dianshi"></i>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="tile-container">
                                        <div class="tile-thumbnail">
                                            <a><img src="../assets/avator.jpg"></a>
                                        </div>
                                        <div class="tile-title">
                                            <h3>
                                                <a>豪华单人间</a>
                                                <i class="iconfont icon-danren"></i>
                                            </h3>
                                            <a><i class="iconfont icon-jiahao2"></i></a>
                                            <div class="tile-desc">
                                                <p>
                                                    价格：
                                                    <a>500</a>
                                                    <i class="iconfont icon-wifi1"></i>
                                                    <i class="iconfont icon-iconfontkongtao"></i>
                                                    <i class="iconfont icon-diannao"></i>
                                                    <i class="iconfont icon-dianshi"></i>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-pagination
                                    layout="prev, pager, next"
                                    :total="totalPages">
                            </el-pagination>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BookingRoomPage",
        data() {
            return {
                labelPosition: 'top',
                filters: {
                    search: '',
                    CheckinNumber: '',
                    totalPages: 5,
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
        text-shadow: none;
        color: #337ab7;
    }

    .page-container {
        margin: 0;
        padding: 0;
        position: relative;
    }

    .page-content-wrapper {
        float: left;
        width: 100%;
    }

    .page-content {
        min-height: 1496px;
        padding: 25px 25px 10px;
        background-color: #eef1f5;
    }

    .page-content .page-title {
        margin: 25px 0;
        font-size: 24px;
        color: #666;
        padding-left: 15px;
        letter-spacing: -1px;
        display: block;
        font-weight: 300;
    }

    .el-col {
        position: relative;
        min-height: 1px;
        padding-left: 15px;
        padding-right: 15px;
    }

    .search-page .search-filter {
        background-color: #fff;
        padding: 30px 30px 0;
        margin-bottom: 30px;
    }

    .el-form-item__content > i {
        color: #ccc;
        position: absolute;
        margin: 11px 2px 4px 10px;
        z-index: 3;
        width: 16px;
        font-size: 18px;
        text-align: center;
        left: auto;
        right: 10px;
    }

    .el-select {
        width: 100%;
    }

    .el-button {
        margin: 20px 20px 40px
    }

    .el-button--primary {
        margin-right: 20px;
    }

    .el-button--default {
        margin-left: 20px;
    }

    .search-content-3 .tile-container > .tile-thumbnail {
        height: 200px;
        overflow: hidden;
        position: relative;
    }

    .search-content-3 .tile-container > .tile-thumbnail img {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }

    img {
        vertical-align: middle;
    }

    .search-content-3 .tile-container > .tile-title {
        background-color: #fff;
        padding: 30px 20px;
    }

    .search-content-3 .tile-container > .tile-title > h3 {
        font-size: 19px;
        font-weight: 600;
        margin: 0;
        display: inline-block;
    }

    .search-content-3 .tile-container > .tile-title > h3 > a {
        color: #4e5a64;
    }

    .search-content-3 .tile-container > .tile-title > h3 > i {
        font-size: 16px;
        position: relative;
        top:5px;
    }

    .search-content-3 .tile-container > .tile-title i {
        float: right;
        font-size: 24px;
        margin: 0 5px;
    }
    .tile-container>.tile-title>.tile-desc{
        font-size: 14px;
    }
 .tile-container>.tile-title>.tile-desc>p {
        margin: 20px 0 0;
    }
.el-pagination{
    text-align: center;
    padding-top: 20px;
}
</style>