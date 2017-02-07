//TODO: Add accesibility to elements!!!

Vue.component('coupon', {
  methods: {
    onCouponApplied() {
      this.$emit('applied');
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
  methods: {
    onCouponApplied() {
      this.couponApplied = true;
    }
  }
});
