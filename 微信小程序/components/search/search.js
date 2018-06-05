// components/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    //组件是否隐藏 
    hiddenState: true,
    timmer: null,
    keywords: '',
    pageIndex: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close: function () {
      this.hide();
    },
    goSearch: function (evt) {
      clearTimeout(this.data.timmer);
      let _self = this;
      let timmer = setTimeout(function () {
        let keywords = evt.detail.value.trim();
        _self.setData({ keywords: keywords });
        if (keywords) {
          wx.request({
            url: "http://localhost/api/douban/search.php",
            data: {
              q: keywords
            },
            success: function (res) {
              _self.setData({ movies: res.data });
            }
          });
        }
      }, 500);

      this.setData({ timmer: timmer });

    },
    show: function () {
      this.setData({ hiddenState: false });
    },
    hide: function () {
      this.setData({ hiddenState: true });
    },
    loadMore: function () {
      if (this.data.movies.subjects.length >= this.data.movies.total) {
        return false;
      }
      let _self = this;
      let offset = _self.data.pageIndex * 20;
      wx.request({
        url: "http://localhost/api/douban/search.php",
        data: {
          q: _self.data.keywords,
          start: offset
        },
        success: function (res) {
          let temp = _self.data.movies.subjects.concat(res.data.subjects);
          let newPageIndex = this.data.pageIndex++;
          _self.setData({ movies: temp, pageIndex: newPageIndex });
        }
      });
    }
  }
})
