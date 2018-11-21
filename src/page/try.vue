<template>
    <el-container>
        <el-header>
            <el-row>
                <el-button type="info">登录</el-button>
                <el-button type="success">注册</el-button>
            </el-row>
        </el-header>
        <el-main>

            <div class="select">
                <el-form ref="form" :model="form" label-width="60px" label-position="left">
                    <el-form-item label="酒店名">
                        <el-input v-model="form.name"></el-input>
                        <el-form-item>
                            <el-button class="searchBtn" type="primary" @click="search">搜索</el-button>
                        </el-form-item>
                    </el-form-item>
                </el-form>
                <div class="choose">
                    <div v-if="category.length">
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
                    <div v-if='condition.length'>
                        <span>已选条件：</span>
                        <span v-for='(item,index) in condition' class='active'>{{item.name}}> | </span>
                    </div>
                </div>
            </div>
        </el-main>
    </el-container>
</template>
<script>
    /* eslint-disable no-console */

    export default {
        name: 'Setting',
        data() {
            return {
                count: 0,
                form: {
                    name: '',
                },
                category: [
                    {
                        name: '品牌',
                        items: [
                            {
                                name: '联想',
                                active: false
                            },
                            {
                                name: '小米',
                                active: false
                            },
                            {
                                name: '苹果',
                                active: false
                            },
                            {
                                name: '东芝',
                                active: false
                            }
                        ]
                    },
                    {
                        name: 'CPU',
                        items: [
                            {
                                name: 'intel i7 8700K',
                                active: false
                            },
                            {
                                name: 'intel i7 7700K',
                                active: false
                            },
                            {
                                name: 'intel i9 9270K',
                                active: false
                            },
                            {
                                name: 'intel i7 8700',
                                active: false
                            },
                            {
                                name: 'AMD 1600X',
                                active: false

                            }
                        ]
                    },
                    {
                        name: '内存',
                        items: [
                            {
                                name: '七彩虹8G',
                                active: false
                            },
                            {
                                name: '七彩虹16G',
                                active: false
                            },
                            {
                                name: '金士顿8G',
                                active: false
                            },
                            {
                                name: '金士顿16G',
                                active: false
                            }
                        ]
                    },
                    {
                        name: '显卡',
                        items: [
                            {
                                name: 'NVIDIA 1060 8G',
                                active: false
                            },
                            {
                                name: 'NVIDIA 1080Ti 16G',
                                active: false
                            },
                            {
                                name: 'NVIDIA 1080 8G',
                                active: false
                            },
                            {
                                name: 'NVIDIA 1060Ti 16G',
                                active: false
                            }
                        ]
                    }
                ],
                condition: [],
            };
        },

        methods: {
            search(value) {
                console.log(this.form.name)
            },
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
            remove: function (index) {
                var item = this.category[index].items;
                item.filter(function (v1, key) {
                    v1.active = false;
                    this.condition.filter(function (v2, i) {
                        if (v1.name == v2.name) {
                            this.condition.splice(i, 1);
                            this.count--;
                        }
                    });
                });
            }
            ,
            allIn: function (index) {
                var item = this.category[index].items;
                item.filter(function (v, key) {
                    v.active = true;
                    this.condition.filter(function (v2, i) {
                        if (v.name == v2.name) {
                            this.condition.splice(i, 1);
                            this.count--;
                        }
                    });
                    this.$set(this.condition, this.count++, v);
                });
            }
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
        background-color: white;
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

</style>


