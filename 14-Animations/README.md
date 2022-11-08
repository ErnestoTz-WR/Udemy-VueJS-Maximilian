# 14 Animations and Transitions

## Introduction

Using CSS animations is enough in most of the cases. It is they way to implement them and we should follow those patterns.

One of the scenarios in which CSS won't be able to animate our components is when they disappear, since they are removed from the DOM; CSS is unable to animate an element before it is removed. Vue solves this situation. 

## `<transition>` component

It is used when we want to control components and animate them with the help of Vue.

It should contain only one child element/ one direct child.

Transition will add a couple of CSS utility classes to that element:

- enter-from
- enter-to
- enter-active
- leave-from
- leave-to
- leave-active

This allow us to analyses those especial CSS classes and looking for transitions inside of them and then executing them.
