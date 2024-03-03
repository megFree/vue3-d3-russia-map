<template>
  <div class="zoom-buttons">
    <button
      @click="zoomIn()"
      class="zoom-buttons__btn zoom-buttons__btn--closer"
    >
      +
    </button>
    <button
      @click="zoomOut()"
      class="zoom-buttons__btn zoom-buttons__btn--away"
    >
      —
    </button>
  </div>
</template>

<script src="./ZoomButtons.js"></script>
<style src="./ZoomButtons.scss" scoped lang="scss"></style>
