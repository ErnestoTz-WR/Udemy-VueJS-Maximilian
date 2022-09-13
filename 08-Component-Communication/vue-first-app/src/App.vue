<template>
  <section>
    <header><h1>My Friends</h1></header>
    <new-friend
    @add-friend="addNewFriend"
    ></new-friend>
    <ul>
      <!-- <friend-component
      name="Ernesto Tzompantzi"
      phone-number="1231919987"
      email-address="tzompantzi@localhost.com"></friend-component>
      <friend-component
      name="Rekita Korcsog"
      phone-number="3938272615"
      email-address="reka.rica@localhost.com"></friend-component>
      <friend-component
      name="Aaron Rodgers"
      phone-number="0982635342"
      email-address="rodgers@localhost.com"></friend-component> -->
      <friend-component
      v-for="friend in friends"
      :key="friend.id"
      :id="friend.id"
      :name="friend.name"
      :phone-number="friend.phoneNumber"
      :email-address="friend.emailAddress"
      :is-favorite="friend.isFavorite"
      @toggle-favorite="toggleFavoriteStatus"
      @delete-friend="deleteFriend"></friend-component> 
    </ul>
  </section>
</template>

<script>
export default ({
  data() {
    return{
      friends: [
        {
          id: 1,
          name: "Ernesto Tzompantzi",
          phoneNumber: "1231919987",
          emailAddress: "tzompantzi@localhost.com",
          isFavorite: true
        },
        {
          id: 2,
          name: "Ilse Moreno",
          phoneNumber: "029384787",
          emailAddress: "moreno@localhost.com",
          isFavorite: false
        },
        {
          id: 3,
          name: "Reka Korcsog",
          phoneNumber: "46392047456",
          emailAddress: "korcsog@localhost.com",
          isFavorite: true
        },
      ]
    }
  },
  methods: {
    toggleFavoriteStatus(friendID){
      const identifiedFriend = this.friends.find(friend => friend.id === friendID);
      identifiedFriend.isFavorite = !identifiedFriend.isFavorite;
    },
    addNewFriend(newFriend){
      // CRUD: add element
      const lastElement = this.friends.slice(-1);
      newFriend.id = lastElement[0].id + 1;
      // console.log(newFriend);
      this.friends.push(newFriend);
    },
    deleteFriend(friendID){
      const identifiedFriend = this.friends.find(friend => friend.id === friendID);
      const friendIndex = this.friends.indexOf(identifiedFriend);
      this.friends.splice(friendIndex,1);
    }
  }
})
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Jost&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Jost', sans-serif;
}

body {
  margin: 0;
}

header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 3rem auto;
  border-radius: 10px;
  padding: 1rem;
  background-color: #58004d;
  color: white;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}

#app ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

#app li,
#app form{
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}

#app h2 {
  font-size: 2rem;
  border-bottom: 4px solid #ccc;
  color: #58004d;
  margin: 0 0 1rem 0;
}

#app button {
  font: inherit;
  cursor: pointer;
  border: 1px solid #ff0077;
  background-color: #ff0077;
  color: white;
  padding: 0.05rem 1rem;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
}

#app button:hover,
#app button:active {
  background-color: #ec3169;
  border-color: #ec3169;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}
</style>