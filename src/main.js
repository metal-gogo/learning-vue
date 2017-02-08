import Vue from 'vue';

Vue.component('coupon', {
  methods: {
    updateCode(code) {
      if(code === 'ALLFREE') {
        alert("WHOOO");

        this.$refs.input.value = code = '';
      }

      this.$emit('input', code);
    }
  },
  props: ['code'],
  template: `
    <input type="text" :value="code" @input="updateCode($event.target.value)" ref="input">
  `
});

new Vue({
  el: '#app',
  data: {
    coupon: 'Freebie'
  }
});
