<template>
    <section>
        <h2> My friend</h2>
        <ul>
            <friend-contact></friend-contact>
            <friend-contact></friend-contact>
        </ul>
    </section>
</template>

<script>
import FriendContact from './components/FriendContact.vue'

export default {
  components: { FriendContact },
    data() {
        return {
            friends : [
                {
                    id: 'manuel',
                    name: 'Manuel Lorenz',
                    phone: '1597 459 987',
                    email: 'manuel.lorenz@localhost.com'
                },
                {
                    id: 'ernesto',
                    name: 'Ernesto Tzompantzi',
                    phone: '1246 435 579',
                    email: 'ernesto.tzom@localhost.com'
                },
            ]
        }
    }
}
</script>
