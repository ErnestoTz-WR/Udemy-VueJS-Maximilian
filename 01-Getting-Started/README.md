# 1. Introduction

## What is Vue.js

Vue.js is a JavaScript framework that makes building interactive and reactive web frontend code easier.

**Reactive websites** - When a website is responsive to what the user does (clicks, hovers, writing, etc). On desktop or web applications this happens almost instantly because the User Interface is install on the device, but on web applications the first approach is that every time the user clicks on something it would render another page. This creates another http request, waits for it and then shows the data; this means more time and resources.

## Ways of using Vue.js

We can use Vue for:

- **"Widgets"** - little parts on the website.
- **"Single-Page-Application"** - The whole is created by a view.

Vue uses a declarative approach, we just declare our goal (Where do we want dynamic data?, it should be related to what method?, etc.) and Vue will do the behind scene operations which are necessary to obtain that picture.

## Vue object

`Vue` is a global object, its method `createApp()` will take control of the application.  
This object takes `data` as it first parameter which is a function. `data` is a function; this function returns an objet, ALWAYS an object.

> **Inside `data` we include all the key value pairs we would like to work with.**

```JavaScript
Vue.createApp({
	data: function (){
		goals: [],
		enteredValue: ""
	}
});

//data requires a function as a value. However we can also use the following syntax:

Vue.createApp({
	data(){
	goals: [],
	enteredValue: ""
	}
});

// On the HTML file we will have to bind the element to the Vue object

<input type="text" id="goal" v-model="enteredValue">
```

## `v-model`

This is not a default attribute, it is only understood by Vue. It creates a connection between Vue and the HTML element.

## `methods:{}` key (Inside `CreateApp()`)

Allows us to define functions which should execute when something happens.

Methods is a JavaScript object which is full of methods.

```JavaScript
Vue.createApp({
	data(){
		goals: [],
		enteredValue: ""
	},
	methods:{
		addGoal(){
			this.goal.push(this.enteredValue);
		}
	}
});
```

## `v-on` Vue attribute

It is used for specific events, for example `click`, `scroll`, `hover`, etc.  
It is declared on the html element bind to the Vue object.

```HTML
<button v-on:click="addGoal">Add goal </button>
```

## v-for Vue Attribute

It will be in charged of looping on an specified collection.  
It is used on the HTML file.

```HTML
<ul>
	<li v-for="goal in goals"></li>
</ul>
<!-- We don't have to specify how many objects. We only define the desire result, which in this case is a list element. Vue will add as many as included on the collection.-->
```

## `app.mount()`

Here we can declare which is the part from the HTML file that we want to control with Vue, we can specify this by passing an string with the proper id.

```JavaScript
Vue.createApp({
  data() {
    return {
      goals: [],
      enteredValue: ''
    };
  },
  methods: {
    addGoal() {
      this.goals.push(this.enteredValue);
      this.enteredValue = '';
    }
  }
}).mount('#app');
```
