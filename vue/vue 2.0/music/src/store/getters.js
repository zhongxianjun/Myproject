//当前播放地址获取
export const getPlaySrc = (state)=>{
	return state.playSrc;
}

//获取当前歌曲信息
export const getCurSong = (state)=>{
	return state.curSong;
}

//获取当前播放状态
export const getPalyState = (state)=>{
	return state.palyState;
}
