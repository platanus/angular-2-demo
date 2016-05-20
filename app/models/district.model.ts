import {REST, RestModel} from '../killer_whale';

@REST({
  url: 'http://pl-fanticket-staging.herokuapp.com/api/v1/districts',
  root: 'districts'  
})
export class District extends RestModel {
    id: number;
    name: string;
}