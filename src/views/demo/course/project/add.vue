<template>
  <d2-container>
    <template slot="header">添加实验项目</template>
    <el-form
      :model="ruleForm"
      academicYear-icon
      :rules="rules"
      label-width="100px"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item label="实验名称" prop="name">
        <el-col :span="6">
          <el-input v-model="ruleForm.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="所属学年" prop="academicYear">
        <el-select v-model="ruleForm.academicYear" placeholder="请选择所属学年">
          <el-option label="开放" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学期" prop="semester">
        <el-select v-model="ruleForm.academicYear" placeholder="请选择所属学期">
          <el-option label="开放" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级选择" prop="semester">
        <el-select v-model="ruleForm.academicYear" placeholder="请选择所属班级">
           <el-col :span="10">
          <el-option label="开放" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
          </el-col>
        </el-select>
      
      </el-form-item>
      <el-form-item label="课程属性" prop="academicYear">
        <el-col :span="6">
          <el-input v-model="ruleForm.semester"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="学时" prop="academicYear">
      <el-col :span="6">
          <el-input v-model="ruleForm.semester"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="学分" prop="academicYear">
        <el-col :span="6">
          <el-input v-model="ruleForm.semester"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="评分标准" prop="status">
      <el-col :span="8">
          <el-input type="textarea" v-model="ruleForm.remark"></el-input>
        </el-col>
      </el-form-item>
       <el-form-item label="报告要求" prop="status">
         <el-col :span="8">
          <el-input type="textarea" v-model="ruleForm.remark"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="必修类别" prop="category">
        <el-col :span="6">
          <el-input v-model="ruleForm.category"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="必修类别" prop="category">
        <el-col :span="6">
          <el-input v-model="ruleForm.category"></el-input>
        </el-col>
      </el-form-item>
       <el-form-item label="上课要求" prop="category">
        <el-col :span="8">
          <el-input type="textarea" v-model="ruleForm.remark"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="教学方法" prop="remark">
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
        name: "",
        academicYear: "",
        semester: "",
        category: "",
        remark: "",
        collegeId: "",
        status: "",
        adminId: "",
        adminName: "",
      },
      rules: {
        status: [
          { required: false, message: "请选择所属学院", trigger: "change" },
        ],
        name: [
          { required: true, message: "请输入实验室名称", trigger: "blur" },
          { min: 2, max: 10, message: "名称不正确", trigger: "blur" },
        ],
        academicYear: [
          { required: true, message: "请选择状态", trigger: "change" },
        ],
        semester: [{ required: true, message: "请输入地址", trigger: "blur" }],
        category: [
          { required: false, message: "请输入描述", trigger: "blur" },
        ],
        remark: [
          { required: false, message: "请填写活动形式", trigger: "blur" },
        ],
      },
    };
  },
  // 页面加载
  mounted() {
    this.getCollegeList();
  },
  methods: {
    //学院查询
    searchCollege(queryString, cb) {
      var restaurants = this.collegeList;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    // 管理员查询
    searchAdmin(queryString, cb) {
      var restaurants = this.adminList;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    // 获取学院列表
    getCollegeList() {
      this.$request
        .post("/college/collegeList")
        .then((response) => {
          if ((response.code = 200)) {
            this.collegeList = response.data.data;
          } else {
            this.$message.error("获取数据失败");
          }
        })
        .catch((err) => {
          console.log(err.academicYear, err.message);
        });
    },
    // 根据学院获取管理员列表
    getAdminList(collegeId) {
      this.$request
        .post("/user/adminList/" + collegeId)
        .then((response) => {
          if ((response.code = 200)) {
            this.adminList = response.data.data;
          } else {
            this.$message.error("获取数据失败");
          }
        })
        .catch((err) => {
          console.log(err.academicYear, err.message);
        });
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request
            .post("/lab/insert", this.ruleForm)
            .then((response) => {
              if ((response.code = 200)) {
                this.$message.success("添加成功");
                this.$router.push("/demo/lab/classroom/list");
              } else {
                this.$message.error("添加失败");
              }
            })
            .catch((err) => {
              console.log(err.academicYear, err.message);
            });
        } else {
          this.$message.error("验证失败");
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handleCollege(item) {
      this.ruleForm.collegeId = item.id;
      this.ruleForm.status = item.value;
      this.getAdminList(item.id);
    },
    handleAdmin(item) {
      this.ruleForm.adminId = item.id;
      this.ruleForm.adminName = item.value;
    },
  },
};
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