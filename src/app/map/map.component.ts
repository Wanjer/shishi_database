import { Component, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Dichter } from '../timedata';
import { TranslocoService } from '@jsverse/transloco';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { icon, marker, Map } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  poets: Observable<any[]>;

  constructor(db: AngularFireDatabase, private translocoService: TranslocoService, private http: HttpClient) {
    this.poets = db.list('poets').valueChanges();
  };

  // MAP 

  map = L.Map;
  markers: L.Layer[] = [];
  json = null;
  options = {
      layers: [

        /*
        L.tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
          { maxZoom: 18, attribution: '...'}
        )
        */

      ],
      // .fitBounds( [[30.856311, 137.749958],   [30.856311, 137.749958]] )
      // .setView([36.856311, 137.749958], 8);
      center: L.latLng(35.5, 134.5),
      zoom: 5,
      minZoom: 5
      // zoomControl: false, 
      // maxZoom: 5, 
  };

  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: "/assets/birthicon.svg",
      shadowUrl: ""
    })
  };

  /*
  var birthIcon = L.icon({
    iconUrl: '/assets/birthicon.svg',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: '',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

var shibutsu = L.layerGroup([edo.setIcon(birthIcon), osaka.bindPopup('1700')]);

  */ 
  
   onMapReady(map: L.Map) {

    map.dragging.disable();

    this.http.get('/assets/japan_mapshaped.geojson').subscribe((json: any) => {

        var geostyle = {
        "stroke": false,
        "color": "grey",
        "opacity": 1,
        "fillOpacity": 1,
        };

        //console.log(json);
        this.json = json;
        var geoJSONLayer = L.geoJSON(this.json, { style: geostyle })
        geoJSONLayer.addTo(map);

       /* var edo_popup = L.popup({keepInView: true, autoClose: false, closeOnClick: false}).setContent('Edo 江戸'); */

    });

    
}

// dictionary cities = [ {xco: 35, yco: 135, name: edo, namede: Edo, nameja: 江戸} ]
// for each city in cities
// city.name = L.marker([city.xco, city.yco], this.markerIcon).bindTooltip('city.namede, city.nameja', {permanent: true, className: "label", offset: [0, 0]});

// separate dictionaries for roads and for meisho

// Funktioniert das??

edo = L.marker([35.011665, 135.768326], this.markerIcon).bindTooltip('Edo 江戸', {permanent: true, className: "label", offset: [0, 0]});

osaka = L.marker([35.611665, 135.768326], this.markerIcon).bindTooltip('Ōsaka 大阪', {permanent: true, className: "label", offset: [0, 0]});

Shibutsu = [
  this.edo, this.osaka
]

  // edo = L.marker([35.011665, 135.768326], this.markerIcon).bindTooltip('Edo 江戸', {permanent: true, className: "label", offset: [0, 0]});
                
  //const osaka = L.marker([35.611665, 135.768326], this.markerIcon);

// use first element as name, then push second array to poetsshown
 // Shibutsu:any[] = [this.edo, this.osaka]
 // Kansai = ['Ichikawa Kansai', [this.edo, this.osaka]];

 poetsshown:any[] = [];

 /*
 poetdisplay(){
 if(this.selectedPoet.includes('Ōkubo Shibutsu')){
  this.Shibutsu.forEach((el:any) => el.addTo(this.map));
  console.log('included')
 }else{
  console.log('not included')
 }
};
*/


  // TRANSLATION ETC 

   selectedPoet:string = "";
   selectstatus:boolean = false;

   /*
   chipselection(poet: Dichter){
     if(this.selectedPoet == poet.romanized){
      this.selectedPoet = "none";
       this.selectstatus = false;
       console.log(this.selectstatus);
       console.log(this.selectedPoet);
     }else{
     this.selectstatus = true;
     this.selectedPoet = poet.romanized;
     console.log(this.selectedPoet);
     }
   };
*/


chipselection(poet: Dichter){
  var mapwrap = this.map;
  console.log(mapwrap);
  if (this.selectedPoet.includes(poet.romanized)){
  this.selectedPoet = this.selectedPoet.replace(poet.romanized, '');

}else{
  this.selectedPoet = this.selectedPoet + ' ' + poet.romanized;
  console.log(this.selectedPoet);
}

};









    highwayselected:boolean = false;

    toggleHighway() {
      this.highwayselected = !this.highwayselected;
    }

    citiesselected:boolean = false;

    toggleCities() {
      this.citiesselected = !this.citiesselected;
    }

    townselected:boolean = false;

    toggleTown() {
      this.townselected = !this.townselected;
    }

    natureselected:boolean = false;

    toggleNature() {
      this.natureselected = !this.natureselected;
    }

    selectorperiodsvar:any = [];
    citiesvar:any = [];

    language = 'de';
    data: any = "";
    nameVar:any = "romanized";

   ngOnInit(): void{
    this.translocoService.langChanges$.subscribe(data => this.translateselectors(data));
    }

    translateselectors(data: any){
    this.language = data;
    if (this.language === 'de'){
    this.selectorperiodsvar = this.selectorperiods;
    this.nameVar = 'romanized';
    }else{
     this.selectorperiodsvar = this.selectorperiodsjp;
     this.nameVar = ''; // romanisierter Name soll in der jp Version nicht erscheinen
   }}

   layerpoets =  [
    {nameja: '大窪詩仏', namede: 'Ōkubo Shibutsu'}
   ]

  selectorperiods = [
    {value: 'noperiod', viewValue: 'Keine'},
    {value: 'earlyedo', viewValue: 'frühe Edo-Zeit'},
    {value: 'middleedo', viewValue: 'mittlere Edo-Zeit'},
    {value: 'lateedo', viewValue: 'späte Edo-Zeit'},
  ];

  selectorperiodsjp = [
    {value: 'noperiod', viewValue: 'すべて'},
    {value: 'earlyedo', viewValue: '江戸時代初期'},
    {value: 'middleedo', viewValue: '江戸時代中期'},
    {value: 'lateedo', viewValue: '江戸時代後期'},
  ];

  selectedperiod = 'noperiod';

   }
