import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { MedicationRequest } from 'src/app/model/MedicationRequest';
import { FirebaseBaseService } from 'src/app/services/firebase-base.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {AddMedicationComponent} from '../add-medication/add-medication.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-get-medication',
  templateUrl: './get-medication.component.html',
  styleUrls: ['./get-medication.component.scss']
})
export class GetMedicationComponent implements OnInit, AfterViewInit, OnDestroy {
  subs: Subscription[] = [];
  meds: MedicationRequest[] = [];

  constructor(private firebaseService: FirebaseBaseService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getMedication();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  public getMedication(): void {
   const sub: Subscription = this.firebaseService.getMedication().subscribe(m => {
      this.meds = m;
    });
   this.subs.push(sub);
  }

  public deleteMed(m: MedicationRequest): void {
    if (m.id !== undefined) {
      this.firebaseService.delete('MedicationRequest', m.id);
      const dialogRef = this.dialog.open(DialogComponent, {data: {title: 'Registration', message: 'Successfully deleted med for ' + m.subject}});
      const sub: Subscription = dialogRef.afterClosed().subscribe(result  => {
        this.meds = this.meds.filter( (value, index, arr) => {
          return value.id !== m.id;
        });
      });
      this.subs.push(sub);
    } else {
      const dialogRef = this.dialog.open(DialogComponent, {data: {title: 'Registration', message: 'Error in deleting med for ' + m.subject}});
      dialogRef.afterClosed().subscribe(result  => {});
    }
  }


  public addMedicationRequest(): void {
    const dialogRef = this.dialog.open(AddMedicationComponent, {});
    const sub: Subscription = dialogRef.afterClosed().subscribe(result  => {
      if (result !== undefined) {
        const md: MedicationRequest = result.data;
        this.meds.unshift(md);
      }
    });
    this.subs.push(sub);
  }

}
