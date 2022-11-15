# 14 Animations and Transitions

## Introduction

Using CSS animations is enough in most of the cases. It is they way to implement them and we should follow those patterns.

One of the scenarios in which CSS won't be able to animate our components is when they disappear, since they are removed from the DOM; CSS is unable to animate an element before it is removed. Vue solves this situation. 

## `<transition>` component

It is used when we want to control components and animate them with the help of Vue.   
It should contain only one child element/ one direct child.   
Transition will add a couple of CSS utility classes to that element:

- **v-enter-from**: It controls the status of the component when it is created.
- **v-enter-to**: It controls the status of the component when it is added to the DOM.
- **v-enter-active**: It controls the transitions animating the element, here we define duration, `ease-out`, `ease-in`, etc.
- **v-leave-from**: It controls the status of the component before it is detached from the DOM.
- **v-leave-to**: It controls the status of the component before it is removed to the DOM.
- **v-leave-active**: It controls the transitions animating the element, here we define duration, `ease-out`, `ease-in`, etc.

This allows to analyze those especial CSS classes, look for transitions inside of them and then execute them.

```CSS
.v-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}
.v-enter-active {
  transition: all 0.3s ease-out;
}
.v-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.v-leave-active {
  transition: all 0.3s ease-in;
}
.v-leave-to {
  opacity: 0;
  transform: translateY(30);
}
```

We can also use transition to execute a defined animation as follows:

1. Create the animation with `@keyframes`
2. Call the animation on the `.v-enter-active`/`.v-leave-active` class. In this case we don't need to use `forwards` to keep the last state of the animation. Vue will solve it.

```CSS
.v-enter-active {
  animation: slide-fade 0.3s ease-out;
}

@keyframes slide-fade {
  0% {
    transform: translateX(0) scale(1);
  }

  70% {
    transform: translateX(-120) scale(1.1);
  }

  100% {
    transform: translateX(-150px) scale(1);
  }
}
```

### Custom class names in `<transition>`

We can add different `<transition>` elements in the same component.
For this we need to name the `<transition>` element and add the same name on the classes replacing the initial `v`:

```HTML
<div class="container">
  <transition name="para">
    <p para-if="this.textIsDisplayed">This is a removable text</p>
  </transition>
  <button @click="toggleText">Show text</button>
</div>


<style>
.para-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}
.para-enter-active {
  transition: all 0.3s ease-out;
}
.para-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.para-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.para-leave-active {
  transition: all 0.3s ease-in;
}
.para-leave-to {
  opacity: 0;
  transform: translateY(30);
}
</style>

```

There is an scenario in which we are using third party libraries to create animations and those classes are defined by that library. Therefore, we want to use those classes in our `<transition>` element. We can do so by defining those names inside the element itself using `enter-to-class`,`enter-active-class`, etc.

```HTML
<div class="container">
  <transition enter-to-class="third-party-name1" enter-active-class="third-party-name2">
    <p para-if="this.textIsDisplayed">This is a removable text</p>
  </transition>
  <button @click="toggleText">Show text</button>
</div>
```

## Solving the "only one child allowed problem"

When wrapping one custom element with a `transition` element we can think that the "one child element" rule is applied, however if the element contains more than one direct child element on the root (which probably is the case), then the transition will not work.   
For this scenario we would need to go to the root elements and apply the animation specifically to those elements which we need it. 

> In this project the `BaseModal` component would be the example for this. It is important to mention that for this to works we also had to change the logic applied to the element. (Watch video **199-Animating a Modal**).

## Transition between multiple elements

One of the exemptions in which we can have multiple elements inside the `transition` element is when we have a `v-if`-`v-else` rendering logic. In this case Vue will allow us to have two different elements. If we have multiple `v-if` it will not work, we are required to only have `v-if`-`v-else`.

In this scenario there is a new property which we can use inside the `transition` element:
- `mode`:  it takes one of two values `in-out` or `out-in`, this controls how to display the transition for the incoming/leaving elements.

`in-out`: the animation of the incoming element is first, then the leaving element animation is executed.   
`out-in`: leaving animation first, incoming animation second.

```HTML
<div class="container">
  <transition name="fade-button" mode="out-in">
    <button @click="showUsers" v-if="!usersAreVisible">Show users</button>
    <button @click="hideUsers" v-else>Hide users</button>
  </transition>
</div>
```

## Transition events

We can also run some JavaScript code as part of the animation or transition.   
For this we can use the following events:

- `@before-enter`
- `@before-leave`
- `@enter`
- `@leave`
- `@after-enter`
- `@after-leave`
- `@enter-cancelled`
- `@leave-cancelled`

We also get the element triggering those events as an argument.   
These events are always called on the `transition` element even when there is no animation defined.

## Building JavaScript transitions

We can use animation libraries such as [GreenSock](https://greensock.com/).

If we control the animation only with JavaScript we can use the `:css="false"` parameter inside the `transition element. This will improve the execution since this way Vue will not try to look into the CSS file for animations for that element.

## `<transition-group>`

It is used for multiple elements such as lists.

One of the difference between `<transition>` and `<transition-group>` is that on the first one there is no DOM element added but in the second one there will be one element added but we can define which element we want to add by adding the `tag` parameter.

We also get a new class: `*-list-move` which we can use to control how the other elements are animated.

## Animate Route Changes

We need to use slots for transitions inside the `router-view` element.