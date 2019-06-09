import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ValidationErrors, FormGroup } from '@angular/forms';
import { KidsSearchQuery } from './kids-search.query';
import { Observable } from 'rxjs';
import {switchMap, startWith, debounceTime, filter } from 'rxjs/operators';
import { ActivitySummaryWriteCommand } from './activity-summary-write.command';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-activity-summary-write',
  templateUrl: './activity-summary-write.component.html',
  styleUrls: ['./activity-summary-write.component.css']
})
export class ActivitySummaryWriteComponent implements OnInit {
  volunteerNameLast = new FormControl('', Validators.required);
  volunteerNameFirst = new FormControl('', Validators.required);
  kid = new FormControl('', this.requireMatch);
  activitySummary = new FormControl('', Validators.required);
  remarks = new FormControl('');
  kids: Observable<any>;
  form: FormGroup;
  constructor(
    private readonly kidsSearchQuery: KidsSearchQuery,
    private readonly activitySummaryWriteCommand: ActivitySummaryWriteCommand,
    private status: MatSnackBar
    ) { 
      this.form = new FormGroup({
        'volunteerNameFirst': this.volunteerNameFirst,
        'volunteerNameLast': this.volunteerNameLast,
        'kid': this.kid,
        'activitySummary': this.activitySummary,
        'remarks': this.remarks
      });
    }

  ngOnInit() {
    this.kids = this.kid.valueChanges.pipe(
      startWith(''),
      debounceTime(100),
      filter(value => typeof(value) === 'string'),
      switchMap(kidSearch => this.kidsSearchQuery.execute(kidSearch)));
  }
  
  private requireMatch(control: FormControl): ValidationErrors | null {
    const selection: any = control.value;
    if (typeof selection === 'string') {
      return { requireMatch: true };
    }
    return null;
  }

  formatName(kid){
    if (typeof(kid) !== 'object') return '';
    return kid.name.last + ' ' + kid.name.first + 
      (kid.name.nick?' (' + kid.name.nick + ')': '');
  }
  formatNameAndGrade(kid){
    if (typeof(kid) !== 'object') return '';
    return this.formatName(kid) +
      (kid.grade? ', clasă: ' + kid.grade: ', nu e la școală');
  }

  submit() {
    var request = {
      volunteer: {
        firstName: this.volunteerNameFirst.value,
        lastName: this.volunteerNameLast.value
      },
      kidId: this.kid.value.id,
      activitySummary: this.activitySummary.value,
      remarks: this.remarks.value
    };
    this.activitySummaryWriteCommand
      .execute(request)//todo should unsubscribe?
      .subscribe(
        r => this.handleResponse(r.success),
        _ => this.handleResponse(false));
  }  
  private handleResponse(success:boolean) {
    let message: string = success? 
           'Mulțumim mult! Răspunsurile tale au fost înregistrate cu succes.' :
           ':( Nu am putut înregistra răspunsurile. Dacă problema persistă, te rugăm să le păstrezi temporar în altă parte și să ne scrii pe facebook.'
           ;
          if (success) {
            this.kid.setValue('');
            this.kid.reset();
            this.activitySummary.reset();
            this.remarks.reset();
          }        
          this.status.open(message, 'Am înțeles')
  }
}

