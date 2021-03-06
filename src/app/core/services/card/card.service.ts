import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
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

  private createCardFromForm(form: CreateCardForm, user: User): Card {
    return {
      front: form.front,
      back: form.back,
      createdBy: user.uid,
      createdOn: new Date(),
      deck: form.deck ? form.deck.uid : undefined,
      uid: this.db.createId()
    };
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
    // const uid = this.db.createId();
    const card: Card = this.createCardFromForm(form, user);
    const uid = card.uid;
    return forkJoin(
      // create the actual card
      this.db
        .collection(Collections.Cards)
        .doc(uid)
        .set(card),
      this.db
        .collection(Collections.Decks)
        .doc(card.deck)
        .update({ [`cards.${uid}`]: uid })
    ).pipe(map(() => card));
  }

  public createBulk(forms: CreateCardForm[], user: User): Observable<Card[]> {
    const { batch, cards } = forms.reduce(
      (acc, form) => {
        const { batch, cards } = acc;
        const card = this.createCardFromForm(form, user);
        const uid = card.uid;
        const ref = this.db.firestore.collection(Collections.Cards).doc(uid);

        batch.set(ref, card);
        cards.push(card);
        return acc;
      },
      {
        batch: this.db.firestore.batch(),
        cards: [] as Card[]
      }
    );
    return from(batch.commit()).pipe(map(() => cards));
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

  public search(params: { queryFn: QueryFn }): Observable<Card[]> {
    const { queryFn } = params;
    return this.db.collection<Card>(Collections.Cards, queryFn).valueChanges();
  }
  /**
   * Loads the "recent" cards for a given user
   * @deprecated
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
