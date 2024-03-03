(function(){"use strict";var t={1347:function(t,e,i){var o=i(3686),n=i(9527),s=i(354);const a={id:"map",class:"map"},r=(0,n.Lk)("div",{class:"map__not-found-warning"}," В данном регионе компаний не обнаружено! ",-1);function l(t,e,i,o,l,c){const p=(0,n.g2)("RegionMap"),m=(0,n.g2)("OverallInfo"),u=(0,n.g2)("OrganizationList"),g=(0,n.g2)("DetailTip");return(0,n.uX)(),(0,n.CE)("div",a,[(0,n.bF)(p,{"geo-regions":l.geoRegions,onRegionSelected:c.onRegionSelected,onCitySelected:c.onCitySelected,onZoom:c.onMapZoom},null,8,["geo-regions","onRegionSelected","onCitySelected","onZoom"]),(0,n.bF)(m,{class:"map__overall-info",location:c.overallInfo},null,8,["location"]),l.showCompanyList?((0,n.uX)(),(0,n.Wv)(g,{key:0,class:"map__detail-tip",style:(0,s.Tr)(l.companyListStyles),title:l.activeCity.city,onClose:c.onCloseCompanyList},{default:(0,n.k6)((()=>[(0,n.bF)(u,{class:"map__org-list",items:l.activeCity.partners},null,8,["items"])])),_:1},8,["style","title","onClose"])):(0,n.Q3)("",!0),l.showNoCompaniesTip?((0,n.uX)(),(0,n.Wv)(g,{key:1,class:"map__detail-tip",style:(0,s.Tr)(l.noCompaniesTipStyles),title:l.activeRegion.properties.NAME,onClose:c.onCloseNoCompaniesTip},{default:(0,n.k6)((()=>[r])),_:1},8,["style","title","onClose"])):(0,n.Q3)("",!0)])}var c=i(5795),p=i(4516),m=i.p+"img/close.30b8fc23.svg";const u=t=>((0,n.Qi)("data-v-19d8cedb"),t=t(),(0,n.jt)(),t),g={class:"detail-tip"},v={class:"detail-tip__container"},h={class:"detail-tip__head"},d={class:"detail-tip__region"},C=u((()=>(0,n.Lk)("img",{src:m,alt:"Крестик"},null,-1))),f=[C],_={class:"detail-tip__content"};function A(t,e,i,o,a,r){return(0,n.uX)(),(0,n.CE)("div",g,[(0,n.Lk)("div",v,[(0,n.Lk)("div",h,[(0,n.Lk)("div",d,(0,s.v_)(t.title),1),(0,n.Lk)("button",{onClick:e[0]||(e[0]=(...e)=>t.close&&t.close(...e)),class:"detail-tip__close"},f)]),(0,n.Lk)("div",_,[(0,n.RG)(t.$slots,"default",{},void 0,!0)])])])}var k={name:"DetailTip",emits:["close"],props:{title:{type:String,required:!0}},methods:{close(){this.$emit("close")}}},y=i(1423);const L=(0,y.A)(k,[["render",A],["__scopeId","data-v-19d8cedb"]]);var R=L,b=i.p+"img/key.c1367b89.svg",E="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAzUlEQVR4nO2XMQrDMAxF/3l8qNKp1+pJ2iFeS08TuqqLQk0IbTGOI1n/gYbYEPKQPnYA4gsxVtUMJ9KCX+/6tk+RBXZkA44WmJEPzEiUjCQAD63kVeQMYC6eZ11zJ7LUVeufa4hYFHkBuBTrp1WHzIvcATyLTJQk3bt5EDn0O4QibRF2ROFoeRqtvMM/eR5FZDpCpCdCkUgdyTsF253IZEWkJ0KRSB3JPNnBk72aEBnpiVgOO0/2GkKMVk+EIgo70hjhaClirKoZRoSgM28+GxA8aQzaRgAAAABJRU5ErkJggg==",w=i.p+"img/home.16a0e833.svg";const I=t=>((0,n.Qi)("data-v-5182fc05"),t=t(),(0,n.jt)(),t),O={class:"organization-list"},S=I((()=>(0,n.Lk)("div",{class:"organization-list__columns-titles"},[(0,n.Lk)("div",{class:"organization-list__title organization-list__title--fixed-width"}," Статус "),(0,n.Lk)("div",{class:"organization-list__title organization-list__title-org--grow"}," Организация "),(0,n.Lk)("div",{class:"organization-list__title"},"Кол-во внедрений")],-1))),z={class:"organization-list__items-container"},T={class:"organization-list__status"},X={class:"organization-list__status-ico"},M={key:0,src:b,alt:"Иконка ключевого партнера"},F={key:1,src:E,alt:"Иконка сертифицированного партнера"},j={key:2,src:w,alt:"Иконка регионального партнера"},N={key:0,class:"organization-list__status-text"},Z={key:1,class:"organization-list__status-text"},x={key:2,class:"organization-list__status-text"},B={class:"organization-list__organization"},P={class:"organization-list__amount"};function Q(t,e,i,o,a,r){return(0,n.uX)(),(0,n.CE)("div",O,[S,(0,n.Lk)("div",z,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(t.items,(t=>((0,n.uX)(),(0,n.CE)("a",{class:"organization-list__item",key:t.partner,href:"#"},[(0,n.Lk)("div",T,[(0,n.Lk)("div",X,[t.crucial?((0,n.uX)(),(0,n.CE)("img",M)):t.certified?((0,n.uX)(),(0,n.CE)("img",F)):((0,n.uX)(),(0,n.CE)("img",j))]),t.crucial?((0,n.uX)(),(0,n.CE)("div",N," Ключевой ")):t.certified?((0,n.uX)(),(0,n.CE)("div",Z," Сертифицированный ")):((0,n.uX)(),(0,n.CE)("div",x,"Региональный"))]),(0,n.Lk)("div",B,(0,s.v_)(t.partner),1),(0,n.Lk)("div",P,(0,s.v_)(t.count),1)])))),128))])])}var D={name:"OrganizationList",props:{items:{type:Array,required:!0}}};const K=(0,y.A)(D,[["render",Q],["__scopeId","data-v-5182fc05"]]);var U=K,J="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB8UlEQVR4nO2ZO07DQBCGP2LKcANSIEFBzxVAQqkoaCnpoOdxAbgHKai4AkkVLgBKQUEoEREtAg2yNJFWlteP3bUdEv/SStZ4/Xs/e2Y2VqDV6mkDGAPiOMbq0ajWgHsPCNHxoF6N6VoX8glsO1y/BXyoxxUN6QD4AX6BvofPfiAfJ+0AM32SFwH8LtXrC9ilRj0FqAuxjNg7mNaBE+AFeNbjODaXVDy81QGOFSBp/gqcKlCwGybk7RvpU58YZhONpcUXDiTKAIhy5knKvNpBOikpZKZO6OuCg0QF30BesWf5ZDWFovFcjQoCJFPIttA0oFEdIGLJ7bLFbru+7ILFF6RszhedVztIp6Jirx1kkpMqebKlYu0gEqht2n4JuEp8i91XtmIvK3Et9tDK8u8CZ5qCEz3uuq4vbWL8MfMOTIFDj7jNvwfcGN8vYoyZntsMATI14m8e8aT/HjAAvo34EDjSMTTi8Zw7XxDXzpLllVzkQMGSSoMVBY0bSeMg87S51dTKU0/nmun3uAgg5ymFXERdvTY3xZrsWkF96gZJvj0pea7wjZYKpF/hPlIryLSifcRH4gJSRdfylbQgVPNG2q7FKrffkGq02PsVf4+4SNp9hCXoWlLhhtiCsMpdK6RaENc38l9GoT96Fn0M7RitaFx/uOQzNipRCGQAAAAASUVORK5CYII=",V="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACHUlEQVR4nO2ZzUoDMRSFPxddu+xUwa60XfmDO932FXwK+yC+hC60Cgp248/WpQ/gykewxQraKohaCVwhlJlQJ8lkoj0QWtIyc8/k3ntyJjDD/8EGcA28AM/AFbBOZGgCI2A8MdRcg4jQlcBPgaqMU5k7JyL0JOhEm6vJ3AMREqnFTqSrpdYisACcxZhaDelUk8X+HFuxK6wA+xqJfZmLFmMZ0QvZ2JLIRp54fAiZDZFm3nh8CJkNkW7eeHwImQ2RXt54TEI2CEBkkFdY9aVMZPws5RdwDNQLIFKXe30Z4jGmliqgYUZxvcl39bkHzHsgMi/X1u+VVuzDaZqPam2X0urUuABWgSWgoz0llYa7QMUBEXWNNtBPWf20eNZwgE3gRgvwHtixINIC7rT/3QJbFIhpA8gi8tsH4hUVSS89JTqShmpfdaAFeiBzk4XcnzJFC8Fkkb5m7H6HFk2jUNRlRT4MivyprVrpMTAocl5hDYJHgyKr30qPJeAQeDcosvrtKMcOIUixDw1Wd1TGYq9I6+ylKHKa1V3OaL/tkO235UkQ5wqI3RiAyy3KtotAdY/8Ih55zSIl8m4aT7RN45VLz16mbfzIxrOHNlZVV579iXBWN3Hp2UO+fKi59OyhXwclLjz7VB7ZA5GGTTyuPbINEXx69qKJBEeW1Y0Kzb9y0NPVuk1Njt5mp7oh8SdPdRNHwhoEPoQ1GEojZDMQAN9X5Jbao3DyuwAAAABJRU5ErkJggg==";const q=t=>((0,n.Qi)("data-v-9a083b48"),t=t(),(0,n.jt)(),t),G={class:"overall-info"},W={class:"overall-info__item"},Y=q((()=>(0,n.Lk)("div",{class:"overall-info__item-ico"},[(0,n.Lk)("img",{src:J,alt:"Иконка локации"})],-1))),H={class:"overall-info__item-content"},$=q((()=>(0,n.Lk)("div",{class:"overall-info__item-title"},"Локация",-1))),tt={class:"overall-info__item-value"},et={class:"overall-info__item"},it=q((()=>(0,n.Lk)("div",{class:"overall-info__item-ico"},[(0,n.Lk)("img",{src:w,alt:"Иконка региональных партнеров"})],-1))),ot={class:"overall-info__item-content"},nt=q((()=>(0,n.Lk)("div",{class:"overall-info__item-title"},"Региональные партнёры",-1))),st={class:"overall-info__item-value"},at={class:"overall-info__item"},rt=q((()=>(0,n.Lk)("div",{class:"overall-info__item-ico"},[(0,n.Lk)("img",{src:b,alt:"Иконка ключевых партнеров"})],-1))),lt={class:"overall-info__item-content"},ct=q((()=>(0,n.Lk)("div",{class:"overall-info__item-title"},"Ключевые партнёры",-1))),pt={class:"overall-info__item-value"},mt={class:"overall-info__item"},ut=q((()=>(0,n.Lk)("div",{class:"overall-info__item-ico"},[(0,n.Lk)("img",{src:E,alt:"Иконка сертифицированных партнеров"})],-1))),gt={class:"overall-info__item-content"},vt=q((()=>(0,n.Lk)("div",{class:"overall-info__item-title"}," Сертифицированный партнер ",-1))),ht={class:"overall-info__item-value"},dt={class:"overall-info__item"},Ct=q((()=>(0,n.Lk)("div",{class:"overall-info__item-ico"},[(0,n.Lk)("img",{src:V,alt:"Иконка количества внедрений"})],-1))),ft={class:"overall-info__item-content"},_t=q((()=>(0,n.Lk)("div",{class:"overall-info__item-title"},"Количество внедрений",-1))),At={class:"overall-info__item-value"};function kt(t,e,i,o,a,r){return(0,n.uX)(),(0,n.CE)("div",G,[(0,n.Lk)("div",W,[Y,(0,n.Lk)("div",H,[$,(0,n.Lk)("div",tt,(0,s.v_)(t.location.name),1)])]),(0,n.Lk)("div",et,[it,(0,n.Lk)("div",ot,[nt,(0,n.Lk)("div",st,(0,s.v_)(t.location.regionalCounter),1)])]),(0,n.Lk)("div",at,[rt,(0,n.Lk)("div",lt,[ct,(0,n.Lk)("div",pt,(0,s.v_)(t.location.crucialCounter),1)])]),(0,n.Lk)("div",mt,[ut,(0,n.Lk)("div",gt,[vt,(0,n.Lk)("div",ht,(0,s.v_)(t.location.certifiedCounter),1)])]),(0,n.Lk)("div",dt,[Ct,(0,n.Lk)("div",ft,[_t,(0,n.Lk)("div",At,(0,s.v_)(t.location.implementationCounter),1)])])])}var yt={name:"OverallInfo",props:{location:{type:Object,required:!0,default:()=>({name:"",regionalCounter:0,crutialCounter:0,certifiedCounter:0,implementationCounter:0})}}};const Lt=(0,y.A)(yt,[["render",kt],["__scopeId","data-v-9a083b48"]]);var Rt=Lt;const bt=t=>((0,n.Qi)("data-v-313892de"),t=t(),(0,n.jt)(),t),Et={class:"region-map js-region-map"},wt={class:"region-map__svg js-map-svg"},It=["d","onClick","onMouseoverPassive"],Ot=["transform","onClick"],St={key:0,r:"1.5",class:"region-map__city--small js-city-small-mark"},zt={key:1},Tt=bt((()=>(0,n.Lk)("circle",{r:"3",class:"region-map__city--big-outer js-city-bit-outer-mark"},null,-1))),Xt=bt((()=>(0,n.Lk)("circle",{r:"2.3",class:"region-map__city--big-inner js-city-big-inner-mark"},null,-1))),Mt={class:"region-map__city-counter js-company-counter"};function Ft(t,e,i,a,r,l){const c=(0,n.g2)("RegionHoverTip"),p=(0,n.g2)("ZoomButtons");return(0,n.uX)(),(0,n.CE)("div",Et,[((0,n.uX)(),(0,n.CE)("svg",wt,[(0,n.Lk)("g",{class:"js-map-path-group",onMouseleave:e[0]||(e[0]=(...e)=>t.onMapMouseLeave&&t.onMapMouseLeave(...e))},[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(t.geoRegions,(e=>((0,n.uX)(),(0,n.CE)("path",{class:(0,s.C4)(["region-map__region js-map-region",t.regionClasses(e)]),d:t.path(e),key:e.properties.ISO,onClick:(0,o.D$)((i=>t.onSelectRegion(i,e)),["stop"]),onMouseoverPassive:i=>t.onHoverRegion(i,e)},null,42,It)))),128)),((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(t.companyCities,(e=>((0,n.uX)(),(0,n.CE)(n.FK,null,[t.activeRegion&&e.regionISO===t.activeRegion.properties.ISO?((0,n.uX)(),(0,n.CE)("g",{key:e,class:"region-map__city",transform:e.translate,onClick:(0,o.D$)((i=>t.onCityClick(i,e)),["stop"])},[1===e.partners.length?((0,n.uX)(),(0,n.CE)("circle",St)):((0,n.uX)(),(0,n.CE)("g",zt,[Tt,Xt,(0,n.Lk)("text",Mt,(0,s.v_)(e.partners.length),1)]))],8,Ot)):(0,n.Q3)("",!0)],64)))),256))],32)])),t.showRegionTip?((0,n.uX)(),(0,n.Wv)(c,{key:0,class:"region-map__region-tip",style:(0,s.Tr)(t.regionTipStyles)},{default:(0,n.k6)((()=>[(0,n.eW)((0,s.v_)(t.hoveredRegion.properties.NAME),1)])),_:1},8,["style"])):(0,n.Q3)("",!0),(0,n.bF)(p,{class:"region-map__zoom-button",onZoomIn:e[1]||(e[1]=e=>t.onZoomButton(e,1.5)),onZoomOut:e[2]||(e[2]=e=>t.onZoomButton(e,.5))})])}i(3297);const jt={class:"region-hover-tip"};function Nt(t,e,i,o,s,a){return(0,n.uX)(),(0,n.CE)("div",jt,[(0,n.RG)(t.$slots,"default",{},void 0,!0)])}var Zt={name:"RegionHoverTip"};const xt=(0,y.A)(Zt,[["render",Nt],["__scopeId","data-v-49f3d812"]]);var Bt=xt;const Pt={class:"zoom-buttons"};function Qt(t,e,i,o,s,a){return(0,n.uX)(),(0,n.CE)("div",Pt,[(0,n.Lk)("button",{onClick:e[0]||(e[0]=e=>t.zoomIn()),class:"zoom-buttons__btn zoom-buttons__btn--closer"}," + "),(0,n.Lk)("button",{onClick:e[1]||(e[1]=e=>t.zoomOut()),class:"zoom-buttons__btn zoom-buttons__btn--away"}," — ")])}var Dt={name:"ZoomButtons",emits:["zoomIn","zoomOut"],methods:{zoomIn(){this.$emit("zoomIn")},zoomOut(){this.$emit("zoomOut")}}};const Kt=(0,y.A)(Dt,[["render",Qt],["__scopeId","data-v-522f9696"]]);var Ut=Kt,Jt={name:"RegionMap",components:{RegionHoverTip:Bt,ZoomButtons:Ut},data(){return{activeRegion:null,projection:null,path:null,zoom:null,mouseOverTimer:null,regionTipStyles:{top:null,left:null},showRegionTip:!1,regionClasses(t){const e={"region-map__region--not-stroke":t.properties.notStroke,"no-companies":!t.hasCompanies};return this.activeRegion&&this.activeRegion.properties.ISO===t.properties.ISO&&(e["active"]=!0),e},selections(){return{svgContainer:(0,c.Ltv)(".js-map-svg"),pathGroup:(0,c.Ltv)(".js-map-path-group"),paths:(0,c.Ubm)(".js-map-region"),cityBigOuterCircle:(0,c.Ubm)(".js-city-bit-outer-mark"),cityBigInnerCircle:(0,c.Ubm)(".js-city-big-inner-mark"),citySmallCircle:(0,c.Ubm)(".js-city-small-mark"),cityCounter:(0,c.Ubm)(".js-company-counter"),map:document.querySelector(".js-region-map")}},mapProperties(){return{width:Math.abs(window.innerWidth),height:this.selections().map.offsetHeight}}}},emits:["regionSelected","citySelected","zoom"],props:{geoRegions:{type:Array,required:!0}},mounted(){this.setProjection(),this.setPath(),this.initZoom()},methods:{setProjection(){let t=2.4;this.mapProperties().height<400&&(t=1.5),this.projection=(0,c.pKm)().rotate([-105,0]).center([-10,65]).parallels([52,64]).scale(this.mapProperties().width/t).translate([this.mapProperties().width/2,this.mapProperties().height/2]).precision(.1)},setPath(){this.path=(0,c.zFW)(this.projection)},onSelectRegion(t,e){this.showRegionTip=!1;const[[i,o],[n,s]]=this.path.bounds(e);e.hasCompanies&&this.selections().svgContainer.transition().duration(750).call(this.zoom.transform,c.GSI.translate(this.mapProperties().width/2,this.mapProperties().height/2).scale(Math.min(25,.9/Math.max((n-i)/this.mapProperties().width,(s-o)/this.mapProperties().height))).translate(-(i+n)/2,-(o+s)/2),(0,c.WnM)(t,this.selections().svgContainer.node())),this.activeRegion=e,this.$emit("regionSelected",t,e)},initZoom(){this.zoom=(0,c.s_O)().scaleExtent([1,20]).on("zoom",this.onZoom),this.selections().svgContainer.call(this.zoom)},onZoom(t){this.selections().pathGroup.attr("transform",t.transform),this.selections().paths.attr("stroke-width",1/t.transform.k),this.selections().cityBigInnerCircle.attr("r",20/t.transform.k),this.selections().cityBigOuterCircle.attr("r",25/t.transform.k).attr("stroke-width",1/t.transform.k),this.selections().citySmallCircle.attr("r",10/t.transform.k).attr("stroke-width",2.5/t.transform.k),this.selections().cityCounter.attr("font-size",20/t.transform.k).attr("transform",`translate(0, ${7/t.transform.k})`),this.$emit("zoom")},onMapMouseLeave(){clearTimeout(this.mouseOverTimer),this.showRegionTip=!1},onHoverRegion(t,e){clearTimeout(this.mouseOverTimer);const i=()=>{this.activeRegion&&this.activeRegion.properties.NAME===e.properties.NAME||(this.showRegionTip=!0,this.hoveredRegion=e,this.regionTipStyles.left=t.pageX+30+"px",this.regionTipStyles.top=t.pageY+15+"px")};this.mouseOverTimer=setTimeout(i,200)},onZoomButton(t,e){this.selections().svgContainer.transition().duration(250).call(this.zoom.scaleBy,e)},onCityClick(t,e){this.$emit("citySelected",t,e)}},computed:{companyCities(){const t=[];return this.geoRegions?.length&&this.geoRegions.forEach((e=>{e.hasCompanies&&e.companyData.cities.forEach((i=>{const o={...i};o.translate=`translate(${this.projection([o.coord[1],o.coord[0]])})`,o.regionISO=e.properties.ISO,t.push(o)}))})),t}}};const Vt=(0,y.A)(Jt,[["render",Ft],["__scopeId","data-v-313892de"]]);var qt=Vt;const Gt="https://gist.githubusercontent.com/megFree/8e2ce80c44eb649bbadced8766a7621f/raw/3f88507283c2f858c556840d660296060e65c8a5/gistfile1.txt",Wt="https://gist.githubusercontent.com/megFree/d2e19e7870b808bcc51608ecab4c4284/raw/76a587379fb5dd8da71c290921d5343a83b05d8c/companiesData";var Yt={components:{DetailTip:R,OrganizationList:U,OverallInfo:Rt,RegionMap:qt},data(){return{geoRegions:null,activeRegion:null,showCompanyList:!1,showNoCompaniesTip:!1,activeCity:null,totalCrucialCompaniesCounter:0,totalRegionalCompaniesCounter:0,totalCertifiedCompaniesCounter:0,totalImplementationsCounter:0,companyListStyles:{left:"",top:""},noCompaniesTipStyles:{left:"",top:""}}},async mounted(){const t=await(0,c.Pq9)(Gt),e=(0,p.N4)(t,"russiaGeo").features;e[21].properties.notStroke=!0;const i=await(0,c.Pq9)(Wt);e.forEach((t=>{t.crucialCounter=0,t.certifiedCounter=0,t.regionalCounter=0,t.implementationCounter=0,i.forEach((e=>{t.properties.ISO===e.iso&&(t.companyData=e,e.cities.forEach((e=>{e.partners.forEach((e=>{e.crucial&&t.crucialCounter++,e.certified&&t.certifiedCounter++,e.regional&&t.regionalCounter++,t.implementationCounter+=e.count}))})))}))})),e.forEach((t=>t.companyData?t.hasCompanies=!0:t.hasCompanies=!1)),this.geoRegions=e,this.geoRegions.forEach((t=>{this.totalCertifiedCompaniesCounter+=t.certifiedCounter,this.totalCrucialCompaniesCounter+=t.crucialCounter,this.totalImplementationsCounter+=t.implementationCounter,this.totalRegionalCompaniesCounter+=t.regionalCounter}))},methods:{onCloseCompanyList(){this.showCompanyList=!1},onCloseNoCompaniesTip(){this.showNoCompaniesTip=!1},onRegionSelected(t,e){this.activeRegion=e,this.showNoCompaniesTip=!1,this.showCompanyList=!1,this.activeRegion.hasCompanies||(this.showNoCompaniesTip=!0,this.noCompaniesTipStyles.top=t.pageY+"px",this.noCompaniesTipStyles.left=t.pageX+"px")},onCitySelected(t,e){this.activeCity=e,this.companyListStyles.left=t.pageX+"px",this.companyListStyles.top=t.pageY+"px",this.showCompanyList=!0},onMapZoom(){this.showNoCompaniesTip=!1,this.showCompanyList=!1}},computed:{overallInfo(){return this.activeRegion?{name:this.activeRegion.properties.NAME,crucialCounter:this.activeRegion.crucialCounter,regionalCounter:this.activeRegion.regionalCounter,certifiedCounter:this.activeRegion.certifiedCounter,implementationCounter:this.activeRegion.implementationCounter}:{name:"Россия",crucialCounter:this.totalCrucialCompaniesCounter,regionalCounter:this.totalRegionalCompaniesCounter,certifiedCounter:this.totalCertifiedCompaniesCounter,implementationCounter:this.totalImplementationsCounter}}}};const Ht=(0,y.A)(Yt,[["render",l]]);var $t=Ht;(0,o.Ef)($t).mount("#app")}},e={};function i(o){var n=e[o];if(void 0!==n)return n.exports;var s=e[o]={exports:{}};return t[o].call(s.exports,s,s.exports,i),s.exports}i.m=t,function(){var t=[];i.O=function(e,o,n,s){if(!o){var a=1/0;for(p=0;p<t.length;p++){o=t[p][0],n=t[p][1],s=t[p][2];for(var r=!0,l=0;l<o.length;l++)(!1&s||a>=s)&&Object.keys(i.O).every((function(t){return i.O[t](o[l])}))?o.splice(l--,1):(r=!1,s<a&&(a=s));if(r){t.splice(p--,1);var c=n();void 0!==c&&(e=c)}}return e}s=s||0;for(var p=t.length;p>0&&t[p-1][2]>s;p--)t[p]=t[p-1];t[p]=[o,n,s]}}(),function(){i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,{a:e}),e}}(),function(){i.d=function(t,e){for(var o in e)i.o(e,o)&&!i.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){i.p="/"}(),function(){var t={524:0};i.O.j=function(e){return 0===t[e]};var e=function(e,o){var n,s,a=o[0],r=o[1],l=o[2],c=0;if(a.some((function(e){return 0!==t[e]}))){for(n in r)i.o(r,n)&&(i.m[n]=r[n]);if(l)var p=l(i)}for(e&&e(o);c<a.length;c++)s=a[c],i.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return i.O(p)},o=self["webpackChunkvue3_d3_russia_map"]=self["webpackChunkvue3_d3_russia_map"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=i.O(void 0,[504],(function(){return i(1347)}));o=i.O(o)})();
//# sourceMappingURL=app.2ee5e181.js.map