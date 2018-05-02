Page({
  data:{

  },
  
  goToPost:function(e) {
    let which = e.currentTarget.dataset.which;
    console.log(which);
    wx.navigateTo({
      url: '/pages/publish/publish?which='+which,
    })
  },
})