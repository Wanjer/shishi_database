import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { CdkVirtualScrollViewport, CdkVirtualForOf } from '@angular/cdk/scrolling'
import { Observable } from 'rxjs'
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { TranslocoService, TranslocoPipe } from '@jsverse/transloco'
import { OverlayModule, ScrollStrategy, Overlay, CdkOverlayOrigin, CdkConnectedOverlay } from '@angular/cdk/overlay'
import { NgOptimizedImage, NgClass, AsyncPipe, KeyValuePipe, SlicePipe } from '@angular/common'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { categories } from '../../assets/categories'
import { bibliography_zotero } from '../../assets/bibliography_zotero'
import { Author, Bibliography_Schema } from '../../assets/timedata'
import { artists_lifedates } from '../../assets/artists_lifedates'
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CdkAutoSizeVirtualScroll } from '@angular/cdk-experimental/scrolling';
import { MatDivider } from '@angular/material/divider';
import { splitFirst } from '../pipes/splitFirst.pipe';
import { IsinstPipe } from '../pipes/isinst.pipe';
import { MonthpipePipe } from '../pipes/monthpipe.pipe';
import { IslatinPipe } from '../pipes/islatin.pipe';
import { NumjaPipe } from '../pipes/numja.pipe';
import { DaterangePipe } from '../pipes/daterange.pipe';
import { GlossarPipe } from '../pipes/glossar.pipe';
import { DecimalPipe, DatePipe } from '@angular/common';
import { SplitslashPipe } from '../pipes/splitslash.pipe';
// import * as Cite from "@citation-js/core"
// citation-js not working


// assets/categories add as timeline/categories?

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css'],
    standalone: true,
    imports: [MatExpansionPanel, MatChipListbox, MatChipOption, NgClass, MatMenuTrigger, MatMenu, MatMenuItem, MatButton, MatFormField, MatLabel, MatInput, FormsModule, ReactiveFormsModule, MatProgressSpinner, CdkVirtualScrollViewport, CdkAutoSizeVirtualScroll, CdkVirtualForOf, MatDivider, NgOptimizedImage, CdkOverlayOrigin, CdkConnectedOverlay, MatExpansionPanelHeader, MatExpansionPanelTitle, AsyncPipe, DecimalPipe, DatePipe, TranslocoPipe, splitFirst, IsinstPipe, MonthpipePipe, IslatinPipe, NumjaPipe, DaterangePipe, GlossarPipe, SlicePipe, SplitslashPipe]
})

export class TimelineComponent implements OnInit {

  // assert ! to  initialise
  @ViewChild(CdkVirtualScrollViewport) viewPort!: CdkVirtualScrollViewport;

  poets: Observable<any[]>;
  public poetarray: Array<any> = [];

  // originaltimeline: Array<any> = [];
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

    // function giving timeline combining poets and timeline array

