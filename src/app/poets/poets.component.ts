import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getDatabase, ref } from "firebase/database"
import { Dichter } from '../timedata';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-poets',
  templateUrl: './poets.component.html',
  styleUrls: ['./poets.component.css'],
  preserveWhitespaces: false
})
export class PoetsComponent {

  poets: Observable<any[]>;

   constructor(public db: AngularFireDatabase, private translocoService: TranslocoService) {
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
    this.downloadid = cardpoet.romanized + '_downloader';
    this.vardata = JSON.stringify(cardpoet.reference);
    this.blob = new Blob([this.vardata], {type: "application/json"});
    this.downloadLink = window.URL.createObjectURL(this.blob);
//    window.open(this.downloadLink);
    this.a = document.getElementById(this.downloadid);
    this.a.href = this.downloadLink;
//     console.log(cardpoet);
//    console.log(this.downloadid);
//    console.log(this.vardata);
//    console.log(this.downloadLink);
   };

   downloadworksFunction(cardpoet: any){
   this.downloadid = cardpoet.romanized + '_worksdownloader';
   this.workvar = cardpoet.timeline.map((x:any) => x.work).flat().filter((item:any) => item !== undefined);
   this.newvar = this.workvar.edition;
   console.log(this.newvar);
   this.vardata = JSON.stringify(this.workvar);
   this.blob = new Blob([this.vardata], {type: "application/json"});
   this.downloadLink = window.URL.createObjectURL(this.blob);
   this.a = document.getElementById(this.downloadid);
   this.a.href = this.downloadLink;
   console.log(this.workvar);
  };

timelineHeight: number = 400;
timelineYears: number = 400; //1500-1900

collapsed: boolean = false;

selectedPoet:string = "";

  chipselection(poet: Dichter){
    if (this.selectedPoet.includes(poet.romanized)){
    this.selectedPoet = this.selectedPoet.replace(poet.romanized, '');
  }else{
    this.selectedPoet = this.selectedPoet + ' ' + poet.romanized;
//    console.log(this.selectedPoet);
  }
  };

  expandedPoet:string = "";

  expandselection(poet: Dichter){
    if (this.expandedPoet.includes(poet.romanized)){
    this.expandedPoet = this.expandedPoet.replace(poet.romanized, '');
//    console.log(this.expandedPoet);
  }else{
    this.expandedPoet = this.expandedPoet + ' ' + poet.romanized;
//    console.log(this.expandedPoet);
  }
};

selectedImage: string = '';
imageBig: boolean = false;

bigImage(image: string){
  this.selectedImage = image;
  this.imageBig = !this.imageBig;
}

   selectorpublicationsvar:any = "selectorpublications";
   selectorperiodsvar:any = "selectorperiods";
   selectorsocietiesvar:any = "selectorsocieties";

   language = 'ja';
   data: any = "";

   descriptionVar:any = "descriptionGer";
   eventVar:any = "eventGer";
   titleVar:any = "titleromanized";

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
   this.descriptionVar = 'descriptionGer';
   this.eventVar = 'eventGer';
   this.titleVar = "titleromanized";
  // console.log(this.selectorpublicationsvar, this.selectorperiodsvar, this.language);
   }else{
    this.selectorpublicationsvar = this.selectorpublicationsjp;
    this.selectorperiodsvar = this.selectorperiodsjp;
    this.selectorsocietiesvar = this.selectorsocietiesjp;
    this.descriptionVar = 'description';
    this.eventVar = 'event';
    this.titleVar = "title";
//    console.log(this.selectorpublicationsvar, this.selectorperiodsvar, this.language);
   }}

   selectorpublications = [
     {value: 'nopub', viewValue: 'Keine Auswahl'},
     {value: 'ESS', viewValue: 'Edo Shijin Senshu'},
     {value: 'Shishi', viewValue: 'Nihon Shishi (Emura Hokkai)'},
   ];

   selectorpublicationsjp = [
     {value: 'nopub', viewValue: '選択なし'},
     {value: 'ESS', viewValue: '江戸詩人選集'},
     {value: 'Shishi', viewValue: '日本詩史（江村北海）'},
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
