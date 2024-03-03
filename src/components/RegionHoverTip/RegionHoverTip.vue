<template>
  <div class="region-hover-tip">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "RegionHoverTip",
};
</script>

<style scoped lang="scss">
.region-hover-tip {
  background: #fff;
  border-radius: 2px;
  text-align: center;
  font-size: 12px;
  padding: 8px;
  box-shadow: 0 1px 4px rgba(0, 25, 48, 0.25);
  color: #677687;
  user-select: none;
}
</style>
