import {Component, Inject, Input, OnInit} from '@angular/core';
import {MedicationRequest} from '../../model/MedicationRequest';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-medication-request-detailed',
  templateUrl: './medication-request-detailed.component.html',
  styleUrls: ['./medication-request-detailed.component.scss']
})
export class MedicationRequestDetailedComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public med: MedicationRequest) { }

  ngOnInit(): void {
  }

}
