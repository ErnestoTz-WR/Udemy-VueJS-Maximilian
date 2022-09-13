<template>
    <li>
        <h2>Name: {{ name }} <span v-if="isFavorite">(Fav)</span></h2>
        <button @click="toggleDetails"> {{detailsVisible ? 'Hide' : 'Show'}} details</button>
        <button @click="toggleFavorite"> Favorite </button>
        <button @click="deleteFriend">Delete Friend</button>
        <ul v-if="detailsVisible">
            <li><strong>Phone: {{ phoneNumber }}</strong></li>
            <li><strong>Email: {{ emailAddress }}</strong></li>   
        </ul>
    </li>
</template>

<script>

export default {
  // props: [
  //   'name',
  //   'phoneNumber',
  //   'emailAddress' 
  // ],
  emits: ['delete-friend','toggle-favorite'],
  props: {
    id: {
      type: Number,
      required: true
    },
    name : {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    emailAddress: {
      type: String,
      required: true
    },
    isFavorite: {
      type: Boolean,
      required: false,
      default: false,
      // validator: function(value) {
      //     return value === '1' || value === '0';
      // }
    }
  },
  data() {
      return{
          detailsVisible: false
      }
  },
  methods: {
      toggleDetails(){
          this.detailsVisible = !this.detailsVisible;
      },
      toggleFavorite(){
        this.$emit('toggle-favorite',this.id);
      },
      deleteFriend(){
        this.$emit('delete-friend',this.id)
      }
  }
}
</script>