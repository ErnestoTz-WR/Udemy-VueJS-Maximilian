# 10 Practice Project

This project allows the user to 



## Notes

### base-button behavior

In the case of BaseButton.vue it is a single button tag which is able to implement properties and event listeners which are inherit from the button element.
In this case we do not need to create `$emit` in order to have that communication.
We never define what to do on `on-click` for the `base-button` element, however since `base-button` only contains a single `button` element it inherits those properties.

### possible problem with using `<component>`

On `TheResources` we created a `<component>` element which can change between `AddResources` and `StoreResources`. In the same file we have the `storedResources` array which contains all the necessary information. This information is required on `storedResources`, however, since we are using the `<component>` tag it is not possible to pass this information with props.

> We solve this by using `provide` and `inject`.

We could alternatively used `v-if` and switch between components, this way we can also define all props and emits on every component.

### provide & inject

We can also provide a method and inject it into another component.
See `TheResources.vue` and `AddResources.vue`

### `refs` instead of `v-model`
On `AddResources.vue` we bind the inputs to `refs` instead of using parameters and `v-model`.