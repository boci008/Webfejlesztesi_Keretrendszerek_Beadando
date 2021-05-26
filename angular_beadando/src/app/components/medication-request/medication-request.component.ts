import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import { MedicationRequest } from 'src/app/model/MedicationRequest';
import {MatDialog} from '@angular/material/dialog';
import {MedicationRequestDetailedComponent} from '../medication-request-detailed/medication-request-detailed.component';
import {UpdateMedicationComponent} from '../update-medication/update-medication.component';

@Component({
  selector: 'app-medication-request',
  templateUrl: './medication-request.component.html',
  styleUrls: ['./medication-request.component.scss']
})
export class MedicationRequestComponent implements OnInit {

  @Output() deleteEvent = new EventEmitter<MedicationRequest>();

  @Input() medication: MedicationRequest = {
    subject: '',
    status: 'unknown',
    intent: 'original-order',
    medication: ''
  }; // placeholder values

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  public showInfo(med: MedicationRequest): void {
    const dialogRef = this.dialog.open(MedicationRequestDetailedComponent, {data: med});
    dialogRef.afterClosed().subscribe(result  => {});
  }

  public deleteMed(med: MedicationRequest): void {
    this.deleteEvent.emit(med);
  }

  public openUpdateMed(med: MedicationRequest): void {
    const dialogRef = this.dialog.open(UpdateMedicationComponent, {data: med});
    dialogRef.afterClosed().subscribe(result  => {});
  }

}
