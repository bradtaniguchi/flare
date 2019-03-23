import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Collections } from 'src/app/config/collections';
import { RoleTypes } from 'src/app/config/roles';
import { Group } from 'src/app/models/group';
import { GroupPermission } from 'src/app/models/group-permission';
import { User } from 'src/app/models/user';
@Injectable({
  providedIn: 'root'
})
export class GroupSecurityService {
  constructor(private db: AngularFirestore) {}

  public getUsersGroups(user: User): Observable<GroupPermission[]> {
    return user
      ? this.db
          .collection<GroupPermission>(Collections.Permissions, ref =>
            ref.where('userId', '==', user.uid)
          )
          .valueChanges()
      : of([]);
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

  /**
   * Utiility method that returns the first permission matching
   * the given group.
   * @param params general params
   */
  private getPermission(
    params: CommonPermissionParams
  ): GroupPermission | undefined {
    const { permissions, group } = params;
    const groupId = typeof group === 'string' ? group : group.uid;
    return permissions.find(permission => permission.groupId === groupId);
  }

  /**
   * If the user can leave the given group, according to their permissions.
   * Returns true if the user has any permissions within the group
   * @param params general params
   */
  public canLeave(params: CommonPermissionParams): boolean {
    return !!this.getPermission(params);
  }

  /**
   * If the user can edit cards, only admins and editors can do this
   * @param params general params
   */
  public canEditCards(params: CommonPermissionParams): boolean {
    const permission = this.getPermission(params);
    return (
      permission &&
      (permission.type === RoleTypes.Admin ||
        permission.type === RoleTypes.Editor)
    );
  }

  /**
   * If the user is an admin
   * @param params general params
   */
  public isAdmin(params: CommonPermissionParams): boolean {
    const permission = this.getPermission(params);
    return permission && permission.type === RoleTypes.Admin;
  }
}

export interface CommonPermissionParams {
  /**
   * The permissions the user has, that we are checking against
   */
  permissions: GroupPermission[];
  /**
   * The group we are checking against
   */
  group: Group | string;
}
