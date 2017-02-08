<template>
  <div id="app" class="container">
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
class Errors {
  constructor() {
    this.errors = { name: ['hola mundo'] };
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
    if(field) {
      delete this.errors[field];
    } else {
      this.errors = {};
    }
  }
}

class Form {
  constructor(data){
    this.originalData = data;

    for(let field in data) {
      this[field] = data[field];
    }

    this.errors = new Errors();
  }

  data() {
    let data = Object.assign({}, this);

    delete data.originalData;
    delete data.errors;

    return data;
  }

  onFail(error) {
    this.errors.record(error.response.data);
  }

  onSuccess(response) {
    this.reset();
    alert(response.data.message);
  }

  reset() {
    for(let field in this.originalData) {
      this[field] = '';
    }

    this.errors.clear();
  }

  submit(requestType, url) {
    console.log(requestType);
    axios[requestType](url, this.data())
      .then(this.onSuccess.bind(this))
      .catch(this.onFail.bind(this));

  }
}

export default {
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
      this.form.submit('post', 'someURL');
    },
  },
  name: 'app'
}
</script>

<style>
</style>
