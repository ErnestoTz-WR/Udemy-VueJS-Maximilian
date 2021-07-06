const app = Vue.createApp({
  data() {
    return {
      courseGoalA: "Finish the course and learn Vue.",
      courseGoalB: "Master Vue and get a job!",
      courseGoalC: '<h2>This is a header from Vue</h2>',
      vueLink: "https://vuejs.org/"
    };
  },
  methods:{
    outputGoal(){
      const randomNumber = Math.random();
      if(randomNumber < 0.5){
        // In order to use the variables specified before we need the key word this
         return this.courseGoalA; 
      } else {
        return this.courseGoalB;
      }
    }
  }
});
app.mount("#user-goal");
