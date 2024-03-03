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
      <div
          :style="regionTipStyles"
          v-if="showRegionTip"
          class="partners-map__region-tip"
      >
        {{hoveredRegion.properties.NAME}}
      </div>
      <div class="partners-map__zoom">
        <button
            @click="onZoomButton($event, 1.5)"
            class="partners-map__zoom-btn partners-map__zoom-closer"
        >
          +
        </button>
        <button
            @click="onZoomButton($event, .5)"
            class="partners-map__zoom-btn partners-map__zoom-away"
        >
          —
        </button>
      </div>
      <div
          v-if="showNoPartnersTip || showPartnerList"
          class="partners-map__popup-fade"
      ></div>
      <div
          v-if="showPartnerList"
          :style="partnerListStyles"
          class="partners-map__list js-partner-list"
      >
        <div class="partners-map__list-head">
          <div class="partners-map__list-city">{{ activeCity.city }}</div>
          <button
              class="partners-map__list-close"
              @click="onClosePartnerList"
          >
            <img src="./assets/images/close.svg" alt="Крестик" />
          </button>
        </div>
        <div class="partners-map__list-columns-titles">
          <div
              class="partners-map__list-title partners-map__list-title--fixed-width"
          >
            Статус
          </div>
          <div
              class="partners-map__list-title partners-map__list-title-org--grow"
          >
            Организация
          </div>
          <div class="partners-map__list-title">Кол-во внедрений</div>
        </div>
        <div class="partners-map__list-items-container">
          <a
              class="partners-map__list-item"
              v-for="partner in activeCity.partners"
              :key="partner.partner"
              href="#"
          >
            <div class="partners-map__list-status">
              <div class="partners-map__list-status-ico">
                <img
                    v-if="partner.crucial"
                    src="./assets/images/key.svg"
                    alt="Иконка ключевого партнера"
                />
                <img
                    v-else-if="partner.certified"
                    src="./assets/images/document.png"
                    alt="Иконка сертифицированного партнера"
                />
                <img
                    v-else
                    src="./assets/images/home.svg"
                    alt="Иконка регионального партнера"
                />
              </div>
              <div
                  v-if="partner.crucial"
                  class="partners-map__list-status-text"
              >
                Ключевой
              </div>
              <div
                  v-else-if="partner.certified"
                  class="partners-map__list-status-text"
              >
                Сертифицированный
              </div>
              <div v-else class="partners-map__list-status-text">
                Региональный
              </div>
            </div>
            <div class="partners-map__list-organization">
              {{ partner.partner }}
            </div>
            <div class="partners-map__list-amount">{{ partner.count }}</div>
          </a>
        </div>
      </div>
      <div
          v-if="showNoPartnersTip"
          class="partners-map__no-partners-tip"
          :style="noPartnersTipStyles"
      >
        <div class="partners-map__no-partners-tip-container">
          <div class="partners-map__no-partners-tip-head">
            <div class="partners-map__no-partners-tip-region">
              {{ activeRegion.properties.NAME }}
            </div>
            <button
                @click="onCloseNoPartnerTip"
                class="partners-map__no-partners-tip-close"
            >
              <img
                  src="./assets/images/close.svg"
                  alt="Крестик"
              />
            </button>
          </div>
          <div class="partners-map__no-partners-tip-message">
            В данном регионе партнёров не обнаружено!
          </div>
        </div>
      </div>
    </div>
    <div class="partners-map__info container">
      <div class="partners-map__info-item">
        <div class="partners-map__info-item-ico">
          <img
              src="./assets/images/downtown.png"
              alt="Иконка локации"
          />
        </div>
        <div class="partners-map__info-item-content">
          <div class="partners-map__info-item-title">Локация</div>
          <div v-if="activeRegion" class="partners-map__info-item-value">
            {{ activeRegion.properties.NAME }}
          </div>
          <div v-else class="partners-map__info-item-value">Россия</div>
        </div>
      </div>
      <div class="partners-map__info-item">
        <div class="partners-map__info-item-ico">
          <img
              src="./assets/images/home.svg"
              alt="Иконка региональных партнеров"
          />
        </div>
        <div class="partners-map__info-item-content">
          <div class="partners-map__info-item-title">
            Региональные партнёры
          </div>
          <div v-if="activeRegion" class="partners-map__info-item-value">
            {{ activeRegion.regionalCounter }}
          </div>
          <div v-else class="partners-map__info-item-value">
            {{totalRegionalPartnersCounter}}
          </div>
        </div>
      </div>
      <div class="partners-map__info-item">
        <div class="partners-map__info-item-ico">
          <img
              src="./assets/images/key.svg"
              alt="Иконка ключевых партнеров"
          />
        </div>
        <div class="partners-map__info-item-content">
          <div class="partners-map__info-item-title">Ключевые партнёры</div>
          <div v-if="activeRegion" class="partners-map__info-item-value">
            {{ activeRegion.crucialCounter }}
          </div>
          <div v-else class="partners-map__info-item-value">
            {{totalCrucialPartnersCounter}}
          </div>
        </div>
      </div>
      <div class="partners-map__info-item">
        <div class="partners-map__info-item-ico">
          <img
              src="./assets/images/document.png"
              alt="Иконка сертифицированных партнеров"
          />
        </div>
        <div class="partners-map__info-item-content">
          <div class="partners-map__info-item-title">
            Сертифицированный партнер
          </div>
          <div v-if="activeRegion" class="partners-map__info-item-value">
            {{ activeRegion.certifiedCounter }}
          </div>
          <div v-else class="partners-map__info-item-value">
            {{ totalCertifiedPartnersCounter }}
          </div>
        </div>
      </div>
      <div class="partners-map__info-item">
        <div class="partners-map__info-item-ico">
          <img
              src="./assets/images/connection.png"
              alt="Иконка количества внедрений"
          />
        </div>
        <div class="partners-map__info-item-content">
          <div class="partners-map__info-item-title">
            Количество внедрений
          </div>
          <div v-if="activeRegion" class="partners-map__info-item-value">
            {{ activeRegion.implementationCounter }}
          </div>
          <div v-else class="partners-map__info-item-value">
            {{ totalImplementationsCounter }}
          </div>
        </div>
      </div>
    </div>
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

