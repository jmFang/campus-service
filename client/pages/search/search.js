Page({
  data: {
    inputShowed: false,
    inputVal: ""
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  query: function () {
    console.log('query->' + this.data.inputVal);
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  // 数据测试
  onReady: function () {
    this.setData({
      productsList: [
        {
          title: '雅思词汇',
          price: '￥88',
          pictures: [
            'http://bmob-cdn-17230.b0.upaiyun.com/2018/03/13/c2f5a24a40b460c08068ed08572829d0.jpg',
            'http://bmob-cdn-17230.b0.upaiyun.com/2018/03/13/6808523e40d1382f8003c8a6067822cb.jpg',
            'http://bmob-cdn-17230.b0.upaiyun.com/2018/03/13/c2f5a24a40b460c08068ed08572829d0.jpg',
            'http://bmob-cdn-17230.b0.upaiyun.com/2018/03/13/6808523e40d1382f8003c8a6067822cb.jpg',
            '',
            ''
          ],
          description: "雅思考试必备资料，低价卖出，欢迎来购雅思考试必备资料，低价卖出，欢迎来购雅思考试必备资料",
          userAvatarUrl: 'http://bmob-cdn-17230.b0.upaiyun.com/2018/03/10/e915e3a840c832b380bb70aa93441506.jpg',
          userNickname: '大佬',
          userVerified: '已认证',
          userAddress: '中山大学'
        },
        {
          title: '雅思词汇',
          price: '￥88',
          pictures: [
            'http://bmob-cdn-17230.b0.upaiyun.com/2018/03/13/c2f5a24a40b460c08068ed08572829d0.jpg',
            'http://bmob-cdn-17230.b0.upaiyun.com/2018/03/13/6808523e40d1382f8003c8a6067822cb.jpg',
            'http://bmob-cdn-17230.b0.upaiyun.com/2018/03/13/c2f5a24a40b460c08068ed08572829d0.jpg',
            'http://bmob-cdn-17230.b0.upaiyun.com/2018/03/13/6808523e40d1382f8003c8a6067822cb.jpg',
            '',
            ''
          ],
          description: "雅思考试必备资料，低价卖出，欢迎来购雅思考试必备资料，低价卖出，欢迎来购雅思考试必备资料",
          userAvatarUrl: 'http://bmob-cdn-17230.b0.upaiyun.com/2018/03/10/e915e3a840c832b380bb70aa93441506.jpg',
          userNickname: '大佬',
          userVerified: '已认证',
          userAddress: '中山大学'
        }
      ]
    })
  }
  
});