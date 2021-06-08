<template>
  <d2-container>
    <template slot="header">添加学院</template>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="100px"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item label="学院名称" prop="name">
        <el-col :span="6">
          <el-input v-model="ruleForm.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="学院状态" prop="status">
        <el-select v-model="ruleForm.status" placeholder="请选择状态">
          <el-option label="启用" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属学院" prop="collegeName">
        <el-col :span="6">
          <el-autocomplete
            class="inline-input"
            v-model="ruleForm.collegeName"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
        </el-col>
      </el-form-item>
      <el-form-item label="学院简介" prop="synopsis">
        <el-col :span="6">
          <el-input type="textarea" v-model="ruleForm.synopsis"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-col :span="10">
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
      ruleForm: {
        name: '',
        collegeName: '',
        collegeId: '',
        status: '',
        synopsis: '',
        remark: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入学院名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15个字符', trigger: 'blur' },
        ],
        collegeName: [
          { required: false, message: '请选择上级学院名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15个字符', trigger: 'blur' },
        ],
        status: [{ required: true, message: '请选择角色', trigger: 'change' }],
        synopsis: [
          { required: false, message: '请输入简介', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15个字符', trigger: 'blur' },
        ],
        remark: [
          { required: false, message: '请输入备注', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15个字符', trigger: 'blur' },
        ],
      },
    }
  },
  // 页面加载
  mounted() {
    this.getCollegeList()
  },
  methods: {
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
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request
            .post('/college/insert', this.ruleForm)
            .then((response) => {
              if ((response.code = 200)) {
                this.$message.success('添加成功')
                this.$router.push('/demo/college/college/list')
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
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleSelect(item) {
      this.ruleForm.collegeId = item.id
      this.ruleForm.collegeName = item.value
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