# Introduction

We can use Vue for:
- Widgets - little parts on the website.
- "Single-Page-Application" - The whole is created by a view.

Vue uses a declarative approach, we just declare our goal (Where do we want dynamic data?, it should be related to what method?, etc.) and Vue will do the behind scene operations which are necessary to obtain that picture.

## `vue.createApp({});`

We control Vue by creating an object at the beginning.
This object takes `data` as it first parameter which is a function. `data` is a function; this function returns an objet, ALWAYS an object, not array, not string, not a number. Inside this function we include all the key value pairs we would like to work with.

```JavaScript
const app = Vue.createApp({
	data: function (){ 

	}
});

//data requires a function as a value. However we can also use the following syntax:

const app = Vue.createApp({
	data(){ 

	}
});

```

## `app.mount()` 

Here we can declare which is the part from the HTML file that we want to control with Vue, we cna specify this by passing an string with th proper id.

## The idea behind `data` property: 

Anything that is part of the object returned in data can now been used in the view control HTML part.
			
## Interpolation and Data Biding

**Interpolation** is executed as follows on the HTML file:

```HTML
<p>{{<name of the key inside the data vue object}}</p>
```

> In some cases Interpolation is not the best solution so we use Data Biding. 

Interpolation helps  to change information inside the tags.
	
**Data Biding**: We use it always when we want to change information from attributes of a tag:

```HTML
<a v-bind:href="">About Vue</a>
//In this case we are binding (setting) the value of the attribute 'href' to a dynamic link created in Vue.
//v-bind: will work with the attribute next to it. It will set the value inside the "".
```


## Connecting Vue to the HTML file:

1. Import Vue inside the HTML file. Create the script tag with the proper link.
2. Create `vue.CreateApp();`
3. Inside `vue.CreateApp();` return the data object which includes all the keys and properties (Information to use on the HTML file).
4. Create the `mount()` method which selects the part of the HTMl file by Id or Classes which will be binded with Vue.

**`methods`**: (Inside CreateApp object)
	
- Allows us to define functions which should execute when something happens. 
	To methods we pass a JavaScript object. Methods is a JavaScript object which is full of methods. The name of the methods is up to us.

> It is important to know that we can use all JS expressions and call functions inside both options (data binding and Interpolation).
	
## `this` key word.

All the variables define on the `data` section are part of the object `CreateApp` in order to have access to this variables we will need to use the `this` key word in order to reference to them.
> (It is like in C# they are local parameters from the object and not global from the file). *video 17*
 
If we want to give an output which should be interpreted as HTML instead of an string we need to add the following inside the tag we want to work with:

```HTML
v-html="outoutHtml" 
```


> We should not use it as default since it can create some security problems*/
	
## Creating Event listeners:

We will use the `v-on` prefix on the HTML tag which has the listened element.
Additionally, we need to specify the type of event we will be listening to and then the JavaScript code which will be executed once the event happens:

```HTML	
<button v-on:click="AddOne">Add</button>
```

> We can pass arguments just like in vanilla JS.

```HTML
<button v-on:click="AddOne(5)">Add 5</button>
```

By default the browser returns the `event` object which contains a lot of information from the event. This can be very useful for some Java Script operations.
```JavaScript
//HTML
<input type="text" v-on:input="setName"> 
//JavaScript
setName(event){ 
    this.name = event.target.value;
}
	
/* If we need to use paramaters and still we need to use the event object. We have to use the following sysntax:*/

<input type="text" v-on:input="setName($event, 'Tzompantzi')">  
	setName(event, lastName){ 
      this.name = event.target.value + ' ' + lastName;
	}
```
	
## Event modifiers:

In some cases there are some behaviors of JavaScript and the browser created by default.
	
- One of them is the case when we have a form with a button. Once we click the button, the default behavior is to send an http request to the server to reload the page. In this case we reload the whole page and this makes us lose the previous information.

- To prevent this we can use the `event.preventDefault();` in vanilla JS 
		
```JavaScript
v-on:submit.prevent="submitForm"; 
//Check *video 24*
```

## Two way binding:

It is the combination of `v-bind:` and `v-on:`
	
This means that we are listening to the input event and at the same time we are writing the value back to the input. 
This is that common that Vue has a shortcut = `v-mode:`


> Coming from the development 