webpackJsonp([1],{"13Pz":function(t,s){},"1srS":function(t,s){},"3V12":function(t,s){},DAo7:function(t,s){},F0td:function(t,s){},GpHa:function(t,s){},MX7Y:function(t,s){},NHnr:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i={};e.d(i,"getPlaySrc",function(){return X}),e.d(i,"getCurSong",function(){return K}),e.d(i,"getPalyState",function(){return Q}),e.d(i,"getSongListArr",function(){return W}),e.d(i,"getCurIndex",function(){return tt}),e.d(i,"getMiniState",function(){return st});var n={};e.d(n,"setPlaySrc",function(){return et}),e.d(n,"setCurSong",function(){return it}),e.d(n,"setPalyState",function(){return nt}),e.d(n,"setSongListArr",function(){return at}),e.d(n,"setCurIndex",function(){return rt}),e.d(n,"setMiniState",function(){return ot});var a=e("MVMM"),r=e("4YfN"),o=e.n(r),c=e("6yg2"),l=e.n(c),u="https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&cid=205361747&platform=yqq&hostUin=0&needNewCode=0&uin=0&guid=7120953682",d=e("Mqpf"),g=e("9rMa"),m={name:"",data:function(){return{smid:"",mid:"",src:"",myScroll:null}},computed:o()({},Object(g.b)(["getCurIndex","getSongListArr","getPlaySrc","getMiniState"])),props:{switchState:{type:Boolean,default:!0}},mounted:function(){this.myScroll=new d.a(".song-wrapper",{scrollY:!0,click:!0})},methods:o()({_getMusicAdress:function(t,s){var e=this;this.smid=t,this.mid=s;var i=u+"&songmid="+this.smid+"&filename=C400"+this.smid+".m4a";l()(i,{param:"callback"},function(t,s){var i=s.data.items[0].vkey;e.src="http://dl.stream.qqmusic.qq.com/C400"+e.smid+".m4a?vkey="+i+"&guid=7120953682&uin=0&fromtag=66",e.setPlaySrc(e.src)}),0==this.getMiniState&&this.setMiniState(!0)},close:function(){this.$emit("closeState",!1)},playListMusic:function(t,s){this.setCurSong(t),this.setCurIndex(s),this._getMusicAdress(this.getSongListArr[s].musicData.songmid,this.getSongListArr[s].musicData.albummid)},deleteSong:function(t,s){var e=this.getSongListArr.length-1;if(0==s&&0==e)return this.getSongListArr.splice(s,1),void this.setMiniState(!1);this.getSongListArr.splice(s,1),s==this.getCurIndex?s==e?(s=0,this._getMusicAdress(this.getSongListArr[s].musicData.songmid,this.getSongListArr[s].musicData.albummid)):this._getMusicAdress(this.getSongListArr[s].musicData.songmid,this.getSongListArr[s].musicData.albummid):s=s<this.getCurIndex?this.getCurIndex-1:this.getCurIndex,this.setCurIndex(s),this.setCurSong(this.getSongListArr[s])},deleteAll:function(){var t=this.getSongListArr.length;this.getSongListArr.splice(0,t),this.setMiniState(!1)}},Object(g.c)({setCurIndex:"setCurIndex",setCurSong:"setCurSong",setPlaySrc:"setPlaySrc",setMiniState:"setMiniState"}))},h={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("transition",{attrs:{name:"songlist"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.switchState,expression:"switchState"}],staticClass:"song-list",on:{click:function(s){return s.stopPropagation(),s.target!==s.currentTarget?null:t.close(s)}}},[e("div",{staticClass:"list-operator"},[e("span",{staticClass:"play-mode"},[e("i"),t._v("\n\t  \t \t顺序播放\n  \t \t")]),t._v(" "),e("span",{staticClass:"delete-all",on:{click:function(s){t.deleteAll()}}})]),t._v(" "),e("div",{staticClass:"song-wrapper"},[e("div",{staticClass:"content"},[e("div",{staticClass:"list-con"},[e("div",{staticClass:"songs"},[e("ul",t._l(t.getSongListArr,function(s,i){return e("li",{key:s.musicData.songid,class:{active:t.getCurIndex==i},on:{click:function(e){t.playListMusic(s,i)}}},[e("span",{staticClass:"song-name",domProps:{textContent:t._s(s.musicData.songname)}}),t._v(" "),e("span",{staticClass:"song-operator",on:{click:function(t){t.stopPropagation()}}},[e("i",{staticClass:"icon-op icon-favorate"}),t._v(" "),e("i",{staticClass:"icon-op icon-delete",on:{click:function(e){t.deleteSong(s,i)}}})])])}))])])])]),t._v(" "),e("div",{staticClass:"close-list",on:{click:t.close}},[t._v("关闭列表")])])])},staticRenderFns:[]};var p=e("Z0/y")(m,h,!1,function(t){e("p9AC")},"data-v-e8658656",null).exports,v={name:"",data:function(){return{smid:"",mid:"",src:""}},computed:o()({},Object(g.b)(["getPlaySrc","getCurSong","getPalyState","getCurIndex","getSongListArr"])),created:function(){this.smid=this.$route.params.smid,this.mid=this.$route.params.mid,this._getMusicAdress(this.smid,this.mid)},methods:o()({_getMusicAdress:function(t,s){var e=this;this.smid=t,this.mid=s;var i=u+"&songmid="+this.smid+"&filename=C400"+this.smid+".m4a";l()(i,{param:"callback"},function(t,s){var i=s.data.items[0].vkey;e.src="http://dl.stream.qqmusic.qq.com/C400"+e.smid+".m4a?vkey="+i+"&guid=7120953682&uin=0&fromtag=66",e.setSrc(e.src)}),this.setMiniState(!0)},_getBack:function(){this.$router.go(-1)},_playPauseplay:function(){var t=document.querySelector(".thumb-playing"),s=document.querySelector("#player");this.palyState(!this.getPalyState),this.getPalyState?(t.style.animationPlayState="paused",s.pause()):(t.style.animationPlayState="running",s.play())},prev:function(){var t=this;this.palyState(!1),document.querySelector(".thumb-playing").style.animationPlayState="running";var s=0;0==(s=this.getCurIndex)?s=this.getSongListArr.length-1:s--,this.setCurIndex(s),this.getSongListArr.forEach(function(e,i){s==i&&(t.setCurSong(e),t._getMusicAdress(e.musicData.songmid,e.musicData.albummid))})},next:function(){var t=this;this.palyState(!1),document.querySelector(".thumb-playing").style.animationPlayState="running";var s=0;(s=this.getCurIndex)==this.getSongListArr.length-1?s=0:s++,this.setCurIndex(s),this.getSongListArr.forEach(function(e,i){s==i&&(t.setCurSong(e),t._getMusicAdress(e.musicData.songmid,e.musicData.albummid))})}},Object(g.c)({setSrc:"setPlaySrc",palyState:"setPalyState",setMiniState:"setMiniState",setCurIndex:"setCurIndex",setCurSong:"setCurSong"}))},f={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"play-music"},[e("div",{staticClass:"main"},[e("div",{staticClass:"header"},[e("h1",[e("i",{on:{click:t._getBack}}),t._v(t._s(t.getCurSong.musicData.singer[0].name))]),t._v(" "),e("span",[t._v(t._s(t.getCurSong.musicData.songname))])]),t._v(" "),e("div",{staticClass:"thumb-playing"},[e("img",{attrs:{src:"https://y.gtimg.cn/music/photo_new/T002R300x300M000"+t.getCurSong.musicData.albummid+".jpg?max_age=2592000"}})]),t._v(" "),e("div",{staticClass:"play-btn"},[e("a",{staticClass:"mode",attrs:{href:"javascript:void(0);"}}),t._v(" "),e("a",{staticClass:"prev",attrs:{href:"javascript:void(0);"},on:{click:t.prev}}),t._v(" "),e("a",{staticClass:"playPauseplay",class:{pausePlay:t.getPalyState},attrs:{href:"javascript:void(0);"},on:{click:t._playPauseplay}}),t._v(" "),e("a",{staticClass:"next",attrs:{href:"javascript:void(0);"},on:{click:t.next}}),t._v(" "),e("a",{staticClass:"like",attrs:{href:"javascript:void(0);"}})]),t._v(" "),e("div",{staticClass:"bg-album"},[e("img",{attrs:{src:"https://y.gtimg.cn/music/photo_new/T002R300x300M000"+t.getCurSong.musicData.albummid+".jpg?max_age=2592000"}})])])])},staticRenderFns:[]};var S=e("Z0/y")(v,f,!1,function(t){e("kJsg")},"data-v-12c09e28",null).exports,_={name:"",data:function(){return{switchState:!1,smid:"",mid:"",src:""}},computed:o()({},Object(g.b)(["getPlaySrc","getCurSong","getPalyState","getMiniState","getSongListArr","getCurIndex"])),watch:{getPalyState:function(){this._playOrPause()}},methods:o()({_getMusicAdress:function(t,s){var e=this;this.smid=t,this.mid=s;var i=u+"&songmid="+this.smid+"&filename=C400"+this.smid+".m4a";l()(i,{param:"callback"},function(t,s){var i=s.data.items[0].vkey;e.src="http://dl.stream.qqmusic.qq.com/C400"+e.smid+".m4a?vkey="+i+"&guid=7120953682&uin=0&fromtag=66",e.setSrc(e.src)}),this.setMiniState(!0)},_playPauseplay:function(){this.palyState(!this.getPalyState)},_playOrPause:function(){var t=document.querySelector(".thumb.playing"),s=document.querySelector("#player");this.getPalyState?(t.style.animationPlayState="paused",s.pause()):(t.style.animationPlayState="running",s.play())},toPlayMusic:function(){var t=this.getCurSong;this.$router.push({path:"/playMusic/"+t.musicData.songmid+"/"+t.musicData.albummid})},closeState:function(){this.switchState=!1},openSongList:function(){this.switchState=!0},next:function(){var t=this;this.palyState(!1),document.querySelector(".thumb.playing").style.animationPlayState="running";var s=0;(s=this.getCurIndex)==this.getSongListArr.length-1?s=0:s++,this.setCurIndex(s),this.getSongListArr.forEach(function(e,i){s==i&&(t.setCurSong(e),t._getMusicAdress(e.musicData.songmid,e.musicData.albummid))})}},Object(g.c)({setSrc:"setPlaySrc",palyState:"setPalyState",setCurIndex:"setCurIndex",setCurSong:"setCurSong",setMiniState:"setMiniState"})),components:{SongList:p,PlayMusic:S}},y={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return t.getMiniState?e("div",{staticClass:"mini-player",on:{click:t.toPlayMusic}},[e("div",{staticClass:"thumb playing"},[e("img",{attrs:{src:"https://y.gtimg.cn/music/photo_new/T002R300x300M000"+t.getCurSong.musicData.albummid+".jpg"}})]),t._v(" "),e("div",{staticClass:"song-info"},[e("h3",[t._v(t._s(t.getCurSong.musicData.singer[0].name))]),t._v(" "),e("span",[t._v(t._s(t.getCurSong.musicData.songname))])]),t._v(" "),e("div",{staticClass:"song-operator",on:{click:function(t){t.stopPropagation()}}},[e("a",{staticClass:"playPauseplay",class:{pausePlay:t.getPalyState},attrs:{href:"javascript:void(0);"},on:{click:t._playPauseplay}}),t._v(" "),e("a",{staticClass:"next",attrs:{href:"javascript:void(0);"},on:{click:t.next}}),t._v(" "),e("a",{staticClass:"song-list",attrs:{href:"javascript:void(0);"},on:{click:t.openSongList}})]),t._v(" "),e("SongList",{attrs:{switchState:t.switchState},on:{closeState:t.closeState}}),t._v(" "),e("div",{staticClass:"audio"},[e("audio",{attrs:{id:"player",src:t.getPlaySrc,autoplay:"autoplay"}})])],1):t._e()},staticRenderFns:[]};var C={name:"App",data:function(){return{}},methods:{},components:{MiniPlayer:e("Z0/y")(_,y,!1,function(t){e("1srS")},"data-v-7fb60e73",null).exports}},x={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{attrs:{id:"app"}},[s("router-view"),this._v(" "),s("MiniPlayer")],1)},staticRenderFns:[]};var k=e("Z0/y")(C,x,!1,function(t){e("F0td")},null,null).exports,L=e("zO6J"),w={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"header"},[this._m(0),this._v(" "),s("div",{staticClass:"nav"},[s("router-link",{attrs:{to:"/index","active-class":"active"}},[s("span",[this._v("推荐")])]),this._v(" "),s("router-link",{attrs:{to:"/singer","active-class":"active"}},[s("span",[this._v("歌手")])]),this._v(" "),s("router-link",{attrs:{to:"/search","active-class":"active"}},[s("span",[this._v("搜索")])])],1)])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",[s("i",{staticClass:"logo"}),this._v("exclusive music")])}]};var b=e("Z0/y")({name:"",data:function(){return{}},methods:{}},w,!1,function(t){e("MX7Y")},"data-v-c5a9ac46",null).exports,M={name:"",data:function(){return{}},props:{title:{type:String,default:"加载中..."},state:{type:Boolean,default:!0}},methods:{}},P={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{directives:[{name:"show",rawName:"v-show",value:this.state,expression:"state"}],staticClass:"loading"},[s("i",{staticClass:"icon"}),this._v(" "),s("span",{staticClass:"text",domProps:{textContent:this._s(this.title)}})])},staticRenderFns:[]};var A=e("Z0/y")(M,P,!1,function(t){e("DAo7")},"data-v-0349c07e",null).exports,q="https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1520251216593",D="https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2018-03-05&topid=4&type=top&song_num=30&g_tk=369502886&loginUin=3001526864&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&song_begin=",I=e("9/d4"),j=(e("aYy2"),{name:"",data:function(){return{slider:[],topList:[],myScroll:null,topListLength:0,loadingState:!0,tContent:"歌曲列表加载..."}},computed:o()({},Object(g.b)(["getSongListArr"])),mounted:function(){this._getSlider(),this._getTopList(),this.$nextTick(function(){var t=this;this.myScroll=new d.a(".index-wrapper",{scrollY:!0,click:!0,pullUpLoad:{threshold:-50}}),this.myScroll.on("pullingUp",function(){t.loadingState=!0,t._getTopList(),t.myScroll.finishPullUp(),t.myScroll.refresh()})})},filters:{getTime:function(t){var s=t%60;return parseInt(t/60)+"分"+(s=s<10?"0"+s:s)}},methods:o()({_getSlider:function(){var t=this;l()(q,{param:"jsonpCallback"},function(s,e){t.slider=e.data.slider,t.$nextTick(function(){new I.a(".swiper-container",{loop:!0,autoplay:{delay:3e3},pagination:{el:".swiper-pagination",type:"bullets",bulletClass:"bullet",bulletActiveClass:"bullet-active"}})})})},_getTopList:function(){var t=this,s=this.topList.length;this.topListLength=this.topList.length;var e=D+s;l()(e,{param:"jsonpCallback"},function(s,e){t.topList=t.topList.concat(e.songlist),t.loadingState=!1})},playAddMusic:function(t){var s=this,e=t.data;t={musicData:e},this.setCurSong(t),this.setPalyState(!1);var i=this.getSongListArr,n=0;i.forEach(function(e,i){e.musicData.songid==t.musicData.songid&&(n++,s.setCurIndex(i))}),n<=0&&(this.setCurIndex(i.length),this.setSongListArr(t)),this.$router.push({path:"/playMusic/"+t.musicData.songmid+"/"+t.musicData.albummid})}},Object(g.c)({setCurSong:"setCurSong",setSongListArr:"setSongListArr",setCurIndex:"setCurIndex",setPalyState:"setPalyState"})),components:{HeaderTab:b,Loading:A}}),T={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"index"},[e("HeaderTab"),t._v(" "),e("div",{staticClass:"wrapper index-wrapper"},[e("div",{staticClass:"content"},[e("div",{staticClass:"slider"},[e("div",{staticClass:"swiper-container"},[e("div",{staticClass:"swiper-wrapper"},t._l(t.slider,function(t,s){return e("div",{key:s,staticClass:"swiper-slide"},[e("img",{attrs:{src:t.picUrl}})])})),t._v(" "),e("div",{staticClass:"swiper-pagination"})])]),t._v(" "),e("div",{staticClass:"top-list"},[e("h2",{staticClass:"title"},[t._v("\n\t\t\t\t\t歌曲排行榜\n\t\t\t\t")]),t._v(" "),e("div",{staticClass:"song-container"},[e("ul",t._l(t.topList,function(s,i){return e("li",{key:s.data.songid,on:{click:function(e){t.playAddMusic(s)}}},[e("div",{staticClass:"thumb"},[e("img",{attrs:{src:"https://y.gtimg.cn/music/photo_new/T002R90x90M000"+s.data.albummid+".jpg?max_age=2592000"}})]),t._v(" "),e("div",{staticClass:"text-info"},[e("h3",[t._v(t._s(s.data.songname))]),t._v(" "),e("p",[t._v(t._s(s.data.singer[0].name))])]),t._v(" "),e("div",{staticClass:"play-time"},[t._v(t._s(t._f("getTime")(s.data.interval)))])])}))])])])]),t._v(" "),e("Loading",{attrs:{title:t.tContent,state:t.loadingState}})],1)},staticRenderFns:[]};var $=e("Z0/y")(j,T,!1,function(t){e("GpHa")},null,null).exports,F="https://c.y.qq.com/v8/fcg-bin/v8.fcg?channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&g_tk=369502886&loginUin=3001526864&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0",O="https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=369502886&loginUin=3001526864&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&order=listen&begin=0&num=30&songstatus=1&singermid=",E={name:"",data:function(){return{singerList:[{index:"热门",singer:[]}],indexTool:null,showState:!1,scroll:null,loadingState:!0,tContent:"歌手列表加载...",curIndex:0}},mounted:function(){var t=this;l()(F,{param:"jsonpCallback"},function(s,e){t._getOrderSingerList(e.data.list),t.scroll=new d.a(".singer-wrapper",{scrollY:!0,click:!0,probeType:3}),t.scroll.on("scroll",function(s){for(var e=Math.abs(s.y),i=t.singerList,n=i.length-1,a=0;a<=n;a++)if(e<=i[a].distance){t.curIndex=a;break}}),t.$nextTick(function(){t._getDistance()})})},methods:{_getOrderSingerList:function(t){var s=this;this._getIndexTool(),this.singerList[0].singer=t.splice(0,10);for(var e=function(e){var i=s.indexTool[e],n={index:i,singer:[]};t.map(function(s,e){s.Findex===i&&(n.singer.push(s),t.splice(e,1))}),s.singerList.push(n)},i=1;i<=26;i++)e(i);var n=[],a=[];this.singerList.map(function(t,s){t.singer.length>0&&(a.push(t),n.push(t.index.slice(0,1)))}),this.singerList=a,this.indexTool=n,this.loadingState=!1,this.showState=!0},_getIndexTool:function(){for(var t=["热"],s=65;s<=90;s++)t.push(String.fromCharCode(s));this.indexTool=t},_getDistance:function(){var t=this,s=document.querySelectorAll(".singer-item"),e=0;this.singerList.map(function(i,n){e+=s[n].offsetHeight,t.singerList[n].distance=e})}},components:{HeaderTab:b,Loading:A}},H={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"singer"},[e("HeaderTab"),t._v(" "),e("div",{staticClass:"wrapper singer-wrapper"},[e("div",{staticClass:"content"},t._l(t.singerList,function(s,i){return t.showState?e("div",{key:i,staticClass:"singer-item"},[e("h3",[t._v(t._s(s.index))]),t._v(" "),e("ul",t._l(s.singer,function(s,i){return e("router-link",{key:i,attrs:{to:"/singer/"+s.Fsinger_mid,tag:"div"}},[e("li",[e("img",{attrs:{src:"https://y.gtimg.cn/music/photo_new/T001R150x150M000"+s.Fsinger_mid+".jpg?max_age=2592000"}}),t._v(" "),e("span",[t._v(t._s(s.Fsinger_name))])])])}))]):t._e()})),t._v(" "),t.showState?e("div",{staticClass:"index-tool"},[e("ul",t._l(t.indexTool,function(s,i){return e("li",{key:i,class:{active:t.curIndex==i},domProps:{textContent:t._s(s)}})}))]):t._e()]),t._v(" "),e("Loading",{attrs:{title:t.tContent,state:t.loadingState}})],1)},staticRenderFns:[]};var R=e("Z0/y")(E,H,!1,function(t){e("13Pz")},"data-v-1a02d7f1",null).exports,N={name:"",data:function(){return{singerDetail:{},scroll:null,thumb:"",loadingState:!0,tContent:"歌曲列表加载中..."}},computed:o()({},Object(g.b)(["getCurSong","getSongListArr"])),mounted:function(){var t=this;this.$nextTick(function(){t._getList(),t.scroll=new d.a(".list-wrapper",{scrollY:!0,click:!0})})},methods:o()({_getList:function(){var t=this,s=O+this.$route.params.sid;l()(s,{param:"jsonpCallback"},function(s,e){t.singerDetail=e.data,t.thumb='<img src="https://y.gtimg.cn/music/photo_new/T001R300x300M000'+e.data.singer_mid+'.jpg">',t.loadingState=!1})},_getBack:function(){this.$router.go(-1)},addSong:function(t){var s=this;this.setCurSong(t),this.setPalyState(!1);var e=this.getSongListArr,i=0;e.forEach(function(e,n){e.musicData.songid==t.musicData.songid&&(i++,s.setCurIndex(n))}),i<=0&&(this.setCurIndex(e.length),this.setSongListArr(t))}},Object(g.c)({setCurSong:"setCurSong",setPalyState:"setPalyState",setSongListArr:"setSongListArr",setCurIndex:"setCurIndex"})),components:{Loading:A}},U={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"singer-detail"},[e("div",{staticClass:"header"},[e("h1",[e("i",{on:{click:t._getBack}}),t._v(t._s(t.singerDetail.singer_name))])]),t._v(" "),e("div",{staticClass:"wrapper list-wrapper"},[e("div",{staticClass:"content"},[e("div",{staticClass:"list"},[e("ul",t._l(t.singerDetail.list,function(s,i){return e("router-link",{key:s.index,attrs:{to:"/playMusic/"+s.musicData.songmid+"/"+s.musicData.albummid,tag:"div"},nativeOn:{click:function(e){t.addSong(s)}}},[e("li",[e("h2",[t._v(t._s(s.musicData.songname))]),t._v(" "),e("span",[t._v(t._s(s.musicData.singer[0].name)+"-"+t._s(s.musicData.albumname))])])])}))])])]),t._v(" "),e("div",{staticClass:"thumb",domProps:{innerHTML:t._s(t.thumb)}}),t._v(" "),e("Loading",{attrs:{title:t.tContent,state:t.loadingState}})],1)},staticRenderFns:[]};var Z=e("Z0/y")(N,U,!1,function(t){e("h/k7")},null,null).exports,z="https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&uin=0&needNewCode=1&platform=h5",Y="https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&p=1&perpage=20&n=20&catZhida=1&zhidaqu=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&remoteplace=txt.mqq.all&uin=0&needNewCode=1&platform=h5&w=",B={name:"",data:function(){return{hotMusicList:[],keywords:"",searchMusicList:{},scroll:"",showState:!1}},computed:o()({},Object(g.b)(["getSongListArr"])),watch:{keywords:function(){this._searchMusic()}},created:function(){this._getHotMusic()},mounted:function(){var t=this;this.$nextTick(function(){t.scroll=new d.a(".song-wrapper",{click:!0})})},methods:o()({_getHotMusic:function(){var t=this;l()(z,{param:"jsonpCallback"},function(s,e){t.hotMusicList=e.data.hotkey.splice(0,12)})},emptySearch:function(){this.keywords=""},searchHotMusic:function(t){this.keywords=t},_searchMusic:function(){var t=this,s=Y+this.keywords;l()(s,{param:"jsonpCallback"},function(s,e){t.searchMusicList=e.data,""==t.keywords?t.showState=!1:t.showState=!0})},searchSinger:function(t){2==t.zhida.type?this.$router.push({path:"/singer/"+t.zhida.singermid}):this._tipsFadeAway()},addSong:function(t){var s=this;t={musicData:t},this.setCurSong(t),this.setPalyState(!1);var e=this.getSongListArr,i=0;e.forEach(function(e,n){e.musicData.songid==t.musicData.songid&&(i++,s.setCurIndex(n))}),i<=0&&(this.setCurIndex(e.length),this.setSongListArr(t))},_tipsFadeAway:function(){var t=document.querySelector(".tipsFadeAway");t.style.transition="",t.style.opacity="1";var s=setTimeout(function(){t.style.transition="all 2s linear",t.style.opacity="0",clearTimeout(s)},1e3)}},Object(g.c)({setCurSong:"setCurSong",setCurIndex:"setCurIndex",setSongListArr:"setSongListArr",setPalyState:"setPalyState"})),components:{HeaderTab:b}},J={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"search"},[e("HeaderTab"),t._v(" "),e("div",{staticClass:"search-wrap"},[e("div",{staticClass:"search-form"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.keywords,expression:"keywords"}],attrs:{placeholder:"搜索歌曲、歌手"},domProps:{value:t.keywords},on:{input:function(s){s.target.composing||(t.keywords=s.target.value)}}}),t._v(" "),e("i",{staticClass:"delete",on:{click:t.emptySearch}})]),t._v(" "),t.showState?t._e():e("div",{staticClass:"hotkey"},[e("h2",[t._v("热门搜索")]),t._v(" "),e("div",{staticClass:"hotkey-list"},t._l(t.hotMusicList,function(s,i){return e("span",{key:s.n,domProps:{textContent:t._s(s.k)},on:{click:function(e){t.searchHotMusic(s.k)}}})}))]),t._v(" "),e("div",{staticClass:"song-wrapper"},[e("div",{staticClass:"content"},[t.showState?e("div",{staticClass:"song-list"},[e("ul",[t.searchMusicList.zhida.type?e("li",{staticClass:"singer",domProps:{textContent:t._s(t.searchMusicList.zhida.singername)},on:{click:function(s){t.searchSinger(t.searchMusicList)}}}):t._e(),t._v(" "),t._l(t.searchMusicList.song.list,function(s,i){return e("router-link",{key:s.songid,attrs:{to:"/playMusic/"+s.songmid+"/"+s.albummid},nativeOn:{click:function(e){t.addSong(s)}}},[e("li",[t._v(t._s(s.songname)+"-"+t._s(s.singer[0].name))])])})],2)]):t._e()])])]),t._v(" "),e("div",{staticClass:"tipsFadeAway"},[t._v("\n      未搜索到该歌手信息\n  ")])],1)},staticRenderFns:[]};var V=e("Z0/y")(B,J,!1,function(t){e("3V12")},"data-v-9efcc29e",null).exports;a.a.use(L.a);var G=new L.a({routes:[{path:"/",name:"Index",component:$},{path:"/index",name:"Index",component:$},{path:"/singer",name:"Singer",component:R},{path:"/singer/:sid",name:"SingerDetail",component:Z},{path:"/playMusic/:smid/:mid",name:"PlayMusic",component:S},{path:"/search",name:"Search",component:V}]}),X=function(t){return t.playSrc},K=function(t){return t.curSong},Q=function(t){return t.palyState},W=function(t){return t.songListArr},tt=function(t){return t.curIndex},st=function(t){return t.miniState},et=function(t,s){t.playSrc=s},it=function(t,s){t.curSong=s},nt=function(t,s){t.palyState=s},at=function(t,s){t.songListArr.push(s)},rt=function(t,s){t.curIndex=s},ot=function(t,s){t.miniState=s};a.a.use(g.a);var ct=new g.a.Store({state:{playSrc:"",curSong:{},palyState:!1,songListArr:[],curIndex:0,miniState:!1},getters:i,mutations:n});a.a.config.productionTip=!1,new a.a({el:"#app",router:G,store:ct,components:{App:k},template:"<App/>"})},aYy2:function(t,s){},"h/k7":function(t,s){},kJsg:function(t,s){},p9AC:function(t,s){}},["NHnr"]);
//# sourceMappingURL=app.725cf28780f298ba29fc.js.map