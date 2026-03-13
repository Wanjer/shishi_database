import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-outline',
    templateUrl: './outline.component.html',
    styleUrls: ['./outline.component.css'],
    standalone: true,
    imports: [MatIconModule, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, JsonPipe]
})
export class OutlineComponent implements OnInit {

  constructor(private translocoService: TranslocoService) { }

  language = 'de';

  translateselectors(data: any) {
    this.language = data;
  }

  ngOnInit(): void {
    this.translocoService
    .langChanges$
    .subscribe(data => this.translateselectors(data));
  }

  example_yearobject =
    {
      "year": "",
      "events": [
        {
          "event_id": "",
          "event_year": "",
          "event_date": "",
          "summary_ja": "",
          "summary_de": "",
          "expansion_ja": "",
          "expansion_de": "",
          "category": [
            ""
          ],
          "event_bibliography": ["URL"],
          "work": []
        }
      ]
    }

  example_poet =
    {
      "id_name": {
        "type": "common_name",
        "literal": "",
        "kana": "",
        "romanized": ""
      },
      "names": [
        {
          "type": "",
          "literal": "",
          "kana": "",
          "romanized": ""
        }
      ],
      "category": [
        "poet"
      ],
      "birth": "",
      "death": "",
      "placebirth": "",
      "placedeath": "",
      "placeactive": "",
      "reference": ["…"],
      "travels": [
        {
          "summary_ja": "",
          "summary_de": "",
          "start": "",
          "end": "",
          "stations": [
            "city",
            "mountain"
          ]
        }
      ],
      "timeline": [
        {
          "year": "",
          "events": [
            {
              "event_year": "",
              "event_date": "month/day",
              "expansion_ja": "",
              "expansion_de": "",
              "summary_ja": "",
              "summary_de": "",
              "category": [],
              "work": [],
              "id": ""
            }
          ]
        }
      ]
    }

   


  example_work =
    {
      "work": [
        {
      "work_id": "",
      "type": "",
      "title": "",
      "titlekana": "",
      "titleromanized": "",
      "title_de": "",
      "author/editor": [
        {
          "literal": "",
          "romanized": ""
        }
      ],
      "issued": {
        "date-parts": [
          [
            ""
          ]
        ]
      },
      "publisher": "",
      "URL": "",
      "note_ja": "",
      "note_de": "",
      "archive": "",
      "digitised": [
        {
          "digitisedLink": "",
          "digitisedImage": [
            ""
          ],
          "digitised_archive": "",
          "digitised_summary_ja": "",
          "digitised_summary_de": ""
        }
      ],
      "work_category": [
        ""
      ],
      "work_webpage": [
        {
          "URL": "no_empty_objects",
          "title": ""
        }
      ],
      "work_bibliography": [ "…" ],
      "material_ja": "",
      "material_de": "",
      "artwork_type": "",
      "NDCPD_NO": "",
      "NDCPD_ID": "",
      "CHD_ID": ""
    }
  ]
    }


  example_reference = {
    "type": "",
    "title": "",
    "author": [
      {
        "family": "",
        "given": ""      }
    ],
    "issued": {
      "date-parts": [
        [
          ""
        ]
      ]
    },
    "publisher": "",
    "note": "",
    "keyword": ""
  }


}

