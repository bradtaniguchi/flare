import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest, from, Observable } from 'rxjs';
import { map, mergeMap, mapTo } from 'rxjs/operators';
import { Collections } from 'src/app/config/collections';
import { Deck } from 'src/app/models/deck';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { logger } from '../../logger';
import { GenericDbService } from '../generic-db/generic-db.service';
import { GroupPermission } from 'src/app/models/group-permission';
import { RoleTypes } from 'src/app/config/roles';

/**
 * The createUserResponse interface represents
 * what the user should be created as.
 */
export interface CreateUserResponse {
  newUser: boolean;
  user: firebase.User;
}
@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericDbService {
  constructor(private db: AngularFirestore) {
    super();
  }

  /**
   * Creates a new user, should be called when first logging into the app.
   * Security should prevent user's from being created again.
   * @param user the user to create
   */
  public create(user: firebase.User): Observable<CreateUserResponse> {
    return this.db
      .collection(Collections.Users)
      .doc(user.uid)
      .get()
      .pipe(
        map(document => document.exists),
        mergeMap<boolean, any>(exists =>
          exists ? this.updateReturning(user) : this.writeDefaults(user)
        )
      );
  }

  /**
   * Creates a basic search,
   * @param userName the name to start checking with
   */
  public startSearch(userName: string): Observable<User[]> {
    return this.db
      .collection<User>(Collections.Users, ref =>
        ref.where('_displayName', '>', userName).limit(5)
      )
      .valueChanges();
  }
  /**
   * Updates a returning user, returns the user
   * @param user the user that is a returning user
   */
  private updateReturning(user: firebase.User): Observable<CreateUserResponse> {
    return from(
      this.db
        .collection(Collections.Users)
        .doc(user.uid)
        .set({
          uid: user.uid,
          displayName: user.displayName,
          _displayName: user.displayName.toLowerCase(),
          email: user.email,
          photoURL: user.photoURL,
          lastLoggedInOn: new Date()
        } as User)
    ).pipe(
      mapTo({
        newUser: false,
        user
      } as CreateUserResponse)
    );
  }

  /**
   * Creates the "defaults" for a given user
   * @param user the user we are to create within our database
   */
  private writeDefaults(user: firebase.User): Observable<CreateUserResponse> {
    logger.log('writing defaults, as user is new');
    const createdOn = new Date();
    return combineLatest([
      this.db
        .collection(Collections.Users)
        .doc(user.uid)
        .set({
          uid: user.uid,
          displayName: user.displayName,
          _displayName: user.displayName.toLowerCase(),
          email: user.email,
          photoURL: user.photoURL,
          createdOn
        } as User),
      this.db
        .collection(Collections.Groups)
        .doc(user.uid)
        .set({
          name: 'Your group',
          description: 'This is your private group',
          createdBy: user.uid,
          createdOn,
          private: true,
          default: true,
          uid: user.uid,
          deckCount: 1,
          userCount: 1
        } as Group),
      this.db.collection(Collections.Permissions).add({
        createdBy: user.uid,
        createdOn,
        groupId: user.uid,
        userId: user.uid,
        type: RoleTypes.Admin
      } as GroupPermission),
      this.db
        .collection(Collections.Decks)
        .doc(user.uid)
        .set({
          name: 'Default Deck',
          description: 'This is the default deck for the group',
          createdBy: user.uid,
          createdOn: new Date(),
          default: true,
          uid: user.uid,
          group: user.uid
        } as Deck)
    ]).pipe(
      mapTo({
        newUser: true,
        user
      } as CreateUserResponse)
    );
  }
}
