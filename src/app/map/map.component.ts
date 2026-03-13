import { Component, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Dichter, Travel } from '../../assets/timedata';
import { TranslocoService, TranslocoPipe } from '@jsverse/transloco';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
//import { icon, marker, Map, polyline, Layer, LayerGroup } from 'leaflet';
import { locationsgeojson } from '../../assets/locations'
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
//import { GeoJSON } from 'geojson';
//import CircleIcon from '@angular/material';



@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css'],
    standalone: true,
    imports: [MatFormField, MatLabel, MatSelect, NgFor, MatOption, CdkConnectedOverlay, LeafletModule, MatChipListbox, MatChipOption, NgIf, AsyncPipe, TranslocoPipe]
})
export class MapComponent {

  poets: Observable<any[]>;

  constructor(db: AngularFireDatabase, private translocoService: TranslocoService, private http: HttpClient) {
    this.poets = db.list('poets').valueChanges();
  };


  // variable declarations

  // MAP 

  map = L.Map;
  json = null;

  // see if mouseover or touchstart should be used for marker hover popup
  ua = navigator.userAgent;
  uatest = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(this.ua)

  // marker functions

  selectedPoet: any = [];
  selectedPoetRomanized: string = "";


  selectstatus: boolean = false;
  highwaytrigger: boolean = false;
  citiestrigger: boolean = false;
  towntrigger: boolean = false;
  naturetrigger: boolean = false;

  poetmarkervar: any = [];
  highwaymarkervar: any = [];
  citymarkervar: any = [];
  townmarkervar: any = [];
  naturemarkervar: any = [];
  selectedTravel = "";
  travelmarkervar: any = [];

  // bound to template

  poetmarkers = [];
  highwaymarkers = [];
  citymarkers = [];
  townmarkers = [];
  naturemarkers = [];
  travels: any = [];
  all_travelstations: any = [];

  // interface

  locations = locationsgeojson;

  leafletoptions = {
    center: L.latLng(35.5, 134.5),
    zoom: 5,
    minZoom: 5
    //layers:  []
    // zoomControl: false, 
    // maxZoom: 5, 
    // .fitBounds( [[30.856311, 137.749958],   [30.856311, 137.749958]] )
    // .setView([36.856311, 137.749958], 8)
  };


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

  // map features display

  // leaflet / gmaps coordinates are in format long,lat vs geoJSON lat,long as x,y > therefore loaded in reverse
  // gmaps coordinates reversed in geoJSON file with jq script 
  // jq '.features[] | .geometry.coordinates |= reverse' > result.json
  // vgl gmaps : Although the default map projection associates longitude with the x-coordinate of the map, and latitude with the y-coordinate, the latitude coordinate is always written first, followed by the longitude

  // REVERSE COORDINATE ORDER for final application

  // lots of repeating code: define 

  highwayview() {

    this.highwaytrigger = !this.highwaytrigger;

    if (this.highwaytrigger == false) {
      this.highwaymarkervar = [];
      this.highwaymarkers = this.highwaymarkervar;
    }
    else {

      this.highwaymarkervar = [];

      this.locations.features.forEach((location) => {
        if (location.properties.category.includes("road")) {

          function lngLatToLatLng(lngLat: Array<number>) {
            return [lngLat[1], lngLat[0]];
          }

          location.geometry.coordinates;

          var colorvar = '#e67300';
          var colordark = '#994d00';
          if (location.properties.category.includes("searoute")) {
            colorvar = '#80ccff';
            colordark = '#33adff';
          }

          this.highwaymarkervar
            .push(L.polyline([(location.geometry.coordinates as [[number, number]]).map(lngLatToLatLng) as []], { color: colorvar })
              .bindPopup(location.properties.name_de + location.properties.name_ja, { className: "label", offset: [0, 0], closeButton: false })
              .on('mouseover', function (ev) { ev.target.openPopup().setStyle({ color: colordark, weight: '3.2' }) })
              .on('popupclose', function (ev) { ev.target.setStyle({ color: colorvar, weight: '3.0' }) })
            );
        }
      })
      this.highwaymarkers = this.highwaymarkervar;

    }
  }


