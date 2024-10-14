import { Component, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Dichter } from '../timedata';
import { TranslocoService } from '@jsverse/transloco';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { icon, marker, Map } from 'leaflet';

// Reiseanzeige wie lösen? Daten aus Dichterbiographie extrahieren?
// s. Listen in i18 file
// Eintragung in poets file umschreiben
// travel, traveloge aus der timeline entfernen
// in den biographischen Informationen nur noch travel taggen
// Reisen würden gemäß der Logik der Einträge sonst doppelt erscheinen
// konzise Liste mit Jahresangaben und Orten

/*
    "chazan1766" : "1766 Lehrjahre in Kyōto (bis 1770)",
    "chazan1773" : "1773/1780 Besuche bei Rai Shunsui in Ōsaka",
    "chazan1776" : "1776 Aufenthalt in Okayama",
    "chazan1788" : "1788 Besuch bei der Familie Rai in Hiroshima",
    "chazan1794" : "1794 Reise nach Ise",
    "chazan1804" : "1804/1815 Reisen nach Edo",
    "chazan1818" : "1818 Reise nach Kyōto",
*/

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
      center: L.latLng(35.5, 134.5),
      zoom: 5,
      minZoom: 5
      // zoomControl: false, 
      // maxZoom: 5, 
      // .fitBounds( [[30.856311, 137.749958],   [30.856311, 137.749958]] )
      // .setView([36.856311, 137.749958], 8)
  };

  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
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

        this.json = json;
        var geoJSONLayer = L.geoJSON(this.json, { style: geostyle })
        geoJSONLayer.addTo(map);

    });

    
}


   selectedPoet:string = "";
   selectstatus:boolean = false;

   mapmarkers = []
   places:any = [];
   markergroup:any = [];


  locations = [ 
    {code: "edo", xco: 35.011665, yco: 135.768326, namede: "Edo", nameja: "江戸"},
    {code: "osaka", xco: 36, yco: 134, namede: "Ōsaka", nameja: "大阪"} 
    ]

    highways = [

    ]
  


 // locations + highways aus den travel daten in der biographie generieren
 // Dichter interface um Struktur für travel ergänzen

travelselection(poet: Dichter){

}

singlechipselection(poet: Dichter){

  if (this.selectedPoet.includes(poet.romanized)){
  this.selectedPoet = '';
  this.mapmarkers = [];

}else{
  this.selectedPoet = poet.romanized;

// städtenamen in den daten nur auf japanisch und übersetzt mit pipe, müssen daher hier auch auf japanisch abgeglichen werden; muss genaues match sein

  this.places.push(poet.placebirth, poet.placedeath);

  this.locations.forEach((location) => {
    if(this.places.includes(location.nameja)){
     this.markergroup.push(L.marker([location.xco, location.yco], this.markerIcon).bindTooltip(location.namede + location.nameja, {permanent: true, className: "label", offset: [0, 0]}));
     console.log('markergroup', this.markergroup);
    }

    this.mapmarkers = this.markergroup;

  });

//  console.log(this.selectedPoet, poet.placebirth, poet.placedeath, this.places[0]);
}
};


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
