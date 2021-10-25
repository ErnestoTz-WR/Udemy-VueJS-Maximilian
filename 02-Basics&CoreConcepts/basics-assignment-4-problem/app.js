const app = Vue.createApp({
    data (){
        return{
            classInput: '',
            visibleSwitcher: true,
            backgroundInput: ''
        }
    },
    methods: {
        changeClass (){
            console.log(this.visibleSwitcher);
            this.visibleSwitcher = !this.visibleSwitcher;
        }
    }
});

app.mount('#assignment');