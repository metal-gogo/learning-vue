window.Event = new Vue();

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
