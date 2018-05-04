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