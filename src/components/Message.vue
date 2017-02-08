<template>
  <div class="box is-info">
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<script>
  export default {

  }
</script>

<style>
  .box {
    background: #e3e3e3;
    border: 1px solid #c5c5c5;
    margin-bottom: 10px;
    padding: 10px;
  }
</style>
