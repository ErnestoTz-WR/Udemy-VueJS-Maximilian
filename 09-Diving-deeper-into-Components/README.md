# 09 - Diving deeper into components

## Global vs Local Components

### Global

We have been registering components on a Global way by calling them on the `main.js` file. This allow us to use those components anywhere inside our application. If we have an small application it is not a problem but on bigger applications it is not optimal since Vue is required to load all components once the application is compiled.

### Local

**Local** components will be registered on a single upper component. However, the component included will not be reachable by its child components.

**Syntax**: We call the component by importing the file and then defining the component on the `components:{}` object. This will allow us to use it on the template area:

```HTML
<template>
  <div>
    <the-header></the-header>
</template>

<script>
  import TheHeader from './components/TheHeader.vue';

  export default {
    components: {
      TheHeader
    },
  }
</script>
```

> As we can see in the previous example, we only need to define the component once and we can call it with its dashed variation. `TheHeader` => `the-header`. We can even call it as `<TheHeader />` on the template area.

## Scoped Styling

Styles defined on the `<style>` area of every element will be implemented globally on every part of the application. This is not usually what we would like to see, it is better to define styles locally on the current component and that those styles do not interfere with other components.  
To achieve this we need to add the keyword `scoped` on the script tag which will make styling locally. Vue resolves this behind the scenes by adding a randomly generated attribute to each component so that it can identify them separately.

```HTML
<style scoped>
  header {
    background-color: blue;
  }
</style>
```

## Slots

It allows us to pass content which contains HTML elements. It is very useful when we have a base component such a card or modal; this component contains a styling and logic which shares with every component generated of the same type, however we can modify the content (H1,H2, buttons, etc) directly using HTML elements.
The parent component will include that information and display those elements accordingly.

```HTML
              <!-- BaseComponent -->
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  div {
  margin: 2rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
}
</style>

             <!-- Parent Component -->
<template>
  <section>
    <!-- We call here the element and what HTML content it should include -->
    <base-card>
      <header>
        <h3>{{ fullName }}</h3>
        <base-badge :type="role" :caption="role.toUpperCase()"></base-badge>
      </header>
      <p>{{ infoText }}</p>
    </base-card>
  </section>
</template>

<script>
export default {
  props: ["fullName", "infoText", "role"],
};
</script>

<style scoped>
section header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
```

### Named Slots & v-slot(#)

We can pass more than one `slot` but we need to provide a name to all of them. One of them can be unnamed, in this case it will be treated as the default slot.

**v-slot** is used to define on the parent element which HTML content belongs to what named slot.

> The short version uses only a `#` before the name of the slot.

To define a named slot we need to:

1. On the base element give a `name` on the slot.
2. Import the Element globally or locally.
3. Use the element's tag (in this case `<base-card>`).
4. Since we have named slots we need to wrap the first slot on a `<template>` tag. The default slot does not require a `template` tag but it is recommended.
5. On the template tag define which is the slot it belongs with `v-slot:`

```HTML
          <!-- Base Element -->
<template>
  <div>
    <header>
      <slot name="header"></slot>
    </header>
      <!-- default slot -->
      <slot></slot>
  </div>
</template>

        <!-- Parent Element -->
<template>
  <section>
    <base-card>
      <!-- First slot -->
      <template v-slot:header>
        <h3>{{ fullName }}</h3>
        <base-badge :type="role" :caption="role.toUpperCase()"></base-badge>
      </template>
      <!-- Second slot using # instead of v-slot: -->
      <template #default>
        <p>{{ infoText }}</p>
      </template>
    </base-card>
  </section>
</template>
```

### Slot behavior

All information included on the parent element is not reachable by the slot. The slot only has access to the information contain in itself.  
On the previous example we can see that the parent element uses `{{fullName}}` and `{{infoText}}`. Vue will determine the value of those variables before passing the elements to the slot.  
The same happens with styles defined on the parent element. If we have some `h3` styles defined on the parent element, they will not be render since the "slot" element has no access to that information. Therefore, we would need to declare those styles on the base element.

We can also use the `$slots.` to reach to the slots collection and then to any necessary element.

> This way we can also `console.log($this.$slots)`.

### Scoped Slots

It is used when we want to share information coming from one element to another but the information included on the slot requires that shared information. It creates a bridge of communication similar to props.

1. Include the variable to pass inside the `<slot>` element ("goal").
2. We can also bind that data using `v-bind` or `:`. Name the variable as we wish ("item").
3. The parent element will get that data by adding a equal sign and a given name after the `v-slot` section ("slotProps").
4. Call the desired value on the parent element using `{{}}` on the HTML tag ("slotProps.item".

```HTML
        <!-- Base element (Course Goal)-->
<template>
  <div>
    <ul>
      <li v-for="goal in goals" :key="goal">
        <slot :item="goal"></slot>
      </li>
    </ul>
  </div>
</template>

        <!-- Parent element -->
<template>
  <section>
    <course-goal #default="slotProps">
      <h1> {{ slotProps.item }}</h1>
    </course-goal>
  </section>
</template>
```

## Dynamic Components (`component`) tag

`component` can be used as any component we want, however we need to define what component it will be in which scenario.

### `<keep-alive>` tag

### `<teleport>` tag

### dialog HTML element

## Folder Structure

