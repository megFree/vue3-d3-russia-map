<template>
  <div id="map" class="partners-map" v-cloak>
    <div class="js-partners-map">
      <RegionMap
        :geo-regions="geoRegions"
        @region-selected="onRegionSelected"
        @city-selected="onCitySelected"
        @zoom="onMapZoom"
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
import { json } from "d3";
import { feature } from "topojson-client";
import "normalize.css";
import DetailTip from "@/components/DetailTip/DetailTip.vue";
import OrganizationList from "@/components/OrganizationList/OrganizationList.vue";
import OverallInfo from "@/components/OverallInfo/OverallInfo.vue";
import RegionMap from "@/components/RegionMap/RegionMap.vue";

const topoJsonURL =
  "https://gist.githubusercontent.com/megFree/0c3bfaf9d34f8faca9be4d2b6be00aa2/raw/6d5706743886f88f36ed9ea91f6398611eeb8fcd/russiaSimpleTopo.json";
const partnersJsonURL =
  "https://gist.githubusercontent.com/megFree/265c96083cf012718f8c746a8b3c718b/raw/d8e899d0b06e650d5c4cf57276414446ca58b725/demodata.json";

export default {
  components: {
    DetailTip,
    OrganizationList,
    OverallInfo,
    RegionMap,
  },
  data() {
    return {
      geoRegions: null,
      activeRegion: null,
      showPartnerList: false,
      showNoPartnersTip: false,
      activeCity: null,
      totalCrucialPartnersCounter: 0,
      totalRegionalPartnersCounter: 0,
      totalCertifiedPartnersCounter: 0,
      totalImplementationsCounter: 0,
      partnerListStyles: {
        left: "",
        top: "",
      },
      noPartnersTipStyles: {
        left: "",
        top: "",
      },
    };
  },
  async mounted() {
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

    this.geoRegions.forEach((region) => {
      this.totalCertifiedPartnersCounter += region.certifiedCounter;
      this.totalCrucialPartnersCounter += region.crucialCounter;
      this.totalImplementationsCounter += region.implementationCounter;
      this.totalRegionalPartnersCounter += region.regionalCounter;
    });
  },
  methods: {
    onClosePartnerList() {
      this.showPartnerList = false;
    },

    onCloseNoPartnerTip() {
      this.showNoPartnersTip = false;
    },

    onRegionSelected(event, region) {
      this.activeRegion = region;
      this.showNoPartnersTip = false;
      this.showPartnerList = false;

      if (!this.activeRegion.hasPartners) {
        this.showNoPartnersTip = true;
        this.noPartnersTipStyles.top = event.pageY + "px";
        this.noPartnersTipStyles.left = event.pageX + "px";
      }
    },

    onCitySelected(event, city) {
      this.activeCity = city;
      this.partnerListStyles.left = event.pageX + "px";
      this.partnerListStyles.top = event.pageY + "px";
      this.showPartnerList = true;
    },

    onMapZoom() {
      this.showNoPartnersTip = false;
      this.showPartnerList = false;
    },
  },
  computed: {
    overallInfo() {
      if (!this.activeRegion) {
        return {
          name: "Россия",
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
    },
  },
};
</script>

<style lang="scss">
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
