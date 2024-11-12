import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { TranslocoService } from '@jsverse/transloco';
import { OverlayModule, ScrollStrategy, Overlay } from '@angular/cdk/overlay';
import { NgOptimizedImage } from '@angular/common';
import { FormControl } from '@angular/forms'
import { categories } from '../../assets/categories'
import { Events } from 'leaflet';

// assets/categories add as timeline/categories?

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],

})

export class TimelineComponent implements OnInit {

  // assert ! to  initialise
  @ViewChild(CdkVirtualScrollViewport) viewPort!: CdkVirtualScrollViewport;

  poets: Observable<any[]>;
  public poetarray: Array<any> = [];

  originaltimeline: Array<any> = [];
  poettimeline: Array<any> = [];
  // array transformed to template
  timeline: Array<any> = [];

  tenno: Observable<any[]>;
  shogun: Observable<any[]>;
  //yearvar: Array<any> = [];
  //mapped:Observable<any[]>;

  // variable spinner ngIf
  loading = true;

  searchbox = new FormControl();

  timelineTrack(index: number, yearobject: any) {
    return yearobject.year;
  }

  //eventTracker(index: number, event: any) {return event.id;}

  constructor(
    db: AngularFireDatabase,
    private translocoService: TranslocoService,
    private overlay: Overlay) {

    this.poets = db.list('poets').valueChanges();
    this.poets.subscribe(poets => { this.poetarray = poets });
    this.tenno = db.list('tenno').valueChanges();
    this.shogun = db.list('shogun').valueChanges();


    this.searchbox.valueChanges.subscribe((v: string) => {
      if (v === '') { this.search('emptystring') }
    }
    )


    // preload appended & filtered arrays for ngfor

    // function giving original timeline array

    db.list('timeline').valueChanges().subscribe((line: any) => {
      this.originaltimeline = line;
      //  console.log('original', this.originaltimeline);
    })



    // function giving timeline combining poets and timeline array

    db.list('timeline').valueChanges().subscribe((line: any) => {
      line.map((yearobject: any) => {

        // append poets

        this.poetarray.map((poet: any) =>
          poet.timeline.map((poetyearobject: any) => {
            if (yearobject.year === poetyearobject.year) {
              // append poetname to event, create new name key on ev before push
              var poetname = {
                'literal': poet.names.commonname.literal,
                'romanized': poet.names.commonname.romanized
              };
              poetyearobject.events.map((ev: any) => {
                ev.name = poetname;
                yearobject.events.push(ev)
              });
            }
          }
          )
        );
      }
      )
      //console.log('line', line);
      this.poettimeline = line;
      this.timeline = structuredClone(this.poettimeline);

      // variable spinner ngIf
      this.loading = false;
    }
    );

  }



  //********************
  //  SEARCH FUNCTION
  //********************

  casechange(value: string) {
    if (value) {
      return value
        .toLowerCase()
        .replace(/ū/g, 'u')
        .replace(/ō/g, 'o')
        .replace(/ī/g, 'i')
        .replace(/ē/g, 'e')
    } else {
      return "";
    }
  }

  highlightsearchvar: boolean = false;

  highlight() {
    this.highlightsearchvar = !this.highlightsearchvar;
  }




  // 1 search filtering events omitting timeline

  search(value: any) {

    var copytimeline = structuredClone(this.poettimeline)

    if (!this.timeline) {
      //console.log('preload');
      return [];
    }
    else if (!value || value === 'emptystring') {
      console.log('empty', this.poettimeline);
      return this.timeline = this.poettimeline;
      /*
     return  this.timeline = this.timeline.map((yearobject:any) => {
        this.poettimeline.map((poetyearobject:any) => 
        yearobject.events = poetyearobject.events
        )})
       */ 
    }
    else {

      var searchArray: Array<string> = []
      searchArray.push(this.casechange(this.searchbox.value))


      return this.timeline =
        copytimeline.filter((yearobject: any) => {
          // replaces js some on yearobject events
          var loopvar: Array<string> = [];
          var eventsearched: Array<any> = [];
          yearobject.events?.forEach((ev: any) => {

            // ngOninit listener emits emptystring if searchbox empty
            // this check better out of loop?
            // necessary for integration with category search?

              console.log('search')
              return searchArray.forEach((item) => {
                console.log('search', item, this.casechange(ev.summary_de), this.casechange(ev.summary_de)?.includes(item))
                if (
                  this.casechange(ev.summary_de)?.includes(item)
                  || this.casechange(ev.expansion_de)?.includes(item)
                  || ev.summary_ja?.includes(item)
                  || ev.expansion_ja?.includes(item)
                ) {
                  console.log('true', ev.summary_de)
                  // check if highlightsearch activated
                  if (this.highlightsearchvar) {
                    console.log('highlight')
                    ev.category.push('searchresult')
                  }

                  eventsearched.push(ev)

                  // how to add event searched?

                 // eventsearched.push(ev)
                 // console.log(eventsearched)
                 console.log('end')
                  return loopvar.push('true')
                } else {
                  console.log('false')
                  // remove false event

                  // return non-matching events too
                  // highlight without filtering
                  if (this.highlightsearchvar) {
                    return loopvar.push('true')
                  }
                  // handle deselection 
                  if (ev.category.includes('searchresult')) {
                    const index = ev.category.indexOf('searchresult')
                    ev.category.splice(index, 1)
                  }

                  // remove event not searched
                  //const index = yearobject.events.indexOf(ev)
                 // yearobject.events.splice(index, 1)
                 // console.log('removed', ev, yearobject.events)

                  return loopvar.push('false')
                }
              });


          })
          // simulate js 'some' method, which stops on first true
          // therefore no check for following event giving true
          // check if some event in events was true 

          if(!this.highlightsearchvar){
          console.log(eventsearched)
          yearobject.events = eventsearched
          }

          if (loopvar.includes('true')) {
            console.log('true');
            return true;
          } else {
            console.log('false');
            return false;
          }
        }
        )
    }

  }

