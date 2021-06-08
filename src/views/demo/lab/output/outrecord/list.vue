<template>
  <d2-container type="card">
    <template slot="header" icon="el-icon-search" circle>数据列表</template>
    <el-form
      inline="true"
      ref="form"
      :model="this.from"
      class="demo-form-inline"
    >
      <el-form-item label="所属实验室" prop="labName">
        <el-col :span="25">
          <el-autocomplete
            class="inline-input"
            v-model="from.labName"
            :fetch-suggestions="searchLab"
            placeholder="请输入内容"
            @select="handleLab"
          ></el-autocomplete>
        </el-col>
      </el-form-item>

      <el-form-item label="设备名称" prop="equipmentName">
        <el-col :span="25">
          <el-autocomplete
            class="inline-input"
            v-model="from.equipmentName"
            :fetch-suggestions="searchEquipment"
            placeholder="请输入内容"
            @select="handleEquipment"
          ></el-autocomplete>
        </el-col>
      </el-form-item>
      <el-form-item label="理由:">
        <el-col :span="25">
          <el-input v-model="from.reason"></el-input>
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
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="设备型号">
              <span>{{ props.row.type }}</span>
            </el-form-item>
            <el-form-item label="实验室名称">
              <span>{{ props.row.labName }}</span>
            </el-form-item>
            <el-form-item label="设备名称">
              <span>{{ props.row.equipmentName }}</span>
            </el-form-item>
            <el-form-item label="变化值">
              <span>{{ props.row.balance }}</span>
            </el-form-item>
            <el-form-item label="原因">
              <span>{{ props.row.reason }}</span>
            </el-form-item>
            <el-form-item label="库存">
              <span>{{ props.row.number }}</span>
            </el-form-item>
            <el-form-item label="总价格">
              <span>{{ props.row.sumPrice }}</span>
            </el-form-item>
            <el-form-item label="单价">
              <span>{{ props.row.unitPrice }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
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
import pagination from '../../../../demo/components/pagination/pagination.vue'
export default {
  data() {
    return {
      labList: [],
      equipmentList: [],
      selectform: {
        probes: [],
        pagination: {
          current: 1,
          size: 6,
          total: 0,
        },
        probes: [
          {
            field: 'type',
            value: '1',
            rule: 'EQ',
            extend: 'NONE',
            synapse: 'AND',
          },
        ],
      },
      selectdata: {
        field: '',
        value: '',
        rule: 'EQ',
        extend: 'NONE',
        synapse: 'AND',
      },
      from: {
        labId: '',
        labName: '',
        equipmentId: '',
        equipmentName: '',
        reason: '',
      },
      table: {
        columns: [
          { type: 'selection' },
          { label: 'ID', prop: 'id' },

          { label: '设备名称', prop: 'equipmentName' },
          { label: '实验室名称', prop: 'labName' },
          { label: '库存', prop: 'number' },
          { label: '变化值', prop: 'balance' },
          {
            label: '创建时间',
            prop: 'createdDate',
            sortable: 'sortable',
          },
          { label: '理由', prop: 'reason' },
        ],
        data: [
          {
            id: '',
            creatorId: '',
            updaterId: '',
            type: '',
            reason: '',
            number: '',
            balance: '',
            equipmentId: '',
            equipmentName: '',
            labId: '',
            labName: '',
            reason: '',
            remark: '',
            createdDate: '',
            updatedDate: '',
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
    this.getlabList()
    this.getEquipmentRecordList(this.selectform)
    this.getNew(0)
  },
  methods: {
    //获取实验室
    searchLab(queryString, cb) {
      var restaurants = this.labList
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
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
    //获取设备
    searchEquipment(queryString, cb) {
      var restaurants = this.equipmentList
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },

    // 获取实验室列表
    getlabList() {
      this.$request
        .get('/lab/labList')
        .then((response) => {
          if ((response.code = 200)) {
            this.labList = response.data.data
          } else {
            this.$message.error('获取数据失败')
          }
        })
        .catch((err) => {
          console.log(err.status, err.message)
        })
    },
    // 获取设备列表
    getEquipmentlist(labId) {
      var url = '/equipment/equipmentList/' + labId
      this.$request
        .post(url)
        .then((response) => {
          if ((response.code = 200)) {
            this.equipmentList = response.data.data
          } else {
            this.$message.error('获取数据失败')
          }
        })
        .catch((err) => {
          console.log(err.status, err.message)
        })
    },
    // 获取分页数据
    getEquipmentRecordList(map = {}) {
      this.$request
        .post('/equipmentRecord/selectList', map)
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
        .post('/equipmentRecord/delete', { ids: map })
        .then((response) => {
          if ((response.code = 200)) {
            this.$message({
              message: '删除成功',
              type: 'success',
            })
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
      this.getEquipmentRecordList(this.selectform)
    },
    // 分页数据
    getpage(value) {
      this.selectform.pagination.current = value / 6 + 1
      this.getEquipmentRecordList(this.selectform)
    },
    // 跳转到新增页面
    insert() {
      this.$router.push('/demo/lab/consumable/add')
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
      this.selectform.probes = [
        {
          field: 'type',
          value: '1',
          rule: 'EQ',
          extend: 'NONE',
          synapse: 'AND',
        },
      ]
      if (this.from.name !== '') {
        this.selectdata.field = 'name'
        this.selectdata.value = this.from.name
        this.selectform.probes.push(this.selectdata)
      } else if (this.from.labId !== '') {
        this.selectdata.field = 'lab_id'
        this.selectdata.value = this.from.labId
        this.selectform.probes.push(this.selectdata)
      } else if (this.from.labName !== '') {
        this.selectdata.field = 'lab_name'
        this.selectdata.value = this.from.labName
        this.selectform.probes.push(this.selectdata)
      } else if (this.from.status !== '') {
        this.selectdata.field = 'status'
        this.selectdata.value = this.from.status
        this.selectform.probes.push(this.selectdata)
      }
      this.getEquipmentRecordList(this.selectform)
    },
    // 重置
    onReset() {
      this.from.isreason = ''
      this.from.number = ''
      this.from.labId = ''
      this.from.labName = ''
      this.from.equipmentId = ''
      this.from.equipmentName = ''
    },
    // 修改状态
    updateStatus(row) {
      var status = 0
      if (row.status === 0) {
        status = 1
      } else {
        status = 0
      }
      this.$request
        .post('/equipmentRecord/update', {
          id: row.id,
          status: status,
        })
        .then((response) => {
          if ((response.code = 200)) {
            // 清空当前页缓存并刷新此页面
            this.refresh()
            this.$message({
              message: '修改成功',
              type: 'success',
            })
          } else {
            this.$message.error('获取数据失败')
          }
        })
        .catch((err) => {
          console.log(err.status, err.message)
        })
    },

    handleLab(item) {
      this.from.labId = item.id
      this.from.labName = item.value
      this.getEquipmentlist(item.id)
    },
    handleEquipment(item) {
      this.from.equipmentId = item.id
      this.from.equipmentName = item.value
    },
    // 多选
    handleSelectionChange(val) {
      this.table.multipleSelection = val
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


