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
4. Run `npm install` on the project to download the necessary dependencies.
5. `npm run serve` will run the project.
## import

It is the JavaScript syntax to use code from another file or package.

If we want to import a file we need to include the path.

```JavaScript
import App from './App.vue'
```

> In this case we are using `export default`.

For importing code from a package we only use the package name.

```JavaScript
import { createApp } from 'vue';
```
