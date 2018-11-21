<template>
    <div class="portlet">
        <div class="portlet-title">
            <div class="caption">
                帮助
            </div>
        </div>
        <div class="portlet-body">
            <el-form ref="form" :model="form">
                <el-form-item label="写下你的问题">
                    <el-input type="textarea" v-model="form.problem"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    /* eslint-disable no-console */

    export default {
        name: 'Help',
        data() {
            return {
                form:[],
            };
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style scoped>
    .portlet {
        padding: 12px 20px 15px;
        background-color: #fff;
        margin-top: 0;
        margin-bottom: 25px;
    }

    .portlet-title {
        padding: 0;
        min-height: 48px;
        border-bottom: 1px solid #eee;
    }

    .caption {
        padding: 10px;
        float: left;
        display: inline-block;
        line-height: 15px;
        font-size: 15px;
        color: #578ebe;
        font-weight: 700;
    }
    .portlet-body{
        margin: 20px;
        padding: 0 10px 10px;
    }
    .el-form{
        padding-top: 15px;
    }
</style>


