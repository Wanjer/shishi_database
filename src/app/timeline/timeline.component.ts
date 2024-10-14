import { Component, ElementRef, OnInit, AfterViewInit, OnChanges, ViewChildren, QueryList, AfterViewChecked } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { TranslocoService } from '@jsverse/transloco';
import {OverlayModule, ScrollStrategy, Overlay} from '@angular/cdk/overlay';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})

export class TimelineComponent implements OnInit, AfterViewChecked {

  timeline: Observable<any[]>;
  //   person: Observable<any[]>;
      tenno: Observable<any[]>;
      shogun: Observable<any[]>;
  
      constructor(db: AngularFireDatabase, private translocoService: TranslocoService, private overlay: Overlay) {
      this.timeline = db.list('timeline').valueChanges();
  
  //    DATENBANK CHECK
  
     // this.timeline.subscribe(res => console.log(res));
  
  //    this.person = db.list('person').valueChanges();
  //    this.person.subscribe(ret => console.log(ret));
  
      this.tenno = db.list('tenno').valueChanges();
  //    this.tenno.subscribe(ret => console.log(ret));
  
      this.shogun = db.list('shogun').valueChanges();
  //    this.shogun.subscribe(ret => console.log(ret));
  
     }
  

     // image overlay function
/*
     imageOverlayFunction(){
     this.imageOverlay.open();
     }
*/

     /* index für yearobject of timeline */
  
     loading:boolean = true;
  
     trackByFn(index: number, item: any) {
       return item.id;
     }
  
    triggerVar: string[] = [];
     
     @ViewChildren('eventwrapper',  {read: ElementRef}) eventwrapper?: QueryList<ElementRef>;
  
     ngAfterViewChecked(){
      // console.log('eventwrapper', this.eventwrapper);
       if(this.eventwrapper) {
       // this.eventwrapper.forEach((element:any) => console.log('wrappers', element));
        var eventchildren = this.eventwrapper.map((x:any) => x.nativeElement.children);
       // console.log('children', eventchildren);
        
        //var wrapperid= this.eventwrapper.map((x:any) => x.nativeElement.id);
        //console.log('id', wrapperid);
  
        //var test = eventchildren[0][0].className;
        //console.log(test);  
        //console.log(Array.isArray(eventchildren));
  
        // var classes = eventchildren.forEach(function(element:any){ });
  
        //console.log('test2', Array.from(eventchildren).flat(2));
  
        eventchildren.map((x:any) => 
        Array.from(x).map((y: any) => 
        y.className)).map((arrayobject: object[]) => 
        {  
          
          // pop arrayobject to remove what ??
          // arrayobject.pop();
  
       //   console.log('arrayobject', arrayobject, typeof(arrayobject)); 
          if
          (
        arrayobject.every((eventclasses) =>  
        { 
          if(eventclasses.toString().includes('invisible'))
          { /*console.log('invisible');*/ return true }
          else
          { /*console.log('very much visible');*/ return false }
        } 
        )
          )
          {
            const yearvar = arrayobject[0];
            const year = arrayobject[0]?.toString().substring(0, 4);
           // console.log(yearvar, year);
            if(this.triggerVar.indexOf(year) === -1)
            { 
            
            document.getElementById('date_'+year)?.classList.add('inviewable');;
            document.getElementById('era_'+year)?.classList.add('inviewable'); 
            document.getElementById('shogun_'+year)?.classList.add('inviewable'); 
            document.getElementById('tenno_'+year)?.classList.add('inviewable'); 
            document.getElementById('eventwrapper_'+year)?.classList.add('inviewable'); 
           // console.log('element hidden');
            
            this.triggerVar.push(year);
          //  console.log('year pushed');
            }
          //  console.log('year already in array', year, this.triggerVar);
          }
          else
          {
            const year = arrayobject[0].toString().substring(0, 4);
            const index: any = this.triggerVar.indexOf(year);
            if(this.triggerVar.indexOf(year) === -1)
            {
           //   console.log('nothing to splice');
            }
            else
            {
            document.getElementById('date_'+year)?.classList.remove('inviewable');;
            document.getElementById('era_'+year)?.classList.remove('inviewable'); 
            document.getElementById('shogun_'+year)?.classList.remove('inviewable'); 
            document.getElementById('tenno_'+year)?.classList.remove('inviewable'); 
            document.getElementById('eventwrapper_'+year)?.classList.remove('inviewable'); 
           
            this.triggerVar.splice(index, 1);
          //  console.log('year spliced', year, this.triggerVar);
          }
          }
       } 
       );
        // console.log('in if loop of eventwrapper');
       }else{
        // console.log('eventwrapper not loaded yet');
       }
     }
  