    db.list('timeline').valueChanges().subscribe((line: any) => {
      line.map((yearobject: any) => {

        // append poets

        this.poetarray.map((poet: any) =>
          poet.timeline.map((poetyearobject: any) => {

            if (yearobject.year === poetyearobject.year) {
              // append poetname to event, create new name key on ev before push
              var poetname = {
                'literal': poet.id_name.literal,
                'romanized': poet.id_name.romanized
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


          if (artist.death !== '?' && Number(artist.death) === yearobject.year 
            || artist.death === '?' && Number(artist.period) === yearobject.year) {
              
              var lifedatesde:string = ''
              var lifedatesja:string = ''
              if(artist.death === '?'){ lifedatesde = 'Wirkte um diese Zeit <br>Geburts- und Sterbedatum unklar', lifedatesja = 'このころ活躍 <br>生没年不詳'  }
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
            
              yearobject.events?.push(artist_event)

          }
         }
        )

          // add bibliography to works and events
          // poets already added above so bibliography is appended here
          // tag edited and translated works by adding to category

          var bibliography_append:Array<object> = []
          // var bibliography_searcharray:Array<string> = []
          var work_bibliography_searcharray_append:Array<string> = []
          var event_bibliography_searcharray_append:Array<string> = []


          yearobject.events?.forEach((event: any) => { event.work?.forEach((work_entry: any) => {

            //
            // work_category
            //

            // set filters duplicate tags
            event.category = [ ... new Set(event.category.concat(work_entry.work_category))]

             work_entry.work_bibliography?.forEach((reference:any) => {
            
              //
              // work_bibliography
              //

             var reference_URL:string
             var reference_volume:string
             var reference_page:string

             reference_URL = reference.split('§')[0]
             if (reference.includes('#')) { reference_volume = reference.split('#')[0], reference_page = reference.split('#')[1] }

                bibliography_zotero.forEach((item:any) => {  if(item.URL == reference_URL) {

                   // category to sort for translated and edited works in chronology view
                      if (item.keyword?.includes('translation')) { event.category.push('translation') }
                      if (item.keyword?.includes('edition')) { event.category.push('edition') }

                      // dont overwrite volume, page entries
                      if(item.volume == '' && reference_volume !== 'empty'){ item.volume = reference_volume }
                      if(item.page == '' && reference_page !== 'empty'){ item.page = reference_page }

                    // item is already in csl json, needs only to be formatted ?
                   // var myCitation = new item.plugins.output.format('citation', {format: 'html', template: 'apa' })

                  var item_creator = ""
                  item
                  .author?.map((entry:Author) => { item_creator = entry.family + " " + entry.given + " " + entry.literal })
                  .editor?.map((entry:Author) => { item_creator = entry.family + " " + entry.given + " " + entry.literal })
                  .translator?.map((entry:Author) => { item_creator = entry.family + " " + entry.given + " " + entry.literal })

                  work_bibliography_searcharray_append.push(item.title + item_creator)
                  bibliography_append.push(item)
  
                } 
              } 
            )

              } 
            )
              
              work_entry.work_bibliography = bibliography_append

              bibliography_append = []

                }
              )
              event.bibliography_searcharray = []
              event.bibliography_searcharray = work_bibliography_searcharray_append
            }
           )


          yearobject.events?.forEach((event: any) => {
          event.event_bibliography?.forEach((reference: any) => {

            //
            // event_bibliography
            //

             var reference_URL:string
             var reference_volume:string
             var reference_page:string

             reference_URL = reference.split('§')[0]
             if (reference.includes('#')) { reference_volume = reference.split('#')[0], reference_page = reference.split('#')[1] }


                bibliography_zotero.forEach((item:any) => {  if(item.URL == reference_URL) {

                  // category to sort for translated and edited works in chronology view
                  if (item.keyword?.includes('translation')) { event.category.push('translation') }
                  if (item.keyword?.includes('edition')) { event.category.push('edition') }

                  if(item.volume == '' && reference_volume !== 'empty'){ item.volume = reference_volume }
                  if(item.page == '' && reference_page !== 'empty'){ item.page = reference_page }

                  var item_creator = ""
                  item
                  .author?.map((entry:Author) => { item_creator = entry.family + " " + entry.given + " " + entry.literal })
                  .editor?.map((entry:Author) => { item_creator = entry.family + " " + entry.given + " " + entry.literal })
                  .translator?.map((entry:Author) => { item_creator = entry.family + " " + entry.given + " " + entry.literal })

                bibliography_append.push(item)
                event_bibliography_searcharray_append.push(item.title + item_creator)

              }
            })
          }
          )
          event.event_bibliography = bibliography_append
          event.bibliography_searcharray = event.bibliography_searcharray.concat(event_bibliography_searcharray_append)

          bibliography_append = []

        }
        )

      }
      )

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
      return [];
    }
    else if (!value || value === 'emptystring') {
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

            return searchArray.forEach((item) => {

              if (
                   this.casechange(ev.summary_de)?.includes(item)
                || this.casechange(ev.expansion_de)?.includes(item)
                || ev.summary_ja?.includes(item)
                || ev.expansion_ja?.includes(item)
                // poet name searchable
                || this.casechange(ev.name?.romanized).includes(item)
                || this.casechange(ev.name?.literal).includes(item)
                // references searchable
                || ev.bibliography_searcharray.some((entry:string) => this.casechange(entry).includes(item))
              ) {

                // check if highlightsearch activated
                if (this.highlightsearchvar) {
                  ev.category.push('searchresult')
                }

                eventsearched.push(ev)

                // how to add event searched?
                // eventsearched.push(ev)

                return loopvar.push('true')
              } else {

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

                return loopvar.push('false')
              }
            });


          })
          // simulate js 'some' method, which stops on first true
          // therefore no check for following event giving true
          // check if some event in events was true 

          if (!this.highlightsearchvar) {
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
  // taglistvar: any = Array.from(this.taglist); 

 //********************
  //  BIBLIOGRAPHY
  //********************

  bibliography_import = bibliography_zotero as Bibliography_Schema;

   //********************
  //  ARTISTS
  //********************

  artists = artists_lifedates;

  //********************
  //  TAG GROUP SELECTION FUNCTION
  //********************

  //single selection

  // function only to close panel
  CategoryPanelOpen = false

  // die Funktion dann nicht mehr gebraucht TODO
  panelOpenState = false;

  togglePanel() {
    this.panelOpenState = !this.panelOpenState
  }

  // initialize with whole list
  tagGroupSelected:string = ""
  filteredTaglist:Array<any> = this.taglist
  // single selection
  taggroupselection(taggroup: any) {
      if(this.tagGroupSelected == taggroup.category_name){
      this.tagGroupSelected = ""
      this.filteredTaglist = this.taglist
      }else{
      this.filteredTaglist = this.taglist.filter((tag) => tag.category_group.includes(taggroup.category_name))
      this.tagGroupSelected = taggroup.category_name
      }
  }


  //********************
  //  CHIPSELECTION CATEGORY FUNCTION
  //********************

  public selectedtags: Array<string> = [];

  chipselection(tag: any) {

    // check if already selected
    if (this.selectedtags.includes(tag.category_name)) {
      // if already selected remove from selectedtags array
      this.selectedtags = this.selectedtags.filter(seltag => seltag !== tag.category_name)
      // if selection is now empty restore timeline     
      if (!this.selectedtags[0]) {
        this.timeline = Array.from(this.complete_timeline);
        // if selection has items left refilter with reduced array        
      } else {
        // if there are other categories still selected run categoryfilter with new array
        this.categoryfilter()
      }
    }
    // add new tag to array and run categoryfilter with augmented array
    else {
      this.selectedtags.push(tag.category_name)
      this.categoryfilter()
    }
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
            ev.category.push('searchresult')
          }
          else if (ev.category.includes('searchresult')) {
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

  previousStart = ""

  scrollPeriod(start: any, end: any) {

    var copytimeline = structuredClone(this.complete_timeline)

    // check for deselect
    if(this.previousStart = start) {
        this.previousStart = ""
        return this.timeline
    }
    else {
       this.previousStart = start
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

  menuScroll: ScrollStrategy = this.overlay.scrollStrategies.block();
  imageScroll: ScrollStrategy = this.overlay.scrollStrategies.block();

  bigImage(dig_id: string) {
    this.selectedImage = dig_id;
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


  selectedEvents: string = ''

  /*im falle von expandall keine aktivierung*/
  expandDescription(id: string) {
    if (this.selectedEvents.includes(id) || this.expandallvar) {
      this.selectedEvents = this.selectedEvents.replace(id, '')
    } else {
      this.selectedEvents = this.selectedEvents + ' ' + id
    }
  }

  expandallvar: boolean = false;

  expandall() {
    this.expandallvar = !(this.expandallvar)
    this.selectedEvents = ''
  }

  categorypanelvar: boolean = false

  showcategories() {
    this.categorypanelvar = !(this.categorypanelvar)
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
  //  VARIABLES, PUBLICATION, PERIOD SELECTOR
  //********************

  // in aktueller version nicht enthalten

  imagePath:string = "/assets/images/"

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
    /*
    wozu? TODO
    {
      value: 'noperiod',
      viewValue_de: 'Keine Auswahl',
      viewValue_ja: '選択なし',
      start: 0,
      end: 0
    },
    */
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

}
