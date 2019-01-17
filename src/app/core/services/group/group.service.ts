import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';
import { Observable, combineLatest, of } from 'rxjs';
import { Group } from 'src/app/models/group';
import { Collections } from 'src/app/config/collections';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private db: AngularFirestore) {}

  public list(params: { user: User }): Observable<Group[]> {
    const { user } = params;
    const groups = Object.keys(user.groups || {});
    const groups$ = groups.map(groupId =>
      this.db
        .collection(Collections.Groups)
        .doc<Group>(groupId)
        .valueChanges()
    );
    return groups.length ? combineLatest(groups$) : of([]);
  }
}
