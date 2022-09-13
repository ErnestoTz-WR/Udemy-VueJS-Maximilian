<template>
    <section>
        <header>
            <h1>Assigment application</h1>
        </header>
        <div class="container">
            <user-data
            @add-user="addUser"
            ></user-data>
            <ul>
                <active-user
                v-for="user in users"
                :key="user.name"
                :name="user.name"
                :age="user.age"></active-user>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    data(){
        return{
            users: [
                {
                    name: 'Ernesto',
                    age: '22'
                }
            ]
        }
    },
    methods: {
        addUser(name, age){
            const newUser = {
                name: name,
                age: age
            };
            this.users.push(newUser);
        },
        // addUser(newUser){
        //     this.users.push(newUser);
        // }
    }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

body {
  margin: 0;
  background-color: lightgray;
}
header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 2rem auto 1rem auto;
  border-radius: 10px;
  padding: 0.2rem;
  background-color: #003058;
  color: white;
  text-align: center;
  width: 90%;
  font-size: 30px;
}
.container {
    margin: 2rem auto;
    padding: 1rem;
    width: 100%;
    display: flex;
}

form {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    margin: 2rem auto;
    border-radius: 10px;
    padding: 1rem;
    background-color: #fff;
    text-align: center;
    width: 50%;
    max-width: 30rem;
    max-height: 10.75rem;
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
}

label {
    margin: 0.5rem;
    font-size: 18px;
}

input {
    margin: 0.5rem;
    padding: 0.2rem;
    width: 15rem;
}

#app ul {
  margin: 0;
  padding: 0;
  list-style: none;
  width: 50%;
}
#app li{
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    margin: 2rem auto;
    border-radius: 10px;
    padding: 0.2rem;
    background-color: #0099ff70;
    color: white;
    text-align: center;
    width: 90%;
    max-width: 30rem;
    max-height: 8rem;
    display: flex;
    justify-content: space-evenly;
}

#app button {
  font: inherit;
  cursor: pointer;
  border: 1px solid #0099ff70;
  background-color: #0099ff70;
  color: white;
  padding: 0.05rem 1rem;
  margin: 1rem auto;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
}

#app button:hover,
#app button:active {
  background-color: #0044ff70;
  border-color: #0044ff70;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}
</style>