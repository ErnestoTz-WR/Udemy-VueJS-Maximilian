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

This means that we are listening to the input event and at the same time we are writing the value of a variable.
This is that common that Vue has a shortcut = `v-model:`

### Using `v-on` and `v-bind`

```HTML
<!-- We would need to bind the variable "name" and to call the method "setName" on the input element -->
<input type="text" v-bind:value="name" v-on:input="setName">
<button v-on:click="resetInput">Reset Input</button>
<p>Your Name: {{ name }}</p>
```

```JavaScript
//We need to create the variable "name" and the method "setName"
const app = Vue.createApp({
  data() {
    return {
      name: ''
    };
  },
  methods: {
    setName() {
      this.name = event.target.value;
    },
    resetInput(){
      this.name = '';
    }
  }
});

app.mount('#events');
```

### Using `v-model`

```HTML
<!-- We only need to specify on v-model the variable which will be read and written in this case "name"-->
<input type="text" v-model="name">
<button v-on:click="resetInput">Reset Input</button>
<p>Your Name: {{ name }}</p>
```

```JavaScript
//We need to create the variable "name" but the method "setName" is not necessary
const app = Vue.createApp({
  data() {
    return {
      name: ''
    };
  },
  methods: {
    resetInput(){
      this.name = '';
    }
  }
});

app.mount('#events');
```

## Performance issue for methods inside Interpolation `{{method()}}`

When we call a method inside the HTML file using interpolation, this method will be executed every time some element changes on the HTML file. Since Vue does not know if the method called on that part might or not affect the element which has been changed recently, it will just execute the method and keep those changes.

```HTML
<section id="events">
  <h2>Events in Action</h2>
  <button v-on:click="add(10)">Add 10</button>
  <p>Result: {{ counter }}</p>
  <input type="text" v-model="name">
  <button v-on:click="resetInput">Reset Input</button>
  <p>Your Name: {{ outputFullName() }}</p>
  <!-- This method will always be executed event if only the counter changes and had no effect on the name -->
</section>
```

```JavaScript
const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: ''
    };
  },
  methods: {
    add(num) {
      this.counter = this.counter + num;
    },
    resetInput(){
      this.name = '';
    },
    outputFullName(){
      return this.name + " " + "Tzompantzi";
    }
  }
});

app.mount('#events');
```
## `computed:`

`computed:` is very similar to `methods:` the difference is that Vue will be aware of dependencies inside `computed:` and only execute those functions when one of the dependencies change.  
The convention is that we name functions inside `computed:` as variables since we will most likely end up using those functions to return an output.  
This way we can call these functions on the HTML file using Interpolation without having performance issues. However it is important to mention that we need to call it as if it was a variable.

```HTML
<section id="events">
  <h2>Events in Action</h2>
  <button v-on:click="add(10)">Add 10</button>
  <p>Result: {{ counter }}</p>
  <input type="text" v-model="name">
  <button v-on:click="resetInput">Reset Input</button>
  <p>Your Name: {{ fullName }}</p>
   <!-- We don't call the method "fullName()" we only point at it, Vue will call it for us --> 
</section>
```

```JavaScript
const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: ''
    };
  },
  methods: {
    add(num) {
      this.counter = this.counter + num;
    },
    resetInput(){
      this.name = '';
    }
  },
  computed:{
    fullName(){
      return this.name + " " + "Tzompantzi";
    }
  }
});

app.mount('#events');
```

> We usually use functions inside `computed:` when want to output values. However we use `methods:` commonly using events. We bind events to `methods:` not to computed properties.

## Watchers

It is very similar to `compute:` properties. It is a function that Vue will be executed when one of its dependencies changes.  

The best way to use `watchers:` is when we want to know the status of a variable and execute some code once it reaches a define value.

We usually name `watch:` methods exactly like some variable from `data:` this will bind them together.  
The first argument of the `watch:` method will be equal to the current value of that variable.

```JavaScript
const app = Vue.createApp({
  data() {
    return {
      counter: 0,
    };
  },
  watch: {
    counter (value) {
      // value refers to the current value of counter in this case
      if (value <= 50 ) {
        this.counter = 0;
      }
    }
  }
});

app.mount('#events');
```

Other example would be sending an HTTP request when certain data changes or timers that we want to set when certain value changes.

## `methods:`, `computed:` & `watch:`

### `methods:`

They should be use for events binding or data binding, but the function will be executed every time anything on the page changes.

### `computed:`

They should be used with data binding (Interpolation) since it is aware of the dependencies and only executes the function if there was a change on the dependencies involved.

### `watch:`

Not use directly on the template. Use it with some code in reaction to some change on data. (HTTP request, etc.)

## Shorthands for `v-on:` and `v-bind:`

For `v-on` the shorthand is `@`

```HTML
<button v-on:click="add(10)">Add 10</button>
<button @click="add(10)">Add 10</button>
```

For `v-bind` the shorthand is `:`

```HTML
<input type="text" v-bind:value="name">
<input type="text" :value="name">
```

There is no shortcut for `v-model`

## Dynamic Styling

We can also change the styles of a HTML element with Vue.

For this we need to bind the CSS class or we can also bind the `style` attribute from the HTML element. We bind them using `v-bind` or its shortcut `:`

Once we bind the class or `style` attribute with Vue we can pass an object which can also execute some logic which is not complex.
### Binding `style` HTML property

```HTML
<section id="styling">
  <div class="demo"  :style="{borderColor: boxASelected ? 'red' : '#ccc'}" @click="boxSelected('A')"></div>
     <!-- In this case we use CamelCase to refer to the border-color CSS attribute. 
     IMPORTANT we use '' single quotes to return which color should be used for the border. --> 
</section>
```

### Binding CSS class

We can use a logic similar to the previous example but now using class binding

```HTML
<section id="styling">
  <div :class="{boxASelected ? 'demo active' : 'demo'}" @click="boxSelected('A')"></div>
     <!-- This will check the boxASelected property and add two classes 'demo active' if it is true, otherwise it will only add 'demo' --> 
</section>
```

However, once we bound the class of an element, Vue creates an object, this object takes as parameters classes which will be applied to the element.  
The syntax will be the following:

```HTML
<section id="styling">
  <div :class="{demo: true, active: boxASelected }", @click="boxSelected('A')"></div>
     <!-- This will check the boxASelected property, if it is true it will include the active class. --> 
</section>
```

We can also pass all the classes in an Array syntax:

```HTML
<section id="styling">
  <div :class="['demo' , {active: boxASelected}]", @click="boxSelected('A')"></div>
     <!-- This will check the boxASelected property, if it is true it will include the active class. --> 
</section>
```

Another option is that if we have classes which are not assigned dynamically we can just leave them as before.  
> We do not need to use a coma in between

```HTML
<section id="styling">
  <div class="demo" :class="{ active: boxASelected }", @click="boxSelected('A')"></div> 
</section>
```

This options allow the code to be readable, for that reason we use them more than the first presented syntax

> When we want to assign dynamically a class name which contains more than one word or it is separated by some character, we have to include it with single quotes.

```HTML
<section id="styling">
  <div class="demo" :class="{ 'active-box-article': boxASelected }", @click="boxSelected('A')"></div> 
</section>
```

We can also bind classes to computed properties. This is mostly used when we have a more complex logic when applying the class, not just a boolean value.

```HTML
<section id="styling">
  <div class="demo" :class="boxAClasses"></div> 
</section>
```

```JavaScript
const app = Vue.createApp({
  computed: {
   boxAClasses (){
     return { active : this.boxASelected };
   }
  }
});

app.mount('#styling');
```