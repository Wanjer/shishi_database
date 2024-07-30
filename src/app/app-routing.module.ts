import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OutlineComponent } from './outline/outline.component';
import { TimelineComponent } from './timeline/timeline.component';
import { PoetsComponent } from './poets/poets.component';
import { MapComponent } from './map/map.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'outline' },
  { path: 'outline', component: OutlineComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'poets', component: PoetsComponent },
  { path: 'map', component: MapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
