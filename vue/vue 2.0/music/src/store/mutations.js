//设置当前播放地址
export const setPlaySrc = (state,src)=>{
	state.playSrc = src;
}

//设置当前歌曲信息
export const setCurSong = (state,song)=>{
	state.curSong = song;
}

//设置当前播放状态
export const setPalyState = (state,curState)=>{
	state.palyState = curState;
}

//设置当前歌曲列表数组
export const setSongListArr = (state,song)=>{
	state.songListArr.push(song);
}

//设置当前歌曲列表索引
export const setCurIndex = (state,curI)=>{
	state.curIndex = curI;
}

//设置当前迷你播放器状态
export const setMiniState = (state,mState)=>{
	state.miniState = mState;
}