import { Component, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Dichter } from '../timedata';
import { TranslocoService } from '@jsverse/transloco';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

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
      // zoomControl: false, 
      // minZoom: 5, 
      // maxZoom: 5,
      // .fitBounds( [[30.856311, 137.749958],   [30.856311, 137.749958]] )
      // .setView([36.856311, 137.749958], 8);
      // map.dragging.disable();
      center: L.latLng(35.5, 134.5),
      zoom: 5
  };
  

  /*
  var birthIcon = L.icon({
    iconUrl: '',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: '',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

var
edo = L.marker([35.011665, 135.768326]).bindPopup(edo),
osaka = L.marker([35.011665, 130.768326]).bindPopup(osaka);


var shibutsu = L.layerGroup([edo.setIcon(birthIcon), osaka.bindPopup('1700')]);


  */ 

  
   onMapReady(map: L.Map) {
    this.http.get('/assets/japan_mapshaped.geojson').subscribe((json: any) => {

        var geostyle = {
        "stroke": false,
        "color": "grey",
        "opacity": 1,
        "fillOpacity": 1,
        };

        console.log(json);
        this.json = json;
        var geoJSONLayer = L.geoJSON(this.json, { style: geostyle })
        geoJSONLayer.addTo(map);
    });
}




  // MAP 

   selectedPoet:string = "";
   selectstatus:boolean = false;

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
