import { Injectable } from '@angular/core';
import { UserId } from 'src/app/models/user';
import { Group, GroupId } from 'src/app/models/group';
import { DeckId } from 'src/app/models/deck';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { Collections } from 'src/app/config/collections';
import { BareUid } from 'src/app/models/bare-uid';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupShareService {
  private groupCollection: AngularFirestoreCollection<Group>;
  constructor(private db: AngularFirestore) {
    this.groupCollection = this.db.collection<Group>(Collections.Groups);
  }

  public addUserToGroup(params: { userId: UserId; groupId: GroupId }) {
    const { userId, groupId } = params;
    return from(
      this.groupCollection
        .doc(groupId)
        .collection(Collections.Users)
        .doc(userId)
        .set({ uid: userId } as BareUid)
    );
  }

  public addDeckToGroup(params: { deckId: DeckId; groupId: GroupId }) {
    const { deckId, groupId } = params;
    return from(
      this.groupCollection
        .doc(groupId)
        .collection(Collections.Users)
        .doc(deckId)
        .set({ uid: deckId } as BareUid)
    );
  }
}
