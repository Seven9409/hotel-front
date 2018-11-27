<template>
    <el-container>
        <el-header>
            <el-row>
                <el-button type="info" @click="$router.push('/login')">登录</el-button>
                <el-button type="success" @click="$router.push('/register')">注册</el-button>
            </el-row>
        </el-header>
        <el-main>
            <div class="select">
                <el-form ref="form" :model="filters" label-width="60px" label-position="left">
                    <el-form-item label="酒店名">
                        <el-input v-model="filters.hotelName"></el-input>
                        <el-form-item>
                            <el-button class="searchBtn" type="primary" @click="getHotelList">搜索</el-button>
                        </el-form-item>
                    </el-form-item>
                </el-form>

                <div class="choose">
                    <div v-if="category.length" class="choose-nav">
                        <div class='nav' v-for='(items,index) in category'>
                            <div class='mutil-query-title' v-if='items.name' :key="items.id">{{items.name}}
                                <span style='margin-left: 20px;' @click='allIn(index)'>全选</span>|<span
                                        @click='remove(index)'>清空</span>
                            </div>
                            <ol v-if='items.items.length'>
                                <li v-for='(item,key) in items.items'>
                                    <span :class="{'active':item.active}" @click='handle(index,key)' :key='item.id'>{{item.name}}</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div v-if='condition.length' class="aready">
                        <span>已选条件：</span>
                        <span v-for='(item,index) in condition' class='active'
                              @click='onRemove(index)'>{{item.name}} | </span>
                    </div>
                </div>
            </div>

            <div class="paimai_list">
                <div class="list_content" v-if="hotelList.length">
                    <div class="hotel_content" v-for="(hotel,index) in hotelList">
                        <a href="#">
                            <img :src="hotel.picture">
                        </a>
                        <h3>{{hotel.name}}</h3>
                        <span>{{hotel.address}}</span>
                        <span>{{hotel.price}}</span>


                    </div>


                </div>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next"
                        :total="totalPages">
                </el-pagination>

            </div>


        </el-main>
    </el-container>
</template>
<script>
    /* eslint-disable no-console */
    import * as api from "../api/api"
    import * as RestCode from "../common/RestCode"

    export default {
        name: 'Setting',
        data() {
            return {
                count: 0,
                filters: {
                    hotelName: "",
                },
                category: [
                    {
                        name: '房价',
                        items: [
                            {
                                name: '150以下',
                                active: false
                            },
                            {
                                name: '150-300',
                                active: false
                            },
                            {
                                name: '301-450',
                                active: false
                            },
                            {
                                name: '451-600',
                                active: false
                            }, {
                                name: '600以上',
                                active: false
                            }
                        ]
                    },
                    {
                        name: '星级',
                        items: [
                            {
                                name: '一星/经济',
                                active: false
                            },
                            {
                                name: '二星/普通',
                                active: false
                            },
                            {
                                name: '三星/舒适',
                                active: false
                            },
                            {
                                name: '四星/高档',
                                active: false
                            },
                            {
                                name: '五星/豪华',
                                active: false

                            }
                        ]
                    },
                    {
                        name: '主题',
                        items: [
                            {
                                name: '商旅之家',
                                active: false
                            },
                            {
                                name: '聚会做饭',
                                active: false
                            },
                            {
                                name: '农家乐',
                                active: false
                            },
                            {
                                name: '休闲情调',
                                active: false
                            }
                        ]
                    }
                ],
                condition: [],
                hotelList: [{
                    name: "",
                    address: "",
                    price: "",
                    picture: ""
                }],
                currentPage: 1,// 当前页
                pageSize: 5, // 每页显示条目个数
                totalPages: 5,
            };

        },

        methods: {
            // 条件筛选
            handle: function (index, key) {
                let vm = this
                var item = this.category[index].items;
                item.filter(function (v, i) {
                    if (i == key) {
                        v.active = true;
                        vm.condition.filter(function (v2, i) {
                            if (v.name == v2.name) {
                                vm.condition.splice(i, 1);
                                vm.count--;
                            }
                        });
                        vm.$set(vm.condition, vm.count++, v);
                    }
                });
            },
            onRemove: function (index) {
                this.condition.splice(index, 1);
                this.$delete(this.condition, this.count--);
            },

            remove: function (index) {
                let vm = this;
                var item = this.category[index].items;
                item.filter(function (v1) {
                    v1.active = false;
                    vm.condition.filter(function (v2, i) {
                        if (v1.name == v2.name) {
                            vm.condition.splice(i, 1);
                            vm.count--;
                        }
                    });
                });
            },
            allIn: function (index) {
                let vm = this
                var item = this.category[index].items;
                item.filter(function (v) {
                    v.active = true;
                    vm.condition.filter(function (v2, i) {
                        if (v.name == v2.name) {
                            vm.condition.splice(i, 1);
                            vm.count--;
                        }
                    });
                    vm.$set(vm.condition, vm.count++, v);
                });
            },


            // 分页
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.getHotelList();
            }
            ,
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getHotelList();
            },
            // 获取酒店列表
            getHotelList() {
                let params = new URLSearchParams();
                params.append('currentPage', this.currentPage - 1);
                params.append('pageSize', this.pageSize);
                params.append('title', this.filters.hotelName);
                console.log(this.condition.item)
                params.append('price', this.condition.item);
                // params.append('star', this.category.items.name);
                // params.append('theme', this.category.items.name);
                api.hotelList(params).then((res) => {
                    let code = res.code;
                    if (code === RestCode.SUCCESS) {
                        // console.log(res.data.data.content)
                        this.hotelList = res.data.data.content;
                    }
                    else if (code === RestCode.RECORD_NOT_FOUND) {
                        this.$message.warning('很抱歉，没有找到符合您条件的酒店！');
                    }
                });
            }
        },
        mounted: function () {
            this.getHotelList();

        }
    }
</script>

<style scoped>

    .el-header {
        background-color: #2cabc4;
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
        border: 2px solid #2cabc4;
        padding: 5px 10px;
        border-radius: 4px;
        width: 1100px;
        margin: 5% auto;
        font-size: 12px;
        background-color: white;
        min-height: 320px;
    }

    .select .el-form {
        padding: 10px 5px 5px 63px;
        margin-top: 20px;
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

    .choose {
        padding-left: 20px;
        margin-top: -30px;
        margin-left: 43px;
        font-size: 14px;
    }

    .choose-nav {
        /*border-top: #eee 1px dashed;*/
    }

    .nav {
        /*display: inline-block;*/
        width: 100%;
        float: left;
        border-bottom: #eee 1px dashed;
        margin-bottom: 15px;
        padding-bottom: 5px;
        /*position: relative;*/
        /*left: -307px;*/
        /*top: 42px;*/
        /*margin: 0 10px 15px 130px;*/
    }

    .mutil-query-title {
        float: left;
    }

    .mutil-query-title span {
        width: 35px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        display: inline-block;
    }

    .mutil-query-title span:hover {
        background-color: #FFEBCD;
    }

    ol {
        list-style: none;
    }

    ol > li {
        float: left;
        /*margin-top: 5px;*/
        margin-left: 15px;
        width: 70px;
        height: 30px;
        text-align: center;
        line-height: 30px;
    }

    li:hover {
        background-color: #FFEBCD;
    }

    .aready {
        float: left;
        margin-top: 5px;
    }

    .aready span:hover {
        background-color: #FFEBCD;
    }

    /*酒店列表*/
    .list_content {
        border: 1px solid;
        width: 1000px;
        height: 1000px;
        margin: 5% auto;
    }

    .el-pagination {
        text-align: center;
        margin-top: 10px;
    }

</style>


