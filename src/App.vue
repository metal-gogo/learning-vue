<template>
  <div id="app">
    <message>Hello there again!</message>
    <counter></counter>
  </div>
</template>

<script>
import Message from './components/Message.vue';
import Counter from './components/Counter.vue';

export default {
  components: { Counter, Message },
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
