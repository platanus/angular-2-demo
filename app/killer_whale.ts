import { Injectable, ReflectiveInjector } from '@angular/core';
import { HTTP_PROVIDERS, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

var injector = ReflectiveInjector.resolveAndCreate([
   HTTP_PROVIDERS
 ]);
 
 var http = injector.get(Http);

export function REST(params: any) {
    return function <TFunction extends Function>(Target: TFunction): TFunction {
        Target.prototype.getBaseUrl = function() {
            return params.url;
        };
        
        Target.prototype.getBaseRoot = function() {
            return params.root;
        };
        
        return Target;
    };
}

export class RestModel {
    protected getBaseUrl(): string {
        return null;
    }
    
    protected getBaseRoot(): string {
        return null;
    }
    
    fetch() {
        
    }
    
    update() {
        
    }
}

export class RestCollection extends Array {
    private modelClass: any;
    private baseUrl: string;
    private baseRoot: string;
    
    constructor(_modelClass: any) {
        super(0);
        
        let mod = new _modelClass;
        this.baseUrl = mod.getBaseUrl();
        this.baseRoot = mod.getBaseRoot();
        
        this.modelClass = _modelClass;
    }
    
    fetch(params = undefined) {
        let self = this;
        
        return this.get(params)
            .subscribe( items => {
                self.length = 0;
                items.forEach(i => {
                    let obj = new self.modelClass;
                    _.extend(obj, i);
                    self.push(obj);
                });
            });
    }
    
    create() {
        
    }
    
    private get(params: any[] = undefined) {
        let url = this.baseUrl;
        
        if(params) {
            let query = params.map( x => x.join("=") ).join("&");
            url = `${url}?${query}`;
        }   
        
        return http.get(url)
                        .map(response => {
                            let body = this.extractBody(response);
                            return body[this.baseRoot] || [];
                        })
                        .catch(this.handleError);
    }
    
    private extractBody(response: any) {
        if (response.status < 200 || response.status >= 300) {
            throw new Error('Bad response status: ' + response.status);
        }
        return response.json();
    }
    
    private handleError (error: any) {
        // In a real world app, we might send the error to remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}