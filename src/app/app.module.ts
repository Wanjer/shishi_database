import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFunctions,getFunctions } from '@angular/fire/functions';

import { OutlineComponent } from './outline/outline.component';
import { PoetsComponent } from './poets/poets.component';
import { TimelineComponent } from './timeline/timeline.component';
import { MapComponent } from './map/map.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import {ScrollingModule} from '@angular/cdk/scrolling';

import { IsEraPipe } from './is-era.pipe';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JoinArrayPipe } from './join-array.pipe';
import { IsStringPipe } from './is-string.pipe';
import { IsinstPipe } from './isinst.pipe';
import { MonthpipePipe } from './monthpipe.pipe';
import { MonthpipejpPipe } from './monthpipejp.pipe';
import { IsplacePipe } from './isplace.pipe';
import { IslatinPipe } from './islatin.pipe';
import { TranslocoRootModule } from './transloco-root.module';
import { IsErajaPipe } from './is-eraja.pipe';
import { NumjaPipe } from './numja.pipe';
import { SearchpipePipe } from './searchpipe.pipe';
import { SearchpoetsPipe } from './searchpoets.pipe';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { getAuth, provideAuth } from '@angular/fire/auth';

@NgModule({ declarations: [
        AppComponent,
        PoetsComponent,
        TimelineComponent,
        MapComponent,
        OutlineComponent,
        IsEraPipe,
        JoinArrayPipe,
        IsStringPipe,
        IsinstPipe,
        MonthpipePipe,
        MonthpipejpPipe,
        IsplacePipe,
        IslatinPipe,
        IsErajaPipe,
        SearchpipePipe,
        SearchpoetsPipe,
        NumjaPipe
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
       // provideDatabase(() => getDatabase()),
      //  provideFunctions(() => getFunctions()),
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatTabsModule,
        MatSliderModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        MatMenuModule,
        MatSelectModule,
        MatButtonModule,
        MatChipsModule,
        MatButtonToggleModule,
        MatExpansionModule,
        MatInputModule,
        TranslocoRootModule,
        ScrollingModule,
        LeafletModule
      ], providers: [provideHttpClient(withInterceptorsFromDi()), provideFirebaseApp(() => initializeApp({"projectId":"shishi-bc69b","appId":"1:326624084685:web:e4687e1e1911e6d4935f84","databaseURL":"https://shishi-bc69b-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"shishi-bc69b.appspot.com","apiKey":"AIzaSyBRmDGV9XCra8B8Ot46sgooQNeaKGfpgqs","authDomain":"shishi-bc69b.firebaseapp.com","messagingSenderId":"326624084685"})), provideDatabase(() => getDatabase()), provideAuth(() => getAuth())] })
export class AppModule { }