  cityview() {

    this.citiestrigger = !this.citiestrigger;

    if (this.citiestrigger == false) {
      this.citymarkervar = [];
      this.citymarkers = this.citymarkervar;

    }
    else {
      this.citymarkervar = [];

      this.locations.features.forEach((location: any) => {

        if (location.properties.category.includes("city")) {

          // set CSS inline on innercircle

          var citydiv_circle = L.divIcon({ className: location.properties.name_de, html: "<div class='innercircle' style='height: 8px; width: 8px; border-radius: 50%; background: #ffb3ff; '></div>" });
          var citybigdiv_circle = L.divIcon({ className: location.properties.name_de, html: "<div class='biginnercircle' style='height: 12px; width: 12px; border-radius: 50%; background: #ff4dff; '></div>" });

          // invisibleicon verhindert Artefakte wie auf der markerpane verbleibendes icon
          //falls der markerselector abgewählt wird, während das icon vergrößert ist
          var invisibleicon = L.divIcon({ className: 'invisible', html: "<div></div>" });

          if (this.uatest) {
            this.citymarkervar
              .push(L.marker([location.geometry.coordinates[1], location.geometry.coordinates[0]], { icon: citydiv_circle })
                .bindPopup(location.properties.name_de + location.properties.name_ja, { className: "label", offset: [0, 0], closeButton: false })
                .on('touchstart', function (ev) { ev.target.openPopup() })
                .on('popupopen', function (ev) { ev.target.setIcon(citybigdiv_circle) })
                .on('touchend', function (ev) { ev.target.closePopup() })
                .on('touchend', function (ev) { ev.target.setIcon(citydiv_circle); }))
          } else {
            this.citymarkervar
              .push(L.marker([location.geometry.coordinates[1], location.geometry.coordinates[0]], { icon: citydiv_circle })
                .bindPopup(location.properties.name_de + location.properties.name_ja, { className: "label", offset: [0, 0], closeButton: false })
                .on('mouseover', function (ev) { ev.target.openPopup() })
                .on('popupopen', function (ev) { ev.target.setIcon(citybigdiv_circle) })
                .on('mouseout', function (ev) { ev.target.closePopup(); })
                .on('popupclose', function (ev) { ev.target.setIcon(invisibleicon); })
                .on('mouseout', function (ev) { ev.target.setIcon(citydiv_circle); })
                // mouseover does not reliably revert to bigdiv_circle
                // how to prevent passive eventlistener warnings ?
              )
          }
        }
      }
      )

      this.citymarkers = this.citymarkervar;

    }
  }


  townview() {

    this.towntrigger = !this.towntrigger;

    if (this.towntrigger == false) {
      this.townmarkervar = [];
      this.townmarkers = this.townmarkervar;
      // map.removeLayer();
    }
    else {
      this.townmarkervar = [];

      this.locations.features.forEach((location: any) => {

        if (location.properties.category.includes("town")) {

          // set CSS inline on innercircle

          var towndiv_circle = L.divIcon({ className: location.properties.name_de, html: "<div class='innercircle' style='height: 8px; width: 8px; border-radius: 50%; background: #ffb3b3; '></div>" });
          var townbigdiv_circle = L.divIcon({ className: location.properties.name_de, html: "<div class='biginnercircle' style='height: 12px; width: 12px; border-radius: 50%; background: #ff6666; '></div>" });
          var invisibleicon = L.divIcon({ className: 'invisible', html: "<div></div>" });

          if (this.uatest) {
            this.townmarkervar
              .push(L.marker([location.geometry.coordinates[1], location.geometry.coordinates[0]], { icon: towndiv_circle })
                .bindPopup(location.properties.name_de + location.properties.name_ja, { className: "label", offset: [0, 0], closeButton: false })
                .on('touchstart', function (ev) { ev.target.openPopup() })
                .on('popupopen', function (ev) { ev.target.setIcon(townbigdiv_circle) })
                .on('touchend', function (ev) { ev.target.closePopup() })
                .on('touchend', function (ev) { ev.target.setIcon(towndiv_circle); }))
          } else {
            this.townmarkervar

              .push(L.marker([location.geometry.coordinates[1], location.geometry.coordinates[0]], { icon: towndiv_circle })
                .bindPopup(location.properties.name_de + location.properties.name_ja, { className: "label", offset: [0, 0], closeButton: false })
                .on('mouseover', function (ev) { ev.target.openPopup() })
                .on('popupopen', function (ev) { ev.target.setIcon(townbigdiv_circle) })
                .on('mouseout', function (ev) { ev.target.closePopup(); })
                .on('popupclose', function (ev) { ev.target.setIcon(invisibleicon); })
                .on('mouseout', function (ev) { ev.target.setIcon(towndiv_circle); })
                // mouseover does not reliably revert to bigdiv_circle
                // passive eventlistener warnings
              )
          }
        }
      }
      )

      this.townmarkers = this.townmarkervar;

    }
  }


