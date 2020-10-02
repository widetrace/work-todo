<template lang="pug">
  .window
    .window-box
      h2 Delete task?
</template>

<script>
export default {
  
};
</script>

<style lang="scss">
.window {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.35);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &-box {
    background-color: blanchedalmond;
  }
}
</style>