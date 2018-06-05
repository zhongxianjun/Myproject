//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    movies:[],
    loadingState:false,
    moreState:false,
    //当前页数
    pageIndex:1,
    //数据查询起始位置 offset
    start:0,
    //正在热映电影总条数
    total:0
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
        _self.setData({movies:res.data.subjects,start: 21,total:parseInt(res.data.total)});
      }
    })
  },

  onReady: function () {
    //获取搜索组件实例对象
    this.$searchCom = this.selectComponent("#searchCom");
  },
  
  //加载更多
  loadMore:function(evt){
    let _self = this;
    //加载更多热映电影
    if (_self.data.movies.length >= _self.data.total){
      //显示已无更多
      _self.setData({ moreState: true });

      let timmer = setTimeout(()=>{
        _self.setData({ moreState: false });
        clearTimeout(timmer);
      }, 1000);
    } else {
      _self.setData({ loadingState: true });
      wx.request({
        url: 'http://localhost/api/douban/movie.php',
        data: {
          act: 'in_theaters',
          start: this.data.start
        },
        success: function (res) {
          let offset = (_self.data.pageIndex - 1) * 21;
          let temp = _self.data.movies.concat(res.data.subjects);
          _self.setData({ movies: temp, start: offset, pageIndex: _self.data.pageIndex + 1, loadingState: false });
        }
      });
    }
  },

  //进入搜索页面
  search:function(){
    this.$searchCom.show();
  }
})
