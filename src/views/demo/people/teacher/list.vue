<template>
  <d2-container type="card">
    <template slot="header" icon="el-icon-search" circle>数据列表</template>
    <el-form
      inline="true"
      ref="form"
      :model="this.from"
      class="demo-form-inline"
    >
      <el-form-item label="所属学院">
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
      <el-form-item label="用户名:">
        <el-col :span="25">
          <el-input v-model="from.username"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="启用状态:">
        <el-col :span="25">
          <div>
            <el-select v-model="from.status">
              <el-option label="启用" value="0"></el-option>
              <el-option label="禁用" value="1"></el-option>
            </el-select>
          </div>
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
            <el-form-item label="头像">
              <span>{{ props.row.avatar }}</span>
            </el-form-item>
            <el-form-item label="工号:">
              <span>{{ props.row.jobNum }}</span>
            </el-form-item>
            <el-form-item label="姓名:">
              <span>{{ props.row.compellation }}</span>
            </el-form-item>
            <el-form-item label="身份证号码:">
              <span>{{ props.row.idNum }}</span>
            </el-form-item>
            <el-form-item label="详细居住地址:">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="登录名">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="密码">
              <el-col :span="15">
                <el-input
                  type="password"
                  v-model="props.row.password"
                  autocomplete="off"
                ></el-input>
              </el-col>
              <div class="d2-mb">
                <el-button type="primary" @click="updatePassword(props.row.id)"
                  >重置</el-button
                >
              </div>
            </el-form-item>
            <el-form-item label="状态:">
              <span>{{ props.row.status }}</span>
            </el-form-item>
            <el-form-item label="昵称:">
              <span>{{ props.row.nickname }}</span>
            </el-form-item>
            <el-form-item label="邮箱:">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item label="联系电话:">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="生日:">
              <span>{{ props.row.birthday }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.gender }}</span>
            </el-form-item>
            <el-form-item label="籍贯:">
              <span>{{ props.row.nativePlace }}</span>
            </el-form-item>
            <el-form-item label="职称:">
              <span>{{ props.row.jobTitle }}</span>
            </el-form-item>
            <el-form-item label="名族:">
              <span>{{ props.row.ethnic }}</span>
            </el-form-item>
            <el-form-item label="联系人:">
              <span>{{ props.row.linkman }}</span>
            </el-form-item>
            <el-form-item label="联系人电话:">
              <span>{{ props.row.linkmanPhone }}</span>
            </el-form-item>
            <el-form-item label="课时费:">
              <span>{{ props.row.classFee }}</span>
            </el-form-item>
            <el-form-item label="所教科目:">
              <span>{{ props.row.literaryCourse }}</span>
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
      <el-table-column label="启用状态" width="120">
        <template slot-scope="prop">
          <el-switch
            v-model="prop.row.type"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="updateStatus(prop.row)"
          ></el-switch>
        </template>
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
      selectform: {
        probes: [],
        pagination: {
          current: 1,
          size: 6,
          total: 0,
        },
        probes: [
          {
            field: 'role',
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
        username: '',
        collegeId: '',
        collegeName: '',
        status: '',
      },
      table: {
        columns: [
          { type: 'selection' },
          { label: '工号', prop: 'jobNum' },
          { label: '所属学院', prop: 'collegeName' },
          { label: '姓名', prop: 'compellation' },
          {
            label: '创建时间',
            prop: 'createdDate',
            i: '<i class="el-icon-time"></i>',
            sortable: 'sortable',
          },
          { label: '所教科目', prop: 'literaryCourse' },
        ],
        data: [
          {
            creatorId: '',
            updaterId: '',
            jobNum: '',
            idNum: '',
            politicsStatus: '',
            maritalStatus: '',
            compellation: '',
            ethnic: '',
            role:'',
            linkman: '',
            linkmanPhone: '',
            education: '',
            jobTitle: '',
            classFee: '',
            literaryCourse: '',
            nativePlace: '',
            avatar: '',
            status: '',
            nickname: '',
            username: '',
            password: '',
            checkPassword: '',
            phone: '',
            email: '',
            birthday: '',
            gender: '',
            collegeId: '',
            collegeName: '',
            address: '',
            remark: '',
            id: '',
            type: '',
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
    this.getCollegeList()
    this.getlist(this.selectform)
    this.getNew(0)
  },
  methods: {
    tableRow({ rowIndex }) {
      if (rowIndex == 1) {
        return 'warning-row'
      } else if (rowIndex == 3) {
        return 'success-row'
      }
      return ''
    },
    // 获取分页数据
    getlist(map = {}) {
      this.$request
        .post('/user/list', map)
        .then((response) => {
          if ((response.code = 200)) {
            this.table.data = response.data.data.records
            this.selectform.pagination.total = response.data.data.total
             for (var i = 0; i < this.table.data.length; i++) {
              if (this.table.data[i].role == 0) {
                this.table.data[i].roleValue = '超级管理员'
              } else {
                this.table.data[i].roleValue = '管理员'
              }
              if (this.table.data[i].status == 0) {
                this.table.data[i].type = true
              } else {
                this.table.data[i].type = false
              }
            }
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
        .post('/user/delete', { ids: map })
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
      this.getlist(this.selectform)
    },
    // 分页数据
    getpage(value) {
      this.selectform.pagination.current = value / 6 + 1
      this.getlist(this.selectform)
    },
    // 跳转到新增页面
    insert() {
      this.$router.push('/demo/people/teacher/add')
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
      if (this.table.multipleSelection.size != 0) {
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
          field: 'role',
          value: '1',
          rule: 'EQ',
          extend: 'NONE',
          synapse: 'AND',
        },
      ]
      if (this.from.username != '') {
        this.selectdata.field = 'username'
        this.selectdata.value = this.from.username
        this.selectform.probes.push(this.selectdata)
      } else if (this.from.collegeId != '') {
        this.selectdata.field = 'college_id'
        this.selectdata.value = this.from.collegeId
        this.selectform.probes.push(this.selectdata)
      } else if (this.from.status != '') {
        this.selectdata.field = 'status'
        this.selectdata.value = this.from.status
        this.selectform.probes.push(this.selectdata)
      } else {
        this.selectform.probes = []
      }
      this.getlist(this.selectform)
    },
    // 重置
    onReset() {
      this.from.username = ''
      this.from.collegeName = ''
      this.from.collegeId = ''
      this.from.status = ''
    },
    // 重置密码
    updatePassword(id) {
      this.$request
        .post('/user/update', { id: id })
        .then((response) => {
          if ((response.code = 200)) {
            this.$message({
              message: '重置密码成功密码为password',
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
    // 修改状态
    updateStatus(row) {
      console.log(row.status)
      var status = 0
      if (row.status == 0) {
        status = 1
      } else {
        status = 0
      }
      this.$request
        .post('/user/update', {
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
    // 多选
    handleSelectionChange(val) {
      this.table.multipleSelection = val
    },
    querySearch(queryString, cb) {
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


