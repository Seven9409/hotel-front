<template>
    <el-container>
        <el-header>
            <el-row>
                <el-button type="info">登录</el-button>
                <el-button type="success">注册</el-button>
            </el-row>
        </el-header>
        <el-main>
            <!--筛选搜索-->
            <div class="select">
            <el-form  ref="form" :model="form" label-width="60px" label-position="left">
            <el-form-item label="酒店名">
            <el-input v-model="form.name"></el-input>
            <el-form-item>
            <el-button  class="searchBtn" type="primary" @click="search">搜索</el-button>
            </el-form-item>
            </el-form-item>
            </el-form>

            <ul>
            <li class="select-list">
            <dl class="select1">
            <dt>房价：</dt>
            <dd value="0" class="select-all selected">
            <a href="#">全部</a></dd>
            <dd value="1" class=""><a href="#">150以下</a></dd>
            <dd value="2" class=""><a href="#">150-300</a></dd>
            <dd value="3" class=""><a href="#">301-450</a></dd>
            <dd value="4" class=""><a href="#">451-600</a></dd>
            <dd value="5" class=""><a href="#">600以上</a></dd>

            </dl>
            </li>
            <br/>
            <li class="select-list">
            <dl class="select2">
            <dt>星级：</dt>
            <dd value="0" class="select-all selected">
            <a href="#">全部</a></dd>
            <dd value="1" class=""><a href="#">一星/经济</a></dd>
            <dd value="2" class=""><a href="#">二星/普通</a></dd>
            <dd value="3" class=""><a href="#">三星/舒适</a></dd>
            <dd value="4" class=""><a href="#">四星/高档</a></dd>
            <dd value="5" class=""><a href="#">五星/豪华</a></dd>

            </dl>
            </li>
            <br/>
            <li class="select-list">
            <dl class="select3">
            <dt>主题：</dt>
            <dd value="0" class="select-all selected">
            <a href="#">全部</a></dd>
            <dd value="1" class=""><a href="#">商旅之家</a></dd>
            <dd value="2" class=""><a href="#">聚会做饭</a></dd>
            <dd value="3" class=""><a href="#">农家乐</a></dd>
            <dd value="4" class=""><a href="#">休闲情调</a></dd>

            </dl>
            </li>
            <br/>
            <li class="select-result">
            <dl>
            <dt>已选条件：</dt>
            <dd class="select-no">暂时没有选择条件</dd>

            </dl>
            </li>
            </ul>
            </div>
            <div class="paimai_list">
                <div class="list_content"></div>
                <el-pagination
                        layout="prev, pager, next"
                        :total="50">
                </el-pagination>
                
            </div>

        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                // tags: [
                //     {name: '标签一', type: ''},
                //     {name: '标签二', type: 'success'},
                //     {name: '标签三', type: 'info'},
                //     {name: '标签四', type: 'warning'},
                //     {name: '标签五', type: 'danger'}
                // ]
            }
        },
        methods:{
            search(index){
                console.log(index);
            },

        }
    }
</script>

<style scoped>
    .el-header {
        background-color: rgb(64, 158, 255);
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-row {
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

    .select {
        border: 1px solid #ddd;
        padding: 5px 10px;
        border-radius: 4px;
        width: 1100px;
        margin: 5% auto;
        font-size: 12px;
    }

    .select .el-form {
        padding: 10px 5px 5px 63px;
    }

    .el-input {
        width: 85%;
    }

    .searchBtn {
        float: right;
        position: relative;
        top: -40px;
        right: 65px;
    }

    .select ul {
        padding-left: 63px;
        margin-top: -40px;
    }

    .select ul > li {
        list-style: none;
        border-bottom: #eee 1px dashed;
        height: 30px;
    }

    .select-list a {
        font-size: 13px;
        display: inline-block;
        height: 24px;
        line-height: 24px;
        padding: 0 10px;
        color: #039;
        border-radius: 2px;
    }

    .select-list a:hover {
        color: #f60;
        background-color: #ffddaa;
    }

    .select dt {
        float: left;
        height: 32px;
        line-height: 32px;
    }

    .select .select-all {
        width: auto;
    }

    .select dd {
        width: auto;
        height: 32px;
        line-height: 32px;

        margin: 0 15px;
        float: left;
    }

    .selected a {
        color: white;
        background-color: #f60;
    }

    .select-no {
        color: #999;
    }
</style>