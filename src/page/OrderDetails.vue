<template>
    <div class="portlet">
        <div class="portlet-title">
            <div class="caption">
                预定记录
            </div>
        </div>
        <!--表格-->
        <div class="table-body">
            <!--表格-->
            <el-table
                    :data="reserveTable"
                    style="width: 100%">
                <el-table-column
                        align="center"
                        prop="id"
                        label="编号"
                        width="140">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="roomCategory"
                        label="房间规格"
                        width="220">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="roomNumber"
                        label="房间号"
                        width="200">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="checkinData"
                        label="预定入住日期">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="data"
                        label="订单提交日期">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="status"
                        label="状态"
                        width="200">
                </el-table-column>
            </el-table>

            <el-pagination
                    layout="prev, pager, next"
                    :total="50">
            </el-pagination>
        </div>


    </div>
</template>

<script>
    export default {
        name: "OrderDetails",
        data() {
            return {
                reserveTable: [],
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

    .table-body {
        margin: 10px 0;
    }
    .el-pagination{
        margin-top: 10px;
        padding-top: 10px;
        text-align: center;
    }
</style>
