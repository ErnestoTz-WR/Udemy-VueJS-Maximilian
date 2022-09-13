<template>
    <form @submit.prevent="addFriend">
        <div>
            <label for="name">Name: </label>
            <input type="text" v-model="newFriend.name">
        </div>
        <div>
            <label for="cellphone">Cellphone: </label>
            <input type="text" v-model="newFriend.phoneNumber">
        </div>
        <div>
            <label for="email">Email: </label>
            <input type="email" v-model="newFriend.emailAddress">
        </div>
        <!-- <div>
            <label for="Favorite"> Favorite</label>
            <input type="radio" v-model="newFriend.isFavorite">
        </div> -->
        <div>
            <button>Add Friend</button>
        </div>
    </form>
</template>

<script>
export default {
    emits: ['add-friend'],
    data(){
        return{
            newFriend: {
                id: 0,
                name: '',
                phoneNumber: '',
                emailAddress: '',
                isFavorite: false
            }
        }
    },
    methods: {
        addFriend(){
            this.$emit('add-friend',this.newFriend)
        }
    }
}
</script>