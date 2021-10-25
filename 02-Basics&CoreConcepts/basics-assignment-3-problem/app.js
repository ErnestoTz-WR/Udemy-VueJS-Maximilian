const app = Vue.createApp({
    data() {
      return {
        counter: 0
      };
    },
    methods: {
      add(num) {
        this.counter = this.counter + num;
      }
    },
    computed: {
        updateResult () { 
            if (this.counter < 37 ) {
                console.log(this.counter);
                return 'Not there yet';
            } else if (this.counter > 37 ) {
                console.log(this.counter);
                return 'Too much!';
            }else {
                console.log(this.counter);
                return this.counter;
            }
        }
    },
    watch: {
        counter (value) {
            let that = this;
            setTimeout(function () {
                that.counter = 0;
            }, 10000)
        }
    }
  });
  
  app.mount('#assignment');