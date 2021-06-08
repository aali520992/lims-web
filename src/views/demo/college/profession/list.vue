<template>
  <d2-container type="card">
    <template slot="header" icon="el-icon-search" circle>数据列表</template>
    <el-form
      inline="true"
      ref="form"
      :model="this.from"
      class="demo-form-inline"
    >
      <el-form-item label="所属学院" prop="collegeName">
        <el-col :span="25">
          <el-autocomplete
            class="inline-input"
            v-model="from.collegeName"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
        </el-col>
      </el-form-item>
      <el-form-item label="专业名称" prop="name">
        <el-col :span="25">
          <el-input v-model="from.name"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSearch"
          >查询</el-button
        >
        <el-button type="primary" icon="el-icon-refresh-right" @click="onReset"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <div class="d2-mb">
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        plain
        @click="insert"
        >新增</el-button
      >
      <el-button
        type="danger"
        icon="el-icon-circle-close"
        plain
        @click="deletedata"
        >删除</el-button
      >
      <el-button type="primary" icon="el-icon-upload" plain @click="exportExcel"
        >导出 Excel</el-button
      >
    </div>
    <el-table
      v-bind="table"
      style="width: 100%"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      :row-class-name="tableRow"
      :default-sort="{ prop: 'createdDate', order: 'descending' }"
    >
      <el-table-column
        v-for="(item, index) in table.columns"
        :key="index"
        :type="item.type"
        :prop="item.prop"
        :sortable="item.sortable"
        :formatter="item.formatter"
        :label="item.label"
      >
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.row.id)"
            type="text"
            size="small"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :num="selectform.pagination.total"
      :limit="selectform.pagination.size"
      @getNew="getpage"
    ></pagination>
  </d2-container>
</template>

<script>
import pagination from '../../../demo/components/pagination/pagination.vue'
export default {
  data() {
    return {
      selectform: {
        probes: [],
        pagination: {
          current: 1,
          size: 6,
          total: 0,
        },
      },
      selectdata: {
        field: '',
        value: '',
        rule: 'EQ',
        extend: 'NONE',
        synapse: 'AND',
      },
      from: {
        collegeId: '',
        collegeName: '',
        name: '',
      },
      table: {
        columns: [
          { type: 'selection' },
          { label: 'ID', prop: 'id' },
          { label: '专业名称', prop: 'name' },
          { label: '所属学院', prop: 'collegeName' },
          {
            label: '创建时间',
            prop: 'createdDate',
            sortable: 'sortable',
          },
          { label: '简介', prop: 'synopsis' },
          { label: '备注', prop: 'remark' },
        ],
        data: [
          {
            id: '',
            name: '',
            collegeName: '',
            synopsis: '',
            remark: '',
          },
        ],
        multipleSelection: [],
      },
    }
  },
  // 组件
  components: {
    pagination,
  },
  // 页面加载
  mounted() {
    this.getCollegeList()
    this.getlist(this.selectform)

  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.collegeList
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    // 获取学院列表
    getCollegeList() {
      this.$request
        .post('/college/collegeList')
        .then((response) => {
          if ((response.code = 200)) {
            this.collegeList = response.data.data
          } else {
            this.$message.error('获取数据失败')
          }
        })
        .catch((err) => {
          console.log(err.status, err.message)
        })
    },
    // 获取分页数据
    getlist(map = {}) {
      this.$request
        .post('/profession/list', map)
        .then((response) => {
          if ((response.code = 200)) {
            this.table.data = response.data.data.records
            this.selectform.pagination.total = response.data.data.total
          } else {
            this.$message.error('获取数据失败')
          }
        })
        .catch((err) => {
          console.log(err.status, err.message)
        })
    },
    // 删除数据
    delete(map = []) {
      this.$request
        .post('/profession/delete', { ids: map })
        .then((response) => {
          if ((response.code = 200)) {
            this.$message.success("删除成功")
            // 清空当前页缓存并刷新此页面
            this.refresh()
          } else {
            this.$message.error('获取数据失败')
          }
        })
        .catch((err) => {
          console.log(err.status, err.message)
        })
    },
    // 刷新页面
    refresh() {
      this.getlist(this.selectform)
    },
    // 分页数据
    getpage(value) {
      this.selectform.pagination.current = value / 6 + 1
      this.getlist(this.selectform)
    },
    // 跳转到新增页面
    insert() {
      this.$router.push('/demo/college/profession/add')
    },
    // 导出 Excel
    exportExcel() {
      this.$export
        .excel({
          columns: this.table.columns,
          data: this.table.data,
          header: '导出 Excel',
          merges: ['A1', 'E1'],
        })
        .then(() => {
          this.$message('导出表格成功')
        })
    },
    // 删除
    deletedata() {
      if (this.table.multipleSelection.size !== 0) {
        let ids = this.table.multipleSelection.map((obj, index) => {
          return obj.id
        })
        this.$confirm('确认删除此记录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          // center: true
        })
          .then(() => {
            // 删除
            this.delete(ids)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      }
    },
    // 删除
    deleteRow(id) {
      this.delete([id])
    },

    // 查询
    onSearch() {
      if (this.from.collegeName !== '') {
        this.selectdata.field = 'college_id'
        this.selectdata.value = this.from.collegeId
        this.selectform.probes.push(this.selectdata)
      } else if (this.from.name !== '') {
        this.selectdata.field = 'name'
        this.selectdata.value = this.from.name
        this.selectform.probes.push(this.selectdata)
      } else {
        this.selectform.probes = []
      }
      this.getlist(this.selectform)
    },
    // 重置
    onReset() {
      this.from.collegeId = ''
      this.from.name = ''
      this.from.status = ''
      this.from.collegeName = ''
    },
    // 多选
    handleSelectionChange(val) {
      this.table.multipleSelection = val
    },
    // 学院选择触发
    handleSelect(item) {
      this.from.collegeId = item.id
      this.from.collegeName = item.value
    },
  },
}
</script>
<style scoped>
.body {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  font-size: 12px;
  color: #606266;
}

.blue {
  color: #409eff;
}

.red {
  color: #ff6947;
}

.panels {
  text-align: center;
}

.panels tr {
  height: 40px;
  text-align: center;
}

.panels th {
  text-align: center;
}

table {
  border: #eeeeee;
}
</style>
<style scoped>
.body {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  font-size: 12px;
  color: #606266;
}

.blue {
  color: #409eff;
}

.red {
  color: #ff6947;
}

.panels {
  text-align: center;
}

.panels tr {
  height: 40px;
  text-align: center;
}

.panels th {
  text-align: center;
}

table {
  border: #eeeeee;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
<style>
.el-table.warning-row {
  background: oldlace;
}

.el-table.success-row {
  background: #f0f9eb;
}
</style>


