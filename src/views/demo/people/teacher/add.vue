<template>
  <d2-container>
    <template slot="header">添加教师</template>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      ref="ruleForm"
      class="demo-ruleForm"
    >
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

      <el-form-item label="账户状态" prop="status">
        <el-select v-model="ruleForm.status" placeholder="请选择状态">
          <el-option label="启用" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号" prop="idNum">
        <el-col :span="6">
          <el-input v-model="ruleForm.idNum"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="姓名" prop="compellation">
        <el-col :span="6">
          <el-input v-model="ruleForm.compellation"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="工号" prop="jobNum">
        <el-col :span="6">
          <el-input v-model="ruleForm.jobNum"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="所教科目" prop="literaryCourse">
        <el-col :span="6">
          <el-input v-model="ruleForm.literaryCourse"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="居住详细地址" prop="address">
        <el-col :span="6">
          <el-input v-model="ruleForm.address"></el-input>
        </el-col>
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
      <el-form-item label="政治面貌" prop="politicsStatus">
        <el-col :span="6">
          <el-input v-model="ruleForm.politicsStatus"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="籍贯" prop="nativePlace">
        <el-col :span="6">
          <el-input v-model="ruleForm.nativePlace"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="婚姻状况" prop="maritalStatus">
        <el-col :span="6">
          <el-input v-model="ruleForm.maritalStatus"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="名族" prop="ethnic">
        <el-col :span="6">
          <el-input v-model="ruleForm.ethnic"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="生日" prop="linkman">
        <el-col :span="6">
          <el-input v-model="ruleForm.birthday"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="联系人" prop="linkman">
        <el-col :span="6">
          <el-input v-model="ruleForm.linkman"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="联系人电话" prop="linkmanPhone">
        <el-col :span="6">
          <el-input v-model="ruleForm.linkmanPhone"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="学历" prop="education">
        <el-col :span="6">
          <el-input v-model="ruleForm.education"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="职称" prop="jobTitle">
        <el-col :span="6">
          <el-input v-model="ruleForm.jobTitle"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="课时费" prop="classFee">
        <el-col :span="6">
          <el-input v-model="ruleForm.classFee"></el-input>
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
    var validateBirthday = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入身份证'))
      } else if (this.isIDCard(value)) {
        this.ruleForm.birthday = this.getBirthdayFromIdCard(value)
        callback()
      } else {
        callback(new Error('身份证不正确!'))
      }
    }

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
      professionList: [],
      imageUrl: '',
      ruleForm: {
        jobNum: '',
        idNum: '',
        politicsStatus: '',
        maritalStatus: '',
        compellation: '',
        ethnic: '',
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
        role: 1,
        password: '',
        checkPassword: '',
        professionId: '',
        professionName: '',
        phone: '',
        email: '',
        birthday: '',
        gender: '',
        collegeId: '',
        collegeName: '',
        address: '',
        remark: '',
      },
      rules: {
        collegeName: [
          { required: true, message: '请选择所属学院', trigger: 'change' },
        ],
        professionName: [
          { required: true, message: '请选择所属专业', trigger: 'change' },
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 2 到 15 个字符', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请输入居住地址', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 2 到 15 个字符', trigger: 'blur' },
        ],
        nickname: [
          { required: false, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 2 到 15 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
        compellation: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        checkPassword: [
          { required: true, validator: validatePass2, trigger: 'blur' },
        ],
        jobNum: [{ required: true, message: '请输入工号', trigger: 'blur' }],
        idNum: [
          { required: true, validator: validateBirthday, trigger: 'blur' },
        ],
        politicsStatus: [
          { required: false, message: '请输入政治面貌', trigger: 'blur' },
        ],
        maritalStatus: [
          { required: false, message: '请输入婚姻状况', trigger: 'blur' },
        ],

        ethnic: [{ required: false, message: '请输入名族', trigger: 'blur' }],
        linkman: [
          { required: false, message: '请输入联系人', trigger: 'blur' },
        ],
        linkmanPhone: [
          { required: false, message: '请输入联系人电话', trigger: 'blur' },
        ],
        education: [
          { required: false, message: '请输入学历', trigger: 'blur' },
        ],
        jobTitle: [{ required: false, message: '请输入职称', trigger: 'blur' }],
        classFee: [
          { required: false, message: '请输入课时费', trigger: 'blur' },
        ],
        literaryCourse: [
          { required: true, message: '请输入所教科目', trigger: 'blur' },
        ],
        nativePlace: [
          { required: false, message: '请输入籍贯', trigger: 'blur' },
        ],
        avatar: [{ required: false, message: '请选择头像', trigger: 'blur' }],
        status: [
          { required: true, message: '请选择账户状态', trigger: 'change' },
        ],
        phone: [
          { required: false, message: '请输入电话号码', trigger: 'blur' },
          { min: 8, max: 11, message: '联系方式不正确', trigger: 'blur' },
        ],
        remark: [{ required: false, message: '请填写备注', trigger: 'blur' }],
      },
    }
  },
  // 页面加载
  mounted() {
    this.getCollegeList()
  },
  methods: {
    isIDCard(idcard) {
      var iSum = 0
      //var info="";
      var sId = idcard

      var aCity = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外',
      }

      if (!/^\d{17}(\d|x)$/i.test(sId)) {
        return false
      }
      sId = sId.replace(/x$/i, 'a')
      //非法地区
      if (aCity[parseInt(sId.substr(0, 2))] == null) {
        return false
      }
      var sBirthday =
        sId.substr(6, 4) +
        '-' +
        Number(sId.substr(10, 2)) +
        '-' +
        Number(sId.substr(12, 2))

      var d = new Date(sBirthday.replace(/-/g, '/'))

      //非法生日
      if (
        sBirthday !=
        d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      ) {
        return false
      }
      for (var i = 17; i >= 0; i--) {
        iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11)
      }
      if (iSum % 11 != 1) {
        return false
      }
      return true
    },

    /**
     * 根据身份证号获取生日
     * @param idCard
     */
    getBirthdayFromIdCard(idCard) {
      var birthday = ''
      if (idCard != null && idCard != '') {
        if (idCard.length == 15) {
          birthday = '19' + idCard.substr(6, 6)
        } else if (idCard.length == 18) {
          birthday = idCard.substr(6, 8)
        }

        birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-')
      }
      return birthday
    },
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
    getProfessionlist(collegeId) {
      var url =
        '/profession/professionList/' + collegeId
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
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request
            .post('/auth/insert', this.ruleForm)
            .then((response) => {
              if ((response.code = 200)) {
                this.$message.success('添加成功')
                this.$router.push('/demo/people/teacher/list')
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

    handleCollege(item) {
      this.ruleForm.collegeId = item.id
      this.ruleForm.collegeName = item.value
      this.getProfessionlist(item.id)
    },
    handleProfession(item) {
      this.ruleForm.professionId = item.id
      this.ruleForm.professionName = item.value
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