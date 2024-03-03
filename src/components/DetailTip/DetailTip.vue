<template>
  <div class="detail-tip">
    <div class="detail-tip__container">
      <div class="detail-tip__head">
        <div class="detail-tip__region">
          {{ title }}
        </div>
        <button
            @click="close"
            class="detail-tip__close"
        >
          <img
              src="@/assets/images/close.svg"
              alt="Крестик"
          />
        </button>
      </div>
      <div class="detail-tip__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script src="./DetailTip.js"></script>
<style scoped lang="scss" src="./DetailTip.scss"></style>
