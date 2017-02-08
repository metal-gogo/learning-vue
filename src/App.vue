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
    let data = {};

    for(let property in this.originalData) {
      data[property] = this[property];
    }

    return data;
  }

  onFail(errors) {
    this.errors.record(errors);
  }

  onSuccess(data) {
    this.reset();
    this.errors.clear();
    alert(data.message);
  }

  delete(url) {
    return this.submit('delete', url);
  }

  post(url) {
    return this.submit('post', url);
  }

  reset() {
    for(let field in this.originalData) {
      this[field] = '';
    }
  }

  submit(requestType, url) {
    return new Promise((resolve, reject) => {
      axios[requestType](url, this.data())
        .then(response => {
          this.onSuccess(response.data);

          resolve(response.data);
        })
        .catch(error => {
          this.onFail(error.response.data);

          reject(error.response.data);
        });
    });

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
