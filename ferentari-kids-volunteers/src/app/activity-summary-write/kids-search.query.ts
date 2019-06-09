import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class KidsSearchQuery {

  constructor(private readonly httpClient: HttpClient) { }
  execute(request:string):Observable<any> {
    return this.httpClient.get('https://script.google.com/macros/s/AKfycbysd2BlatfiXIMeEVpEg4XMlk5S-Gnu8UD4pz5O1r92OIYhREs/exec?n='+
        encodeURIComponent(request));
  }
  
}
