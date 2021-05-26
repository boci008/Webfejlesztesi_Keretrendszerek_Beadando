import { Component, OnInit } from '@angular/core';
import {FirebaseBaseService} from '../../../services/firebase-base.service';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {DialogComponent} from '../../../components/dialog/dialog.component';
import {AuthguardService} from '../../../services/authguard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private firebaseService: FirebaseBaseService, private dialog: MatDialog, private authService: AuthguardService) { }

  ngOnInit(): void {
  }

  public isDetailsOk(): void {
    const username: string = this.form.controls.username.value;
    const password: string = this.form.controls.password.value;
    this.firebaseService.isDetailsOk(username, password).subscribe(val => {
      if (val) {
        this.authService.setCurrentUser({username, password: 'secret'});
        this.showDialog('Successfully logged in!');
      } else {
        this.showDialog('Error in login!');
      }
    });
  }

  private showDialog(message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {data: {title: 'Login', message}});
    dialogRef.afterClosed().subscribe(result  => {});
    return of(true);
  }

}