  //********************
  //  CATEGORIES
  //********************


  categories_import = categories;
  taggrouplist = this.categories_import.category_groups;
  taglist = this.categories_import.categories;
  taglistvar: any = Array.from(this.taglist);


  //********************
  //  TAG GROUP SELECTION FUNCTION
  //********************

  //single selection

  // function only to close panel
  panelOpenState = false;

  togglePanel() {
    this.panelOpenState = false
  }

  selectedgroup: any[] = [];

  taggroupselection(taggroup: any) {
    console.log(this.selectedgroup.includes(taggroup.group_name))
    if (this.selectedgroup.includes(taggroup.group_name)) {
      this.selectedgroup = [];
      this.taglistvar = Array.from(this.taglist);
    } else {
      this.selectedgroup = taggroup.group_name;
      this.taglistvar = Array.from(this.taglist);
      this.taglistvar = this.taglistvar.filter((tg: any) =>
        taggroup.group_members.includes(tg.category_name));
    }
  }

  //********************
  //  CHIPSELECTION CATEGORY FUNCTION
  //********************

  public selectedtags: Array<string> = [];

  chipselection(tag: any) {

    // check if already selected
    if (this.selectedtags.includes(tag.category_name)) {
      this.selectedtags = this.selectedtags.filter(stag =>
        stag !== tag.category_name)
      // if selection is now empty restore timeline     
      if (!this.selectedtags[0]) {
        this.timeline = Array.from(this.poettimeline);
        // if selection has items left refilter with reduced array        
      } else {
        this.categoryfilter()
      }
    }
    // add new tag to array and filter with augmented array
    else {
      this.selectedtags.push(tag.category_name)
      this.categoryfilter()
    }
  }

  //********************
  //  CATEGORY FILTER FUNCTION
  //********************

  categoryfilter() {

    console.log('filter');

    return this.timeline =
      this.poettimeline.filter((yearobject: any) =>
        yearobject.events?.some((ev: any) => {

          if (this.selectedtags.every((tag) => ev.category.includes(tag))) {
            //  console.log('addtag');
            ev.category.push('searchresult')
          }
          else if (ev.category.includes('searchresult')) {
            //  console.log('removetag');
            const index = ev.category.indexOf('searchresult');
            ev.category.splice(index, 1);
          };
          return this.selectedtags.every((tag) => ev.category.includes(tag));

        }))

  }

  //********************
  //  DOWNLOAD FUNCTION
  //********************


  downloadid: string = "";
  //  vardata: any = "";
  yearobject_events: any = "";
  yearobject_research: any = "";
  downloadLink: any = "";
  downloadButton: any = "";
  blob: any = "";
  // a: any = "";


  // downlad for timeline with all 3 macrocategories together

  downloadFunction(yearobject: any) {
    this.downloadid = yearobject.year + '_downloader';
    this.yearobject_events = yearobject.events.map((x: any) =>
      x.work).flat().filter((item: any) => item !== undefined);
    //  this.vardata = JSON.stringify(this.workvar);
    this.blob = new Blob([JSON.stringify(this.yearobject_events)], { type: "application/json" });
    this.downloadLink = window.URL.createObjectURL(this.blob);
    this.downloadButton = document.getElementById(this.downloadid);
    this.downloadButton.href = this.downloadLink;
  };


  // download for all research functions on timeline 

  downloadResearchFunction(yearobject: any) {
    this.downloadid = yearobject.year + '_researchdownloader';
    this.yearobject_research = yearobject.events.map((x: any) =>
      x.research).flat().filter((item: any) => item !== undefined);
    //  this.vardata = JSON.stringify(this.yearobject_research);
    this.blob = new Blob([JSON.stringify(this.yearobject_research)], { type: "application/json" });
    this.downloadLink = window.URL.createObjectURL(this.blob);
    this.downloadButton = document.getElementById(this.downloadid);
    this.downloadButton.href = this.downloadLink;
  };



