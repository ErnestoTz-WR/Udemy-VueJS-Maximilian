import { createApp } from 'vue'
import App from './App.vue'
import FriendComponent from './components/FriendComponent.vue'
import HelloWorld from './components/HelloWorld.vue'
import NewFriend from './components/NewFriend.vue'

const app = createApp(App);

app.component('friend-component', FriendComponent);
app.component('hello-world', HelloWorld);
app.component('new-friend', NewFriend);
app.mount('#app');