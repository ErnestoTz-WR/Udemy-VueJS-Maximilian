# Better Development Setup

## Vue CLI

It is an additional Vue tool which helps us to create projects in an easier way.

1. It creates an structure for our Vue projects
2. Downloads all dependencies
3. Creates an skeleton for the application with Vue files.

We need to download **npm** in order to use this tool.

1. Run on a terminal `npm install -g @vue/cli`
2. Create the vue project by running `vue create {{name-of-folder}}` on the correct path.
3. Give the necessary set up.
4. `npm run serve` will run the project.
## main.js

It is the entry point of the application. It will import the `Vue` object and then call `mount()` to instantiate the app.   
Here we can include imports from different files or packages.


## `.vue` files

They allow us to write Vue components.
It contains:
- HTML - inside the `template` element.
- JavaScript - with the Vue syntax
- Styles - with CSS or any pre-processor.

These 3 parts can be inside the `.vue` file or we can also split them into different files.

## Build WorkFlow

Code written using Vue will be transform by the Vue-cli tool into regular JS code that can be understood by any server/browser. 

## App.vue file

It is a convention that we create a main file called `App.vue` which contains the main structure of our application. If necessary we will split the application into many components.
