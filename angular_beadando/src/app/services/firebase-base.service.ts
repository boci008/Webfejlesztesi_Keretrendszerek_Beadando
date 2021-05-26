import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {BehaviorSubject, forkJoin, from, Observable, of} from 'rxjs';
import { MedicationRequest } from '../model/MedicationRequest';
import * as firebase from 'firebase';
import {User} from '../model/User';
import {filter, map, mergeMap, take, tap} from 'rxjs/operators';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseBaseService {

  constructor(private afs: AngularFirestore) { }

  addUser(data: User, id?: string): Observable<string> {
    const user: User = data;
    const uid = id ? id : this.afs.createId();
    bcrypt.hash(user.password, 10).then(passwordhash => {
      user.password = passwordhash;
      user.id = uid;
      this.afs.collection('User').doc(uid).set(user);
    });
    return from(uid);
  }

  addMedication(data: MedicationRequest, id?: string): Observable<string> {
    const uid = id ? id : this.afs.createId();
    data.id = uid;
    /*let a = async ():Promise<void> => {
      let r = await this.afs.collection(collectionName).doc(uid).set(data);
      return r;
    }
    ret = from(a);*/ // promise-bol observable
    this.afs.collection('MedicationRequest').doc(uid).set(data);
    return from(uid);
  }

  private getUsers(): Observable<User[]> {
    const users: User[] = [];
    const ret: Promise<User[]> = this.afs
      .collection('User')
      .ref
      .get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const m: User = doc.data() as User;
        users.push(m);
      });
      return users;
    });
    return from(ret);
  }

  public hasUser(username: string): Observable<boolean> {
    return this.getUsers().pipe(map(u => u.some(user => user.username === username)));
  }

  public isDetailsOk(username: string, password: string): Observable<boolean> {
    return this.getUsers().pipe(
      map(user => user.find(u => u.username === username)),
      mergeMap(user => {
        return from(
          bcrypt.compare(password, user?.password ?? '')
        );
      }),
      /*tap(b => console.log(b)),*/
    );
  }

  public getMedication(): Observable<MedicationRequest[]> { // https://stackoverflow.com/questions/61574174/how-to-map-firestore-data-to-typescript-interface-in-ionic-angular-app
    const obs: Observable<MedicationRequest[]> = from(this.afs
      .collection('MedicationRequest')
      .ref
      .get().then((querySnapshot) => {
        const meds: MedicationRequest[] = [];
        querySnapshot.forEach((doc) => {
          const m: MedicationRequest = doc.data() as MedicationRequest;
          interface Timestamp {
            seconds: number;
            nanoseconds: number;
          }
          if (m.authoredOn !== undefined) {
            const timestamp: Timestamp = (m.authoredOn as unknown) as Timestamp;
            m.authoredOn = new Date(timestamp.seconds * 1000);
            // console.log(m.authoredOn);
          }
          meds.push(m);
        });
        meds.sort((a, b) => {
          return (a.authoredOn !== undefined && b.authoredOn !== undefined) ? b.authoredOn.getTime() - a.authoredOn.getTime() : -1;
        });
        return meds;
      }));
    return obs;
  }

  public update(collectionName: string, id: string, data: any): Observable<void> {
    return from(this.afs.collection(collectionName).doc(id).update(data));
  }

  public delete(collectionName: string, id: string): Observable<void> {
    return from(this.afs.collection(collectionName).doc(id).delete());
  }




}
