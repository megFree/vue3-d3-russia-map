export default {
  name: 'ZoomButtons',
  emits: ['zoomIn', 'zoomOut'],
  methods: {
    zoomIn() {
      this.$emit('zoomIn');
    },
    zoomOut() {
      this.$emit('zoomOut');
    },
  },
};
