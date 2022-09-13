<template>
    <li>
        <h2> User: {{ name }}</h2>
        <h3> Age: {{ age }}</h3>
    </li>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        age: {
            type: String,
            required: true
        }
    }
}
</script>