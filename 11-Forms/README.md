# 11 - Forms

## v-model

We usually use v-model to have two ways binding on inputs. This way we can have access to the information given by the user but also we can clean up the form once the user submitted the form.

We can modify the input with a couple of methods contained on `v-model`:

- number: converts the input to Integers
- Lazy: will change the way it is updated on every keystroke.
- trim: will trim spaces at the beginning and at the end.

If we declare `type="number"` on the input then we do not need to specify `v-model.number`. Vue will convert automatically.

```HTML
<form @submit.prevent="submitForm">
  <div class="form-control">
    <label for="user-name">Your Name</label>
    <input id="user-name" name="user-name" type="text" v-model="userName" />
  </div>
  <div class="form-control">
    <label for="age">Your Age (Years)</label>
    <input id="age" name="age" v-model.number="userAge"/>
  </div>
  <div>
    <button>Save Data</button>
  </div>
</form>
```

## Dropdown lists

We need to use `v-model` on the `<select></select>` element and Vue will bind it to the proper property.

## Check box & radio buttons

On checkboxes we can select more than one for the same attribute and on radio buttons only one selection is allowed.

For checkboxes we need to create an empty array and bind that to `v-model`. Vue will update that properly. In case we only have an single option for the checkbox (Such as confirm something). We only need to create a property and assign it to `true/false`.

> For this two inputs it is important to have a `value` attribute on the HTML element so that Vue binds properties properly.

## Input validation

On the submit method we can check all values and make sure that the user gave some input.

Optionally, by using the `@blur` event listener (it is activated once the user stops typing inside that input), which is a built in method. 

```HTML
<div class="form-control" :class="{error: errorName}">
  <label for="user-name">Your Name</label>
  <input id="user-name" name="user-name" type="text" v-model.trim="userName" @blur="validateName" />
  <p v-if="errorName">Please enter a valid name </p>
</div>
```



## Custom forms
We can create custom elements and use `v-model`