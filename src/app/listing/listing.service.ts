import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Comment } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private http:Http) { }

  getData(): Observable<Comment[]>{
    let url = "https://api.myjson.com/bins/pkisp";
    let myHeaders = new Headers();
    // myHeaders.append("Authorization",window.sessionStorage.getItem('TpToken'));
    myHeaders.append("Content-Type","application/json");
   let options = new RequestOptions({ headers: myHeaders});
    return this.http
    .get(url,options)
    .map((res:Response) =>  res.json())
            
  }


  private handleError(error: Response) {
       console.log("error",error);    
  }
}
