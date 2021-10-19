# Basic Concepts and DOM Interaction

## Importing Vue

We can import the framework on the HTML file using the following tag:

```HTML
<script src="https://unpkg.com/vue@next" defer></script>
```

## Connecting Vue to the HTML file

1. Import Vue inside the HTML file. Create the script tag with the proper link.
2. Create `vue.CreateApp();`
3. Inside `vue.CreateApp();` return the data object which includes all the keys and properties (Information to use on the HTML file).
4. Create the `mount()` method which selects the part of the HTMl file by Id or Classes which will be bound with Vue.

## `app.mount()`

Here we can declare which is the part from the HTML file that we want to control with Vue, we can specify this by passing an string with the proper id.

> If we control one HTML element with Vue we also have control over its child elements.

```JavaScript
app.mount("#events");
```

## The idea behind `data` property

Anything that is returned by the `data` object can be used inside the HTML part controlled by Vue.

## Interpolation and Data Biding

#### **Interpolation**

It is controlled by Vue using an specific type of syntax. This syntax would not be understood by HTML or JavaScript alone.  
We need to use double curly braces ``{{}}`` on the HTML element and then use the variable which should be render by Vue.  
Interpolation is used to modify content inside HTML elements, we will use data binding to modify HTML attributes.

```HTML
<!-- HTML file-->
<section id="user-goal">
	<p>{{courseGoal}}</p>
```

```JavaScript
//JavaScript file
const app = Vue.createApp({
  data() {
    return {
      courseGoal: "Finish the course and learn Vue."
	}
});
app.mount("#user-goal");

// This will bind the <p> element to the courseGoal variable.
```

> The `{{}}` syntax is only available inside HTML elements, if we want to use it to declare a class or an HTML attribute this syntax won't work.

With Interpolation we can also execute JavaScript logic or call methods. However we can't write complex code inside.

```HTML
<!-- This is possible-->
<section id="user-goal">
	<p>{{Math.random()}}</p>
```
### **Data Biding**

We use it when we want to change information from HTML attributes. 

The way in which we can bind (set) attributes with Vue is by using the syntax `v-bind:`.

`v-bind:` will work with the attribute next to it. It will set the value inside the quotes `"<VueProperty>"`.

```HTML
<!-- HTML file-->
<section id="user-goal">
	<a v-bind:href="vueLink">About Vue</a>
```

```JavaScript
// JavaScript file
const app = Vue.createApp({
  data() {
    return {
      vueLink: "https://vuejs.org/"
	}
});
app.mount("#user-goal");
```

## **`methods:`** (Inside Vue object)

Allows us to define functions which will be used inside the application.

`methods` is a JavaScript object which is full of functions.

### How to call `methods:` with Interpolation

```HTML
<!-- HTML file-->
<section id="user-goal">
	<p>{{outputGoal()}}</p>
```

```JavaScript
const app = Vue.createApp({
  methods:{
    outputGoal(){
      const randomNumber = Math.random();
      if(randomNumber < 0.5){
         return "Finish the course and learn Vue.";
      } else {
        return "Master Vue and get a job!";
      }
    }
  }
});
app.mount("#user-goal");
```

### `this` key word on `methods`

All the variables defined on the `data` section are part of the `Vue` object, in order to have access to this variables we will need to use the `this` key word to reference to them.

```JavaScript
const app = Vue.createApp({
  data() {
    return {
      courseGoalA: "Finish the course and learn Vue.",
      courseGoalB: "Master Vue and get a job!"
    };
  },
  methods:{
    outputGoal(){
      const randomNumber = Math.random();
      if(randomNumber < 0.5){
        // In order to use the variables specified on data we need the key word this
         return this.courseGoalA; 
      } else {
        return this.courseGoalB;
      }
    }
  }
});
app.mount("#user-goal");
```
## `v-html` - Passing raw HTML elements with Vue

If we want to give an output which should be interpreted as HTML instead of an string we need to add the `v-html` attribute.

```HTML
<!-- HTML file-->
<div v-html="courseGoalC"></div>
```

```JavaScript
// JavaScript file
const app = Vue.createApp({
  data() {
    return {
      courseGoalC: '<h2>This is a header from Vue</h2>'
    };
  }
});
app.mount("#user-goal");
```

> We should not use it as default since it can create some security problems

## Creating Event listeners
### `v-on` Vue attribute

It is declared on the html element which should be modified by Vue.
It can be used to listen all events which are available for JavaScript, for example `click`, `scroll`, `mouseenter`, etc.  
As the parameter, we need to specify the type of event we will be listening to and then the JavaScript code which will be executed once the event happens.

```HTML
<!-- v-on:<type of event>="code to be executed" -->
<button v-on:click="AddOne">Add</button>
```

> We can pass arguments just like in vanilla JS.

```HTML
<button v-on:click="AddOne(5)">Add 5</button>
```

### Using the `event` object on Vue

By default the browser returns the `event` object every time we use an event, this object contains a lot of information from the event itself.

```HTML
<input type="text" v-on:input="setName"> 
```
```JavaScript
//JavaScript
setName(event){ 
    this.name = event.target.value;
    // this gives us access tot the value inside the input tag.
}
```

> If we need to use parameters and still we need to use the event object. We have to use the `$event` parameter firstly.

```HTML
<input type="text" v-on:input="setName($event, 'Tzompantzi')">  
```

```JavaScript
setName(event, lastName) {
   this.name = event.target.value + ' ' + lastName; 
   }
```

## Vue modifiers

### Event modifiers

In some cases there are some behaviors of JavaScript and the browser created by default.

One of them is the case when we have a form with a button. Once we click the button, the default behavior is to send an http request to the server to reload the page. In this case we reload the whole page and this makes us lose the previous information.  
To prevent this we can use:
1.  `event.preventDefault();` in vanilla JS.

```HTML
<form v-on:submit="submit">
  <input type="text">
  <button> Sign up</button>
</form>
```

```JavaScript
const app = Vue.createApp({
  methods: {
    submit(event){
      event.preventDefault(); // Here is the modifier.
      console.alert('Submit!');
    }
});
app.mount("#user-goal");
```

2. Event modifiers from Vue. I will indicate the type of modifier right after calling the method to use on `v-on:`. It is basically the same than the previous case but with less code.

```HTML
<form v-on:submit="submit.prevent"> <!-- HERE is where I can specify the modifier -->
  <input type="text">
  <button> Sign up</button>
</form>
```

```JavaScript
const app = Vue.createApp({
  methods: {
    submit(){
      console.alert('Submit!');
    }
});
app.mount("#user-goal");
```
We can also use this modifiers for other type of events.  
In the following case the `click` event will be only triggered when the user clicks with the right button.

```HTML
<button v-on:click.right="AddOne(5)">Add 5</button>
```

### Key modifiers

This will be triggered by keyboard events. For example we only want to execute a function once the enter button is pressed.  
For this we will bind to the `keyup` event and use the `enter` modifier.

```HTML
<input type="text" v-on:keyup.enter="setName">
```

## `v-once`

It is used in case we have an scenario in which we have some data that changes, we want to preserve the initial state and not reflect any other changes we can use `v-once`

```HTML
<!-- Will be always dynamic and render every time counter is change -->
<p>Current counter: {{counter}}</p>

<!-- Will only render the first change of counter event if it changes later on -->
<p v-once> Initial counter: {{counter}}</p>
```
## Two way binding

It is the combination of `v-bind:` and `v-on:`

This means that we are listening to the input event and at the same time we are writing the value back to the input.
This is that common that Vue has a shortcut = `v-mode:`

> Coming from the development.
