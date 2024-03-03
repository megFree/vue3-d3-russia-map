<template>
  <div id="map" class="map" v-cloak>
    <RegionMap
      :geo-regions="geoRegions"
      @region-selected="onRegionSelected"
      @city-selected="onCitySelected"
      @zoom="onMapZoom"
    />

    <OverallInfo class="map__overall-info" :location="overallInfo" />

    <DetailTip
      v-if="showCompanyList"
      class="map__detail-tip"
      :style="companyListStyles"
      :title="activeCity.city"
      @close="onCloseCompanyList"
    >
      <OrganizationList
        class="map__org-list"
        :items="activeCity.partners"
      />
    </DetailTip>

    <DetailTip
      v-if="showNoCompaniesTip"
      class="map__detail-tip"
      :style="noCompaniesTipStyles"
      :title="activeRegion.properties.NAME"
      @close="onCloseNoCompaniesTip"
    >
      <div class="map__not-found-warning">
        В данном регионе компаний не обнаружено!
      </div>
    </DetailTip>
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
  "https://gist.githubusercontent.com/megFree/8e2ce80c44eb649bbadced8766a7621f/raw/3f88507283c2f858c556840d660296060e65c8a5/gistfile1.txt";
const companiesJsonURL =
  "https://gist.githubusercontent.com/megFree/d2e19e7870b808bcc51608ecab4c4284/raw/76a587379fb5dd8da71c290921d5343a83b05d8c/companiesData";

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
      showCompanyList: false,
      showNoCompaniesTip: false,
      activeCity: null,
      totalCrucialCompaniesCounter: 0,
      totalRegionalCompaniesCounter: 0,
      totalCertifiedCompaniesCounter: 0,
      totalImplementationsCounter: 0,
      companyListStyles: {
        left: "",
        top: "",
      },
      noCompaniesTipStyles: {
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

    const companyRegionalData = await json(companiesJsonURL);
    regionData.forEach((region) => {
      region.crucialCounter = 0;
      region.certifiedCounter = 0;
      region.regionalCounter = 0;
      region.implementationCounter = 0;

      companyRegionalData.forEach((regionalData) => {
        if (region.properties.ISO === regionalData.iso) {
          region.companyData = regionalData;

          regionalData.cities.forEach((city) => {
            city.partners.forEach((company) => {
              if (company.crucial) {
                region.crucialCounter++;
              }
              if (company.certified) {
                region.certifiedCounter++;
              }
              if (company.regional) {
                region.regionalCounter++;
              }
              region.implementationCounter += company.count;
            });
          });
        }
      });
    });

    regionData.forEach((region) => {
      if (region.companyData) {
        return (region.hasCompanies = true);
      } else {
        return (region.hasCompanies = false);
      }
    });

    this.geoRegions = regionData;

    this.geoRegions.forEach((region) => {
      this.totalCertifiedCompaniesCounter += region.certifiedCounter;
      this.totalCrucialCompaniesCounter += region.crucialCounter;
      this.totalImplementationsCounter += region.implementationCounter;
      this.totalRegionalCompaniesCounter += region.regionalCounter;
    });
  },
  methods: {
    onCloseCompanyList() {
      this.showCompanyList = false;
    },

    onCloseNoCompaniesTip() {
      this.showNoCompaniesTip = false;
    },

    onRegionSelected(event, region) {
      this.activeRegion = region;
      this.showNoCompaniesTip = false;
      this.showCompanyList = false;

      if (!this.activeRegion.hasCompanies) {
        this.showNoCompaniesTip = true;
        this.noCompaniesTipStyles.top = event.pageY + "px";
        this.noCompaniesTipStyles.left = event.pageX + "px";
      }
    },

    onCitySelected(event, city) {
      this.activeCity = city;
      this.companyListStyles.left = event.pageX + "px";
      this.companyListStyles.top = event.pageY + "px";
      this.showCompanyList = true;
    },

    onMapZoom() {
      this.showNoCompaniesTip = false;
      this.showCompanyList = false;
    },
  },
  computed: {
    overallInfo() {
      if (!this.activeRegion) {
        return {
          name: "Россия",
          crucialCounter: this.totalCrucialCompaniesCounter,
          regionalCounter: this.totalRegionalCompaniesCounter,
          certifiedCounter: this.totalCertifiedCompaniesCounter,
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
.map__detail-tip {
  position: absolute;
}

.map__not-found-warning {
  padding: 12px;
  color: #f2291f;
}

.map__overall-info {
  margin-top: 40px;
}
</style>
