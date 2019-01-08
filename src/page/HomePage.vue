<template>
    <div class="content">
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
                            <!--<span style='margin-left: 20px;' @click='allIn(index)'>全选</span>|<span-->
                            <!--@click='remove(index)'>清空</span>-->
                        </div>
                        <ol v-if='items.items.length'>
                            <li v-for='(item,key) in items.items'>
                                <span :class="{'active':item.active}" @click='handle(index,key)' :key='item.id'>{{item.name}}</span>
                            </li>
                        </ol>
                    </div>
                </div>
                <div class="aready">
                    <span>已选条件：</span>
                    <span v-if="condition.price" @click='onRemove(0)'>{{condition.price.name}}</span>
                    <span v-if="condition.star" @click='onRemove(1)'>{{condition.star.name}}</span>
                    <span v-if="condition.theme" @click='onRemove(2)'>{{condition.theme.name}}</span>
                    <!--<span v-for='(item,index) in condition' class='active'-->
                    <!--@click='onRemove(index)'>{{item.name}} | </span>-->
                </div>
            </div>
        </div>
        <div class="paimai_list">
            <div class="list_content" v-if="hotelList.length">
                <div class="hotel_content" v-for="(hotel) in hotelList">
                    <div class="picBox">
                        <a href="#">
                            <img :src="'http://192.168.31.60:8013'+hotel.picture">
                        </a></div>
                    <h2>{{hotel.name}}</h2>
                    <el-rate
                            v-model="hotel.starRated"
                            disabled
                            text-color="#ff9900">
                    </el-rate>

                    <div class="addressBox">
                        <span>地址：</span>
                        <span>{{hotel.address}}</span>
                    </div>
                    <div class="priBox">
                            <span class="font " style="vertical-align: 11px;
    padding-right: 5px;">￥</span>
                        <span class="prifont">{{hotel.price}}</span>
                        <span class="font">起</span>
                    </div>
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
    </div>
</template>

