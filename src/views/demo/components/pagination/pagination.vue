<template>
  <div class="page-wrap">
    <ul>
      <li class="li-page" @click="goPrePage">&laquo;</li>
      <li v-for="(i, index) in showPageBtn" :key="index"
        :class="{active: i === currentPage, pointer: i, hover: i && i !== currentPage}" @click="pageOffset(i)">
        <a v-if="i">{{i}}</a>
        <a v-else>···</a>
      </li>
      <li class="li-page" @click="goNextPage">&raquo;</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "pagination",
    props: {
      num: Number,
      limit: Number
    },
    data: () => ({
      offset: 0
    }),
    computed: {
      prePage() {
        return this.offset !== 0 && this.num;
      },
      nextPage() {
        return (this.offset + this.limit < this.num) && this.num
      },
      totalPage() {
        return Math.ceil(this.num / this.limit)
      },
      currentPage() {
        return Math.ceil(this.offset / this.limit) + 1
      },
      showPageBtn() {
        const pageNum = this.totalPage;
        const index = this.currentPage;
        if (pageNum <= 5) return [...new Array(pageNum)].map((v, i) => i + 1);
        if (index <= 2) return [1, 2, 3, 0, pageNum];
        if (index >= pageNum - 1) return [1, 0, pageNum - 2, pageNum - 1, pageNum];
        if (index === 3) return [1, 2, 3, 4, 0, pageNum];
        if (index === pageNum - 2) return [1, 0, pageNum - 3, pageNum - 2, pageNum - 1, pageNum];
        return [1, 0, index - 1, index, index + 1, 0, pageNum]
      }
    },
    methods: {
      pageOffset(i) {
        if (i === 0 || i === this.currentPage) return;
        this.offset = (i - 1) * this.limit;
        this.$emit('getNew', this.offset);
      },
      goPrePage() {
        if (!this.prePage) {
          alert("这里是第一页呀，亲!");
          return;
        }
        this.offset -= this.limit;
        this.$emit('getNew', this.offset);
      },
      goNextPage() {
        if (!this.nextPage) {
          alert("已经是最后一页了呢~");
          return;
        }
        this.offset += this.limit;
        this.$emit('getNew', this.offset);
      }
    }
  }

</script>

<style scoped>
  .li-page {
    line-height: 1.5;
    cursor: pointer;
    color: #c2c4cc;
    background-color: #f4f4f5;
  }

  .active {
    border-color: #409eff;
    background-color: #409eff;
  }

  .pointer {
    cursor: pointer;
  }

  .hover {
    color: #FFF;
    background-color: #f4f4f5;
  }

  .active a {
    color: #FFF;
  }

  .page-wrap {
    font-size: 13px;
    margin-top: 10px;
  }

  .page-wrap ul {
    display: inline-block;
    list-style: none;
    overflow: hidden;
    padding-inline-start: 0px;
  }

  .page-wrap li {
    float: left;
    color: #c2c4cc;
    padding: 3px 10px;
    margin: 0 5px;
    border-radius: 3px;
    user-select: none;
    border: 1px solid transparent;
  }

</style>
