<template>
  <div class="confirm_code">
    <canvas id="confirm_id" :width="contentWidth" :height="contentHeight"></canvas>
  </div>
</template>
<script>
export default {
  name: "Confrim_CODE",
  //关于背景颜色，由于过于深色的背景可能会看不清数据，同理过浅的也会影响，所以设置的范围是（140-250）
  props: {
    // 字符串传值
    confirmNum: {
      type: String,
      default: "1234",
    },
    // 字体最小
    fontSizeMin: {
      type: Number,
      default: 28,
    },
    // 字体最大
    fontSizeMax: {
      type: Number,
      default: 40,
    },
    // 背景颜色最小值
    backgroundColorMin: {
      type: Number,
      default: 180,
    },
    // 背景颜色最大值
    backgroundColorMax: {
      type: Number,
      default: 250,
    },
    // 图片宽度
    contentWidth: {
      type: Number,
      default: 120,
    },
    // 图片高度
    contentHeight: {
      type: Number,
      default: 40,
    },
    // 字体颜色最大值
    fontColorMax: {
      type: Number,
      default: 252,
    },
    // 字体颜色最小值
    fontColorMin: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      canvasId: null,
    };
  },
  mounted() {
    // this.canvasId = document.getElementById("confirm_id");
    this.drawCtx();
  },
  watch: {
  // 这里我们监听confirmNum，来触发canvas绘制方法
    confirmNum: "drawCtx",
  },
  methods: {
    // 生成随机数(min-max)之间
    makeRandom(max, min) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 生成随机颜色(这里颜色通过rgb())
    makeBackgroundColor(max, min) {
      let r = this.makeRandom(max, min);
      let g = this.makeRandom(max, min);
      let b = this.makeRandom(max, min);
      return `rgb(${r},${g}, ${b})`;
    },
    // 绘制canvas
    drawCtx() {
      let canvasId = document.getElementById("confirm_id");
      let ctx = canvasId.getContext("2d");
      // 先清除画布
      ctx.clearRect(0, 0, this.contentWidth, this.contentHeight);
      // 定义基线
      ctx.textBaseline = "bottom";
      // 绘制背景
      ctx.fillStyle = this.makeBackgroundColor(
        this.backgroundColorMax,
        this.backgroundColorMin
      );
      ctx.fillRect(0, 0, this.contentWidth, this.contentHeight);
      // 绘制文字
      // 这里遍历字符串需要拿到索引，所以不能用for-of
      for (let i = 0; i < this.confirmNum.length; i++) {
        this.drawText(ctx, this.confirmNum[i], i);
      }
      // this.drawLine(ctx);
      // this.drawDot(ctx);
    },
    // 绘制文字
    // 我们接受一个画布对象，字符串，和索引值（用来设置位置）
    drawText(ctx, char, i) {
      // 给文字设置填充色
      ctx.fillStyle = this.makeBackgroundColor(this.fontColorMax, this.fontColorMin);
      // 设置字体大小
      ctx.font = `${this.makeRandom(this.fontSizeMax, this.fontSizeMin)}px makeRandom`;
      // 起点位置横坐标
      // 横坐标通过索引来设置
      let x = (i + 1) * (this.contentWidth / (this.confirmNum.length + 1));
      // 纵坐标来进行随机（保证在当前画布内即可）
      let y = this.makeRandom(this.contentHeight - 10, this.fontSizeMax);
      // 旋转角度
      let dep = this.makeRandom(60, -60);
      // console.log("x", x, "y", y);
      ctx.translate(x, y);
      ctx.rotate((dep * Math.PI) / 180);
      ctx.fillText(char, 0, 0);
      //恢复坐标原点和旋转角度（注意这里恢复的时候需要根据设置旋转角度和偏移距离的顺序来恢复）
      ctx.rotate((-dep * Math.PI) / 180);
      ctx.translate(-x, -y);
    },
    // 我们通过设置一些干扰线和干扰点来进行对画布的数据的干扰
    // 绘制干扰线（这里我设置的直线，大家也可以自己进行设置一些曲线什么的）
    drawLine(ctx) {
      // 定义干扰线条数
      // 这里我定义的干扰线条数在（2-10）条
      let lineMax = Math.floor(Math.random() * (10 - 2) + 2);
      for (let i = 0; i <= lineMax; i++) {
      // 线条的颜色
        ctx.strokeStyle = this.makeBackgroundColor(this.fontColorMax, this.fontColorMin);
        ctx.beginPath();
        // 这里对于起始点进行随机的设置
        ctx.moveTo(
          this.makeRandom(this.contentWidth, 0),
          this.makeRandom(this.contentHeight, 0)
        );
        // 设置结束点位置
        ctx.lineTo(
          this.makeRandom(this.contentWidth, 0),
          this.makeRandom(this.contentHeight, 0)
        );
        ctx.stroke();
      }
    },
    // 绘制干扰点
    drawDot(ctx) {
     // 这里我定义的干扰点个数是（5-35）个
      let dotMax = Math.floor(Math.random() * (35 - 5) + 5);
      for (let i = 0; i <= dotMax; i++) {
      // 这里自定义点的半径，建议不要过大
        let radius = this.makeRandom(5, 1);
        ctx.beginPath();
        // arc()是进行曲线的绘制
        //arc(x, y, radius, sAngle, eAngle, counterclockwise)
        // x,y为圆心坐标，radius--半径，sAngle--起始角度（弧度）,eAngle--结尾角度(弧度),  
        //counterclockwise --顺时针还是逆时针(boolean值可选)
        ctx.arc(
          this.makeRandom(0, this.contentWidth),
          this.makeRandom(0, this.contentHeight),
          radius,
          0,
          2 * Math.PI
        );
        // 给圆随机进行填充色
        ctx.fillStyle = this.makeBackgroundColor(this.fontColorMax, this.fontColorMin);
        ctx.fill();
        ctx.stroke();
      }
    },
  },
};
</script>