  natureview() {

    this.naturetrigger = !this.naturetrigger;

    if (this.naturetrigger == false) {
      this.naturemarkervar = [];
      this.naturemarkers = this.naturemarkervar;

     // L.map

    }
    else {
      this.naturemarkervar = [];

      this.locations.features.forEach((location: any) => {

        if (location.properties.category.includes("nature")) {

          // set CSS inline on innercircle

          var naturediv_circle = L.divIcon({ className: location.properties.name_de, html: "<div class='innercircle' style='height: 8px; width: 8px; border-radius: 50%; background: #1aff66; '></div>" });
          var naturebigdiv_circle = L.divIcon({ className: location.properties.name_de, html: "<div class='biginnercircle' style='height: 12px; width: 12px; border-radius: 50%; background: #00b33c; '></div>" });
          var invisibleicon = L.divIcon({ className: 'invisible', html: "<div></div>" });

          if (this.uatest) {
            this.naturemarkervar
              .push(L.marker([location.geometry.coordinates[1], location.geometry.coordinates[0]], { icon: naturediv_circle })
                .bindPopup(location.properties.name_de + location.properties.name_ja, { className: "label", offset: [0, 0], closeButton: false })
                .on('touchstart', function (ev) { ev.target.openPopup() })
                .on('popupopen', function (ev) { ev.target.setIcon(naturebigdiv_circle) })
                .on('touchend', function (ev) { ev.target.closePopup() })
                .on('touchend', function (ev) { ev.target.setIcon(naturediv_circle); }))
          } else {

            this.naturemarkervar

              .push(L.marker([location.geometry.coordinates[1], location.geometry.coordinates[0]], { icon: naturediv_circle })
                .bindPopup(location.properties.name_de + location.properties.name_ja, { className: "label", offset: [0, 0], closeButton: false })
                .on('mouseover', function (ev) { ev.target.openPopup() })
                .on('popupopen', function (ev) { ev.target.setIcon(naturebigdiv_circle) })
                .on('mouseout', function (ev) { ev.target.closePopup(); })
                .on('popupclose', function (ev) { ev.target.setIcon(invisibleicon); })
                .on('mouseout', function (ev) { ev.target.setIcon(naturediv_circle); })

              )
          }
        }
      }
      )

      this.naturemarkers = this.naturemarkervar;

    }
  }




  // poet places + travels display

