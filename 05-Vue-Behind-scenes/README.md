# 5. Vue Behind Scenes

## Vue Reactivity (video 60)

Vue turns our `Vue data:` object into a reactive `data:` object by warping our properties with `JavaScript proxies`

## Using more multiple Vue objects

We can create more than one `Vue` objects for our application. Those objects will have no connection between each other. They won't be able to get access to their properties, methods, watchers, etc.

## Templates

We call 'Template' to the part of the application which is controlled and computed by Vue.


## Refs

When we bind a DOM element with Vue, the binding is triggered with every keystroke. In some cases this is not necessary and we can use `ref` instead.

`Ref` is a property provided by Vue full of `key` - `value` pairs defined by us.

```HTML
<section id="app">
      <h2>How Vue Works</h2>
      <input type="text" ref="userText">
      <button @click="setText">Set Text</button>
    </section>
```

```JavaScript
const app = Vue.createApp({
  data() {
    return {
      currentUserInput: '',
      message: 'Vue is great!',
    };
  },
  methods: {
    saveInput(event) {
      this.currentUserInput = event.target.value;
    },
    setText() {
      // this.message = this.currentUserInput;
      this.message = this.$refs.userText.value;
    },
  },
});
```

We do not need to declare the `ref` property inside the `data:` object.

> All properties provided by Vue start with the dollar sign `$`