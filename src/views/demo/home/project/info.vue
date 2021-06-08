<template>
  <d2-container>
    <template slot="header">添加实验室</template>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="100px"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item label="实验室名称" prop="name">
        <el-col :span="6">
          <el-input v-model="ruleForm.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="ruleForm.status" placeholder="请选择状态">
          <el-option label="开放" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="实验室地址" prop="name">
        <el-col :span="6">
          <el-input v-model="ruleForm.address"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="所属学院" prop="collegeName">
        <el-col :span="6">
          <el-autocomplete
            class="inline-input"
            v-model="ruleForm.collegeName"
            :fetch-suggestions="searchCollege"
            placeholder="请输入内容"
            @select="handleCollege"
          ></el-autocomplete>
        </el-col>
      </el-form-item>
      <el-form-item label="管理员" prop="collegeName">
        <el-col :span="6">
          <el-autocomplete
            class="inline-input"
            v-model="ruleForm.adminName"
            :fetch-suggestions="searchAdmin"
            placeholder="请输入内容"
            @select="handleAdmin"
          ></el-autocomplete>
        </el-col>
      </el-form-item>
      <el-form-item label="实验室描述" prop="introduce">
        <el-col :span="6">
          <el-input v-model="ruleForm.introduce"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="备注" prop="remark">
        <el-col :span="8">
          <el-input type="textarea" v-model="ruleForm.remark"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <template slot="footer"></template>
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      collegeList: [],
      adminList: [],
      ruleForm: {
        name: '',
        status: '',
        address: '',
        introduce: '',
        remark: '',
        collegeId: '',
        collegeName: '',
        adminId: '',
        adminName: '',
      },
      rules: {
        collegeName: [
          { required: false, message: '请选择所属学院', trigger: 'change' },
        ],
        name: [
          { required: true, message: '请输入实验室名称', trigger: 'blur' },
          { min: 2, max: 10, message: '名称不正确', trigger: 'blur' },
        ],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        introduce: [
          { required: false, message: '请输入描述', trigger: 'blur' },
        ],
        remark: [
          { required: false, message: '请填写活动形式', trigger: 'blur' },
        ],
      },
    }
  },
  // 页面加载
  mounted() {
    this.getCollegeList()
  },
  methods: {
    //学院查询
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
    // 管理员查询
    searchAdmin(queryString, cb) {
      var restaurants = this.adminList
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
    // 根据学院获取管理员列表
    getAdminList(collegeId) {
      this.$request
        .post('/user/adminList/' + collegeId)
        .then((response) => {
          if ((response.code = 200)) {
            this.adminList = response.data.data
          } else {
            this.$message.error('获取数据失败')
          }
        })
        .catch((err) => {
          console.log(err.status, err.message)
        })
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request
            .post('/lab/insert', this.ruleForm)
            .then((response) => {
              if ((response.code = 200)) {
                this.$message.success('添加成功')
                this.$router.push('/demo/lab/classroom/list')
              } else {
                this.$message.error('添加失败')
              }
            })
            .catch((err) => {
              console.log(err.status, err.message)
            })
        } else {
          this.$message.error('验证失败')
          return false
        }
      })
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    handleCollege(item) {
      this.ruleForm.collegeId = item.id
      this.ruleForm.collegeName = item.value
      this.getAdminList(item.id)
    },
    handleAdmin(item) {
      this.ruleForm.adminId = item.id
      this.ruleForm.adminName = item.value
    },
  },
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>