     downloadid:string ="";
     vardata:any ="";
     workvar:any ="";
     downloadLink:any ="";
     blob:any="";
     a:any ="";
  
      downloadFunction(yearobject: any){
      this.downloadid = yearobject.year + '_downloader';
      this.workvar = yearobject.events.map((x:any) => x.work).flat().filter((item:any) => item !== undefined);
  
      const resvar: any = yearobject.events.map((x:any) => x.research).flat().filter((item:any) => item !== undefined);
      // console.log(resvar);
  
      this.vardata = JSON.stringify(this.workvar);
      this.blob = new Blob([this.vardata], {type: "application/json"});
      this.downloadLink = window.URL.createObjectURL(this.blob);
   //    window.open(this.downloadLink);
      this.a = document.getElementById(this.downloadid);
      this.a.href = this.downloadLink;
   //     console.log(yearobject);
   //    console.log(this.downloadid);
   //    console.log(this.vardata);
   //    console.log(this.downloadLink);
     };
  
  
  
     downloadResearchFunction(yearobject: any){
     this.downloadid = yearobject.year + '_researchdownloader';
     this.workvar = yearobject.events.map((x:any) => x.research).flat().filter((item:any) => item !== undefined);
     this.vardata = JSON.stringify(this.workvar);
     this.blob = new Blob([this.vardata], {type: "application/json"});
     this.downloadLink = window.URL.createObjectURL(this.blob);
  //    window.open(this.downloadLink);
     this.a = document.getElementById(this.downloadid);
     this.a.href = this.downloadLink;
      //console.log(this.workvar);
  //    console.log(this.downloadid);
  //    console.log(this.vardata);
  //    console.log(this.downloadLink);
    };
  
  
  
      searchText:string = '';
  
     language = 'de';
     data: any = "";
  
     selectorcategoriesvar:any = "selectorcategories";
     selectorpublicationsvar:any = "selectorpublications";
     selectorperiodsvar:any = "selectorperiods";
     descriptionVar:any = "digitised_summary_de";
     summaryVar:any = "summary_de";
     expansionVar:any = "expansion_de";
     taglistVar:any = "taglist";
     detaglistVar:any = "detaglist";
     nameVar:any = "romanized";
     titleVar:any = "titleromanized";
  
    ngOnInit(): void{
    this.translocoService.langChanges$.subscribe(data => this.translateselectors(data));
    }
  
    translateselectors(data: any){
    this.language = data;
    if (this.language === 'de'){
    this.selectorcategoriesvar = this.selectorcategories;
    this.selectorpublicationsvar = this.selectorpublications;
    this.selectorperiodsvar = this.selectorperiods;
    this.taglistVar = this.taglist;
    this.detaglistVar = this.detaglist;
    this.descriptionVar = 'digitised_summary_de';
    this.summaryVar = 'summary_de';
    this.expansionVar = "expansion_de";
    this.nameVar = 'romanized';
    // console.log(this.selectorcategoriesvar, this.selectorpublicationsvar, this.selectorperiodsvar, this.descriptionVar, this.language);
    }else{
     this.selectorcategoriesvar = this.selectorcategoriesja;
     this.selectorpublicationsvar = this.selectorpublicationsja;
     this.selectorperiodsvar = this.selectorperiodsja;
     this.taglistVar = this.taglistja;
     this.detaglistVar = this.detaglistja;
     this.descriptionVar = 'digitised_summary_ja';
     this.summaryVar = 'summary_ja';
     this.expansionVar = "expansion_ja";
     this.nameVar = 'name';
    // console.log(this.selectorcategoriesvar, this.selectorpublicationsvar, this.selectorperiodsvar, this.descriptionVar, this.language);
    }}
  
    selectedtags: any[] = [];
  
    chipselection(tag: any){
     if (this.selectedtags.includes(tag.value)){
      const index: any = this.selectedtags.indexOf(tag.value);
      this.selectedtags.splice(index, 1);
    }else{
      this.selectedtags.push(tag.value);
    }
    }
  
