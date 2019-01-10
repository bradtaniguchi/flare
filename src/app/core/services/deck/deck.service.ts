import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { forkJoin, Observable } from 'rxjs';
import { Collections } from 'src/app/config/collections';
import { Deck } from 'src/app/models/deck';
import { User } from 'src/app/models/user';
import { GenericDbService } from '../generic-db/generic-db.service';

@Injectable({
  providedIn: 'root'
})
export class DeckService extends GenericDbService {
  constructor(private db: AngularFirestore) {
    super();
  }

  /**
   * Creates a new deck, and adds references to the related groups, cards
   * @param deck the deck to create
   * @param user the user who is to creating the deck
   */
  public create(deck: Deck, user: User): Observable<any> {
    const uid = this.db.createId();
    super.tagModel(deck, user);
    deck.uid = uid;

    const groupRef = this.db.firestore
      .collection(Collections.Groups)
      .doc(deck.group);

    return forkJoin(
      this.db
        .collection(Collections.Decks)
        .doc(uid)
        .set(deck),
      this.db.firestore.runTransaction(async transaction => {
        const doc = await transaction.get(groupRef);
        transaction.update(groupRef, {
          // update deck count, add deck to decks sub-collection
          cardsCount: (doc.data() as Deck).cardsCount + 1,
          [`cards.${uid}`]: deck.uid
        });
      })
    );
  }
}
