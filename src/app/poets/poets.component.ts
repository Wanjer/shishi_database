import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getDatabase, ref } from "firebase/database"
// import { Dichter } from '../../assets/timedata';
import { TranslocoService, TranslocoPipe } from '@jsverse/transloco';
import { OverlayModule, ScrollStrategy, Overlay, CdkOverlayOrigin, CdkConnectedOverlay } from '@angular/cdk/overlay';
import { bibliography_zotero } from '../../assets/bibliography_zotero';
import { MatIconButton } from '@angular/material/button';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatDivider } from '@angular/material/divider';
import { NgStyle, NgOptimizedImage, SlicePipe } from '@angular/common';
import { splitFirst } from '../pipes/splitFirst.pipe';
import { IsinstPipe } from '../pipes/isinst.pipe';
import { MonthpipePipe } from '../pipes/monthpipe.pipe';
import { IsplacePipe } from '../pipes/isplace.pipe';
import { IslatinPipe } from '../pipes/islatin.pipe';
import { SearchpoetsPipe } from '../pipes/searchpoets.pipe';
import { PoetworksearchPipe } from '../pipes/poetworksearch.pipe';

@Component({
    selector: 'app-poets',
    templateUrl: './poets.component.html',
    styleUrls: ['./poets.component.css'],
    preserveWhitespaces: false,
    standalone: true,
    imports: [MatIconButton, MatMenuTrigger, MatMenu, MatMenuItem, MatFormField, MatLabel, MatInput, FormsModule, MatSelect, MatOption, MatChipListbox, MatChipOption, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatDivider, NgStyle, NgOptimizedImage, CdkOverlayOrigin, CdkConnectedOverlay, SlicePipe, TranslocoPipe, splitFirst, IsinstPipe, MonthpipePipe, IsplacePipe, IslatinPipe, SearchpoetsPipe, PoetworksearchPipe]
})
export class PoetsComponent {

  poets: Observable<any[]>;
  public poetarray: Array<any> = [];

   constructor(public db: AngularFireDatabase, private translocoService: TranslocoService, private overlay: Overlay) {
     this.poets = db.list('poets').valueChanges();
     this.poets.subscribe(poets => { this.poetarray = poets });
   };

   poetbiographyDownload(cardpoet: any){

  var downloadid:string ="";
  var poetbiography:any ="";
  var downloadLink:any ="";
  var blob:any="";
  var downloadButton:any ="";

   downloadid = cardpoet.id_name.romanized + '_biographydownloader';
   poetbiography = cardpoet.timeline;
   blob = new Blob([JSON.stringify(poetbiography)], {type: "application/json"});
   downloadLink = window.URL.createObjectURL(blob);
   downloadButton = document.getElementById(downloadid);
   downloadButton.href = downloadLink;

   }

    poetreferenceDownload(cardpoet: any){

    var downloadid:string ="";
    var references:any ="";
    var downloadLink:any ="";
    var blob:any="";
    var downloadButton:any ="";

    downloadid = cardpoet.id_name.romanized + '_referencedownload';
    references = JSON.stringify(cardpoet.reference);
    blob = new Blob([references], {type: "application/json"});
    downloadLink = window.URL.createObjectURL(blob);
    downloadButton = document.getElementById(downloadid);
    downloadButton.href = downloadLink;
   };

   poetworksDownload(cardpoet: any){

  var downloadid:string ="";
  var poetworks:any ="";
  var downloadLink:any ="";
  var blob:any="";
  var downloadButton:any ="";

   downloadid = cardpoet.id_name.romanized + '_worksdownloader';
   poetworks = cardpoet.timeline.map((x:any) => x.events.map((x:any) => x.work).flat().filter((item:any) =>  item != undefined)).flat();
   blob = new Blob([JSON.stringify(poetworks)], {type: "application/json"});
   downloadLink = window.URL.createObjectURL(blob);
   downloadButton = document.getElementById(downloadid);
   downloadButton.href = downloadLink;
  };

  searchText:string = '';

timelineHeight: number = 400;
timelineYears: number = 400; //1500-1900

collapsed: boolean = false;

selectedPoet:Array<string> = []
selectedPoetWorks:Array<any> = []
PoetWorksobject:any = {}
PoetWorksobjectArray:any = []
displayPoets:Array<any> = []

