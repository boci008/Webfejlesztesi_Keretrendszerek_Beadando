import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MedicationRequest} from '../../model/MedicationRequest';
import {FirebaseBaseService} from '../../services/firebase-base.service';
import {DialogComponent} from '../dialog/dialog.component';
import {AuthguardService} from '../../services/authguard.service';

@Component({
  selector: 'app-update-medication',
  templateUrl: './update-medication.component.html',
  styleUrls: ['./update-medication.component.scss']
})
export class UpdateMedicationComponent implements OnInit {
  selectedStatus: 'active' | 'on-hold' | 'cancelled' | 'completed' | 'entered-in-error' | 'stopped' | 'draft' | 'unknown' = this.med.status;
  selectedIntent: 'proposal' | 'plan' | 'order' | 'original-order' | 'reflex-order' | 'filler-order' | 'instance-order' | 'option' = this.med.intent;

  constructor(@Inject(MAT_DIALOG_DATA) public med: MedicationRequest, private firebaseService: FirebaseBaseService, private dialog: MatDialog, private authService: AuthguardService) { }

  ngOnInit(): void {
  }

  public updateMed(): void {
    if (this.med.id !== undefined) {
      this.med.status = this.selectedStatus;
      this.med.intent = this.selectedIntent;
      this.med.recorder = this.authService.getCurentUser().username;
      this.firebaseService.update('MedicationRequest', this.med.id, this.med);
      const dialogRef = this.dialog.open(DialogComponent,  {data: {title: 'Update', message: 'Update successful!'}});
      dialogRef.afterClosed().subscribe(result  => {});
    }
  }

}
