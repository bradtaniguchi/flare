import { Injectable } from '@angular/core';
import { Deck, DeckId } from 'src/app/models/deck';
import { CardId } from 'src/app/models/card';
import { Observable, from } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Collections } from 'src/app/config/collections';
import { BareUid } from 'src/app/models/bare-uid';
import { GroupId } from 'src/app/models/group';

@Injectable({
  providedIn: 'root'
})
export class DeckShareService {
  private deckCollection: AngularFirestoreCollection<Deck>;
  constructor(private db: AngularFirestore) {
    this.deckCollection = this.db.collection<Deck>(Collections.Decks);
  }

  public addCardToDeck(params: {
    cardId: CardId;
    deckId: DeckId;
  }): Observable<void> {
    const { cardId, deckId } = params;
    return from(
      this.deckCollection
        .doc(deckId)
        .collection(Collections.Cards)
        .doc(cardId)
        .set({ uid: cardId } as BareUid)
    );
  }

  public addGroupToDeck(params: { groupId: GroupId; deckId: DeckId }) {
    const { groupId, deckId } = params;
    return from(
      this.deckCollection
        .doc(deckId)
        .collection(Collections.Groups)
        .doc(groupId)
        .set({ uid: groupId } as BareUid)
    );
  }
}
