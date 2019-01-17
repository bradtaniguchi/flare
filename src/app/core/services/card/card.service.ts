import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { forkJoin, from, Observable, combineLatest, of } from 'rxjs';
import { Collections } from 'src/app/config/collections';
import { Card } from 'src/app/models/card';
import { Deck } from 'src/app/models/deck';
import { User } from 'src/app/models/user';
import { GenericDbService } from '../generic-db/generic-db.service';
import { CreateCardForm } from 'src/app/modules/card-create/create-card-form';

@Injectable({
  providedIn: 'root'
})
export class CardService extends GenericDbService {
  constructor(private db: AngularFirestore) {
    super();
  }

  /**
   * Creates a card.
   *
   * This method creates a card, while also "adding" this card to
   * the following collections:
   * 1. Cards collection - adds the card
   * 2. Deck collection - updates the number of cards for the deck
   * @param form the raw form data to create a card from
   * @param user the user that is creating the card
   */
  public create(form: CreateCardForm, user: User): Observable<void[]> {
    const uid = this.db.createId();
    const card: Card = {
      front: form.front,
      back: form.back,
      createdBy: user.uid,
      createdOn: new Date(),
      deck: form.deck ? form.deck.uid : undefined,
      tags: [],
      uid
    };
    super.tagModel(card, user);
    card.uid = uid;
    const deckRef = this.db.firestore
      .collection(Collections.Decks)
      .doc(card.deck);

    return forkJoin(
      // TODO: update recent cards for user
      this.db
        .collection(Collections.Cards)
        .doc(uid)
        .set(card),
      this.db.firestore.runTransaction(async transaction => {
        const doc = await transaction.get(deckRef);
        transaction.update(deckRef, {
          // update card count, add card to cards sub-collection
          cardsCount: (doc.data() as Deck).cardsCount + 1,
          [`cards.${uid}`]: card.uid
        });
      })
    );
  }

  public update(card: Partial<Card>): Observable<any> {
    const uid = card.uid;
    return from(
      this.db
        .collection(Collections.Cards)
        .doc(uid)
        .update(card)
    );
  }

  /**
   * Loads the "recent" cards for a given user
   * @param params general params
   */
  public listRecent(params: { user: User }): Observable<Card[]> {
    const { user } = params;
    const recentCards = Object.keys(user.recentCards || {});
    const cards$ = recentCards.map(cardId =>
      this.db
        .collection(Collections.Cards)
        .doc<Card>(cardId)
        .valueChanges()
    );
    return recentCards.length ? combineLatest(cards$) : of([]);
  }

  /**
   * Returns a list of all cards the user has access to
   * @param user the user to return the cards for
   */
  // public list(params: { user: User }): Observable<Card[]> {
  //   const { user } = params;
  //   return combineLatest(
  //     user.cards
  //       ? Array.from(user.cards.keys()).map(cardId =>
  //           this.db
  //             .collection(Collections.Cards)
  //             .doc<Card>(cardId)
  //             .valueChanges()
  //         )
  //       : []
  //   );
  // }
}
