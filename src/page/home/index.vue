<template>
  	<div class="home_container">
       <router-link to="wei3d">wei3d</router-link>
       <router-link class="" to="answer">answer</router-link>
       <router-link class="" to="scroll">scroll</router-link>
    </div>
</template>

<script>


export default {
	name: 'home',
    created(){
        
    }
}
</script>

<style lang="less" scoped>
    .home_container{
        a{
            color: white;
        }
    }
</style>
