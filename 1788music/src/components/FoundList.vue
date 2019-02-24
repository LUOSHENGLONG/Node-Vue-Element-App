<template>
    <div class="table">
        <div class="top">
            <div class="left">
                <DateSelect @switchDate='switchDate'></DateSelect>
            </div>
            <div class="right">
                <el-button type="primary" @click="AddMoney()">添加</el-button>
            </div>
        </div>
        <el-table
            ref="singleTable"
            :data="tableData"
            highlight-current-row
            :cell-style="cellStyle"
            :header-cell-style="cellStyle"
            @current-change="handleCurrentChange"
            style="width: 100%">
            <el-table-column
            type="index"
            label="序号"
            width="200%">
            </el-table-column>
            <el-table-column
            property="type"
            label="类型"
            width="200%"
            sortable>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.type }}</span>
                </template>
            </el-table-column>
            <el-table-column
            property="describe"
            label="描述"
            width="200%"
            sortable>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.describe }}</span>
                </template>
            </el-table-column>
            <el-table-column
            property="income"
            label="收入"
            width="200%"
            sortable>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.income }}</span>
                </template>
            </el-table-column>
            
            <el-table-column
            property="expend"
            label="支出"
            width="200%"
            sortable>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.expend }}</span>
                </template>
            </el-table-column>
            <el-table-column
            property="cash"
            label="资金"
            width="200%"
            sortable>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.cash }}</span>
                </template>
            </el-table-column>
            <el-table-column
            property="remark"
            label="备注"
            width="200%"
            sortable>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.remark }}</span>
                </template>
            </el-table-column>
            <el-table-column
            property="date"
            label="创建时间"
            width="200%"
            sortable>
                <template slot-scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.date | dateFormat }}</span>
                </template>
            </el-table-column>
            <el-table-column
            v-if="identity"
            fixed="right"
            label="操作"
            style="text-align: center"
            width="200%">
            <template slot-scope="scope" 
                
                >
                <el-button @click="edit(scope.row)"
                    type="text" size="small">编辑
                </el-button>
                <el-button 
                    type="text" 
                    size="small" 
                    @click="del(scope.row)"
                     >删除
                </el-button>
            </template>
            </el-table-column>

            <el-table-column
            v-if="!identity"
            fixed="right"
            label="操作"
            style="text-align: center"
            width="200%">
            <template slot-scope="scope" 
                
                >
                <el-button @click="edit(scope.row)" disabled
                    type="text" size="small">无权限
                </el-button>
                
            </template>
            </el-table-column>
            
        </el-table>
        <Dialog :form='form' :operation='operation' @updateData="getData"></Dialog>
        <!-- 分页组件 -->
        <div class="pagination">
            <Pagination 
            :paginations='paginations' 
            @handleSizeChange='handleSizeChange' 
            @currentChange='currentChange'></Pagination>
        </div>
    </div>
  
</template>
<script>
import Dialog from './Dialog.vue'
import DateSelect from './DateSelect.vue'
import Pagination from './Pagination.vue'
  export default {
    data() {
      return {
        identity: this.$store.getters.user.identity == 'manager' ? true : false,
        tableData: [],
        allTableData: [],
        form: {
            type: "",
            describe: "",
            income: "",
            expend: "",
            cash: "",
            remark: "",
            id: ""
        },
        currentRow: null,
        operation: {
            show: false,
            title: '',
            opera: 'add'
        },
        // 需要给分页组件传递的信息
        paginations: {
            page_index: 1, // 当前页
            totalCount: 0, // 总数
            page_size: 5, // 一页显示条数
            page_sizes: [5, 10, 15, 20], // 每页显示条数控制
            layout: "total, sizes, prev, pager, next, jumper"
        },
        // 时间过滤
        timeFilter: {
            startTime: 0,
            endTime: 0,
        }
      }
    },
    mounted() {
        console.log(this.identity)
        this.getData()
    },
    methods: {
        switchDate(startTime, endTime) {
            this.timeFilter.startTime = startTime
            this.timeFilter.endTime = endTime
            console.log(startTime)
            if(this.timeFilter.startTime === 0 ) {
                this.getData()
            }
            this.tableData = this.allTableData = this.allTableData.filter(item => {
                return item.date > startTime && item.date < endTime
            })
            this.paginations.totalCount = this.tableData.length
            this.setPaginations()
        },
        del(profile){
            console.log(profile._id)
            this.axios
                .post('/api/profiles/delete',{ id: profile._id})
                .then(result => {
                    const { code, msg } = result.data
                    if ( code === 0 ) {
                        this.$message.error(msg)
                    }
                    if ( code === 1 ) {
                        this.$message({
                            type: 'success',
                            message: msg
                        })
                        this.getData()
                    }
                })

        },
        handleSizeChange(size) {
            this.paginations.page_index = 1
            this.paginations.page_size = size
            this.tableData = this.allTableData.filter((item, index) => {
                return index < this.paginations.page_size
            })
            
        },
        currentChange(currentPage) {
            const start = this.paginations.page_size * (currentPage - 1)
            const end = this.paginations.page_size
            let tableData = this.allTableData.filter((item, index) => {
                return index >= start
            })
            this.tableData = tableData.filter((item, index) => {
                return index < end
            })
        },
        cellStyle() {
            return 'text-align:center'
            
        },
        setCurrent(row) {
            this.$refs.singleTable.setCurrentRow(row);
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        AddMoney() {
            this.operation = {
                show: true,
                title: "添加资金信息",
                opera: 'add'
            }
            this.form = {
                type: "",
                describe: "",
                income: "",
                expend: "",
                cash: "",
                remark: "",
                id: ""
            }
        },
        getData() {
            this.axios
                .post('/api/profiles/getData')
                .then(result => {
                    const { code, message, data} = result.data
                    if ( code === 0) {
                        this.$message.error(message)
                    }
                    if ( code === 1) {
                        
                        this.tableData = data.reverse()
                        this.allTableData = data.reverse()
                        console.log(data)
                        console.log(data.reverse())
                        
                        // 设置分页数据
                        this.setPaginations();
                        
                    }
                })
        },
        edit(profile) {
            console.log(profile)
            this.form = {
                type: profile.type,
                describe: profile.describe,
                income: profile.income,
                expend: profile.expend,
                cash: profile.cash,
                remark: profile.remark,
                id: profile._id
            }
            this.operation = {
                show: true,
                title: "编辑资金信息",
                opera: 'edit'
            }
            
        },
        setPaginations() {
            this.paginations.totalCount = this.allTableData.length
            this.paginations.page_index = 1
            this.paginations.page_size = 5
            this.tableData = this.allTableData.filter((item, index) => {
                return index < this.paginations.page_size
            })
        }
    },

    components: {
        Dialog,
        DateSelect,
        Pagination
    }
  }
</script>

<style scoped>
.table {
    
}
.top {
    height: 60px;
}
.left {
    float: left;
    margin: 10px 40px;
}
.table {
    height: 100%;
    width: 100%;
}
.right {
    float: right;
    margin-right: 40px;
    text-align: center;
    margin-top: 10px;
}
.cell {
    text-align: center;
}
.pagination {
    float: right;
    margin: 20px 60px;
}

</style>