<script>
    import * as api from "../api/api"
    import * as RestCode from "../common/RestCode"
    import storage from "../common/Util"

    export default {
        name: "HomePage",
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
                                value: 0,
                                name: '150以下',
                                active: false
                            },
                            {
                                value: 1,
                                name: '150-300',
                                active: false
                            },
                            {
                                value: 2,
                                name: '301-450',
                                active: false
                            },
                            {
                                value: 3,
                                name: '451-600',
                                active: false
                            },
                            {
                                value: 4,
                                name: '600以上',
                                active: false
                            }
                        ]
                    },
                    {
                        name: '星级',
                        items: [
                            {
                                value: 0,
                                name: '一星/经济',
                                active: false
                            },
                            {
                                value: 1,
                                name: '二星/普通',
                                active: false
                            },
                            {
                                value: 2,
                                name: '三星/舒适',
                                active: false
                            },
                            {
                                value: 3,
                                name: '四星/高档',
                                active: false
                            },
                            {
                                value: 4,
                                name: '五星/豪华',
                                active: false

                            }
                        ]
                    },
                    {
                        name: '主题',
                        items: [
                            {
                                value: 0,
                                name: '商旅之家',
                                active: false
                            },
                            {
                                value: 1,
                                name: '聚会做饭',
                                active: false
                            },
                            {
                                value: 2,
                                name: '农家乐',
                                active: false
                            },
                            {
                                value: 3,
                                name: '休闲情调',
                                active: false
                            }
                        ]
                    }
                ],
                condition: {
                    price: "",
                    star: "",
                    theme: ""
                },
                hotelList: [],
                currentPage: 1,// 当前页
                pageSize: 5, // 每页显示条目个数
                totalPages: 5,
            };

        },

        methods: {


            // 条件筛选
            handle: function (index, key) {
                // console.log(index,key)
                let vm = this
                var item = this.category[index].items;
                // console.log(index)
                switch (index) {
                    case 0: {
                        this.condition.price = item[key]
                        break;
                    }
                    case 1: {
                        this.condition.star = item[key]
                        break;

                    }
                    case 2: {
                        this.condition.theme = item[key]
                        break;
                    }

                }
                // item.filter(function (v, i) {
                //     if (i == key) {
                //         v.active = true;
                //         vm.condition.filter(function (v2, i) {
                //             if (v.name == v2.name) {
                //                 vm.condition.splice(i, 1);
                //                 vm.count--;
                //             }
                //         });
                //         vm.$set(vm.condition, vm.count++, v);
                //     }
                // });
            },
            onRemove: function (index) {

                switch (index) {
                    case 0: {
                        this.condition.price = ""
                        break;
                    }
                    case 1: {
                        this.condition.star = ""
                        break;
                    }
                    case 2: {
                        this.condition.theme = ""
                        break;
                    }
                }
            },

            // remove: function (index) {
            //     let vm = this;
            //     var item = this.category[index].items;
            //     item.filter(function (v1) {
            //         v1.active = false;
            //         vm.condition.filter(function (v2, i) {
            //             if (v1.name == v2.name) {
            //                 vm.condition.splice(i, 1);
            //                 vm.count--;
            //             }
            //         });
            //     });
            // },
            // allIn: function (index) {
            //     let vm = this
            //     var item = this.category[index].items;
            //     item.filter(function (v) {
            //         v.active = true;
            //         vm.condition.filter(function (v2, i) {
            //             if (v.name == v2.name) {
            //                 vm.condition.splice(i, 1);
            //                 vm.count--;
            //             }
            //         });
            //         vm.$set(vm.condition, vm.count++, v);
            //     });
            // },


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
                let vm = this;
                let params = new URLSearchParams();
                params.append('currentPage', this.currentPage - 1);
                params.append('pageSize', this.pageSize);
                params.append('title', this.filters.hotelName);
                if (typeof(this.condition.price.value) !== "undefined") {
                    params.append('price', this.condition.price.value);
                }
                if (typeof(this.condition.star.value) !== "undefined") {
                    params.append('star', this.condition.star.value);
                }
                if (typeof(this.condition.theme.value) !== "undefined") {
                    params.append('theme', this.condition.theme.value);
                }

                // console.log(this.this.condition[0].items.name)

                api.hotelList(params).then((res) => {
                    let code = res.data.code;
                    // console.log(res.code)

                    if (code === RestCode.SUCCESS) {
                        vm.hotelList = res.data.data.content;
                    } else if (code === RestCode.RECORD_NOT_FOUND) {
                        vm.$message.warning('很抱歉，没有找到符合您条件的酒店！');
                    } else {
                        vm.$message.warning('错误！');

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
        position: relative;
        top: -5px;
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

    .aready > span {
        margin-right: 15px;
    }

    /*酒店列表*/
    .list_content {
        /*border: 1px solid;*/
        width: 1050px;
        /*height: 1000px;*/
        margin: 5% auto;
    }

    .list_content .hotel_content {
        width: 100%;
        height: 200px;
    }

    .list_content .hotel_content .picBox {
        width: 200px;
        height: 200px;
        overflow: hidden;
        float: left;
        /*border: 1px solid;*/
    }

    .list_content .hotel_content .picBox a img {
        width: 100%;
        height: 100%;
    }

    .list_content .hotel_content h2 {
        color: #2cabc4;
        float: left;
        padding: 15px 0 10px 20px;
        margin-top: 50px;
    }

    .el-rate {
        width: 200px;
        float: left;
        position: relative;
        top: 120px;
        left: -127px;
    }

    .list_content .hotel_content .addressBox {
        position: relative;
        padding: 10px 0 0 10px;
        width: 400px;
        float: left;
        left: -340px;
        top: 140px;
        font-size: 17px;
    }

    .list_content .hotel_content .priBox {
        float: right;
        width: 120px;
        margin-top: 100px;
        color: #2cabc4;
    }

    .list_content .hotel_content .priBox .prifont {
        font-size: 30px;

    }

    .font {
        font-size: 14px;
    }

    .el-pagination {
        text-align: center;
        margin-top: 10px;
    }
</style>