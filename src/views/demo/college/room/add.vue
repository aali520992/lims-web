<template>
  <d2-container>
    <template slot="header">添加班级</template>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="100px"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item label="所属学年" prop="academicYear">
        <el-select v-model="ruleForm.academicYear" placeholder="请选择学年">
          <el-option label="2021级" value="2021级"></el-option>
          <el-option label="2022级" value="2020级"></el-option>
        </el-select>
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
      <el-form-item label="所属专业" prop="professionName">
        <el-col :span="6">
          <el-autocomplete
            class="inline-input"
            v-model="ruleForm.professionName"
            :fetch-suggestions="searchProfession"
            placeholder="请输入内容"
            @select="handleProfession"
          ></el-autocomplete>
        </el-col>
      </el-form-item>
      <el-form-item label="辅导员" prop="teacherName">
        <el-col :span="6">
          <el-autocomplete
            class="inline-input"
            v-model="ruleForm.teacherName"
            :fetch-suggestions="searchTeacher"
            placeholder="请输入内容"
            @select="handleTeacher"
          ></el-autocomplete>
        </el-col>
      </el-form-item>
      <el-form-item label="班主任" prop="classTeacherName">
        <el-col :span="6">
          <el-autocomplete
            class="inline-input"
            v-model="ruleForm.classTeacherName"
            :fetch-suggestions="searchTeacher"
            placeholder="请输入内容"
            @select="handleClassTeacher"
          ></el-autocomplete>
        </el-col>
      </el-form-item>
      <el-form-item label="班级名称" prop="name">
        <el-col :span="6">
          <el-input v-model="ruleForm.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="班级地址" prop="address">
        <el-col :span="6">
          <el-input v-model="ruleForm.address"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="班级描述" prop="introduce">
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
      professionList: [],
      teacherList: [],
      ruleForm: {
        academicYear: '',
        address: '',
        name: '',
        synopsis: '',
        remark: '',
        collegeId: '',
        collegeName: '',
        professionId: '',
        professionName: '',
        teacherId: '',
        teacherName: '',
        classTeacherId: '',
        classTeacherName: '',
      },
      rules: {
        academicYear: [
          { required: true, message: '请选择学年', trigger: 'change' },
        ],
        collegeName: [
          { required: true, message: '请选择所属学院', trigger: 'change' },
        ],
        professionName: [
          { required: true, message: '请选择所属专业', trigger: 'change' },
        ],
        teacherName: [
          { required: true, message: '请选择辅导员', trigger: 'change' },
        ],
        classTeacherName: [
          { required: true, message: '请选择班主任', trigger: 'change' },
        ],
        name: [
          { required: true, message: '请输入班级名称', trigger: 'blur' },
          { min: 2, max: 10, message: '名称不正确', trigger: 'blur' },
        ],
        address: [{ required: false, message: '请输入地址', trigger: 'blur' }],
        synopsis: [{ required: false, message: '请输入描述', trigger: 'blur' }],
        remark: [{ required: false, message: '请填填写备注', trigger: 'blur' }],
      },
    }
  },
  // 页面加载
  mounted() {
    this.getCollegelist()
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
     getProfessionlist(collegeId) {
        var url='/profession/professionList/'+collegeId
      this.$request
        .post(url)
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
    getTeacherlist(collegeId) {
      var url='/teacher/teacherList/'+collegeId
      this.$request
        .post(url)
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
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request
            .post('/room/insert', this.ruleForm)
            .then((response) => {
              if ((response.code = 200)) {
                this.$message.success('添加成功')
                this.$router.push('/demo/college/room/list')
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
      this.getTeacherlist(item.id)
      this.getProfessionlist(item.id)
    },
    handleProfession(item) {
      this.ruleForm.professionId = item.id
      this.ruleForm.professionName = item.value
    },
    handleTeacher(item) {
      this.ruleForm.teacherId = item.id
      this.ruleForm.teacherName = item.value
    },
    handleClassTeacher(item) {
      this.ruleForm.classTeacherId = item.id
      this.ruleForm.classTeacherName = item.value
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