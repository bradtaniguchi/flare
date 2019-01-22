import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { forkJoin, from, Observable, combineLatest, of } from 'rxjs';
import { Collections } from 'src/app/config/collections';
import { Card } from 'src/app/models/card';
import { Deck } from 'src/app/models/deck';
import { User } from 'src/app/models/user';
import { GenericDbService } from '../generic-db/generic-db.service';
import { CreateCardForm } from 'src/app/modules/card-create/create-card-form';
import { switchMap, map } from 'rxjs/operators';

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
  public create(form: CreateCardForm, user: User): Observable<Card> {
    const uid = this.db.createId();
    const card: Card = {
      front: form.front,
      back: form.back,
      createdBy: user.uid,
      createdOn: new Date(),
      deck: form.deck ? form.deck.uid : undefined,
      uid
    };
    super.tagModel(card, user);
    card.uid = uid;
    return forkJoin(
      // create the actual card
      this.db
        .collection(Collections.Cards)
        .doc(uid)
        .set(card),
      this.db
        .collection(Collections.Decks)
        .doc(card.deck)
        .update({ [`decks.${uid}`]: uid })
    ).pipe(map(() => card));
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
  public listRecent(params: {
    user: User;
    /**
     * The limit of cards we are to show, defaults to 5
     */
    limit?: number;
  }): Observable<Card[]> {
    const { user, limit } = params;
    return this.db
      .collection(Collections.Users)
      .doc(user.uid)
      .collection(Collections.Cards, ref => ref.limit(limit || 5))
      .valueChanges()
      .pipe(
        switchMap(recentCards =>
          recentCards.length
            ? combineLatest(
                Object.keys(recentCards).map(cardId =>
                  this.db
                    .collection(Collections.Cards)
                    .doc<Card>(cardId)
                    .valueChanges()
                )
              )
            : of([])
        )
      );
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
