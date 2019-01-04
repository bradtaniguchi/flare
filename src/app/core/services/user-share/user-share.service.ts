import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { User } from 'src/app/models/user';
import { DeckId } from 'src/app/models/deck';
import { Observable, from } from 'rxjs';
import { CardId } from 'src/app/models/card';
import { Collections } from 'src/app/config/collections';
import { BareUid } from 'src/app/models/bare-uid';
import { GroupId } from 'src/app/models/group';

/**
 * Utility service that provides common methods to "add"
 * security to a user. This should be called when creating or sharing
 * things.
 */
@Injectable({
  providedIn: 'root'
})
export class UserShareService {
  private userCollection: AngularFirestoreCollection<User>;
  constructor(private db: AngularFirestore) {
    this.userCollection = this.db.collection<User>(Collections.Users);
  }

  public addCardToUser(cardId: CardId, user: User): Observable<void> {
    return from(
      this.userCollection
        .doc(user.uid)
        .collection(Collections.Cards)
        .doc(cardId)
        .set({ uid: cardId } as BareUid)
    );
  }

  public addDeckToUser(deckId: DeckId, user: User): Observable<void> {
    return from(
      this.userCollection
        .doc(user.uid)
        .collection(Collections.Decks)
        .doc(deckId)
        .set({ uid: deckId } as BareUid)
    );
  }

  public addGroupToUser(groupId: GroupId, user: User): Observable<void> {
    return from(
      this.userCollection
        .doc(user.uid)
        .collection(Collections.Groups)
        .doc(groupId)
        .set({ uid: groupId } as BareUid)
    );
  }
}
