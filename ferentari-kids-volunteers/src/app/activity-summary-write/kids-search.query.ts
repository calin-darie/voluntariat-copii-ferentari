import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class KidsSearchQuery {

  constructor(private readonly httpClient: HttpClient) { }
  private allKidsCached: [] = null;
  private lastCacheTime: number;

  execute(request:string):Observable<any[]> {
    return this.getAllKids().pipe(
      map(kids => this.filterKids(kids, request)));
  }
  private getAllKids():Observable<any[]> {
    if (this.allKidsCached != null && 
      new Date().getTime() - this.lastCacheTime < 60000)
      return from([this.allKidsCached]);
    return this.httpClient
      .get('https://script.google.com/macros/s/AKfycbysd2BlatfiXIMeEVpEg4XMlk5S-Gnu8UD4pz5O1r92OIYhREs/exec?n=')
      .pipe(
        map(response => {
          var kids = response as [];
          this.allKidsCached = kids;
          this.lastCacheTime = new Date().getTime();
          return kids;
        })
      );
  }
  
  private filterKids(kids: any[], request:string) {
    var nameSearches = request.split(' ');
    return kids.filter(kid =>  nameSearches.every(
      nameSearch => [kid.name.first, kid.name.nick, kid.name.last].some(
        namePart => namePart.startsWithAccentInsensitiveCaseInsensitive(nameSearch))
        )
      );
  }
}
