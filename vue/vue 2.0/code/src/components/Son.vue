<template>
  <div id="">
    {{title}}
    <button @click="value">子向父传值</button>
  </div>
</template>

<script>
export default {
  name: 'Son',
  data(){
  	return {
  		newValue:'猴塞给，托里阿克托'
  	}
  },
  props:{
    title:{
      type:String,
      default:'vue2.0使用'
    }
  },
  methods:{
    value:function(){
      this.$emit('child-to-parent',this.newValue);
    }
  }
}
</script>

<style lang="scss" scoped>
  button{
    color:red;
    }
</style>