const app = getApp();

Page({
 //页面的初始数据
 data: {
  username: '',
  phone: '',
  zhuohao: '',
  renshu: ''
 },

 bindinputusername: function(e) {
  this.setData({
   username: e.detail.value
  })
 },

 bindinputphone: function(e) {
  this.setData({
   phone: e.detail.value
  })
 },

 bindinputzhuohao: function(e) {
  this.setData({
   zhuohao: e.detail.value
  })
 },
 bindinputrenshu: function(e) {
  this.setData({
   renshu: e.detail.value
  })
 },


 //修改个人信息
 formSubmit: function() {
  var that = this;
  //如果openid不存在，就重新请求接口获取openid
  var openid = app.globalData.openid;
  if (openid === null || openid === undefined) {
   app.getOpenid();
   wx.showToast({ //这里提示失败原因
    title: '您还没有登陆！',
    duration: 1500
   })
   return;
  }

  let username = that.data.username;
  let phone = that.data.phone;
  let zhuohao = that.data.zhuohao;
  let renshu = that.data.renshu;

  if (username === '') {
   wx.showToast({
    title: '用户名不能为空',
    icon: 'none'
   })
   return;
  }
  if (phone === '') {
   wx.showToast({
    title: '手机号不能为空',
    icon: 'none'
   })
   return;
  }


  wx.request({
   url: app.globalData.baseUrl + '/user/save',
   method: "POST",
   header: {
    "Content-Type": "application/x-www-form-urlencoded"
   },
   data: {
    openid: openid,
    username: username,
    phone: phone,
    zhuohao: zhuohao,
    renshu: renshu
   },
   success: function(res) {
    wx.showToast({
     title: '修改成功',
    })
    app._getMyUserInfo();
    wx.switchTab({
     url: '../index/index'
    })
   }
  })

 },

 //生命周期函数--监听页面加载
 onLoad: function(options) {
  let that = this;
  var openid = app.globalData.openid;
  if (openid === null || openid === undefined) {
   app.getOpenid();
   wx.showToast({ //这里提示失败原因
    title: '您还没有登陆！',
    duration: 1500
   })
   return;
  }
  if (app.globalData.userInfo) {
   that.setData({
    username: app.globalData.userInfo.realname,
    phone: app.globalData.userInfo.realphone,
    zhuohao: app.globalData.userInfo.realzhuohao,
    renshu: app.globalData.userInfo.realrenshu
   })
  }

 },
})