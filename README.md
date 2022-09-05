# Vue.js important concepts

## `app.mount()`

Here we can declare which is the part from the HTML file that we want to control with Vue, we can specify this by passing an string with the proper id of the HTML element (usually `app`)

`.mount()` is important because we can also specify what happens during this moment with the application; we can retrieve certain information, create a loader, etc.

It is the initial state of the application, even before creating the app itself.