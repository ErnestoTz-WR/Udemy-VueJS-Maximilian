const app = Vue.createApp({
  data() {
    return { 
      goals: [],
      inputGoal: ''
    };
  },
  methods: {
    addGoal () {
      this.goals.push(this.inputGoal);
    },
    removeGoal (index) {
      this.goals.splice(index,1);
    }
  }
});

app.mount('#user-goals');