  singlepoetselection(poet: Dichter) {

    if (this.selectedPoetRomanized == poet.id_name.romanized) {
      this.poetmarkers = [];
      this.selectedPoet = [];
      this.selectedPoetRomanized = "";

      // clear travel display 
      this.travels = [];
      this.travelmarkervar = [];

      //clear stations display
      this.all_travelstations = [];

    }

    else {

      //reset display + select poet (single selection)
      this.poetmarkervar = [];

      // reset travel display when changing poets
      this.travels = [];
      this.travelmarkervar = [];

      //reset stations display
      this.all_travelstations = [];

      // translate birthplace, deathplace

      var birthlocation:any
      var deathlocation:any

      var birthplace = 'geboren in';
      var deathplace = 'gestorben in';

      if (this.language == 'ja') {
        var birthplace = '出生';
        var deathplace = '死去';
      }

      this.locations.features.forEach((location: any) => {
      if (poet.placebirth.includes(location.properties.name_ja)) { birthlocation = location }
      if (poet.placedeath.includes(location.properties.name_ja)) { deathlocation = location }
      })


      poet.travels.forEach((entry) => this.all_travelstations = this.all_travelstations.concat(entry.stations))
      this.all_travelstations = this.all_travelstations.filter((elm:any) => elm !== birthlocation.properties.name_de && elm !== deathlocation.properties.name_de)

      this.location_display(this.all_travelstations)

      this.travels = this.travelmarkervar;

          // birthplace

          // set CSS inline on innercircle

          var div_circlebirth = L.divIcon({ className: birthlocation.properties.name_de, html: "<div class='innercircle' style='height: 8px; width: 8px; border-radius: 50%; background: white; border-style:solid; border-width: thin;'></div>" });
     //   var bigdiv_circlebirth = L.divIcon({ className: location.properties.name_de, html: "<div class='biginnercircle' style='height: 12px; width: 12px; border-radius: 50%; background: white; border-style:solid; border-width: thin;'></div>" });


          if (this.uatest) {
            this.poetmarkervar
              .push(L.marker([birthlocation.geometry.coordinates[1], birthlocation.geometry.coordinates[0]], { icon: div_circlebirth })
                .bindTooltip(birthplace + ' ' + birthlocation.properties.name_de + ' ' + birthlocation.properties.name_ja, { className: "label", offset: [0, 0], permanent: true })
              /*  .on('touchstart', function (ev) { ev.target.openPopup() })
                .on('popupopen', function (ev) { ev.target.setIcon(bigdiv_circlebirth) })
                .on('touchend', function (ev) { ev.target.closePopup() })
                .on('touchend', function (ev) { ev.target.setIcon(div_circlebirth) }) */
          )
          } else {
            this.poetmarkervar
              .push(L.marker([birthlocation.geometry.coordinates[1], birthlocation.geometry.coordinates[0]], { icon: div_circlebirth })
                .bindTooltip(birthplace + ' ' + birthlocation.properties.name_de + ' ' + birthlocation.properties.name_ja, { className: "label", offset: [0, 0], permanent: true })
               /* .on('mouseout', function (ev) { ev.target.openPopup() })
                .on('mouseover', function (ev) { ev.target.openPopup(bigdiv_circlebirth) })
                .on('popupopen', function (ev) { ev.target.setIcon(bigdiv_circlebirth) })
                .on('mouseout', function (ev) { ev.target.closePopup() })
                .on('popupclose', function (ev) { ev.target.setIcon(invisibleicon) })
                .on('mouseout', function (ev) { ev.target.setIcon(div_circlebirth) }) */
                )
              }



          // place of death

          // set CSS inline on innercircle

          var div_circledeath = L.divIcon({ className: deathlocation.properties.name_de, html: "<div class='innercircle' style='height: 12px; width: 12px; background: black;'></div>" });
        //  var bigdiv_circledeath = L.divIcon({ className: location.properties.name_de, html: "<div class='biginnercircle' style='height: 14px; width: 14px; background: black;'></div>" });

          this.poetmarkervar
          if (this.uatest) {
            this.poetmarkervar
              .push(L.marker([(deathlocation.geometry.coordinates[1] - 0.2), deathlocation.geometry.coordinates[0]], { icon: div_circledeath })
                .bindTooltip(deathplace + ' ' + deathlocation.properties.name_de + ' ' + deathlocation.properties.name_ja, { className: "label", offset: [0, 0], permanent: true })
         /*       .on('touchstart', function (ev) { ev.target.openPopup() })
                .on('popupopen', function (ev) { ev.target.setIcon(bigdiv_circledeath) })
                .on('touchend', function (ev) { ev.target.closePopup() })
                .on('touchend', function (ev) { ev.target.setIcon(div_circledeath) }) */
                )
          } else {
            this.poetmarkervar
              .push(L.marker([(deathlocation.geometry.coordinates[1] - 0.2), deathlocation.geometry.coordinates[0]], { icon: div_circledeath })
                .bindTooltip(deathplace + ' ' + deathlocation.properties.name_de + ' ' + deathlocation.properties.name_ja, { className: "label", offset: [0, 0], permanent: true })
               /* .on('mouseover', function (ev) { ev.target.openPopup() })
                .on('popupopen', function (ev) { ev.target.setIcon(bigdiv_circledeath) })
                .on('mouseout', function (ev) { ev.target.closePopup() })
                .on('popupclose', function (ev) { ev.target.setIcon(invisibleicon) })
                .on('mouseout', function (ev) { ev.target.setIcon(div_circledeath) })
                // mouseover does not reliably revert to bigdiv_circle */
              )
          }
        

        this.poetmarkers = this.poetmarkervar;

      // clear if same button clicked
      this.selectedPoet = poet;
      this.selectedPoetRomanized = poet.id_name.romanized;

    }
  };




  travelchipselection(travelentry: Travel) {

    if (this.selectedTravel.includes(travelentry.summary_de)) {
      this.selectedTravel.replace(travelentry.summary_de, '');
      this.travelmarkervar = [];
      this.travels = this.travelmarkervar;

    }

    // worldmap narushima ryuhoku

    else if(travelentry.summary_de.includes('1872-1873 Reise nach Europa und Amerika')) {

        this.ryuhokuselect = true

    }
    else {

      // remove birth / death markers

      this.poetmarkers = [];

      this.travelmarkervar = [];

      this.location_display(travelentry.stations);

      this.travels = this.travelmarkervar;

    }

  };

