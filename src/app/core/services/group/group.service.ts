import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { Collections } from 'src/app/config/collections';
import { switchMap, tap } from 'rxjs/operators';
import { UserGroupsCollection } from 'src/app/models/user-groups-collection';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private db: AngularFirestore) {}

  /**
   * Returns all the groups the user has access too, according to their
   * groups sub-collection.
   * @param params general params
   */
  public list(params: { user: User; queryFn?: QueryFn }): Observable<Group[]> {
    const { user, queryFn } = params;
    // get all groups for the current user
    return this.db
      .collection(Collections.Users)
      .doc(user.uid)
      .collection<UserGroupsCollection>(Collections.Groups)
      .valueChanges()
      .pipe(
        switchMap(groupsCollection =>
          combineLatest(
            // always return the user's current default group
            this.getGroupById(user.uid).pipe(
              tap(group => console.log('test with getGroupById', group))
            ),
            // also, return all the groups the user has access to
            ...Object.keys(groupsCollection).map(groupId =>
              this.getGroupById(groupId, queryFn)
            )
          )
        )
      );
  }
  /**
   * Returns a single group, for the given id
   */
  private getGroupById(groupId: string, queryFn?: QueryFn): Observable<Group> {
    return this.db
      .collection(Collections.Groups, queryFn)
      .doc<Group>(groupId)
      .valueChanges();
  }
}
