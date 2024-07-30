import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-outline',
  templateUrl: './outline.component.html',
  styleUrls: ['./outline.component.css']
})
export class OutlineComponent implements OnInit {

  constructor(private translocoService: TranslocoService) { }

  language = 'de';

  translateselectors(data: any){
    this.language = data;
  }

  ngOnInit(): void{
    this.translocoService.langChanges$.subscribe(data => this.translateselectors(data));
    }


}

