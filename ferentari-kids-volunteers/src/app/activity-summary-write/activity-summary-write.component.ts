import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ValidationErrors, FormGroup } from '@angular/forms';
import { KidsSearchQuery } from './kids-search.query';
import { Observable } from 'rxjs';
import {switchMap, startWith, debounceTime, filter } from 'rxjs/operators';
import { ActivitySummaryWriteCommand } from './activity-summary-write.command';
import { MatSnackBar } from '@angular/material';
import { AutoSaveService } from './auto-save.service';

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
  submitInProgress: boolean;
  constructor(
    private readonly kidsSearchQuery: KidsSearchQuery,
    private readonly activitySummaryWriteCommand: ActivitySummaryWriteCommand,
    private readonly autoSaveService: AutoSaveService,
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
    
    this.form.valueChanges.subscribe(_ => {
      this.status.dismiss();
    });
    
    this.initAutoSave();
  }
  
  private initAutoSave() {
    const savedFormValues = this.autoSaveService.load(ActivitySummaryWriteComponent.name);
    try {
      this.form.setValue(savedFormValues);
    }
    catch (e) {
      console.warn('Could not load autosaved form data. Might be first use.', e)
    }
    this.form.valueChanges.pipe(debounceTime(1000)).subscribe(value => {
      this.autoSaveService.save(ActivitySummaryWriteComponent.name, value);
    });
  }

  private requireMatch(control: FormControl): ValidationErrors | null {
    const selection: any = control.value;
    if (typeof selection === 'string') {
      return { requireMatch: true };
    }
    return null;
  }

  formatName(kid){
    if (kid === null || typeof(kid) !== 'object') return '';
    return kid.name.last + ' ' + kid.name.first + 
      (kid.name.nick?' (' + kid.name.nick + ')': '');
  }
  formatNameAndGrade(kid){
    if (kid === null || typeof(kid) !== 'object') return '';
    return this.formatName(kid) +
      (kid.grade? ', clasă: ' + kid.grade: ', nu e la școală');
  }

  submit() {
    this.submitInProgress = true;
    this.status.open("Se trimit răspunsurile...");
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
          this.status.open(message, 'Am înțeles');
          this.submitInProgress = false;
  }
}

