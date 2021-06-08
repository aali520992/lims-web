<template>
  <d2-container>
    <template slot="header">登记入库信息</template>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="100px"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item label="所属实验室" prop="labName">
        <el-col :span="6">
          <el-autocomplete
            class="inline-input"
            v-model="ruleForm.labName"
            :fetch-suggestions="searchLab"
            placeholder="请输入内容"
            @select="handleLab"
          ></el-autocomplete>
        </el-col>
      </el-form-item>
      <el-form-item label="设备名称" prop="equipmentName">
        <el-col :span="6">
          <el-autocomplete
            class="inline-input"
            v-model="ruleForm.equipmentName"
            :fetch-suggestions="searchEquipment"
            placeholder="请输入内容"
            @select="handleEquipment"
          ></el-autocomplete>
        </el-col>
      </el-form-item>
      
      <el-form-item label="变化值" prop="balance">
        <el-col :span="6">
          <el-input v-model="ruleForm.balance"></el-input>
        </el-col>
      </el-form-item>
     
      <el-form-item label="原因" prop="reason">
        <el-col :span="6">
          <el-input v-model="ruleForm.reason"></el-input>
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
      labList: [],
      equipmentList: [],
      ruleForm: {
        creatorId: '',
        updaterId: '',
        type: 2,
        reason: '',
        balance: '',
        equipmentId: '',
        equipmentName: '',
        labId: '',
        labName: '',
        remark: '',
      },
      rules: {
        labName: [
          { required: true, message: '请选择实验室名称', trigger: 'change' },
        ],
        equipmentName: [
          { required: true, message: '请选择设备', trigger: 'change' },
        ],
        balance: [{ required: true, message: '请输入更改值', trigger: 'blur' }],
        reason: [
          { required: true, message: '原因分析', trigger: 'blur' },
        ],
        
        remark: [{ required: false, message: '请填写备注', trigger: 'blur' }],
      },
    }
  },
  // 页面加载
  mounted() {
    this.getlabList()
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
      var url =
        '/equipment/equipmentList/' + labId
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

    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request
            .post('/equipmentRecord/insert', this.ruleForm)
            .then((response) => {
              if ((response.code = 200)) {
                this.$message.success('添加成功')
                this.$router.push('/demo/lab/output/putrecord/list')
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
    handleLab(item) {
      this.ruleForm.labId = item.id
      this.ruleForm.labName = item.value
    },
     handleLab(item) {
      this.ruleForm.labId = item.id
      this.ruleForm.labName = item.value
      this.getEquipmentlist(item.id)
    },
    handleEquipment(item) {
      this.ruleForm.equipmentId = item.id
      this.ruleForm.equipmentName = item.value
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