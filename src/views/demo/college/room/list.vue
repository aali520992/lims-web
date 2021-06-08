<template>
  <d2-container type="card">
    <template slot="header" icon="el-icon-search" circle>数据列表</template>
    <el-form
      inline="true"
      ref="form"
      :model="this.from"
      class="demo-form-inline"
    >
      <el-form-item label="学年" prop="academicYear">
        <el-col :span="20">
          <div>
            <el-select v-model="from.academicYear">
              <el-option label="2021级" value="2021级"></el-option>
              <el-option label="2022级" value="2022级"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-form-item>

      <el-form-item label="所属学院" prop="collegeName">
        <el-col :span="20">
          <el-autocomplete
            class="inline-input"
            v-model="from.collegeName"
            :fetch-suggestions="searchCollege"
            placeholder="请输入内容"
            @select="handleCollege"
          ></el-autocomplete>
        </el-col>
      </el-form-item>
      <el-form-item label="所属专业" prop="professionName">
        <el-col :span="20">
          <el-autocomplete
            class="inline-input"
            v-model="from.professionName"
            :fetch-suggestions="searchProfession"
            placeholder="请输入内容"
            @select="handleProfession"
          ></el-autocomplete>
        </el-col>
      </el-form-item>
      <el-form-item label="辅导员" prop="teacherName">
        <el-col :span="20">
          <el-autocomplete
            class="inline-input"
            v-model="from.teacherName"
            :fetch-suggestions="searchTeacher"
            placeholder="请输入内容"
            @select="handleTeacher"
          ></el-autocomplete>
        </el-col>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-col :span="20">
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
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="年级">
              <span>{{ props.row.academicYear }}</span>
            </el-form-item>
            <el-form-item label="用户名">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="班级名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="班级简介">
              <span>{{ props.row.synopsis }}</span>
            </el-form-item>
            <el-form-item label="班级地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="学院名称">
              <span>{{ props.row.collegeName }}</span>
            </el-form-item>
            <el-form-item label="专业名称">
              <span>{{ props.row.professionName }}</span>
            </el-form-item>
            <el-form-item label="辅导员名称">
              <span>{{ props.row.teacherName }}</span>
            </el-form-item>
            <el-form-item label="班主任名称">
              <span>{{ props.row.classTeacherName }}</span>
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
import pagination from '../../../demo/components/pagination/pagination.vue'
export default {
  data() {
    return {
      collegeList: [],
      professionList: [],
      teacherList: [],
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
        name: '',
        academicYear: '',
        collegeId: '',
        collegeName: '',
        professionId: '',
        professionName: '',
        teacherId: '',
        teacherName: '',
      },
      table: {
        columns: [
          { type: 'selection' },
          { label: '班级名称', prop: 'name' },
          { label: '学年', prop: 'academicYear' },
          { label: '所属学院', prop: 'collegeName' },
          { label: '所属专业', prop: 'professionName' },
          { label: '辅导员', prop: 'teacherName' },
          {
            label: '创建时间',
            prop: 'createdDate',
            sortable: 'sortable',
          },
          { label: '备注', prop: 'remark' },
        ],
        data: [],
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
    this.getlist(this.selectform)
    this.getCollegelist()
    this.getTeacherlist()
    this.getProfessionlist()
  },
  methods: {
    //获取学院查询
    searchCollege(queryString, cb) {
      var restaurants = this.collegeList
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
    //获取专业查询
    searchProfession(queryString, cb) {
      var restaurants = this.professionList
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
    //获取教师查询
    searchTeacher(queryString, cb) {
      var restaurants = this.teacherList
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
    // 获取学院列表
    getCollegelist() {
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
    getProfessionlist() {
      this.$request
        .post('/profession/professionList')
        .then((response) => {
          if ((response.code = 200)) {
            this.professionList = response.data.data
          } else {
            this.$message.error('获取数据失败')
          }
        })
        .catch((err) => {
          console.log(err.status, err.message)
        })
    },
    // 获取教师列表
    getTeacherlist() {
      this.$request
        .post('/teacher/teacherList')
        .then((response) => {
          if ((response.code = 200)) {
            this.teacherList = response.data.data
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
        .post('/room/list', map)
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
        .post('/college/delete', { ids: map })
        .then((response) => {
          if ((response.code = 200)) {
            this.$message.success('删除成功')
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
      this.$router.push('/demo/college/room/add')
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

    // 修改状态
    updateStatus(row) {
      var status = 0
      if (row.status) {
        row.status = false
        status = 1
      } else {
        row.status = true
      }
      this.$request
        .post('/student/update', {
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
    // 查询
    onSearch() {
      if (this.from.academicYear !== '') {
        this.selectdata.field = 'academic_year'
        this.selectdata.value = this.from.academicYear
        this.selectform.probes.push(this.selectdata)
      } else if (this.from.name !== '') {
        this.selectdata.field = 'name'
        this.selectdata.value = this.from.name
        this.selectform.probes.push(this.selectdata)
      } else if (this.from.collegeName !== '') {
        this.selectdata.field = 'college_id'
        this.selectdata.value = this.from.collegeId
        this.selectform.probes.push(this.selectdata)
      } else if (this.from.professionName !== '') {
        this.selectdata.field = 'profession_id'
        this.selectdata.value = this.from.professionId
        this.selectform.probes.push(this.selectdata)
      } else if (this.from.teacherName !== '') {
        this.selectdata.field = 'teacher_id'
        this.selectdata.value = this.from.teacherId
        this.selectform.probes.push(this.selectdata)
      } else {
        this.selectform.probes = []
      }
      this.getlist(this.selectform)
    },
    // 重置
    onReset() {
      this.from.academicYear = ''
      this.from.name = ''
      this.from.collegeId = ''
      this.from.collegeName = ''
      this.from.professionId = ''
      this.from.professionName = ''
      this.from.teacherId = ''
      this.from.teacherName = ''
    },
    // 多选
    handleSelectionChange(val) {
      this.table.multipleSelection = val
    },
    handleCollege(item) {
      this.from.collegeId = item.id
      this.from.collegeName = item.value
    },
    handleProfession(item) {
      this.from.professionId = item.id
      this.from.professionName = item.value
    },
    handleTeacher(item) {
      this.from.teacherId = item.id
      this.from.teacherName = item.value
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


