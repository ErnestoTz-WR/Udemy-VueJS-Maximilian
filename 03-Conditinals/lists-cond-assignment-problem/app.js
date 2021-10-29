const app = Vue.createApp({
    data() {
      return { 
        goals: [],
        inputGoal: '',
        isShown: false
      };
    },
    methods: {
      addGoal () {
        this.goals.push(this.inputGoal);
      },
      listSwitcher () {
          this.isShown = !this.isShown;
      }
    }
  });
  
  app.mount('#assignment');
  