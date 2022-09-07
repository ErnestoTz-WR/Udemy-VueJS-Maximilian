<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <section>
    <header><h1>My Friends</h1></header>
    <ul>
      <!-- Version 1 -->
      <FriendComponent></FriendComponent>
      <FriendComponent></FriendComponent>
      <FriendComponent></FriendComponent>
      
      <!-- Version 2 -->
      <!-- <friend-component></friend-component>
      <friend-component></friend-component>
      <friend-component></friend-component> -->
    </ul>
  </section>
</template>


<!-- Version 1 -->
<script>
// import HelloWorld from './components/HelloWorld.vue'
import FriendComponent from './components/FriendComponent.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
    FriendComponent
  }
}
</script>
<!-- Comment out the script area to deply version 2-->

<style>
@import url('https://fonts.googleapis.com/css2?family=Jost&display=swap');
</style>