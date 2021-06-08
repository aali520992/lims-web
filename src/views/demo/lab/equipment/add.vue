<template>
  <d2-container>
    <template slot="header">添加实验设备</template>
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
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
        </el-col>
      </el-form-item>
      <el-form-item label="设备型号" prop="type">
        <el-col :span="6">
          <el-input v-model="ruleForm.type"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="设备名称" prop="name">
        <el-col :span="6">
          <el-input v-model="ruleForm.name"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="设备数量" prop="number">
        <el-col :span="6">
          <el-input v-model="ruleForm.number"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="设备状态" prop="status">
        <el-select v-model="ruleForm.status" placeholder="请选择状态">
          <el-option label="待维修" value="0"></el-option>
          <el-option label="正常" value="1"></el-option>
          <el-option label="损坏" value="2"></el-option>
          <el-option label="危险" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="设备价格" prop="sumPrice">
        <el-col :span="6">
          <el-input v-model="ruleForm.sumPrice"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="设备单价" prop="unitPrice">
        <el-col :span="6">
          <el-input v-model="ruleForm.unitPrice"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="设备品牌" prop="brand">
        <el-col :span="6">
          <el-input v-model="ruleForm.brand"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="设备图片" prop="imageList">
        <el-col :span="22">
          <el-upload action="#" list-type="picture-card" :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                :v-model="ruleForm.imageList"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-col>
      </el-form-item>
      <el-form-item label="保质期" prop="expirationDate">
        <el-col :span="6">
          <el-date-picker
            v-model="ruleForm.expirationDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="使用说明" prop="instructions">
        <el-col :span="8">
          <el-input type="textarea" v-model="ruleForm.instructions"></el-input>
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
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      labList: [],
      ruleForm: {
        creatorId: '',
        updaterId: '',
        type: '',
        name: '',
        brand: '',
        number: '',
        status: '',
        sumPrice: '',
        unitPrice: '',
        instructions: '',
        imageList: '',
        expirationDate: '',
        remark: '',
        labId: '',
      },
      rules: {
        labName: [
          { required: true, message: '请选择所属学院', trigger: 'change' },
        ],
        name: [
          { required: true, message: '请输入设备名称', trigger: 'blur' },
          { min: 1, max: 15, message: '名称不正确', trigger: 'blur' },
        ],
        type: [{ required: true, message: '请输入设备型号', trigger: 'blur' }],
        brand: [{ required: false, message: '请输入品牌', trigger: 'blur' }],
        number: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        status: [
          { required: true, message: '请选择状态数量', trigger: 'change' },
        ],
        sumPrice: [
          { required: true, message: '请输入总价格', trigger: 'blur' },
        ],
        unitPrice: [{ required: true, message: '请输入单价', trigger: 'blur' }],
        instructions: [
          { required: false, message: '请填写使用说明', trigger: 'blur' },
        ],
        imageList: [
          { required: false, message: '请输入图片', trigger: 'blur' },
        ],
        expirationDate: [
          { required: false, message: '请选择保质期', trigger: 'blur' },
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
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    querySearch(queryString, cb) {
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

    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request
            .post('/equipment/insert', this.ruleForm)
            .then((response) => {
              if ((response.code = 200)) {
                this.$message.success('添加成功')
                this.$router.push('/demo/lab/equipment/list')
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
    handleSelect(item) {
      this.ruleForm.labId = item.id
      this.ruleForm.labName = item.value
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