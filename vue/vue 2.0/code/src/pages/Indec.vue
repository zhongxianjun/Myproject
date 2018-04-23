<template>
  <div id="content">
    <h1>{{title}}</h1>
    <Son :title="title" @child-to-parent="changeVal"></Son>
  </div>
</template>

<script>
import Son from '@/components/Son'
export default {
  name: '',
  data(){
    return {
      title:'vue2.0的使用'
    }
  },
  methods:{
    changeVal:function(val){
      this.title += val;
    }
  },
  components:{
    Son
  }
}
</script>

<style lang="scss" scoped>

</style>