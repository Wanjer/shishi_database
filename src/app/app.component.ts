import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { TranslocoService } from '@jsverse/transloco';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  title='Shishi Database';

  constructor(private transloco: TranslocoService) {
  }

  language = 'de';

  public setActiveLang(lang: string) {
  if (this.language === 'de'){
  this.transloco.setActiveLang('ja');
  this.language = 'ja';
}else{
  this.transloco.setActiveLang('de');
  this.language = 'de';
}
}

}
