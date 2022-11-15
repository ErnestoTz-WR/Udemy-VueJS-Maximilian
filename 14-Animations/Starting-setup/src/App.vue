<template>
  <div class="container">
    <div class="block" :class="{ animate: animatedBlock }"></div>
    <button @click="animateBlock">Animate</button>
  </div>
  <div class="container">
    <transition
      name="para"
      @enter="enter"
      @before-enter="beforeEnter"
      @before-leave="beforeLEave"
      @leave="leave"
    >
      <p v-if="this.textIsDisplayed">This is a removable text</p>
    </transition>
    <button @click="toggleText">Show text</button>
  </div>
  <base-modal @close="hideDialog" :open="dialogIsVisible">
    <p>This is a test dialog!</p>
    <button @click="hideDialog">Close it!</button>
  </base-modal>
  <div class="container">
    <transition name="fade-button" mode="out-in">
      <button @click="showUsers" v-if="!usersAreVisible">Show users</button>
      <button @click="hideUsers" v-else>Hide users</button>
    </transition>
  </div>
  <div class="container">
    <button @click="showDialog">Show Dialog</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogIsVisible: false,
      animatedBlock: false,
      textIsDisplayed: false,
      usersAreVisible: false,
    };
  },
  methods: {
    showUsers() {
      this.usersAreVisible = true;
    },
    hideUsers() {
      this.usersAreVisible = false;
    },
    showDialog() {
      this.dialogIsVisible = true;
    },
    hideDialog() {
      this.dialogIsVisible = false;
    },
    toggleText() {
      this.textIsDisplayed = !this.textIsDisplayed;
    },
    animateBlock() {
      this.animatedBlock = true;
    },
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      let round = 1;
      const interval = setInterval(function () {
        el.style.opacity = round * 0.01;
        round++;
        if (round > 100) {
          clearInterval(interval);
          done();
        }
      }, 20);
    },
    leave(el, done) {
      let round = 100;
      const interval = setInterval(function () {
        el.style.opacity = round * 0.01;
        round--;
        if (round < 1) {
          clearInterval(interval);
          done();
        }
      }, 20);
    }
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
}
body {
  margin: 0;
}
button {
  font: inherit;
  padding: 0.5rem 2rem;
  border: 1px solid #810032;
  border-radius: 30px;
  background-color: #810032;
  color: white;
  cursor: pointer;
}
button:hover,
button:active {
  background-color: #a80b48;
  border-color: #a80b48;
}
.block {
  width: 8rem;
  height: 8rem;
  background-color: #290033;
  margin-bottom: 2rem;
  /* transition: transform 0.3s ease-out; */
}
.container {
  max-width: 40rem;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  border: 2px solid #ccc;
  border-radius: 12px;
}
.animate {
  /* transform: translateX(-150px); */
  animation: slide-fade 0.5s ease-out forwards;
}
/* .para-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}
.para-enter-active {
  transition: all 0.3s ease-out;
}
.para-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.para-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.para-leave-active {
  transition: all 0.3s ease-in;
}
.para-leave-to {
  opacity: 0;
  transform: translateY(30);
} */

.fade-button-enter-from,
.fade-button-leave-to {
  opacity: 0;
}

.fade-button-enter-to,
.fade-button-leave-from {
  opacity: 1;
}

.fade-button-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-button-leave-active {
  transition: opacity 0.3s ease-in;
}

@keyframes slide-fade {
  0% {
    transform: translateX(0) scale(1);
  }

  70% {
    transform: translateX(-120) scale(1.1);
  }

  100% {
    transform: translateX(-150px) scale(1);
  }
}
</style>