    checkvar: boolean = false;
  
    arraycheck(category: any[]){
      if(this.selectedtags.every(element => category.includes(element))){
        return true;
      }
      return false
    }
  
    downloadworkscheck(yearobject: any){
      this.workvar = yearobject.events.map((x:any) => x.work).flat().filter((item:any) => item !== undefined);
      if(this.workvar.length < 1){ return false; }
      return true
    }



    // enlarge image to fill screen

    image: string = '';
    selectedImage: string = '';
    imageBig: boolean = false;
    imageScroll: ScrollStrategy = this.overlay.scrollStrategies.block();
  
    bigImage(image: string){
      this.selectedImage = image;
      this.imageBig = !this.imageBig;
    }


    // infos zu tenno (und shogun, implementieren)
  
  selectedReign: string = '';
  
  expandReign(name: string){
    if (this.selectedReign.includes(name)){
    this.selectedReign = '';
  }else{
    this.selectedReign = name;
  }
  }
  
  selectedEvent: string = '';
  
  /*im falle von expandall keine aktivierung*/
  expandDescription(summary_ja: string){
    if (this.selectedEvent.includes(summary_ja) || this.expandallvar){
    this.selectedEvent = this.selectedEvent.replace(summary_ja, '');
  }else{
    this.selectedEvent = this.selectedEvent + ' ' + summary_ja;
  }
  }
  
  expandallvar: boolean = false;
  
  expandall(){
    this.expandallvar = !(this.expandallvar);
  }
  
    activeIndex:number = 10;
  
     selectorcategories = [
       {value: 'nocateg', viewValue: 'Keine Auswahl'},
       {value: 'politics', viewValue: 'Politik'},
       {value: 'literature', viewValue: 'Literatur'},
       {value: 'art', viewValue: 'Kunstgeschichte'},
     ];
  
     selectorcategoriesja = [
       {value: 'nocateg', viewValue: '選択なし'},
       {value: 'politics', viewValue: '政治'},
       {value: 'literature', viewValue: '文学'},
       {value: 'art', viewValue: '芸術'},
     ];
  
     selectorpublications = [
       {value: 'nopub', viewValue: 'Keine Auswahl'},
       {value: 'yamakawa', viewValue: 'Yamakawa Shōsetsu Nihonshi Zuroku'},
       {value: 'iwanami_bungakushi', viewValue: 'Iwanami Kōza Nihon Bungakushi'},
     ];
  
     selectorpublicationsja = [
       {value: 'nopub', viewValue: '選択なし'},
       {value: 'yamakawa', viewValue: '山川 詳説日本史図録'},
       {value: 'iwanami_bungakushi', viewValue: '岩波講座 日本文学史'},
     ];
  
     selectorperiods = [
       {value: 'noperiod', viewValue: 'Keine Auswahl'},
       {value: 'earlyedo', viewValue: 'frühe Edo-Zeit'},
       {value: 'middleedo', viewValue: 'mittlere Edo-Zeit'},
       {value: 'lateedo', viewValue: 'späte Edo-Zeit'},
     ];
  
     selectorperiodsja = [
       {value: 'noperiod', viewValue: '選択なし'},
       {value: 'earlyedo', viewValue: '江戸時代初期'},
       {value: 'middleedo', viewValue: '江戸時代中期'},
       {value: 'lateedo', viewValue: '江戸時代後期'},
     ];
  
     detaglist = [
       {value: 'notag', viewValue: 'Keine Auswahl'},
     ];
  
     detaglistja = [
       {value: 'notag', viewValue: '選択なし'},
     ];
  
     taglist = [
       {value: 'essentials', viewValue: 'Kurze Geschichte'},
       {value: 'europe', viewValue: 'Japan und Europa'},
       {value: 'diplomacy', viewValue: 'Diplomatie'},
       {value: 'war', viewValue: 'Krieg'},
     ];
  
     taglistja = [
       {value: 'essentials', viewValue: '略年表'},
       {value: 'europe', viewValue: 'ヨーロッパ'},
       {value: 'diplomacy', viewValue: '対外関係'},
       {value: 'war', viewValue: '戦争'},
     ];
  
     selectedcategory = 'nocateg';
     selectedpublication = 'nopub';
     selectedperiod = 'noperiod';
  
   }
