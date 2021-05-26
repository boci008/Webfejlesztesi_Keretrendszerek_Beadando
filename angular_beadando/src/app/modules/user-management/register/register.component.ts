import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FirebaseBaseService} from '../../../services/firebase-base.service';
import {User} from '../../../model/User';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../../components/dialog/dialog.component';
import {mergeMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required])
  });

  constructor(private firebaseService: FirebaseBaseService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  registrationClick(): void {
    const username: string = this.form.controls.username.value;
    const password: string = this.form.controls.password.value;

    const register = this.firebaseService.hasUser(username).pipe(
      mergeMap((hasUser: boolean) => {
        if (hasUser) {
          return this.showDialog('Username is already taken!');
        } else {
          return this.register(username, password);
        }
    })
    ).subscribe();
  }

  private register(username: string, password: string): Observable<boolean> {
      const user: User = {
        username,
        password,
      };
      this.firebaseService.addUser(user);
      this.showDialog('Successfully registered!');
      return of(true);
  }

  private showDialog(message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {data: {title: 'Registration', message}});
    dialogRef.afterClosed().subscribe(result  => {});
    return of(true);
  }

}
