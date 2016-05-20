import {Component} from '@angular/core';
// import {REST} from './killer_whale';

import {District} from './models/district.model';

function REST(target: any, key: string) {
  console.log(this);
  debugger;
  target[key] = [{
        id: 12,
        name: "Hola"
    },
    {
        id: 13,
        name: "Chao"
    }];
};

@Component({
    selector: 'my-app',
    template:`
      <h2>Comunas</h2>
      <ul class="heroes">
        <li *ngFor="let district of districts">
          {{district}}
        </li>
      </ul>
    `
})
export class AppComponent {
    @REST
    districts: string[] = ["hola", "chao"];
    title = 'Tour of Heroes';
}


