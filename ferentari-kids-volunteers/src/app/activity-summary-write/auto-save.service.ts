import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AutoSaveService {
  constructor() { }
  save(key: string, values:object) {
    localStorage.setItem(key, JSON.stringify(values));
  }
  load(key: string): object {
    let storedObject = localStorage.getItem(key) || '{}';
    return JSON.parse(storedObject);
  }
  
}
