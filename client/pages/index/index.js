const app = getApp()
var service = require('../../service/service.api.js');
Page({
  data: {
    slides:[
      {imgUrl: 'http://bmob-cdn-17230.b0.upaiyun.com/2018/03/13/4ede04ee40eabe5880cf157051eeb700.png', name:'tips'},
      {imgUrl: 'http://bmob-cdn-17230.b0.upaiyun.com/2018/03/13/16233e06400e7e1280b3f4d663ba72a6.png', name:'feedback'},
      {imgUrl: 'http://bmob-cdn-17230.b0.upaiyun.com/2018/03/13/5875307b4019c05180abc0dc505586ac.png',name:'survey'},
      {imgUrl: 'http://bmob-cdn-17230.b0.upaiyun.com/2018/03/13/ba67020b400eaf1680a6d32c49b77b24.png',name:'announce'}
    ],
    radios:[
      {id: "0",value: "全部",checked: true },
      {id:"1", value:"教材书籍",checked:false},
      {id: "2", value: "日化服饰", checked: false},
      {id: "3", value: "数码家电",checked: false},
      {id: "4",value: "文化体育",checked: false},
      {id: "5",value: "技能服务",checked: false},
      {id: "6",value: "其他",checked: false}
    ],
    productsList:[],
    sidebarStyle:'', //侧边栏的滑动效果
    btnSelected1:'background-color: green; box-shadow:0 2px 2px #C9C9C9;', //按钮选中的效果
    btnSelected2:'background-color: whitesmoke;',
    display: 'none',
    hidden: 'visible'
  },
  // 前往搜索界面
  click_search:function() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  // 处理轮播图的点击链接
  slideDetails:function(e) {
    let slideName = e.currentTarget.dataset.name;
    console.log(slideName);
    if(slideName == 'userTips') {
      // 链接到用户使用手册
      console.log('链接到用户使用手册')
    } else if(slideName == 'userFeedback') {
      // 链接到用户反馈问卷调查
      console.log('链接到用户反馈问卷调查')
    } else if(slideName == 'userFeeling') {
      //链接到用户体验调查问卷
      console.log('链接到用户体验调查问卷')
    } else if(slideName == 'claim') {
      // 链接到产品公告
      console.log('链接到产品公告')
    }
  },
  // 点击跳转到消息界面
  lookMessage:function() {

  },
  // 刷新
  refresh:function() {

  },
  // 下拉刷新
  onPullDownRefresh:function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  // 过滤选择,根据不同发按钮，采取不同的动作
  filter:function(e) {
    let method = e.currentTarget.dataset.method;
    console.log(method);
    var that = this;
    if(method == 'new') {
      // 按最新的商品发布进行排序-渲染
      console.log('选择了最新')
      setTimeout(function(){
        that.refresh();
      },0);

    // do some thing here

      setTimeout(function () {
        that.stopRefresh();
      }, 0);
    } else if(method == 'popular') {
      // 按最热门的进行排序-渲染
      console.log('选择了最热')
      setTimeout(function () {
        that.refresh();
      }, 0);

    // do some thing here

      setTimeout(function () {
        that.stopRefresh();
      }, 0);


    } else if(method == 'filter') {
      // 右边抽屉导航滑出，选择筛选的类型
      console.log("选择了筛选")
      this.setData({
        sidebarStyle: 'transform:translate(0)'
      })
    }
  },
  radioChange:function(e) {
    console.log(e);
  },
  confirm:function(e) {
    let t = e.currentTarget.dataset.type;
    if(t == 'A') {
      this.setData({
        sidebarStyle: 'transform:translate(400rpx)'
      })
    } else {
      this.setData({
        sidebarStyle: 'transform:translate(400rpx)'
      })
    }
  },

  // 数据测试
  onReady:function() {
    var that = this;
    service.getProducts("", function(res) {
        console.log(res.data)
        var dataArr = res.data;
        // 增加到3的倍数，使得排列能够每行三张图片
        dataArr.forEach(function(item) {
            while(item.photoUrls.length % 3 != 0) {
                item.photoUrls.push("");
            }
        })
        that.setData({
            productsList:res.data
        })
    })
  },
  goToDetails:function(e) {
      var index = e.currentTarget.dataset.index;
      wx.navigateTo({
          url:"/pages/details/details?index="+index
      })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.stopRefresh();
  },
  onHide:function() {
    this.refresh();
  },
  refresh:function() {
    this.setData({
      display: 'none',
      hidden: 'visible'
    })
  },
  stopRefresh:function() {
    var that = this;
    setTimeout(function () {
      that.setData({
        display: '',
        hidden: 'hidden'
      })
    }, 1000);
  }
})
