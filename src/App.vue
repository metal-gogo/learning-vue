<template>
  <div id="app" class="container">
    <example></example>
    <message>Let's give it a try :D!</message>
    <counter></counter>
    <form method="GET" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
      <div class="control">
        <label for="name" class="label">Project name:</label>
        <input type="text" id="name" name="name" class="input" v-model="form.name">
        <span class="help is-danger" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>
      </div>
      <div class="control">
        <label for="description" class="label">Project description:</label>
        <input type="text" id="description" name="description" class="input" v-model="form.description">
        <span class="help is-danger" v-if="form.errors.has('description')" v-text="form.errors.get('description')"></span>
      </div>
      <div class="control">
        <button class="button is-primary" :disabled="form.errors.any()">Create</button>
      </div>
    </form>

  </div>
</template>

<script>
  import Form from './core/Form';
  import Counter from './components/Counter.vue';
  import Example from './components/Example.vue';
  import Message from './components/Message.vue';

  window.Form = Form;

  export default {
    components: {
      Counter,
      Example,
      Message
    },
    data () {
      return {
        form: new Form({
          description: '',
          name: ''
        })
      }
    },
    methods: {
      onSubmit() {
        this.form.post('someURL')
          .then(data => alert('handling it!'))
          .catch(errors => alert('Ooops!'));
      },
    },
    name: 'app'
  }
</script>

<style>
</style>
