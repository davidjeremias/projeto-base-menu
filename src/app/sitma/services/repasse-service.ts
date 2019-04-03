import { Observable } from "rxjs";
import axios from 'axios';

import { Repasse } from "../entity/repasse";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class RepasseService {
    pesquisar():Observable<Repasse>{
        console.log(axios);
        return Observable.create(observer => {
            axios.get('/repasses')
              .then(function (response) {
                observer.next(response.data);
                observer.complete();
              });      
          });
    }
    buscarRepasses():Observable<Repasse[]>{
        console.log(axios);
        return Observable.create(observer => {
            axios.get('/repasses/buscarRepasses')
              .then(function (response) {
                observer.next(response.data);
                observer.complete();
              });      
          });
    }
}