import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getDatabase, ref } from "firebase/database"
import { Dichter } from '../../assets/timedata';
import { TranslocoService } from '@jsverse/transloco';
import { OverlayModule, ScrollStrategy, Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-poets',
  templateUrl: './poets.component.html',
  styleUrls: ['./poets.component.css'],
  preserveWhitespaces: false
})
export class PoetsComponent {

  poets: Observable<any[]>;

   constructor(public db: AngularFireDatabase, private translocoService: TranslocoService, private overlay: Overlay) {
     this.poets = db.list('poets').valueChanges();
   };

   downloadid:string ="";
   vardata:any ="";
   workvar:any ="";
   newvar:any ="";
   downloadLink:any ="";
   blob:any="";
   a:any ="";

   searchText:string = '';

    downloadFunction(cardpoet: any){
    this.downloadid = cardpoet.names.commonname.romanized + '_downloader';
    this.vardata = JSON.stringify(cardpoet.reference);
    this.blob = new Blob([this.vardata], {type: "application/json"});
    this.downloadLink = window.URL.createObjectURL(this.blob);
    this.a = document.getElementById(this.downloadid);
    this.a.href = this.downloadLink;
   };

   downloadworksFunction(cardpoet: any){
   this.downloadid = cardpoet.names.commonname.romanized + '_worksdownloader';
   this.vardata = cardpoet.timeline.map((x:any) => x.events.map((x:any) => x.work).flat().filter((item:any) =>  item != undefined)).flat();
   this.blob = new Blob([JSON.stringify(this.vardata)], {type: "application/json"});
   this.downloadLink = window.URL.createObjectURL(this.blob);
   this.a = document.getElementById(this.downloadid);
   this.a.href = this.downloadLink;
   console.log(this.workvar);
  };

timelineHeight: number = 400;
timelineYears: number = 400; //1500-1900

collapsed: boolean = false;

selectedPoet:string = "";
selectedPoetWorks:Array<any> = [];
PoetWorks:Array<any> = [];

  chipselection(poet: Dichter){
    if (this.selectedPoet.includes(poet.names.commonname.romanized)){
    this.selectedPoet = this.selectedPoet.replace(poet.names.commonname.romanized, '');
  }else{
    this.selectedPoet = this.selectedPoet + ' ' + poet.names.commonname.romanized;
    this.selectedPoetWorks = (poet.timeline.map((x:any) => x.events.map((x:any) => x.work).flat()
    .filter((item:any) =>  item != undefined)).flat());
    console.log(this.selectedPoetWorks);
    this.PoetWorks.push({"poetworks": this.selectedPoetWorks, "nametoken": poet.names.commonname.romanized})
    console.log(this.PoetWorks);
  }
  };

  expandedPoet:string = "";

  expandselection(poet: Dichter){
    if (this.expandedPoet.includes(poet.names.commonname.romanized)){
    this.expandedPoet = this.expandedPoet.replace(poet.names.commonname.romanized, '');
//    console.log(this.expandedPoet);
  }else{
    this.expandedPoet = this.expandedPoet + ' ' + poet.names.commonname.romanized;
//    console.log(this.expandedPoet);
  }
};

selectedImage: string = '';
imageBig: boolean = false;
imageScroll: ScrollStrategy = this.overlay.scrollStrategies.block();

bigImage(image: string){
  this.selectedImage = image;
  this.imageBig = !this.imageBig;
}

   selectorpublicationsvar:any = "selectorpublications";
   selectorperiodsvar:any = "selectorperiods";
   selectorsocietiesvar:any = "selectorsocieties";

   language = 'ja';
   data: any = "";

   item:any ="";

   ngOnInit(): void{
   this.translocoService.langChanges$.subscribe(data => this.translateselectors(data));
//   this.item = this.db.object('person').valueChanges().subscribe(item => console.log(item));
   }

   translateselectors(data: any){
   this.language = data;
   if (this.language === 'de'){
   this.selectorpublicationsvar = this.selectorpublications;
   this.selectorperiodsvar = this.selectorperiods;
   this.selectorsocietiesvar = this.selectorsocieties;
  // console.log(this.selectorpublicationsvar, this.selectorperiodsvar, this.language);
   }else{
    this.selectorpublicationsvar = this.selectorpublicationsjp;
    this.selectorperiodsvar = this.selectorperiodsjp;
    this.selectorsocietiesvar = this.selectorsocietiesjp;
//    console.log(this.selectorpublicationsvar, this.selectorperiodsvar, this.language);
   }}

   selectorpublications = [
     {value: 'nopub', viewValue: 'Keine Auswahl'},
     {value: 'ESS', viewValue: 'Edo Shijin Senshū'},
     {value: 'EKS', viewValue: 'Edo Kanshisen'},
  //   {value: 'Shishi', viewValue: 'Nihon Shishi (Emura Hokkai)'},
   ];

   selectorpublicationsjp = [
     {value: 'nopub', viewValue: '選択なし'},
     {value: 'ESS', viewValue: '江戸詩人選集'},
     {value: 'EKS', viewValue: '江戸漢詩選'},
   //  {value: 'Shishi', viewValue: '日本詩史（江村北海）'},
   ];

   selectedpublication = 'nopub';

   selectorperiods = [
     {value: 'noperiod', viewValue: 'Keine Auswahl'},
     {value: 'earlyedo', viewValue: 'frühe Edo-Zeit'},
     {value: 'middleedo', viewValue: 'mittlere Edo-Zeit'},
     {value: 'lateedo', viewValue: 'späte Edo-Zeit'},
   ];

   selectorperiodsjp = [
     {value: 'noperiod', viewValue: '選択なし'},
     {value: 'earlyedo', viewValue: '江戸時代初期'},
     {value: 'middleedo', viewValue: '江戸時代中期'},
     {value: 'lateedo', viewValue: '江戸時代後期'},
   ];

   selectedperiod = 'noperiod';

   selectorsocieties = [
     {value: 'nosociety', viewValue: 'Keine Auswahl'},
     {value: 'kenen', viewValue: 'Ken\'en (Ogyū Sorai)'},
     {value: 'mokumon', viewValue: 'Mokumon (Kinoshita Jun\'an)'},
   ];

   selectorsocietiesjp = [
     {value: 'nosociety', viewValue: '選択なし'},
     {value: 'kenen', viewValue: '蘐園（荻生徂徠）'},
     {value: 'mokumon', viewValue: '木門（木下順庵）'},
   ];

   selectedsociety = 'nosociety';

}
