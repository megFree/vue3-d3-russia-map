export default {
  name: "OverallInfo",
  props: {
    location: {
      type: Object,
      required: true,
      default: () => ({
        name: "",
        regionalCounter: 0,
        crutialCounter: 0,
        certifiedCounter: 0,
        implementationCounter: 0,
      }),
    },
  },
};
