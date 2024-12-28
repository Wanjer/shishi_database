import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { TranslocoService } from '@jsverse/transloco';
import { OverlayModule, ScrollStrategy, Overlay } from '@angular/cdk/overlay';
import { NgOptimizedImage } from '@angular/common';
import { FormControl } from '@angular/forms'
import { categories } from '../../assets/categories'
import { bibliography } from '../../assets/bibliography'
import { Bibliography } from '../../assets/timedata';
import { artists_lifedates } from '../../assets/artists_lifedates'
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
  complete_timeline: Array<any> = [];
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
                ev.name = poetname
                yearobject.events?.push(ev)
              });
            }
          }
          )
        )

        // add lifedates artists for timeline art

        artists_lifedates.map((artist) => {
          if (artist.death !== '?' && artist.death === yearobject.year 
            || artist.death === '?' && artist.period === yearobject.year) {
              
              var lifedatesde:string = ''
              var lifedatesja:string = ''
              if(artist.death === '?'){ lifedatesde = 'Um diese Zeit', lifedatesja = 'このころ'  }
              else{ lifedatesde = lifedatesja = artist.birth + '-' + artist.death }

              var artist_event = {
                  "event_year": yearobject.year,
                  "event_date": "",
                  "summary_ja": artist.names[0].literal + '<br>' + lifedatesja,
                  "summary_de": artist.names[0].romanized + '<br>' + artist.names[0].literal + '<br>' + lifedatesde,
                  "expansion_ja": "",
                  "expansion_de": "",
                  "category": artist.category
            };
            
              yearobject.events.push(artist_event)

          }
         }
        )

          // add categories from event_bibliography, work_bibliography
          // filter for edited and translated works

          var bibliography_append:any= []

          yearobject.events.forEach((event: any) => event.work?.forEach((work_entry: any) => { work_entry.work_bibliography?.forEach((reference:any) => {
            
            // todo handle volume and page

            if(reference.includes('vol')){ var volume = reference.replace(/\D/g,'') }
            if(reference.includes('page')){ var page = reference.replace(/\D/g,'') }

                bibliography.forEach((item:any) => {  if(item.title.includes(reference)) {

                  // !! event bibliography

                  item.volume = volume
                  item.page = page

                  bibliography_append.push(item)
                  //console.log('biblio', bibliography_append, event)
  
                } } )

              } )
              work_entry.work_bibliography = bibliography_append
        //      console.log('workbib', bibliography_append, work_entry)
              bibliography_append = []

            } ) )

        yearobject.events.forEach((event: any) => {
          event.event_bibliography?.forEach((reference: any) => {

            // todo handle volume and page

            if (reference.includes('vol')) { var volume = reference.replace(/\D/g, '') }
            if (reference.includes('page')) { var page = reference.replace(/\D/g, '') }

            // category to sort for translated and edited works in chronology view
            if(reference.category?.includes('translation')){ event.category.push('translation'), console.log(event.category) }
            if(reference.category?.includes('edition')){ event.category.push('edition') }

            bibliography.forEach((item: any) => {
              if (item.title.includes(reference)) {

                // !! event bibliography

                item.volume = volume
                item.page = page

                bibliography_append.push(item)
                //console.log('biblio', bibliography_append, event)

              }
            })
          }
          )
          event.event_bibliography = bibliography_append
        //  console.log('workbib', bibliography_append, event)
          bibliography_append = []
        }
        )

      }
      )
      //console.log('line', line);
      this.complete_timeline = line;
      this.timeline = structuredClone(this.complete_timeline);

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

    var copytimeline = structuredClone(this.complete_timeline)

    if (!this.timeline) {
      //console.log('preload');
      return [];
    }
    else if (!value || value === 'emptystring') {
      // console.log('empty', this.complete_timeline);
      return this.timeline = this.complete_timeline;
      /*
     return  this.timeline = this.timeline.map((yearobject:any) => {
        this.complete_timeline.map((poetyearobject:any) => 
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

            // console.log('search')
            return searchArray.forEach((item) => {

              if (
                this.casechange(ev.summary_de)?.includes(item)
                || this.casechange(ev.expansion_de)?.includes(item)
                || ev.summary_ja?.includes(item)
                || ev.expansion_ja?.includes(item)
                // poet name searchable
                || this.casechange(ev.name?.romanized).includes(item)
                || this.casechange(ev.name?.literal).includes(item)
              ) {

                // check if highlightsearch activated
                if (this.highlightsearchvar) {
                  ev.category.push('searchresult')
                }

                eventsearched.push(ev)

                // how to add event searched?

                // eventsearched.push(ev)
                // console.log(eventsearched)
                // console.log('end')
                return loopvar.push('true')
              } else {
                // console.log('false')
                // remove false event

                // return non-matching events too
                // highlight without filtering
                if (this.highlightsearchvar) {
                  return loopvar.push('true')
                }
                // handle deselection highlightsearch
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

          if (!this.highlightsearchvar) {
            // console.log(eventsearched)
            yearobject.events = eventsearched
          }

          if (loopvar.includes('true')) {
            return true;
          } else {
            return false;
          }
        }
        )
    }

  }

  //********************
  //  PUBLICATION / SOURCE FILTER FUNCTION
  //********************

  selectedsource: string = "";

  sourcefilter(value: string) {

    // console.log('sourcefilter');

    var copytimeline = structuredClone(this.complete_timeline)

    // deselection
    if (this.selectedsource.includes(value)) {

      return this.timeline = this.complete_timeline;
    }
    else {
      // singleselection
      this.selectedsource = value;

      return this.timeline =

        copytimeline.filter((yearobject: any) => {

          var loopvar: Array<string> = [];
          var sourcefiltervar: Array<any> = [];

          yearobject.events?.forEach((ev: any) => {
            if (ev.source?.includes(value)) {
              sourcefiltervar.push(ev)
              loopvar.push('true')
            } else {
              loopvar.push('false')
            }
          })
          yearobject.events = sourcefiltervar
          if (loopvar.includes('true')) {
            return true;
          } else {
            return false;
          }
        })
    }
  }

  //********************
  //  CATEGORIES
  //********************


  categories_import = categories;
  taggrouplist = this.categories_import.category_groups;
  taglist = this.categories_import.categories;
  taglistvar: any = Array.from(this.taglist); 

  // !(selectedpublication == 'nopub') && !event.source?.includes(selectedpublication),

 //********************
  //  BIBLIOGRAPHY
  //********************

  bibliography_import = bibliography as Bibliography;

   //********************
  //  ARTISTS
  //********************

  artists = artists_lifedates;

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
    // console.log(this.selectedgroup.includes(taggroup.group_name))
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
        this.timeline = Array.from(this.complete_timeline);
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

    console.log('length', this.selectedtags.length)

  }

  //********************
  //  CATEGORY FILTER HIGHLIGHT FUNCTION
  //********************

  // analog highlight search

  categoryfilter_highlight() {

    var copytimeline = structuredClone(this.complete_timeline)

    return this.timeline =
      copytimeline.filter((yearobject: any) =>
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
  //  CATEGORY FILTER FUNCTION
  //********************

  categoryfilter() {

    var copytimeline = structuredClone(this.complete_timeline)

    return this.timeline =
      copytimeline.filter((yearobject: any) => {

        var loopvar: Array<string> = [];
        var eventsearched: Array<any> = [];
        yearobject.events?.forEach((ev: any) => {

          return this.selectedtags.forEach((item) => {

            if (ev.category?.includes(item)) {
              eventsearched.push(ev)
              return loopvar.push('true')
            }
            else {
              return loopvar.push('false')
            }
          });

        })

        yearobject.events = eventsearched

        if (loopvar.includes('true')) {
          return true;
        } else {
          return false;
        }
        
      }



      )

  }

  //********************
  //  DOWNLOAD FUNCTIONS
  //********************

  // timeline downlad x6 - 3 macrocategories, merged, research, works


  timelineDownload(value: string) {

    var downloadLink: any = ""
    var downloadButton: any = ""
    var blob: any = ""
    var downloadid = value + '_timeline_download'
    console.log('id', downloadid)

    if (value.includes('politics' || 'literature' || 'art')) {
      console.log('pla')

      var copytimeline = structuredClone(this.complete_timeline)

      var download_timeline = copytimeline.filter((yearobject: any) => {

        var loopvar: Array<string> = [];
        var filtervar: Array<any> = [];

        yearobject.events?.forEach((ev: any) => {
          if (ev.category?.includes(value)) {
            filtervar.push(ev)
            loopvar.push('true')
          } else {
            loopvar.push('false')
          }
        })
        yearobject.events = filtervar
        if (loopvar.includes('true')) {
          return true;
        } else {
          return false;
        }
      })

      // console.log('pt', download_timeline)
      blob = new Blob([JSON.stringify(download_timeline)], { type: "application/json" })
    }
    else if (value.includes('merged')) {

      blob = new Blob([JSON.stringify(this.timeline)], { type: "application/json" })
    }
    else if (value.includes('research')) {

      var timeline_research = this.timeline.map((yearobject: any) => 
        yearobject.events.map((event: any) =>
        event.research).flat().filter((item: any) => 
        item !== undefined))

      blob = new Blob([JSON.stringify(timeline_research)], { type: "application/json" })
    }
    else if (value.includes('works')){

      var timeline_works = this.timeline.map((yearobject: any) => yearobject.events.map((event: any) =>
        event.work).flat().filter((item: any) => item !== undefined))

      blob = new Blob([JSON.stringify(timeline_works)], { type: "application/json" })
    }

    downloadLink = window.URL.createObjectURL(blob)

    downloadButton = document.getElementById(downloadid)

    downloadButton.href = downloadLink

  }


  /*

  why download only single yearobject?

  yearobjectDownload(yearobject: any) {

    this.downloadid = yearobject.year + '_downloader';
    this.yearobject_events = yearobject.events.map((x: any) =>
      x.work).flat().filter((item: any) => item !== undefined);
    //  this.vardata = JSON.stringify(this.workvar);
    this.blob = new Blob([JSON.stringify(this.yearobject_events)], { type: "application/json" });
    this.downloadLink = window.URL.createObjectURL(this.blob);
    this.downloadButton = document.getElementById(this.downloadid);
    this.downloadButton.href = this.downloadLink;

  };

  */


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
  titleVar: any = "titleromanized";

  ngOnInit(): void {
    this.translocoService.langChanges$.subscribe(
      selectedlanguage => this.translateselectors(selectedlanguage)
    );
  }

  translateselectors(selectedlanguage: any) {
    this.language = selectedlanguage
  }

  //********************
  //  SCROLL FUNCTION
  //********************

  // if autosize is used scrollToIndex not available
  // workaround with approximate values around desired point
  // better switch from autosize to fixed itemSize
  //  const range = { start: 0, end: 119}
  //  this.viewPort.setRenderedRange(range);

  // scrollIntoView with flexible height?

  // console.log(this.viewPort)


  scrollPeriod(start: any, end: any) {

    var copytimeline = structuredClone(this.complete_timeline)

    if (start === 0) {
      return this.timeline
    }
    else {
      return this.timeline =
        copytimeline.filter((yearobject: any) => {
          return (start < yearobject.year && yearobject.year < end)
        }
        )
    }

  }

  /*
  scrollPeriod_v1(year: any) {
    if (year === 1600) { this.viewPort.scrollToOffset(20, "smooth"); }
    else if (year === 1700) { this.viewPort.scrollToOffset(16000, "smooth"); }
    else if (year === 1800) { this.viewPort.scrollToOffset(30000, "smooth"); }
  }
  */

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

  categorypanelvar: boolean = false;

  showcategories() {
    this.categorypanelvar = !(this.categorypanelvar);
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

  // in aktueller version nicht enthalten

  activeIndex: number = 10;

  selectedcategory = 'nocateg';
  selectedpublication = 'nopub';
  selectedperiod = 'noperiod';

  selectorpublications = [
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
  ];

}
