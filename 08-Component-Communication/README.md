# 8. Components Communication

## Adding a component

With the project setup created by the vue-cli tool. It is a convention that we add a new folder called `components` which contain every file with single components.

In order to call those components we need to import them into the specific file which is using them. In case we are creating an SPA probably that will be on the `main.js` file or it can be also imported on the `App.vue` file.

> Check Version 1 and Version 2 on the [07-Better-Development-Setup](../07-Better-Development-Setup//vue-first-app/src/App.vue)

## Props

Props is short for properties, we can think about them as custom HTML attributes.  
In reality we can use custom HTML attributes but we need to make Vue aware about this.

`props` in its simplest form it takes an array.

> props need to be define in a CamelCase inside the JavaScript file. Vue can translate them into their dash version, `phoneNumber` would be translated into `phone-number`

We can use `props` as `data:` properties for Interpolation and data binding.

We use `props` to communicate from parent elements to their children.

```HTML
<template>
    <section>
        <h2> My friend</h2>
        <ul>
            <friend-contact
            name="Ernesto Tzompantzi"
            phone-number="11213 2365"
            email="ernesto@localhost.com"></friend-contact>
            <friend-contact
            name="Julie Jones"
            phone-number="108839 0952"
            email="julie@localhost.com"></friend-contact>
        </ul>
    </section>
</template>
```

```JavaScript
export default {
    props: [
        'name',
        'phoneNumber',
        'email'
    ]
    data () {
        return{
            detailsAreVisible : false,
        }
    },
    methods: {
        toggleDetails(){
            this.detailsAreVisible = !this.detailsAreVisible;
        }
    }
}
```
## Mutation of `props`

Data passed from the parent to the child element should not be mutated(changed).

```HTML
<template>
    <section>
        <h2> My friend</h2>
        <ul>
            <friend-contact
            name="Ernesto Tzompantzi"
            phone-number="11213 2365"
            email="ernesto@localhost.com"
            is-favorite="1"></friend-contact>

            <friend-contact
            name="Julie Jones"
            phone-number="108839 0952"
            email="julie@localhost.com"
            is-favorite="0"></friend-contact>
        </ul>
    </section>
</template>
```

```JavaScript
export default {
    props: [
        'name',
        'phoneNumber',
        'email',
        'isFavorite'
    ]
    data () {
        return{
            detailsAreVisible : false,
        }
    },
    methods: {
        toggleDetails(){
            this.detailsAreVisible = !this.detailsAreVisible;
        },
        toggleFavorite(){
            if(this.isFavorite === '1') {
                this.isFavorite = '0';
            } else {
                this.isFavorite = '1';
            }
        }
    }
}
```

The example above shows the `prop` `"isFavorite"` which according to its value would determine if a friend is favorite or not. We can change from `true` to `false` with a button and the `toggleFavorite()` method. However, making this is a violation of the **uni-directional** data flow.  
To solve this we can create a property inside the `data:` object and store the initial value, this will only take the initial value as a reference but we can change it as we pleased.

```JavaScript
export default {
    props: [
        'name',
        'phoneNumber',
        'email',
        'isFavorite'
    ]
    data () {
        return{
            detailsAreVisible : false,
            friendIsFavorite = this.isFavorite
        }
    },
    methods: {
        toggleDetails(){
            this.detailsAreVisible = !this.detailsAreVisible;
        },
        toggleFavorite(){
            if(this.friendIsFavorite === '1') {
                this.friendIsFavorite = '0';
            } else {
                this.friendIsFavorite = '1';
            }
        }
    }
}
```

## `props` as objects and validation

We can replace the array of props for an object. Inside this object we can specify additional information about the `prop` such as `type`, `required`, `default` or even a `validator:` which is a function that returns true or false.


```JavaScript
export default {
    // props: [
    //     'name',
    //     'phoneNumber',
    //     'email',
    //     'isFavorite'
    // ],
    props: {
        name : {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        emailAddress: {
            type: String,
            required: true
        },
        isFavorite: {
            type: String,
            required: false,
            default: '0',
            validator: function(value) {
                return value === '1' || value === '0';
            }
        }
    }
    data () {
        return{
            detailsAreVisible : false,
            friendIsFavorite = this.isFavorite
        }
    },
    methods: {
        toggleDetails(){
            this.detailsAreVisible = !this.detailsAreVisible;
        },
        toggleFavorite(){
            if(this.friendIsFavorite === '1') {
                this.friendIsFavorite = '0';
            } else {
                this.friendIsFavorite = '1';
            }
        }
    }
}
```

> `default` can also be a function which would return a value according to a more complex calculation.

If something is missing or the validator returns `false` we will get a warning ont the compiler.

Specifically, the following value types (`type` property) are supported:

+ String
+ Number
+ Boolean
+ Array
+ Object
+ Date
+ Function
+ Symbol

But `type` can also be any constructor function (built-in ones like `Date` or custom ones).

## Dynamic `prop` values

By default the way we pass information with `props` is with an string as seen previously. However we can also use dynamic values, for this we need to first use `v-bind` when passing the value (also the short version using only `:`). We need to use this syntax for passing non-string values. For example Booleans, methods, dynamic values from arrays, etc.

```HTML
<template>
    <section>
        <h2> My friend</h2>
        <ul>
            <friend-contact
            name="Ernesto Tzompantzi"
            phone-number="11213 2365"
            email="ernesto@localhost.com"
            v-bind:is-favorite="true"></friend-contact>
            <!-- Here we can apply v-bind to pass true -->
            <friend-contact
            name="Julie Jones"
            phone-number="108839 0952"
            email="julie@localhost.com"
            is-favorite="0"></friend-contact>
        </ul>
    </section>
</template>
```

We can use `v-for` in this context as following:

```HTML
<template>
    <section>
        <h2> My friend</h2>
        <ul>
            <friend-contact
            v-for="friend in friends"
            :key="friends.id"
            :name="friends.name"
            :phone-number="friends.phone"
            :email="friends.email"
            :is-favorite="true"></friend-contact>
        </ul>
    </section>
</template>
```

> When we use `v-for` in a costume component we always need to use the `key` property seen before. It is mandatory.

## `$emit` - communication from a child element to a parent.

`$emit` will emit an event from the child element, which the parent element can listen to.   
`$emit` will require at least one argument. The name of the event the parent will listen to. We could pass additional arguments, every extra argument will be understood as data passed to the parent element.

```JavaScript
this.$emit('name-of-the-costume-event',this.contactId);
```

We can use a new name which is not declared on the child component, it will be bound to a method from the parent. In this case it will be `toggle-favorite` which is bound to `toggleFavoriteStatus`, the logic will be implemented on the parent element.

> It is important to use the kebab case `toggle-favorite` inside `$emit()`

```JavaScript
// Child component
export default {
  methods: {
    toggleFavorite() {
      this.$emit('toggle-favorite', this.id);
    }
  }
};

// Parent element
<ul>
    <friend-contact
    v-for="friend in friends"
    :key="friend.id"
    :id="friend.id"
    :name="friend.name"
    :phone-number="friend.phone"
    :email-address="friend.email"
    :is-favorite="friend.isFavorite"
    @toggle-favorite="toggleFavoriteStatus"
    ></friend-contact>
</ul>

<script>
export default {
  methods: {
    toggleFavoriteStatus(friendId) {
      const identifiedFriend = this.friends.find(
        (friend) => friend.id === friendId
      );
      identifiedFriend.isFavorite = !identifiedFriend.isFavorite;
    },
  },
};
</script>
```

We use `v-on` on the parent to listen to the event created by the child element or the shortcut `@` (as in this case).

In this case Vue will update `is-favorite` (as a prop) and communicate the change to the child element so that any necessary updates can be render.

Additionally we can use `emits` which is similar to `props` in tha case of props it is mandatory but here, it is optional. This makes it obvious that our component communicates to its parent element.
## Prop / Event Fallthrough & Binding All Props

Refer to this [documentation](./adv-props.pdf)

## Component-parent logic.

It is important to understand that the component will be in charged of defining the structure and behavior (methods) on a single level. However, if it requires to modify data on a global or larger level (let's say a list of contacts, or information on the database); this will be computed by the parent component.
The child element will only `emit()` an event and return the object to be modified, the logic will be handled by the parent element.
Look at the logic on the [project created](./vue-first-app/src/App.vue).

## Potential problem

On the [assignment project](./assignment-project/src), The `UserData` component communicates to the `App` object using `$emit`, inside the emit it returns a `newUser` object which can be added to the `users` array (using `array.push(newUser)`).   
The problem with this scenario is that once the object is added to the array, `newUser` still holds a reference to the added object because of `v-model`, giving new information on the input  will modify data already added to the array (on every single object).