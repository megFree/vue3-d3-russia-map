<template>
  <div id="map" class="partners-map" v-cloak>
    <div class="partners-map__map js-partners-map">
      <svg class="partners-map__svg js-map-svg">
        <g
            class="js-map-path-group"
            v-if="loaded"
            @mouseleave="onMapMouseLeave"
        >
          <path
              v-for="region in geoRegions"
              class="partners-map__region js-map-region"
              :class="regionClasses(region)"
              :d="path(region)"
              :key="region.properties.ISO"
              @click.stop="onSelectRegion($event, region)"
              @mouseover.passive="onHoverRegion($event, region)"
          />
          <template v-for="city in partnerCities">
            <g
                :key="city"
                v-if="activeRegion && city.regionISO === activeRegion.properties.ISO"
                class="partners-map__city"
                :transform="city.translate"
                @click.stop="onCityClick($event, city)"
            >
              <circle
                  r="1.5"
                  class="partners-map__city--small js-city-small-mark"
                  v-if="city.partners.length === 1"
              />
              <g v-else>
                <circle
                    r="3"
                    class="partners-map__city--big-outer js-city-bit-outer-mark"
                />
                <circle
                    r="2.3"
                    class="partners-map__city--big-inner js-city-big-inner-mark"
                />
                <text class="partners-map__city-counter js-partner-counter">
                  {{ city.partners.length }}
                </text>
              </g>
            </g>
          </template>
        </g>
      </svg>

      <RegionHoverTip
        v-if="showRegionTip"
        class="partners-map__region-tip"
        :style="regionTipStyles"
      >
        {{ hoveredRegion.properties.NAME }}
      </RegionHoverTip>

      <ZoomButtons 
        @zoom-in="onZoomButton($event, 1.5)"
        @zoom-out="onZoomButton($event, .5)"
      />
      
      <DetailTip 
        v-if="showPartnerList"
        class="partners-map__detail-tip"
        :style="partnerListStyles"
        :title="activeCity.city"
        @close="onClosePartnerList"
      >
        <OrganizationList 
          class="partners-map__org-list"
          :items="activeCity.partners"
        />
      </DetailTip>

      <DetailTip 
        v-if="showNoPartnersTip"
        class="partners-map__detail-tip"
        :style="noPartnersTipStyles"
        :title="activeRegion.properties.NAME"
        @close="onCloseNoPartnerTip"
      >
        <div class="partners-map__not-found-warning">
          В данном регионе партнёров не обнаружено!
        </div>
      </DetailTip>
    </div>

    <OverallInfo class="partners-map__overall-info" :location="overallInfo" />
    
  </div>
</template>

<script>
import {
  geoAlbers,
  geoPath,
  json,
  pointer,
  select,
  selectAll,
  zoom,
  zoomIdentity,
} from "d3";
import { feature } from "topojson-client";
import 'normalize.css';
import RegionHoverTip from '@/components/RegionHoverTip/RegionHoverTip.vue';
import ZoomButtons from '@/components/ZoomButtons/ZoomButtons.vue';
import DetailTip from '@/components/DetailTip/DetailTip.vue';
import OrganizationList from '@/components/OrganizationList/OrganizationList.vue';
import OverallInfo from '@/components/OverallInfo/OverallInfo.vue';

const topoJsonURL =
    "https://gist.githubusercontent.com/megFree/0c3bfaf9d34f8faca9be4d2b6be00aa2/raw/6d5706743886f88f36ed9ea91f6398611eeb8fcd/russiaSimpleTopo.json";
const partnersJsonURL =
    "https://gist.githubusercontent.com/megFree/265c96083cf012718f8c746a8b3c718b/raw/d8e899d0b06e650d5c4cf57276414446ca58b725/demodata.json";

