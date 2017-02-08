import Vue from 'vue';
import Axios from 'axios';
import App from './App.vue';

window.axios = Axios;

new Vue({
  el: '#app',
  render: h => h(App)
});
