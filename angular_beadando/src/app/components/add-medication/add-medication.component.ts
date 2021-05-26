import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import { MedicationRequest } from 'src/app/model/MedicationRequest';
import { FirebaseBaseService } from 'src/app/services/firebase-base.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {AuthguardService} from '../../services/authguard.service';

@Component({
  selector: 'app-add-medication',
  templateUrl: './add-medication.component.html',
  styleUrls: ['./add-medication.component.scss']
})
export class AddMedicationComponent implements OnInit {
  defaultStatus = 'active';
  defaultIntent = 'proposal';

  @Output() addToList = new EventEmitter<MedicationRequest>();

  form: FormGroup;

  constructor(private firebaseService: FirebaseBaseService, private dialog: MatDialog, private dialogRef: MatDialogRef<DialogComponent>, fb: FormBuilder, private authService: AuthguardService) {
    this.form = fb.group({
      medication: ['', Validators.required],
      status: ['active', Validators.required],
      intent: ['original-order', Validators.required],
      subject: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  addMedication(): void {
    // console.log(this.form.value);
    const md: MedicationRequest = {
      ...this.form.value,
        authoredOn: new Date(),
        recorder: this.authService.getCurentUser().username
      };
    this.firebaseService.addMedication(md);
    this.addToList.emit(md);
    this.dialogRef.close({data: md});
  }

}
