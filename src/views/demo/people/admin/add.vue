<template>
  <d2-container>
    <template slot="header">添加管理员</template>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="100px"
      ref="ruleForm"
      class="demo-ruleForm"
    >
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
      <el-form-item label="用户名" prop="username">
        <el-col :span="6">
          <el-input v-model="ruleForm.username"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-col :span="6">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-col :span="6">
          <el-input
            type="password"
            v-model="ruleForm.checkPassword"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="ruleForm.role" placeholder="请选择角色">
          <el-option label="超级管理员" value="0"></el-option>
          <el-option label="实验室管理员" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="启用状态" prop="status">
        <el-select v-model="ruleForm.status" placeholder="请选择状态">
          <el-option label="启用" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头像上传" prop="avatar">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="true"
          :on-success="handleAvatarSuccess"
          :on-error="avatarError"
          :before-upload="beforeAvatarUpload"
        >
          <img
            :v-model="ruleForm.avatar"
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-col :span="6">
          <el-input v-model="ruleForm.nickname"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-col :span="6">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-col :span="6">
          <el-input v-model="ruleForm.email"></el-input>
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
  </d2-container>
</template>

<script>
export default {
  data() {
    
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPassword !== '') {
          this.$refs.ruleForm.validateField('checkPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      collegeList: [],
      imageUrl: '',
      ruleForm: {
        username: '',
        password: '',
        checkPassword: '',
        nickname: '',
        email: '',
        phone: '',
        role: 0,
        role: '',
        status: '',
        avatar: '',
        collegeId: '',
        collegeName: '',
        remark: '',
      },
      rules: {
        collegeName: [
          { required: false, message: '请输入学院名称', trigger: 'change' },
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 10 个字符', trigger: 'blur' },
        ],
        nickname: [
          { required: false, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 10 个字符', trigger: 'blur' },
        ],
        email: [{ required: false, message: '请输入邮箱', igger: 'blur' }],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
        checkPassword: [
          { required: true, validator: validatePass2, trigger: 'blur' },
        ],
        avatar: [{ required: false, message: '请输入头像', trigger: 'blur' }],
        role: [
          { required: true, message: '请选择角色', trigger: 'change' },
        ],
        status: [
          { required: true, message: '请选择账户状态', trigger: 'change' },
        ],
        phone: [
          { required: false, message: '请输入电话号码', trigger: 'blur' },
          { min: 8, max: 11, message: '联系方式不正确', trigger: 'blur' },
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
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request
            .post('/auth/insert', this.ruleForm)
            .then((response) => {
              if ((response.code = 200)) {
                this.$message.success('添加成功')
                this.$router.push('/demo/people/admin/list')
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
    //上传失败操作
    avatarError() {
      this.$message.error('上传失败')
    },
    //图片上传成功操作
    handleAvatarSuccess(res, file) {
      this.$message.success('上传成功')
      this.imageUrl = URL.createObjectURL(file.raw)
    },

    //图片验证
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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