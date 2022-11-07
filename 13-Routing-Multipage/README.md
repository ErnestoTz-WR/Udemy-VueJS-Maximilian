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
8. Use the `<router-view>` element on the place we want to include those components rendered by the Vue router (This is usually on the `App.vue` file or `index.vue` since probably we are centrally controlling the App from this point.)

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

```JavaScript
redirectUser() {
  this.$router.push('/teams');
}
```

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
  const selectedMembers = [];
  for (const member of members) {
    const selectedUser = this.users.find( user => user.id === member)
    selectedMembers.push(selectedUser);
  }
  this.members = selectedMembers;
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
    const selectedMembers = [];
    for (const member of members) {
      const selectedUser = this.users.find(user => user.id === member)
      selectedMembers.push(selectedUser);
    }
    this.members = selectedMembers;
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
      const selectedMembers = [];
      for (const member of members) {
        const selectedUser = this.users.find(user => user.id === member)
        selectedMembers.push(selectedUser);
      }
      this.members = selectedMembers;
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

## Redirecting and catching all routes

### `redirect` & `alias`

Inside the `router` object we can redirect a path in case we want to display a view we already imported. As the name implies the user will be actually redirected and the path will change (in this case from `localhost/` to `localhost/teams`)

```JavaScript
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams'}, // Using redirect
    { path: '/teams', component: TeamsList},
    { path: '/users', component: UsersList},
    { path: '/teams/:teamId', component: TeamMembers, props: true}
  ],
  linkActiveClass: 'active'
})
```

Alternatively we can use `alias` to identify a path with a different address, but this will not redirect the user which might be a downside in our application. 

```JavaScript
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/teams', component: TeamsList, alias: '/'}, // Here we defined the alias
    { path: '/users', component: UsersList},
    { path: '/teams/:teamId', component: TeamMembers, props: true}
  ],
  linkActiveClass: 'active'
})
```

### Catch invalid routes

We can define at the end a dynamic path which will catch all other routes. We can then redirect the user to a **"Not found"** page.

```JavaScript
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams'},
    { path: '/teams', component: TeamsList},
    { path: '/users', component: UsersList},
    { path: '/teams/:teamId', component: TeamMembers, props: true},
    { path: '/:notFound(.*)', component: NotFound}
  ],
  linkActiveClass: 'active'
})
```

## Nested Routes

It is like having a router inside another router.
For this we will have to:

1. On the `router` object we have to define `children` on a specific path. 
2. On the children object we can specify new paths same way as before. That route will be reach by the parent path + whatever we define. (In this case `:teamId`)
3. Declare a new `<router-view>` inside the parent component (In this case inside `TeamsList`).

```JavaScript
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    { path: '/teams', 
      component: TeamsList, 
      children: [ // 1.
        {path: ':teamId', component: TeamMembers, props: true} //2.
      ]},
    { path: '/users', component: UsersList },
    { path: '/:notFound(.*)', component: NotFound },
  ],
  linkActiveClass: 'active',
});
```

Summary: we can have another router inside, we need to declare child routes and their children elements. The big view will not change only on that part controlled by the inner `<router-view>`.


## Location objects and Named routes

We can assign a name for every route. It has to be a string.
Once we call them on the `this.$router` object we can call the path by its name.
The biggest advantage using this way is that our code becomes more scalable, readable and maintainable.

```JavaScript
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    { name: 'teams'
      path: '/teams', 
      component: TeamsList, 
      children: [ // 1.
        {name: 'team-members', path: ':teamId', component: TeamMembers, props: true} //2.
      ]},
    { path: '/users', component: UsersList },
    { path: '/:notFound(.*)', component: NotFound },
  ],
  linkActiveClass: 'active',
});

/// -----> We can call this on this.$router as follows: <------------
this.$router.push({name: 'team-members', params: {teamId: this.id}});
```

## Query parameters

*Query Parameters** are used to get extra information from the path. They are optional.   
It starts with a `?`. E.g. (`localhost.com/desktop/information?sort=asc`).

We can extract them from the component that is loaded, there is no need to declare them on the main router object.

We can extract them by using `this.$route.query`, this extracts all those query parameters.

## Multiple `<router-view>` on the same level

We can use multiple `<router-view>` on the same component by naming those views and define them on the router object. We do this by using `components` as an object:

```JavaScript
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    { name: 'teams'
      path: '/teams', 
      components: { // Here we define multiple views
        default: TeamsList,
        footer: TeamsFooter
        }, 
      children: [ 
        {name: 'team-members', path: ':teamId', component: TeamMembers, props: true}
      ]},
    { path: '/users', component: UsersList },
    { path: '/:notFound(.*)', component: NotFound },
  ],
  linkActiveClass: 'active',
});
```

On the HTML element we have to name those views similar than in a slot:

```HTML
<template>
  <router-view></router-view>
  <ul>
    <teams-item
      v-for="team in teams"
      :key="team.id"
      :id="team.id"
      :name="team.name"
      :member-count="team.members.length"
    ></teams-item>
  </ul>
  <footer>
    <router-view name="footer"></router-view>
  </footer>
</template>
```

The logic is similar than it slots.   
With this we can have a more complex structure for our applications.

## Scroll Behavior

We can control the user behavior from the router object by adding the method `scrollBehavior()`; it requires 3 arguments: `(to, from, savedPosition)`:
- to: refers to the page we are going to.
- from: refers to the page we came from.
- savedPosition: stores the previous position (x,y) that the user was at before leaving the previous page.

By using this we can improve the user experience greatly since we can redirect their position to exactly the part we want them to see or they were before.

```JavaScript
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    { name: 'teams'
      path: '/teams', 
      components: { 
        default: TeamsList,
        footer: TeamsFooter
        }, 
      children: [ 
        {name: 'team-members', path: ':teamId', component: TeamMembers, props: true}
      ]},
    { path: '/users', component: UsersList },
    { path: '/:notFound(.*)', component: NotFound },
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if(savedPosition) {// we checked if it exist.
      return savedPosition;
    }
    return { left: 0, top: 0}
  }
});
```

## Navigation guards

They are useful for: 
- Authentication: We want to avoid a certain route for a user if they are not authenticated.
- Be aware of changing pages: In case we want to run some code once the user changes from pages.
- User safety: If we have a form and want to make sure that the user does not accidentally goes to another page where they hae unsafe edits.

### beforeEach()

`router.beforeEach(function(to, from, next))` this method is applied on the router object (main.js).
`beforeRouteUpdate()` this method is applied on the component.

### afterEach()

`router.afterEach(function(to, from, next))` this method is applied on the component.

`beforeRouteLeave(to,from,next)` this method is used on the component and it is very useful when we have a form and want to avoid leaving the page with unsaved changes.

## Route Metadata

the `meta` property accepts any type of data (objects, arrays, etc).

One of the best examples to use metadata is when we need the user to authenticate login details for accessing a page.    
Example on video [187](https://www.udemy.com/course/vuejs-2-the-complete-guide/learn/lecture/21879416#overview)


## Organizing route files

We can have a distinction between the components which are displayed by the router (pages/views) and other components.

It is also a great practice to have all router logic ino another file.