  location_display(entry:any ) {

    this.locations.features.forEach((location: any) => 
      {

      if (entry.includes(location.properties.name_de)) {

        // icons location style für city, town, nature

        var traveldiv_circle = L.divIcon({ className: location.properties.name_de, html: "<div class='innercircle' style='height: 8px; width: 8px; border-radius: 50%; background: #ffb3ff; '></div>" });
        var travelbigdiv_circle = L.divIcon({ className: location.properties.name_de, html: "<div class='biginnercircle' style='height: 12px; width: 12px; border-radius: 50%; background: #ff4dff; '></div>" });

        var citydiv_circle = L.divIcon({ className: location.properties.name_de, html: "<div class='innercircle' style='height: 8px; width: 8px; border-radius: 50%; background: #ffb3ff; '></div>" });
        var citybigdiv_circle = L.divIcon({ className: location.properties.name_de, html: "<div class='biginnercircle' style='height: 12px; width: 12px; border-radius: 50%; background: #ff4dff; '></div>" });

        var towndiv_circle = L.divIcon({ className: location.properties.name_de, html: "<div class='innercircle' style='height: 8px; width: 8px; border-radius: 50%; background: #ffb3b3; '></div>" });
        var townbigdiv_circle = L.divIcon({ className: location.properties.name_de, html: "<div class='biginnercircle' style='height: 12px; width: 12px; border-radius: 50%; background: #ff6666; '></div>" });

        var naturediv_circle = L.divIcon({ className: location.properties.name_de, html: "<div class='innercircle' style='height: 8px; width: 8px; border-radius: 50%; background: #1aff66; '></div>" });
        var naturebigdiv_circle = L.divIcon({ className: location.properties.name_de, html: "<div class='biginnercircle' style='height: 12px; width: 12px; border-radius: 50%; background: #00b33c; '></div>" });

        var invisibleicon = L.divIcon({ className: 'invisible', html: "<div></div>" });

        // set CSS inline for different categories


        if (location.properties.category.includes('city')) {
          traveldiv_circle = citydiv_circle
          travelbigdiv_circle = citybigdiv_circle
        }
        if (location.properties.category.includes('town')) {
          traveldiv_circle = towndiv_circle
          travelbigdiv_circle = townbigdiv_circle
        }
        if (location.properties.category.includes('nature')) {
          traveldiv_circle = naturediv_circle
          travelbigdiv_circle = naturebigdiv_circle
        }

        this.travelmarkervar
        if (this.uatest) {
          this.travelmarkervar
            .push(L.marker([location.geometry.coordinates[1], location.geometry.coordinates[0]], { icon: traveldiv_circle })
              .bindPopup(location.properties.name_de + location.properties.name_ja, { className: "label", offset: [0, 0], closeButton: false })
              .on('touchstart', function (ev) { ev.target.openPopup() })
              .on('popupopen', function (ev) { ev.target.setIcon(travelbigdiv_circle) })
              .on('touchend', function (ev) { ev.target.closePopup() })
              .on('touchend', function (ev) { ev.target.setIcon(traveldiv_circle); }))
        } else {
          this.travelmarkervar
            .push(L.marker([location.geometry.coordinates[1], location.geometry.coordinates[0]], { icon: traveldiv_circle })
              .bindPopup(location.properties.name_de + location.properties.name_ja, { className: "label", offset: [0, 0], closeButton: false })
              .on('mouseover', function (ev) { ev.target.openPopup() })
              .on('popupopen', function (ev) { ev.target.setIcon(travelbigdiv_circle) })
              .on('mouseout', function (ev) { ev.target.closePopup(); })
              .on('popupclose', function (ev) { ev.target.setIcon(invisibleicon); })
              .on('mouseout', function (ev) { ev.target.setIcon(traveldiv_circle); })
            )
        }
      }
    }
    )
  }


  selectorperiodsvar: any = [];
  citiesvar: any = [];
  ryuhokuselect: boolean = false;

  language = 'de';
  data: any = "";

  ngOnInit(): void {
    this.translocoService.langChanges$.subscribe(data => this.translateselectors(data));
  }

  translateselectors(data: any) {
    this.language = data;
    if (this.language === 'de') {
      this.selectorperiodsvar = this.selectorperiods;
    } else {
      this.selectorperiodsvar = this.selectorperiodsjp;
    }
  }

  selectorperiods = [
    { value: 'noperiod', viewValue: 'Keine' },
    { value: 'earlyedo', viewValue: 'frühe Edo-Zeit' },
    { value: 'middleedo', viewValue: 'mittlere Edo-Zeit' },
    { value: 'lateedo', viewValue: 'späte Edo-Zeit' },
  ];

  selectorperiodsjp = [
    { value: 'noperiod', viewValue: 'すべて' },
    { value: 'earlyedo', viewValue: '江戸時代初期' },
    { value: 'middleedo', viewValue: '江戸時代中期' },
    { value: 'lateedo', viewValue: '江戸時代後期' },
  ];

  selectedperiod = 'noperiod';

}
