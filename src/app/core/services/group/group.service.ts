import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { combineLatest, forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Collections } from 'src/app/config/collections';
import { RoleTypes } from 'src/app/config/roles';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { CreateGroupForm } from 'src/app/modules/group-create/create-group-form';
import { GroupSecurityService } from '../group-security/group-security.service';
import { logger } from '../../logger';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(
    private db: AngularFirestore,
    private groupSecurity: GroupSecurityService
  ) {}

  /**
   * Creates a new group, and adds a reference to the current user
   * @param form the from to create a group from
   * @param user the user who is creating the deck
   */
  public create(form: CreateGroupForm, user: User) {
    const uid = this.db.createId();
    const group: Group = {
      name: form.name,
      description: form.description,
      createdBy: user.uid,
      private: true,
      createdOn: new Date(),
      uid
    };
    return forkJoin(
      this.db
        .collection(Collections.Groups)
        .doc(uid)
        .set(group),
      this.groupSecurity.join({
        type: RoleTypes.Admin,
        group,
        user
      })
    ).pipe(map(() => group));
  }

  public listUserGroups(params: {
    user: User;
    queryFn?: QueryFn;
  }): Observable<Group[]> {
    const { user, queryFn } = params;
    // get all groups for the current user
    // for now just return all groups!
    return this.groupSecurity.getUsersGroups(user).pipe(
      map(permissions =>
        permissions.map(permission => permission.groupId).filter(_ => _)
      ),
      switchMap(groupIds =>
        combineLatest(
          ...groupIds.map(groupId => this.getGroupById(groupId, queryFn))
        )
      )
    );
  }
  /**
   * Returns all groups with query function.
   * @param params general params
   */
  public list(params: { user: User; queryFn?: QueryFn }): Observable<Group[]> {
    const { user, queryFn } = params;
    return queryFn
      ? this.db.collection<Group>(Collections.Groups, queryFn).valueChanges()
      : this.db
          .collection<Group>(Collections.Groups, ref =>
            ref.where('private', '==', false)
          )
          .valueChanges();
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
