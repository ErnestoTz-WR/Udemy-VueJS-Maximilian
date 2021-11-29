# 4. Monster Exercise

Exercise applying all the concepts learned previously.

## Important notes

One important concept applied here is that we can include methods that are important for the DOM manipulation inside the `Vue` object, however, other methods can be outside the object and still be called inside:

```JavaScript
// Function outside Vue object
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: []
    };
  },
    attackMonster() {
      this.currentRound++;
      // calling function
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'attack', attackValue);
      this.attackPlayer();
    }
};
```

