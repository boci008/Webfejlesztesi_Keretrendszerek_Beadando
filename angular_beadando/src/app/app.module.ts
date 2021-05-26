import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AddMedicationComponent } from './components/add-medication/add-medication.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GetMedicationComponent } from './components/get-medication/get-medication.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MedicationRequestComponent } from './components/medication-request/medication-request.component';
import { MedicationRequestDetailedComponent } from './components/medication-request-detailed/medication-request-detailed.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';

import {RegisterComponent} from './modules/user-management/register/register.component';
import {UserManagementModule} from './modules/user-management/user-management.module';
import { AttributeNameDirective } from './directives/attribute-name.directive';
import {LoginComponent} from './modules/user-management/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { UpdateMedicationComponent } from './components/update-medication/update-medication.component';
import {AuthguardService} from './services/authguard.service';


const appRoutes = [
  {path: '', component: HomeComponent},
  {path: 'getMedication', component: GetMedicationComponent, canActivate: [AuthguardService]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
];



@NgModule({
  declarations: [
    AppComponent,
    AddMedicationComponent,
    HomeComponent,
    GetMedicationComponent,
    MedicationRequestComponent,
    MedicationRequestDetailedComponent,
    AttributeNameDirective,
    UpdateMedicationComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    UserManagementModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