const topoJsonURL =
    "https://gist.githubusercontent.com/megFree/0c3bfaf9d34f8faca9be4d2b6be00aa2/raw/6d5706743886f88f36ed9ea91f6398611eeb8fcd/russiaSimpleTopo.json";
const partnersJsonURL =
    "https://gist.githubusercontent.com/megFree/265c96083cf012718f8c746a8b3c718b/raw/d8e899d0b06e650d5c4cf57276414446ca58b725/demodata.json";

export default {
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
          partnerList: document.querySelector(".js-partner-list"),
          map: document.querySelector(".js-partners-map"),
        };
      },
    };
  },
  beforeCreate() {
    json(topoJsonURL).then((topology, error) => {
      if (error) throw error;

      const regionData = feature(topology, "russiaGeo").features;

      // Костыль для чукотки
      // 21 - номер чукотки в geoJson-файле
      // Иначе она рассекается по нулевому меридиану, картографам привет)
      regionData[21].properties.notStroke = true;

      json(partnersJsonURL).then((partnerRegionalData, error) => {
        if (error) throw error;

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
      });
    });
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
}
</script>

<style lang="scss">
@font-face {
  font-family: 'Open Sans';
  font-weight: 400;
  src: url('@/assets/fonts/OpenSans-Regular.ttf');
}

$xl: 1440px;
$lg: 1200px;
$md: 990px;
$sm: 768px;
$xs: 576px;

:root {
  --xl: 1440;
  --lg: 1200;
  --md: 990;
  --sm: 768;
  --xs: 576;
}

html {
  font-family: 'Open Sans', 'Roboto', sans-serif;
  font-size: 14px;
}

a:hover {
  color: #009eee;
}

a {
  font-weight: 600;
}

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

.partners-map__popup-fade {
  display: none;
  position: fixed;
  height: 100%;
  width: 100%;
  background: black;
  opacity: 0.5;
  z-index: 1;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
}

