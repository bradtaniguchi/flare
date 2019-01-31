import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { Collections } from 'src/app/config/collections';
import { GroupPermission } from 'src/app/models/group-permission';
import { RoleTypes } from 'src/app/config/roles';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupSecurityService {
  constructor(private db: AngularFirestore) {}

  public getUsersGroups(user: User): Observable<GroupPermission[]> {
    return this.db
      .collection<GroupPermission>(Collections.Permissions, ref =>
        ref.where('userId', '==', user.uid)
      )
      .valueChanges();
  }

  /**
   * Adds the given user to the given group
   * @param params general params
   */
  public join(params: { type?: RoleTypes; group: Group; user: User }) {
    const { type, group, user } = params;
    const uid = this.db.createId();
    const permission: GroupPermission = {
      createdBy: user.uid,
      groupId: group.uid,
      createdOn: new Date(),
      type: type || RoleTypes.Viewer,
      userId: user.uid,
      uid
    };
    return this.db
      .collection(Collections.Permissions)
      .doc(uid)
      .set(permission);
  }

  /**
   * Removes the given user from the given group
   * @param params general params
   */
  public async leave(params: { group: Group; user: User }) {
    const { group, user } = params;
    const batch = this.db.firestore.batch();
    const qs = await this.db
      .collection(Collections.Permissions, ref =>
        ref.where('groupId', '==', group.uid)
      )
      .ref.get();
    qs.forEach(doc => batch.delete(doc.ref));
    return batch.commit();
  }
}
