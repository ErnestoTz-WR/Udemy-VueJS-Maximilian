const app = Vue.createApp({
  data() {
    return {
      myName: "Ernesto",
      myAge: 24,
      imageURL:
        "https://img.huffingtonpost.com/asset/5bae9a63200000e800ff55d8.jpeg?ops=scalefit_630_noupscale",
    };
  },

  methods: {
    createRandom() {
      return Math.random();
    },
  },
});

app.mount("#assignment");

console.log("Hola");
