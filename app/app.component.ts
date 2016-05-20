import {Component, OnInit} from '@angular/core';
import {RestCollection} from './killer_whale';

import {District} from './models/district.model';

@Component({
    selector: 'my-app',
    template:`
      <h2>Comunas</h2>
      <ul class="heroes">
        <li *ngFor="let district of districts">
          {{district.name}}
      </ul>
      {{districts.baseUrl}}
    `
})
export class AppComponent implements OnInit{
    districts: RestCollection[] = new RestCollection(District);
    title = 'Tour of Heroes';
    
    ngOnInit() {
        this.districts.fetch();
    }
}


