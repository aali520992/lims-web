<template>
  <d2-container type="card">
    <template slot="header" icon="el-icon-search" circle>数据列表</template>
    <el-form :inline="true" :model="range" class="demo-form-inline">
      <el-form-item label="商品类目">
        <el-select v-model="range.catId">
          <el-option label="电脑" value="5851"></el-option>
          <el-option label="零食" value="6398"></el-option>
          <el-option label="居家" value="16989"></el-option>
          <el-option label="男装" value="239"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格区间">
        <el-input v-model="range.rangeFrom"></el-input>
      </el-form-item>
      <el-form-item label="-">
        <el-input v-model="range.rangeTo"></el-input>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="range.keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-form label-width="20px">
      <el-row>
        <el-col
          class="elproduct"
          v-for="(product, index) in productList"
          :key="index"
        >
          <el-card
            class="elcard"
            shadow="hover"
            :body-style="{ padding: '20px' }"
          >
            <img
              @click="clickcard(product)"
              :src="product.goodsThumbnailUrl"
              class="image"
            />
            <div style="padding: 14px">
              <span class="goodsName">{{ product.goodsName }}</span>
              <div class="bottom clearfix">
                <span class="couponDiscount">￥{{
                  (product.minGroupPrice - product.couponDiscount) / 100
                }}</span>
                <span class="minGroupPrice">
                  ￥{{ product.minGroupPrice / 100 }}</span
                >
                <p class="time">{{ product.mallName }}</p>
                <p class="salesTip">已售件数：{{ product.salesTip }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-form>
    <pagination
      :num="selectform.pageSize"
      :limit="selectform.page"
      @getNew="getpage"
    ></pagination>
  </d2-container>
</template>

<script>
import pagination from "../../demo/components/pagination/pagination.vue";
export default {
  data() {
    return {
      selectform: {
        pageSize: 40,
        page: 1,
        current: 0,
        rangeList: [],
        catId: "",
        keyword: "实验室器材",
      },
      range: {
        keyword: "",
        catId: "",
        rangeId: 1,
        rangeFrom: "",
        rangeTo: "",
      },

      productList: [],
    };
  },
  // 组件
  components: {
    pagination,
  },
  // 页面加载
  mounted() {
    this.getlist(this.selectform);
  },
  methods: {
    getpage(value) {
      this.selectform.page = value + 1;
      this.getlist(this.selectform);
    },
    onSubmit() {
      if (this.range.rangeFrom != null && this.range.rangeFrom != "") {
        this.selectform.rangeList = [];
        var rangeFrom = this.range.rangeFrom * 100;
        var rangeTo = this.range.rangeTo * 100;
        this.selectform.rangeList.push({
          rangeId: 1,
          rangeFrom: rangeFrom,
          rangeTo: rangeTo,
        });
      }
      if (this.range.keyword != null && this.range.keyword != "") {
        this.selectform.keyword = this.range.keyword;
      }
      if (this.range.catId != 0) {
        this.selectform.catId = this.range.catId;
      }
      this.getlist(this.selectform);
    },
    clickcard(product) {
      this.$request
        .post("/pdd/product/link", {
          goodId: product.goodsSign,
        })
        .then((response) => {
          if ((response.code = 200)) {
            var url = response.data.data.shortUrl;
            console.log(response);
            window.location.href = url;
          } else {
            this.$message.error("获取数据失败");
          }
        })
        .catch((err) => {
          console.log(err.status, err.message);
        });
    },
    getlist(map = {}) {
      this.$request
        .post("/pdd/product/list", map)
        .then((response) => {
          if ((response.code = 200)) {
            this.productList = response.data.data.goodsList;
            this.selectform.current = response.data.data.totalCount;
          } else {
            this.$message.error("获取数据失败");
          }
        })
        .catch((err) => {
          console.log(err.status, err.message);
        });
    },
  },
};
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
.elcard {
  margin: 2px;
  float: left;
}

:hover.elcard {
  border: #ff0000 solid 0.2px;
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

.elproduct {
  width: 300px;
  height: 500px;
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




<style lang="scss" scoped>
.time {
  font-size: 18 px;
  color: #999;
}
.minGroupPrice {
  margin-left: 20px;
  font-size: 20px;
  color: #999;
}
.couponDiscount {
  font-size: 27px;
  color: red;
}
.salesTip {
  font-size: 18 px;
  color: #999;
  text-align: right;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.goodsName {
  font-size: 18px;
  color: #999;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>

