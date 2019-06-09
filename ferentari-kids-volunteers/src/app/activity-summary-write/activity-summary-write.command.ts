import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ActivitySummaryWriteCommand {

  constructor(private readonly httpClient: HttpClient) { }
  execute(request):Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'text/plain')
    return this.httpClient.post(
        'https://script.google.com/macros/s/AKfycbysd2BlatfiXIMeEVpEg4XMlk5S-Gnu8UD4pz5O1r92OIYhREs/exec',
        request,
        {headers: headers}
    );
  }
  
}
