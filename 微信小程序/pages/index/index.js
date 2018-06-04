//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  onLoad: function(){
    let _self = this;
    wx.request({
      url: 'http://localhost/api/douban/movie.php',
      data:{
        act:'in_theaters'
      },
      success:function(res){
        console.log(res);
      }
    })
  }
})
