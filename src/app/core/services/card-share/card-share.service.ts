import { Injectable } from '@angular/core';
import { CardId, Card } from 'src/app/models/card';
import { DeckId } from 'src/app/models/deck';
import { Observable, from } from 'rxjs';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { Collections } from 'src/app/config/collections';
import { BareUid } from 'src/app/models/bare-uid';
import { UserId } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class CardShareService {
  private cardCollection: AngularFirestoreCollection<Card>;
  constructor(private db: AngularFirestore) {
    this.cardCollection = this.db.collection<Card>(Collections.Cards);
  }

  public addDeckToCard(params: {
    deckId: DeckId;
    cardId: CardId;
  }): Observable<void> {
    const { deckId, cardId } = params;
    return from(
      this.cardCollection
        .doc(cardId)
        .collection(Collections.Decks)
        .doc(deckId)
        .set({ uid: deckId } as BareUid)
    );
  }

  public addUserToCard(params: {
    userId: UserId;
    cardId: CardId;
  }): Observable<void> {
    const { userId, cardId } = params;
    return from(
      this.cardCollection
        .doc(cardId)
        .collection(Collections.Users)
        .doc(userId)
        .set({ uid: userId } as BareUid)
    );
  }
}
