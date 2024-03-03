<template>
  <div class="region-map">
    <svg class="region-map__svg js-map-svg">
      <g class="js-map-path-group" @mouseleave="onMapMouseLeave">
        <path
          v-for="region in geoRegions"
          class="region-map__region js-map-region"
          :class="regionClasses(region)"
          :d="path(region)"
          :key="region.properties.ISO"
          @click.stop="onSelectRegion($event, region)"
          @mouseover.passive="onHoverRegion($event, region)"
        />
        <template v-for="city in partnerCities">
          <g
            :key="city"
            v-if="
              activeRegion && city.regionISO === activeRegion.properties.ISO
            "
            class="region-map__city"
            :transform="city.translate"
            @click.stop="onCityClick($event, city)"
          >
            <circle
              r="1.5"
              class="region-map__city--small js-city-small-mark"
              v-if="city.partners.length === 1"
            />
            <g v-else>
              <circle
                r="3"
                class="region-map__city--big-outer js-city-bit-outer-mark"
              />
              <circle
                r="2.3"
                class="region-map__city--big-inner js-city-big-inner-mark"
              />
              <text class="region-map__city-counter js-partner-counter">
                {{ city.partners.length }}
              </text>
            </g>
          </g>
        </template>
      </g>
    </svg>

    <RegionHoverTip
      v-if="showRegionTip"
      class="region-map__region-tip"
      :style="regionTipStyles"
    >
      {{ hoveredRegion.properties.NAME }}
    </RegionHoverTip>

    <ZoomButtons
      class="region-map__zoom-button"
      @zoom-in="onZoomButton($event, 1.5)"
      @zoom-out="onZoomButton($event, 0.5)"
    />
  </div>
</template>

<script src="./RegionMap.js"></script>
<style lang="scss" scoped src="./RegionMap.scss"></style>
