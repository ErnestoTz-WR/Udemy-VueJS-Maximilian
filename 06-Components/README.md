# 6. Components

## What is a component?

They are pieces of code which should be executed on certain parts of the HTML DOM independently of other parts.  
This can be reused on different parts but their functionality should be enclosed to the specific HTML section.  
They are also great to split the big application into multiple little applications or smaller chunks of the application.

Components can be understood as mini-apps inside the bigger app. For this reason they require an identifier. It is a common rule that we give multi-word Ids to components.

To create a component we need to:

1. Create and mount a `Vue` app.
2. Create a component with a unique ID inside the same `Vue` app.
3. Declare the component `data:`, `methods:`, etc.

```JavaScript
cnst app = Vue.createApp({
  data() {
    return {
      friends: [
        {
          id: 'manuel',
          name: 'Manuel Lorenz',
          phone: '01234 5678 991',
          email: 'manuel@localhost.com',
        },
        {
          id: 'julie',
          name: 'Julie Jones',
          phone: '09876 543 221',
          email: 'julie@localhost.com',
        },
      ],
    };
  },
});

app.component('friend-contact', {
  template: `
  <li>
    <h2>{{ friend.name }}</h2>
    <button @click="toggleDetails()">
      {{ detailsAreVisible ? 'Hide' : 'Show' }} Details
    </button>
    <ul v-if="detailsAreVisible">
      <li><strong>Phone:</strong> {{ friend.phone }}</li>
      <li><strong>Email:</strong> {{ friend.email }}</li>
    </ul>
  </li>
  `,
  data() {
    return {
      detailsAreVisible: false,
      friend: {
        id: 'manuel',
        name: 'Manuel Lorenzo',
        phone: '01234 5678 991',
        email: 'manuel@localhost.com',
      },
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
  },
});

app.mount('#app');
```
 
We do not mount the component as the 'bigger' `Vue` app instead we define a template where the component can be used.

```HTML
<section id="app">
    <ul>
    <friend-contact></friend-contact>
    <friend-contact></friend-contact>
    </ul>
</section>
```

We call that component into the HTML DOM by using the identifier we declared before, for this reason it is important to give a non default HTML name such as `H1` or `span`