  chipselection(poet:any){

    if (this.selectedPoet.includes(poet.id_name.romanized)){

    this.selectedPoet = this.selectedPoet.filter(p => { return p !== poet.id_name.romanized })

    this.displayPoets = this.displayPoets.filter(p => { return p.id_name.romanized !== poet.id_name.romanized })

      // clear this.PoetWorksobjectArray?

    }else{

    this.selectedPoet.push(poet.id_name.romanized);

    // ######### ######### #########
    // ######### names display #####
    // ######### ######### #########
    var name_types:Array<string> = []
    var name_types_array:any = []
    poet.names.forEach((name:any) => { if(!name_types.includes(name.type)){ name_types.push(name.type) }})
    this.nametypes.forEach((nt:any) =>{ if(name_types.includes(nt.type)){ name_types_array.push(nt) }})
    //add to individual poet
    poet.nametypes = name_types_array
    // reset arrays
    name_types = []
    name_types_array = []

    // ######### ######### ######### #########
    // ######### selected poet works #########
    // ######### ######### ######### #########
    this.selectedPoetWorks = (poet.timeline.map((x:any) => x.events.map((x:any) => x.work).flat().filter((item:any) => item != undefined)).flat());
    // only unique works
    // this.selectedPoetWorks.filter((value, index, array) => array.indexOf(value) === index)
    // this.selectedPoetWorks = [new Set(...this.selectedPoetWorks)]
    this.PoetWorksobject = {"poetworks": this.selectedPoetWorks, "nametoken": poet.id_name.romanized }
    this.PoetWorksobjectArray.push(this.PoetWorksobject)

    // ######### ######### ######### #########
    // ######### add bibliography to works
    // ######### tag edited and translated works by adding to category
    // ######### ######### ######### #########
      var bibliography_append: any = []
  //  var no_record: any = []
      poet.timeline.forEach((yearobject: any) => yearobject.events.forEach((event: any) =>
        event.work?.forEach((work_entry: any) => { work_entry.work_bibliography?.forEach((reference: any) => {

          // todo handle volume and page

          var reference_volume = 'empty'
          var reference_page = 'empty'
          // check gegen reference error, kann entfernt werden wenn poet references aufgeräumt?
          if(typeof reference === "string" && reference !== ''){

          if (reference.includes('vol')) { reference_volume = reference.replace(/\D/g, ''), reference = reference.split('vol')[0].trim() }
          if (reference.includes('page')) { reference_page = reference.replace(/\D/g, ''), reference = reference.split('vol')[0].trim() }
          }

          bibliography_zotero.forEach((item: any) => {
            if (item.title.includes(reference)) {
              // !! event bibliography

              // category to sort for translated and edited works in chronology view
          if (item.category?.includes('translation')) { event.category.push('translation') }
          if (item.category?.includes('edition')) { event.category.push('edition') }

           if(reference_volume !== 'empty'){ item.volume = reference_volume }
           if(reference_page !== 'empty'){ item.page = reference_page }

             // work_entry.work_bibliography?.replace(reference, '')

              bibliography_append.push(item)

            }
          })

          //no_record = work_entry.work_bibliography

        })
        work_entry.work_bibliography = bibliography_append

         bibliography_append = []
      }
        )))

        this.displayPoets.push(poet)

    }
  
};

  expandedPoet:string = "";

  expandselection(poet: any){
    if (this.expandedPoet.includes(poet.id_name.romanized)){
    this.expandedPoet = this.expandedPoet.replace(poet.id_name.romanized, '');

  }else{
    this.expandedPoet = this.expandedPoet + ' ' + poet.id_name.romanized;

  }
};

selectedImage: string = '';
imageBig: boolean = false;
imageScroll: ScrollStrategy = this.overlay.scrollStrategies.block();

bigImage(image: string){
  this.selectedImage = image;
  this.imageBig = !this.imageBig;
}

//********************
  //  COLLECT MISSING IMAGES FUNCTION
  //********************


  imagesMissing: Array<string> = [];

  failedImageLoad(image: string, year: string) {
    this.imagesMissing.push(image);
    console.log('Missing Images', year, this.imagesMissing)
  }


   bibliography_import = bibliography_zotero;

   language = 'ja';
   data: any = "";

   item:any ="";

   ngOnInit(): void{
   this.translocoService.langChanges$.subscribe(data => this.translateselectors(data));
//   this.item = this.db.object('person').valueChanges().subscribe(item => console.log(item));
   }

   translateselectors(data: any){
   this.language = data
  }

  displayed_type:string = "";

   selectorperiods = [
    {
      value: 'noperiod',
      viewValue_de: 'Keine Auswahl',
      viewValue_ja: '選択なし',
      start: 0,
      end: 0
    },
    {
      value: 'earlyedo',
      viewValue_de: 'frühe Edo-Zeit',
      viewValue_ja: '江戸時代初期',
      start: 1600,
      end: 1690
    },
    {
      value: 'middleedo',
      viewValue_de: 'mittlere Edo-Zeit',
      viewValue_ja: '江戸時代中期',
      start: 1690,
      end: 1780
    },
    {
      value: 'lateedo',
      viewValue_de: 'späte Edo-Zeit',
      viewValue_ja: '江戸時代後期',
      start: 1780,
      end: 1868
    },
  ]

  nametypes = [
    /*
    {
      type: 'name_kanji',
      viewValue_de: 'Kanji',
      viewValue_ja: '漢字'
    },
    {
      type: 'name_kana',
      viewValue_de: 'Kana',
      viewValue_ja: 'かな'
    },
    {
      type: 'name_romanized',
      viewValue_de: 'Transkription',
      viewValue_ja: 'ローマ字'
    },
    {
      type: 'commonname',
      viewValue_de: 'Konventionell',
      viewValue_ja: '通常名称'
    },
    */
    {
      type: 'familyname',
      viewValue_de: 'Familienname (苗字)',
      viewValue_ja: '名字(苗字)'
    },
    {
      type: 'clanname',
      viewValue_de: 'Clan-Name (氏)',
      viewValue_ja: '本姓(氏)'
    },
    {
      type: 'adultname',
      viewValue_de: 'Mannesname (字)',
      viewValue_ja: '字'
    },
    {
      type: 'tabooname',
      viewValue_de: 'Tabuname (名)',
      viewValue_ja: '名(諱)'
    },
    {
      type: 'callname',
      viewValue_de: 'Rufname (通称)',
      viewValue_ja: '通称'
    },
    {
      type: 'stylename',
      viewValue_de: 'Künstlername (号)',
      viewValue_ja: '号'
    },
    {
      type: 'youthname',
      viewValue_de: 'Jugendname (幼名)',
      viewValue_ja: '幼名'
    },
    {
      type: 'buddhistname',
      viewValue_de: 'Posthumer Dharma-Name (法名)',
      viewValue_ja: '法名(諡)'
    }
  ]

  selectedperiod = this.selectorperiods[0]

}
