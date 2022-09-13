<template>
    <form @submit.prevent="addUser">
        <div>
            <label for="name">Name:</label>
            <input type="text" name="name" id="name" v-model="name">
        </div>
        <div>
            <label for="age">Age: </label>
            <input type="text" name="age" id="age" v-model="age">
        </div>
        <button>Add User</button>
    </form>
</template>

<script>
export default {
    emits: [ 
        'add-user'
    ],
    data(){
        return{
                name: '',
                age: '',
                // newUser: {
                //     name: '',
                //     age: ''
                // }
        }
    },
    methods: {
        //addUser(){
        //     this.$emit('add-user', this.newUser);
        // }
        addUser(){
            this.$emit('add-user', this.name, this.age);
        }
    }
}
</script>