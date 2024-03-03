import {
  geoAlbers,
  geoPath,
  pointer,
  select,
  selectAll,
  zoom,
  zoomIdentity,
} from "d3";
import RegionHoverTip from "@/components/RegionHoverTip/RegionHoverTip.vue";
import ZoomButtons from "@/components/ZoomButtons/ZoomButtons.vue";

export default {
  name: "RegionMap",
  components: {
    RegionHoverTip,
    ZoomButtons,
  },
  data() {
    return {
      activeRegion: null,
      projection: null,
      path: null,
      zoom: null,
      mouseOverTimer: null,
      regionTipStyles: {
        top: null,
        left: null,
      },
      showRegionTip: false,

      regionClasses(region) {
        const regionClasses = {
          "region-map__region--not-stroke": region.properties.notStroke,
          "no-companies": !region.hasCompanies,
        };
        if (
          this.activeRegion &&
          this.activeRegion.properties.ISO === region.properties.ISO
        ) {
          regionClasses["active"] = true;
        }
        return regionClasses;
      },

      selections() {
        return {
          svgContainer: select(".js-map-svg"),
          pathGroup: select(".js-map-path-group"),
          paths: selectAll(".js-map-region"),
          cityBigOuterCircle: selectAll(".js-city-bit-outer-mark"),
          cityBigInnerCircle: selectAll(".js-city-big-inner-mark"),
          citySmallCircle: selectAll(".js-city-small-mark"),
          cityCounter: selectAll(".js-company-counter"),
          map: document.querySelector(".js-region-map"),
        };
      },

      mapProperties() {
        return {
          width: Math.abs(window.innerWidth),
          height: this.selections().map.offsetHeight,
        };
      },
    };
  },
  emits: ["regionSelected", "citySelected", "zoom"],
  props: {
    geoRegions: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.setProjection();
    this.setPath();
    this.initZoom();
  },
  methods: {
    setProjection() {
      let scaleCoefficient = 2.4;
      if (this.mapProperties().height < 400) {
        scaleCoefficient = 1.5;
      }
      this.projection = geoAlbers()
        .rotate([-105, 0])
        .center([-10, 65])
        .parallels([52, 64])
        .scale(this.mapProperties().width / scaleCoefficient)
        .translate([
          this.mapProperties().width / 2,
          this.mapProperties().height / 2,
        ])
        .precision(0.1);
    },

    setPath() {
      this.path = geoPath(this.projection);
    },

    onSelectRegion(event, geoObject) {
      this.showRegionTip = false;

      const [[x0, y0], [x1, y1]] = this.path.bounds(geoObject);
      if (geoObject.hasCompanies) {
        this.selections()
          .svgContainer.transition()
          .duration(750)
          .call(
            this.zoom.transform,
            zoomIdentity
              .translate(
                this.mapProperties().width / 2,
                this.mapProperties().height / 2
              )
              .scale(
                Math.min(
                  25,
                  0.9 /
                    Math.max(
                      (x1 - x0) / this.mapProperties().width,
                      (y1 - y0) / this.mapProperties().height
                    )
                )
              )
              .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
            pointer(event, this.selections().svgContainer.node())
          );
      }

      this.activeRegion = geoObject;
      this.$emit("regionSelected", event, geoObject);
    },

    initZoom() {
      this.zoom = zoom().scaleExtent([1, 20]).on("zoom", this.onZoom);
      this.selections().svgContainer.call(this.zoom);
    },

    onZoom(e) {
      this.selections().pathGroup.attr("transform", e.transform);
      this.selections().paths.attr("stroke-width", 1 / e.transform.k);
      this.selections().cityBigInnerCircle.attr("r", 20 / e.transform.k);
      this.selections()
        .cityBigOuterCircle.attr("r", 25 / e.transform.k)
        .attr("stroke-width", 1 / e.transform.k);
      this.selections()
        .citySmallCircle.attr("r", 10 / e.transform.k)
        .attr("stroke-width", 2.5 / e.transform.k);
      this.selections()
        .cityCounter.attr("font-size", 20 / e.transform.k)
        .attr("transform", `translate(0, ${7 / e.transform.k})`);
      this.$emit('zoom');
    },

    onMapMouseLeave() {
      clearTimeout(this.mouseOverTimer);
      this.showRegionTip = false;
    },

    onHoverRegion(event, region) {
      // Чтобы каждый раз при наведении на регион не срабатывал хендлер
      // заставляющий ререндерить Vue-экземпляр каждый раз
      // используем таймаут и его сброс
      clearTimeout(this.mouseOverTimer);
      const mouseOverHandler = () => {
        if (
          !this.activeRegion ||
          this.activeRegion.properties.NAME !== region.properties.NAME
        ) {
          this.showRegionTip = true;
          this.hoveredRegion = region;
          this.regionTipStyles.left = event.pageX + 30 + "px";
          this.regionTipStyles.top = event.pageY + 15 + "px";
        }
      };
      this.mouseOverTimer = setTimeout(mouseOverHandler, 200);
    },

    onZoomButton(event, k) {
      this.selections()
        .svgContainer
        .transition()
        .duration(250)
        .call(this.zoom.scaleBy, k);
    },

    onCityClick(event, city) {
      this.$emit('citySelected', event, city)
    },
  },

  computed: {
    companyCities() {
      const cities = [];
      if (this.geoRegions?.length) {
        this.geoRegions.forEach((region) => {
          if (region.hasCompanies) {
            region.companyData.cities.forEach((city) => {
              const cityCopy = {
                ...city,
              };
              cityCopy.translate = `translate(${this.projection([
                cityCopy.coord[1],
                cityCopy.coord[0],
              ])})`;
              cityCopy.regionISO = region.properties.ISO;
              cities.push(cityCopy);
            });
          }
        });
      }

      return cities;
    },
  },
};
