export default {
  name: 'DetailTip',
  emits: ['close'],
  props: {
    title: {
      type: String,
      required: true,
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
