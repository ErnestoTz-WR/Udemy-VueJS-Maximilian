# Rendering Conditional Content

This is a very common practice on Front-End, we render different content depending on the data we receive from the server or the status of the application.
 
 ## v-if, v-else & v-else-if

### v-if
 It adds a condition on the HTML. We pass the condition statement inside double quotes. Inside the quotes we have access to parameters from the Vue `data:` property.

 ```HTML
<section id="user-goals">
    <p v-if="goals.length === 0">No goals have been added yet - please start adding some!</p>
</section>
 ```

 Inside the quotes we can also execute methods as long as they return a boolean value. We can use &&(AND) ||(OR). This will be executed by JavaScript.

 ### v-else

 It has to be included right after the element containing the `v-if` (Direct neighbor element). Otherwise it will not work.

 ### v-else-if

 Similar to `v-else` it has to be applied on a direct neighbor element.

When using this structure, the elements render will be the only ones displayed and included inside the DOM, if an element does not have to be render it will be detached from the DOM and the new element will be attached.

 ## v-show

It works similar than `v-if` but in this case all elements exist on the DOM but they are displayed or hidden according to the logic.  
We only use `v-show` when we have an element which switches a lot from hidden to visible.

## v-for

In case we want to render content from a collection of data we use `v-for`

```HTML
<section id="user-goals">
    <ul>
        <li v-for="goal in goals"> {{goal}}</li>
    </ul>
</section>
```

We can see that the variable used inside the `v-for` loop can be used as well for Interpolation. However, it is only available inside the element or its children.

With `v-for` we can also get more than only the value inside the array, we can get the index. The syntax would be the following:

```HTML
<section id="user-goals">
    <ul>
        <li v-for="(goal, index) in goals"> {{goal}} is goal {{index}}</li>
    </ul>
</section>
```

Another option is to get keys and values from an object:

```HTML
<section id="user-goals">
    <ul>
        <li v-for="(value, key) in {name: 'Ernesto', age: '25'}"> {{key}}: {{value}}</li>
        <!-- Additionally we could get the index in case of necessary (value, key, index) in {name: 'Ernesto', age: '25'}"-->
    </ul>
</section>
```

## key attribute

It is necessary in order to fix a by default behavior of Vue.  
This behavior reuses elements inside the DOM in order to make the rendering efficient. It can lead to some bugs hard to identify.

It requires a unique identifier, it can be the index but in reality it is not a good option since the first element will have the same index, if the first element is deleted then the second will become the first one and so on. A good option is to identify with the content itself.

```HTML
<section id="user-goals">
    <ul>
        <li v-for="(goal, index) in goals" :key="goal"> {{goal}} is goal {{index}}</li>
    </ul>
</section>
```