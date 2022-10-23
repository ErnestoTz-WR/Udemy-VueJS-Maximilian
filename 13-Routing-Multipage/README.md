# 13 Routing Multi-page Application

Routing is used when building Single Page Applications, in this scenario it is likely that we will need to update the url according the section the user is located at.   
For this we need to include a new package which will allow us to split our application into different "Views". We can reference to those different views and update the url accordingly.

## Steps to use Routing

1. Install a new package: `npm install --save vue-router@next`
2. Go to main.js and import `{createRouter} from 'vue-router'`
3. Instantiate the router on main.js
4. Use `createWebHistory` to have access to the browsers history and be able to redirect users to different parts of the application (if they click on go back or forward).
5. Include the router on the Vue App with `app.use()`.
6. Define inside the array which are the routes we need for the application.
7. Import the components and add them accordingly to the routes.
8. Use the `<router-view>` element on the place wwe want to include those components rendered by the Vue router (This is usually on the `App.vue` file or `index.vue` since probably we are centrally controlling the App from this point.)

```JavaScript
import { createApp } from 'vue';
import {createRouter, createWebHistory} from 'vue-router'

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue'
import UsersList from './components/users/UsersList.vue'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/teams', component: TeamsList},
    { path: '/users', component: UsersList},
  ]
})

app.use(router);

app.mount('#app');
```
## `<router-link>`

This is a special component which will allow us to navigate on the routes declare on the router.
Wherever we need to link a new view managed by the router we will use this element instead of a button, link or any element we are configuring.

> In this project we use `<router-link>` inside the navigation bar which will display the correct view.

The most important attribute is `to='/-path I want to go to-'`

`<router-link>` is an anchor element under the hood (`<a>`) this will help us if we want to change the styling of the `<router-link>` element.

### Styling active `<router-link>`

Vue will create and assign by default 2 classes: 
- `router-link-active`: Uses single routing once the user is on that path.
- `router-link-exact-active`: Uses nested routing.

We can refer to those classes on css and configure any styling we would like to apply.

We can also change this default naming on the router object by adding:

```JavaScript
const router = {
  linkActiveClass: '-any name we want to use-'
}
```
We would refer the previous examples as: 

```CSS
a.router-link-active {
  color: #f1a80a;
  border-color: #f1a80a;
  background-color: #1a037e;
}

/* By changing the default naming to 'active': */
a.active {
  color: #f1a80a;
  border-color: #f1a80a;
  background-color: #1a037e;
}
```

## Navigating programmatically

It is used when we have a button whit some method, once that action is done we might redirect the user to a different part of our application. In this case we will use router in a different way, we need to push a new path to the history. We do that by using `this.$router.push()`.   
`this.$router` is an available object since we imported the package. It contains other methods which can be useful (`beck()`, `forward()`, etc.)

## Dynamic segments inside a path

It is very common that we would like to give dynamic information inside the url (a dynamic id).
In order to provide that information on the router we need to update the router settings as follows. 

1. On the router object we need to add the path with an additional `:` and the name of the dynamic value.

```JavaScript
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/teams', component: TeamsList},
    { path: '/users', component: UsersList},
    { path: '/teams/:teamId', component: TeamMembers} // Dynamic path
  ],
  linkActiveClass: 'active'
})
```
> When declaring paths inside the router object, we should always declare all static paths first and then dynamic ones.

2. Use `<router-link>` with the dynamic value required by binding `:to="path"+value`.

```JavaScript
<template>
  <li>
    <h3>{{ name }}</h3>
    <div class="team-members">{{ memberCount }} Members</div>
    <router-link :to="'/teams/'+id" >View Members</router-link>
  </li>
</template>
```

For rendering the selected element by the user we use `this.$route`, it contains information of the current route.   
`this.$route.params` holds all the route parameters that were used for getting to this page. (In the project we use a teamId parameter to identify which tram the user clicked on).

```JavaScript
renderingSelectedElement() {
  const teamId = this.$route.params.teamId;
  const selectedTeam = this.teams.find( team => team.id === teamId);
  const members = selectedTeam.members;
  const selectedMemebers = [];
  for (const member of members) {
    const selectedUser = this.users.find( user => user.id === member)
    selectedMemebers.push(selectedUser);
  }
  this.members = selectedMemebers;
  this.teamName = selectedTeam.name;
}
```

There is a bug coming from the previous code. In some cases the user interface will not be updated when clicking on the path. this happens because Vue is unable to follow all changes on the path coming from `this.$route`.   
To solve this we need to add a watcher to `this.$route`, this way Vue will update on every update.

```JavaScript
methods: {
  loadTeamMembers(route) {
    const teamId = route.params.teamId;
    const selectedTeam = this.teams.find(team => team.id === teamId);
    const members = selectedTeam.members;
    const selectedMemebers = [];
    for (const member of members) {
      const selectedUser = this.users.find(user => user.id === member)
      selectedMemebers.push(selectedUser);
    }
    this.members = selectedMemebers;
    this.teamName = selectedTeam.name;
  }
},
watch: {
  $route(newRoute) {
    this.loadTeamMembers(newRoute);
  }
},
created() {
  this.loadTeamMembers(this.$route);
}
```

### Dynamic using props

To make our components reusable, we should pass the dynamic parameter as prop. That would not make us rely on `$route` which can be different in certain cases.    
The code should look as follows:

```Javascript
export default {
  inject: ['users', 'teams'],
  props: ['teamId'],
  components: {
    UserItem
  },
  data() {
    return {
      teamName: '',
      members: [],
    };
  },
  methods: {
    loadTeamMembers(teamId) {
      const selectedTeam = this.teams.find(team => team.id === teamId);
      const members = selectedTeam.members;
      const selectedMemebers = [];
      for (const member of members) {
        const selectedUser = this.users.find(user => user.id === member)
        selectedMemebers.push(selectedUser);
      }
      this.members = selectedMemebers;
      this.teamName = selectedTeam.name;
    }
  },
  watch: {
    teamId(newId) {
      this.loadTeamMembers(newId);
    }
  },
  created() {
    this.loadTeamMembers(this.teamId);
  }
};

```
In order to make this happen we only need to add `props: true` on the path definition inside the router object. It tells that the dynamic parameter inside the route should be passed to the component as a prop rather than just on the `$route`

```JavaScript
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/teams', component: TeamsList},
    { path: '/users', component: UsersList},
    { path: '/teams/:teamId', component: TeamMembers, props: true}
  ],
  linkActiveClass: 'active'
})
```