  //********************
  //  TRANSLATION FUNCTION
  //********************


  // strings triggering pipes
  tag: string = "";

  language = 'de';
  selectedlanguage: string = "";

  selectorcategoriesvar: any = "selectorcategories";
  selectorpublicationsvar: any = "selectorpublications";
  selectorperiodsvar: any = "selectorperiods";
  summaryVar: any = "summary_de";
  expansionVar: any = "expansion_de";
  titleVar: any = "titleromanized";

  ngOnInit(): void {
    this.translocoService.langChanges$.subscribe(
      selectedlanguage => this.translateselectors(selectedlanguage)
    );
  }

  translateselectors(selectedlanguage: any) {
    this.language = selectedlanguage;
    if (this.language === 'de') {
      this.summaryVar = 'summary_de';
      this.expansionVar = "expansion_de";
    } else {
      this.summaryVar = 'summary_ja';
      this.expansionVar = "expansion_ja";
    }
  }

  //********************
  //  SCROLL FUNCTION
  //********************

  // if autosize is used scrollToIndex not available
  // workaround with approximate values around desired point
  // better switch from autosize to fixed itemSize
  //  const range = { start: 0, end: 119}
  //  this.viewPort.setRenderedRange(range);

  // scrollIntoView Alternative?

  // this.viewPort.scrollToIndex(timeline.length / 2, "smooth");

  // console.log(this.viewPort)

  scrollPeriod(year: any) {
    if (year === 1600) { this.viewPort.scrollToOffset(20, "smooth"); }
    else if (year === 1700) { this.viewPort.scrollToOffset(16000, "smooth"); }
    else if (year === 1800) { this.viewPort.scrollToOffset(30000, "smooth"); }
  }

  //********************
  //  IMAGE OVERLAY FUNCTION
  //********************

  image: string = '';
  selectedImage: string = '';
  imageBig: boolean = false;
  category: string = '';
  selectedCategory: string = '';
  categoryTrigger: boolean = false;

  imageScroll: ScrollStrategy = this.overlay.scrollStrategies.block();

  bigImage(image: string) {
    this.selectedImage = image;
    this.imageBig = !this.imageBig;
  }

  overlayCategory(category: string) {
    this.selectedCategory = category;
    this.categoryTrigger = !this.categoryTrigger;
  }


  // infos zu tenno (und shogun, implementieren)
  /*
  selectedReign: string = '';
  
  expandReign(name: string){
    if (this.selectedReign.includes(name)){
    this.selectedReign = '';
  }else{
    this.selectedReign = name;
  }
  }
  */



  //********************
  //  EVENT EXPANSION FUNCTION
  //********************


  selectedEvent: string = '';

  /*im falle von expandall keine aktivierung*/
  expandDescription(summary_ja: string) {
    if (this.selectedEvent.includes(summary_ja) || this.expandallvar) {
      this.selectedEvent = this.selectedEvent.replace(summary_ja, '');
    } else {
      this.selectedEvent = this.selectedEvent + ' ' + summary_ja;
    }
  }

  expandallvar: boolean = false;

  expandall() {
    this.expandallvar = !(this.expandallvar);
  }



  //********************
  //  COLLECT MISSING IMAGES FUNCTION
  //********************


  imagesMissing: Array<string> = [];

  failedImageLoad(image: string, year: string) {
    this.imagesMissing.push(image);
    console.log('Missing Images', year, this.imagesMissing)
  }



  //********************
  //  PUBLICATION, PERIOD SELECTOR
  //********************

  // period selection via scroll command
  // publication still reliant on hide on ngclass

  activeIndex: number = 10;

  selectedcategory = 'nocateg';
  selectedpublication = 'nopub';
  selectedperiod = 'noperiod';

  selectorpublications = [
    {
      value: 'nopub',
      viewValue_de: 'Keine Auswahl',
      viewValue_ja: '選択なし'
    },
    {
      value: 'yamakawa',
      viewValue_de: 'Yamakawa Shōsetsu Nihonshi Zuroku',
      viewValue_ja: '山川 詳説日本史図録'
    },
    {
      value: 'iwanami_bungakushi',
      viewValue_de: 'Iwanami Kōza Nihon Bungakushi',
      viewValue_ja: '岩波講座 日本文学史'
    },
  ];

  selectorperiods = [
    {
      value: 'noperiod',
      viewValue_de: 'Keine Auswahl',
      viewValue_ja: '選択なし'
    },
    {
      value: 'earlyedo',
      viewValue_de: 'frühe Edo-Zeit',
      viewValue_ja: '江戸時代初期',
      year: 1600
    },
    {
      value: 'middleedo',
      viewValue_de: 'mittlere Edo-Zeit',
      viewValue_ja: '江戸時代中期',
      year: 1700
    },
    {
      value: 'lateedo',
      viewValue_de: 'späte Edo-Zeit',
      viewValue_ja: '江戸時代後期',
      year: 1800
    },
  ];

}
