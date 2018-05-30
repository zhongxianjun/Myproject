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

//获取当前歌曲列表数组
export const getSongListArr = (state)=>{
	return state.songListArr;
}

//获取当前歌曲列表索引
export const getCurIndex = (state)=>{
	return state.curIndex;
}

//获取当前迷你播放器状态
export const getMiniState = (state)=>{
	return state.miniState;
}
