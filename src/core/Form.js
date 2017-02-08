import Errors from './Errors';

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

export default Form;