export default {
  components: {
    RegionHoverTip,
    ZoomButtons,
    DetailTip,
    OrganizationList,
    OverallInfo,
  },
  data() {
    return {
      geoRegions: null,
      projection: null,
      path: null,
      loaded: false,
      zoom: null,
      activeRegion: null,
      tooltipRegion: "",
      partnerCities: [],
      showPartnerList: false,
      showNoPartnersTip: false,
      disableControls: false,
      activeCity: null,
      hoveredRegion: null,
      showRegionTip: false,
      mouseOverTimer: null,
      totalCrucialPartnersCounter: 0,
      totalRegionalPartnersCounter: 0,
      totalCertifiedPartnersCounter: 0,
      totalImplementationsCounter: 0,
      regionTipStyles: {
        left: "",
        top: "",
      },
      partnerListStyles: {
        left: "",
        top: "",
      },
      noPartnersTipStyles: {
        left: "",
        top: "",
      },
      regionClasses(region) {
        const regionClasses = {
          "partners-map__region--not-stroke": region.properties.notStroke,
          "no-partners": !region.hasPartners,
        };
        if (
            this.activeRegion &&
            this.activeRegion.properties.ISO === region.properties.ISO
        ) {
          regionClasses["active"] = true;
        }
        return regionClasses;
      },
      mapProperties() {
        return {
          width: Math.abs(window.innerWidth),
          height: this.selections().map.offsetHeight,
        };
      },
      selections() {
        return {
          svgContainer: select(".js-map-svg"),
          pathGroup: select(".js-map-path-group"),
          paths: selectAll(".js-map-region"),
          cityBigOuterCircle: selectAll(".js-city-bit-outer-mark"),
          cityBigInnerCircle: selectAll(".js-city-big-inner-mark"),
          citySmallCircle: selectAll(".js-city-small-mark"),
          cityCounter: selectAll(".js-partner-counter"),
          map: document.querySelector(".js-partners-map"),
        };
      },
    };
  },
  async mounted() {
    this.setProjection();
    const topology = await json(topoJsonURL);
    const regionData = feature(topology, "russiaGeo").features;

    // Костыль для чукотки
    // 21 - номер чукотки в geoJson-файле
    // Иначе она рассекается по нулевому меридиану, картографам привет)
    regionData[21].properties.notStroke = true;

    const partnerRegionalData = await json(partnersJsonURL);
    regionData.forEach((region) => {
      region.crucialCounter = 0;
      region.certifiedCounter = 0;
      region.regionalCounter = 0;
      region.implementationCounter = 0;

      partnerRegionalData.forEach((regionalData) => {
        if (region.properties.ISO === regionalData.iso) {
          region.partnerData = regionalData;

          regionalData.cities.forEach((city) => {
            city.partners.forEach((partner) => {
              if (partner.crucial) {
                region.crucialCounter++;
              }
              if (partner.certified) {
                region.certifiedCounter++;
              }
              if (partner.regional) {
                region.regionalCounter++;
              }
              region.implementationCounter += partner.count;
            });
          });
        }
      });
    });

        
    regionData.forEach((region) => {
      if (region.partnerData) {
        return (region.hasPartners = true);
      } else {
        return (region.hasPartners = false);
      }
    });

    this.geoRegions = regionData;

    const partnerCities = [];
    this.geoRegions.forEach((region) => {
      if (region.hasPartners) {
        region.partnerData.cities.forEach((city) => {
          city.translate = `translate(${this.projection([
            city.coord[1],
            city.coord[0],
          ])})`;
          city.regionISO = region.properties.ISO;
          partnerCities.push(city);
        });
      }
    });
    this.partnerCities = partnerCities;

    this.geoRegions.forEach((region) => {
      this.totalCertifiedPartnersCounter += region.certifiedCounter;
      this.totalCrucialPartnersCounter += region.crucialCounter;
      this.totalImplementationsCounter += region.implementationCounter;
      this.totalRegionalPartnersCounter += region.regionalCounter;
    });

    this.loaded = true;

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
    initZoom() {
      this.zoom = zoom().scaleExtent([1, 20]).on("zoom", this.onZoom);
      this.selections().svgContainer.call(this.zoom);
    },
    onSelectRegion(event, geoObject) {
      this.showPartnerList = false;
      this.showRegionTip = false;
      const [[x0, y0], [x1, y1]] = this.path.bounds(geoObject);
      if (geoObject.hasPartners) {
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
      this.showNoPartnersTip = false;

      if (!this.activeRegion.hasPartners) {
        this.showNoPartnersTip = true;
        this.noPartnersTipStyles.top = event.pageY + "px";
        this.noPartnersTipStyles.left = event.pageX + "px";
      }
    },
    onZoom(e) {
      this.showPartnerList = false;
      this.showNoPartnersTip = false;
      this.showRegionTip = false;
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
    },
    onZoomButton(event, k) {
      this.selections()
          .svgContainer.transition()
          .duration(250)
          .call(this.zoom.scaleBy, k);
    },
    onCityClick(event, city) {
      this.activeCity = city;
      this.partnerListStyles.left = event.pageX + "px";
      this.partnerListStyles.top = event.pageY + "px";
      this.showPartnerList = true;
    },
    onClosePartnerList() {
      this.showPartnerList = false;
    },
    onCloseNoPartnerTip() {
      this.showNoPartnersTip = false;
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
    onMapMouseLeave() {
      clearTimeout(this.mouseOverTimer);
      this.showRegionTip = false;
    },
  },
  computed: {
    overallInfo() {
      if (!this.activeRegion) {
        return {
          name: 'Россия',
          crucialCounter: this.totalCrucialPartnersCounter,
          regionalCounter: this.totalRegionalPartnersCounter,
          certifiedCounter: this.totalCertifiedPartnersCounter,
          implementationCounter: this.totalImplementationsCounter,
        };
      }
      return {
        name: this.activeRegion.properties.NAME,
        crucialCounter: this.activeRegion.crucialCounter,
        regionalCounter: this.activeRegion.regionalCounter,
        certifiedCounter: this.activeRegion.certifiedCounter,
        implementationCounter: this.activeRegion.implementationCounter,
      };
    }
  }
}
</script>

<style lang="scss">
.partners-map__map {
  background: linear-gradient(
      0deg,
      rgba(32, 22, 0, 0) 48%,
      rgba(32, 22, 0, 0.1) 50%,
      rgba(32, 22, 0, 0) 50%
  ),
  linear-gradient(
      90deg,
      rgba(32, 22, 0, 0) 48%,
      rgba(32, 22, 0, 0.1) 50%,
      rgba(32, 22, 0, 0) 50%
  );
  background-size: 38px 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 570px;
}
@media screen and (max-width: #{$xl}) {
  .partners-map__map {
    height: 400px;
  }
}
@media screen and (max-width: #{$sm}) {
  .partners-map__map {
    height: 380px;
    position: relative;
  }
}

.partners-map__svg {
  width: 100%;
  height: 100%;
}

.partners-map__region {
  fill: #dbecff;
  stroke: #fff;
  stroke-linejoin: round;
  transition: fill 0.1s ease-in-out;
  cursor: pointer;
}

.partners-map__region:hover,
.partners-map__region.active {
  fill: #009eee;
}

.partners-map__region.no-partners:hover,
.partners-map__region.active.no-partners {
  fill: #fddfdd;
}

.partners-map__region--not-stroke {
  stroke: none;
}

.partners-map__city--big-outer {
  fill: #fff;
  stroke: #004c93;
}

.partners-map__city--big-inner {
  fill: #004c93;
}

.partners-map__city--small {
  fill: #004c93;
  stroke: #fff;
  z-index: 100;
}

.partners-map__city-counter {
  text-anchor: middle;
  fill: #fff;
}

.partners-map__city {
  cursor: pointer;
}

.partners-map__region-tip {
  position: absolute;
}

.partners-map__zoom {
  position: absolute;
  left: 150px;
}

@media screen and (max-width: #{$lg}) {
  .partners-map__zoom {
    left: 50px;
  }
}
@media screen and (max-width: #{$sm}) {
  .partners-map__zoom {
    left: 10px;
    bottom: 10px;
  }
}

.partners-map__detail-tip {
  position: absolute;
}

.partners-map__not-found-warning {
  padding: 12px;
  color: #f2291f;
}

.partners-map__overall-info {
  margin-top: 40px;
}
</style>
