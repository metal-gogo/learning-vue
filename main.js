window.Event = new class {
  constructor() {
    this.vue = new Vue();
  }

  fire(event, data = null) {
    this.vue.$emit(event, data);
  }

  listen(event, callback) {
    this.vue.$on(event, call)
  }
}

Vue.component('coupon', {
  methods: {
    onCouponApplied() {
      Event.$emit('applied');
    }
  },
  template: `
    <input placeholder="Enter your coupon code" @blur="onCouponApplied">
  `
});

new Vue({
  data: {
    couponApplied: false
  },
  el: '#root',
  created() {
    Event.$on('applied', () => alert('well done'));
  }
});
