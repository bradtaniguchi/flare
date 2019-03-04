import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { forkJoin, Observable, of, from } from 'rxjs';
import { Collections } from 'src/app/config/collections';
import { Deck } from 'src/app/models/deck';
import { User } from 'src/app/models/user';
import { GenericDbService } from '../generic-db/generic-db.service';
import { CreateDeckForm } from 'src/app/modules/deck-create/create-deck-form';
import { map, mergeMap, tap, mapTo } from 'rxjs/operators';
import { CardService } from '../card/card.service';
import { CreateCardForm } from 'src/app/modules/card-create/create-card-form';

@Injectable({
  providedIn: 'root'
})
export class DeckService extends GenericDbService {
  constructor(private db: AngularFirestore, private card: CardService) {
    super();
  }

  public update(deck: Deck): Observable<Deck> {
    return from(
      this.db
        .collection(Collections.Decks)
        .doc(deck.uid)
        .update(deck)
    ).pipe(mapTo(deck));
  }
  /**
   * Creates a new deck, and adds references to the related groups, cards
   * @param deck the deck to create
   * @param user the user who is to creating the deck
   */
  public create(form: CreateDeckForm, user: User): Observable<Deck> {
    const uid = this.db.createId();
    const deck: Deck = {
      name: form.name,
      description: form.description,
      createdBy: user.uid,
      createdOn: new Date(),
      group: form.group.uid,
      uid
    };
    const cardForms = form.cards.map(
      cardForm => ({ ...cardForm, deck } as CreateCardForm)
    );

    return from(this.card.createBulk(cardForms, user)).pipe(
      tap(cards => {
        const cardIds = cards.reduce(
          (cardIds, card) => {
            cardIds[card.uid] = true;
            return cardIds;
          },
          {} as { [key: string]: true }
        );
        deck.cards = cardIds;
      }),
      mergeMap(() =>
        forkJoin(
          this.db
            .collection(Collections.Decks)
            .doc(uid)
            .set(deck),
          this.db
            .collection(Collections.Groups)
            .doc(deck.group)
            .update({ [`decks.${uid}`]: uid })
        )
      ),
      map(() => deck)
    );
    // return forkJoin(
    //   this.db
    //     .collection(Collections.Decks)
    //     .doc(uid)
    //     .set(deck),
    //   this.db
    //     .collection(Collections.Groups)
    //     .doc(deck.group)
    //     .update({ [`decks.${uid}`]: uid })
    //   // this.card.createBulk(cardForms, user)
    // ).pipe(map(() => deck));
  }

  /**
   * Returns a list of all the decks the user has access too.
   * If no query function is passed we return an empty array
   * @param params general params
   */
  public list(params: { user: User; queryFn?: QueryFn }): Observable<Deck[]> {
    const { user, queryFn } = params;
    return !!queryFn
      ? this.db.collection<Deck>(Collections.Decks, queryFn).valueChanges()
      : of([]);
  }

  /**
   * Returns an observable of the given deck within firestore.
   * @param params general params
   */
  public get(params: { deckId: string; user: User }): Observable<Deck> {
    const { user, deckId } = params;
    return this.db
      .collection<Deck>(Collections.Decks)
      .doc<Deck>(deckId)
      .valueChanges();
  }
}
