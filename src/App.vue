<template>
  <div id="app" class="container">
    <message>Hello there again!</message>
    <counter></counter>
    <form method="GET" @submit.prevent="onSubmit" @keydown="errors.clear($event.target.name)">
      <div class="control">
        <label for="name" class="label">Project name:</label>
        <input type="text" id="name" name="name" class="input" v-model="name">
        <span class="help is-danger" v-if="errors.has('name')" v-text="errors.get('name')"></span>
      </div>
      <div class="control">
        <label for="description" class="label">Project description:</label>
        <input type="text" id="description" name="description" class="input" v-model="description">
        <span class="help is-danger" v-if="errors.has('description')" v-text="errors.get('description')"></span>
      </div>
      <div class="control">
        <button class="button is-primary" :disabled="errors.any()">Create</button>
      </div>
    </form>

  </div>
</template>

<script>
import Message from './components/Message.vue';
import Counter from './components/Counter.vue';

class Errors {
  constructor() {
    this.errors = { name: ['hola mundo']};
  }

  any() {
    return Object.keys(this.errors).length > 0;
  }

  has(field) {
    return this.errors.hasOwnProperty(field);
  }

  get(field) {
    if( this.errors[field] ) {
      return this.errors[field][0];
    }
  }

  record(errors) {
    this.errors = errors;
  }

  clear(field) {
    delete this.errors[field];
  }
}

export default {
  components: { Counter, Message },
  data () {
    return {
      description: '',
      errors: new Errors(),
      name: ''
    }
  },
  methods: {
    onSubmit() {
      axios.get('http://www.omdbapi.com/?t=Harry+Potter&y=&plot=short&r=json')
        .then(this.onSuccess)
        .catch(error => this.errors.record(error.response.data));
    },

    onSuccess(response) {
      this.name = '';
      this.description = '';
      alert(response.data.message);
    }
  },
  name: 'app'
}
</script>

<style>
</style>
