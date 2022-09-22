<template>
  <div>
    <teleport to="body">
      <error-alert
        v-if="incorrectInputs"
        title="Invalid Input"
        @close="confirmError"
      >
        <template #default>
          <p>Please give correct data</p>
        </template>
        <template #actions>
          <base-button @click="confirmError">Ok</base-button>
        </template>
      </error-alert>
    </teleport>
    <base-card>
      <form @submit.prevent="submitData">
        <div class="form-control">
          <label for="title">Title:</label>
          <input type="text" id="title" name="title" ref="titleInput" />
        </div>
        <div class="form-control">
          <label for="description">Description:</label>
          <textarea
            row="3"
            id="descripton"
            name="descripton"
            ref="descriptionInput"
          ></textarea>
        </div>
        <div class="form-control">
          <label for="link">Link:</label>
          <input type="url" id="link" name="link" ref="linkInput" />
        </div>
        <div>
          <base-button type="submit">Add Resource</base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  inject: ['addResource'],
  data() {
    return {
      incorrectInputs: false,
    };
  },
  methods: {
    submitData() {
      const enteredTitle = this.$refs.titleInput.value;
      const enteredDescription = this.$refs.descriptionInput.value;
      const enteredlink = this.$refs.linkInput.value;
      if (
        enteredTitle.trim() === '' ||
        enteredDescription.trim() === '' ||
        enteredlink.trim() === ''
      ) {
        this.incorrectInputs = true;
        return;
      } else {
        this.addResource(enteredTitle, enteredDescription, enteredlink);
      }
    },
    confirmError() {
      this.incorrectInputs = false;
    },
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.15rem;
  border: 1px solid #ccc;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}

.form-control {
  margin: 1rem 0;
}
</style>
