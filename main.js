Vue.component('message', {
  data() {
    return {
      isVisible: true
    };
  },
  methods: {
    hideModal() {
      this.isVisible = false;
    }
  },
  props: [
    'title', 'body'
  ],
  template: `
    <article class="message" v-show="isVisible">
      <div class="message-header">
        <p v-html="title"></p>
        <button class="delete" @click="hideModal"></button>
      </div>
      <div class="message-body" v-html="body">
      </div>
    </article>
  `
});

new Vue({
  el: '#root'
});