@media screen and (max-width: #{$lg}) {
  .partners-map__popup-fade {
    display: block;
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
  background: #fff;
  border-radius: 2px;
  text-align: center;
  font-size: 14px;
  padding: 12px;
  box-shadow: 0 1px 4px rgba(0, 25, 48, 0.25);
  color: #677687;
  user-select: none;
}

.partners-map__zoom {
  position: absolute;
  border: 1px solid#dddddd;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  width: 40px;
  height: 80px;
  left: 150px;
  background: #fff;
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

.partners-map__zoom-btn {
  flex-grow: 1;
  line-height: 38px;
  text-align: center;
  color: #b8c1cc;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color color 0.1s ease-in-out;
}

.partners-map__zoom-btn:hover {
  background: #b8c1cc;
  color: #fff;
}

.partners-map__zoom-away {
  font-size: 14px;
  font-weight: bold;
  border-top: 1px solid#dddddd;
}

.partners-map__zoom-closer {
  font-size: 25px;
}

.partners-map__list {
  position: absolute;
  width: 625px;
  display: block;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: 2px 4px 100px 34px rgba(34, 60, 80, 0.2);
}

@media screen and (max-width: #{$xl}) {
  .partners-map__list {
    width: 585px;
  }
}
@media screen and (max-width: #{$lg}) {
  .partners-map__list {
    left: 5% !important;
    position: fixed;
    top: 30% !important;
    z-index: 2;
    width: 90%;
    min-width: inherit;
  }
}

.partners-map__list-head {
  display: flex;
  flex-grow: 1;
  font-weight: bold;
  line-height: 40px;
  padding: 0 12px;
  align-items: center;
}

@media screen and (max-width: #{$xs}) {
  .partners-map__list-head {
    border-bottom: 1px solid #ebf8fe;
  }
}

.partners-map__list-city {
  flex-grow: 1;
}

.partners-map__list-close {
  cursor: pointer;
  width: 16px;
  height: 16px;
  outline: none;
  border: none;
  background: none;
  padding: 0;
}

.partners-map__list-close img {
  width: 100%;
  height: 100%;
}

.partners-map__list-columns-titles {
  background: #f9f9f9;
  display: flex;
  line-height: 35px;
  padding: 0 12px;
  color: #929aa3;
}

@media screen and (max-width: #{$xs}) {
  .partners-map__list-columns-titles {
    display: none;
  }
}

.partners-map__list-title--fixed-width {
  flex-basis: 195px;
}

.partners-map__list-title-org--grow {
  flex-grow: 1;
}

.partners-map__list-items-container {
  max-height: 250px;
  overflow-y: scroll;
}

.partners-map__list-item {
  display: flex;
  padding: 0 12px;
  line-height: 50px;
  color: inherit;
  text-decoration: none;
  align-items: center;
}

@media screen and (max-width: #{$xs}) {
  .partners-map__list-item {
    padding-top: 5px;
    padding-bottom: 5px;
    flex-direction: column;
    align-items: start;
    line-height: initial;
  }
}

.partners-map__list-item:not(:last-child) {
  border-bottom: 1px solid #ebf8fe;
}

.partners-map__list-item:hover {
  background: #f9f9f9;
}

.partners-map__list-status {
  display: flex;
  flex-basis: 200px;
  flex-shrink: 0;
  align-items: center;
}

@media screen and (max-width: #{$xs}) {
  .partners-map__list-status {
    flex-basis: initial;
  }
}

@media screen and (max-width: #{$xs}) {
  .partners-map__list-status-text {
    color: #929aa3;
  }
}

.partners-map__list-organization {
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@media screen and (max-width: #{$xs}) {
  .partners-map__list-organization {
    white-space: pre-wrap;
    text-overflow: initial;
    line-height: normal;
  }
}

@media screen and (max-width: #{$xs}) {
  .partners-map__list-amount {
    display: none;
  }
}

.partners-map__list-status-ico {
  margin-right: 5px;
  flex-basis: 20px;
  display: flex;
  align-items: center;
}

.partners-map__list-status-ico img {
  width: 18px;
  height: 18px;
}

@media screen and (max-width: #{$xs}) {
  .partners-map__list-status-ico {
    display: none;
  }
}

.partners-map__no-partners-tip {
  position: absolute;
}

.partners-map__no-partners-tip-close {
  width: 16px;
  height: 16px;
  cursor: pointer;
  background: none;
  outline: none;
  border: none;
  padding: 0;
}

.partners-map__no-partners-tip-close img {
  width: 100%;
  height: 100%;
}

.partners-map__no-partners-tip-container {
  border-radius: 2px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 2px 4px 100px 34px rgba(34, 60, 80, 0.2);
}

@media screen and (max-width: #{$lg}) {
  .partners-map__no-partners-tip-container {
    width: 80%;
    left: 10%;
    position: fixed;
    top: 40%;
    z-index: 2;
  }
}

.partners-map__no-partners-tip-head {
  border-bottom: 1px solid #dadada;
  display: flex;
  padding: 9px 12px;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  align-items: center;
}

.partners-map__no-partners-tip-message {
  padding: 12px;
  color: #f2291f;
}

.partners-map__info {
  display: flex;
  margin-top: 40px;
  justify-content: space-evenly;
}

@media screen and (max-width: #{$md}) {
  .partners-map__info {
    flex-wrap: wrap;
    justify-content: start;
    padding: 15px;
    margin-top: 20px;
  }
}
@media screen and (max-width: #{$xs}) {
  .partners-map__info {
    flex-direction: column;
    margin-top: 0;
  }
}

@media screen and (max-width: #{$xs}) {
  .partners-map__info-item-content {
    padding-top: 8px;
  }
}

.partners-map__info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 20%;
  margin-bottom: 40px;
  flex-shrink: 1;
}

@media screen and (max-width: #{$md}) {
  .partners-map__info-item {
    width: 50%;
    flex-direction: row;
  }
}
@media screen and (max-width: #{$xs}) {
  .partners-map__info-item {
    min-width: 100%;
    align-items: start;
  }
}

.partners-map__info-item-title {
  text-align: center;
  font-size: 12px;
  color: #929aa3;
}

@media screen and (max-width: #{$md}) {
  .partners-map__info-item-title {
    text-align: left;
  }
}

.partners-map__info-item-ico {
  margin-bottom: 20px;
  max-width: 48px;
  max-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
  }
}

@media screen and (max-width: #{$md}) {
  .partners-map__info-item-ico {
    margin-bottom: 0;
    margin-right: 15px;
  }
}

.partners-map__info-item-value {
  font-weight: 600;
  text-align: center;
}

@media screen and (max-width: #{$md}) {
  .partners-map__info-item-value {
    text-align: left;
  }
}

</style>
