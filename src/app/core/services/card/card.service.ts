import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { forkJoin, from, Observable, of, combineLatest } from 'rxjs';
import { Collections } from 'src/app/config/collections';
import { Card } from 'src/app/models/card';
import { User } from 'src/app/models/user';
import { DeckShareService } from '../deck-share/deck-share.service';
import { GenericDbService } from '../generic-db/generic-db.service';
import { UserShareService } from '../user-share/user-share.service';

@Injectable({
  providedIn: 'root'
})
export class CardService extends GenericDbService {
  constructor(
    private db: AngularFirestore,
    private deckShare: DeckShareService,
    private userShare: UserShareService
  ) {
    super();
  }

  /**
   * Creates a card.
   *
   * This method creates a card, while also "adding" this card to
   * the following collections:
   * 1. Cards collection
   * 2. Current user's collection
   * 3. Deck(s) collection, update each deck
   * @param card the Card to create
   */
  public create(card: Card, user: User): Observable<void[]> {
    const uid = this.db.createId();
    super.tagModel(card, user);
    card.uid = uid;
    const defaultWrites = [
      from(
        this.db
          .collection(Collections.Cards)
          .doc(uid)
          .set(card)
      ),
      this.userShare.addCardToUser(uid, user)
    ];
    if (card.decks && card.decks.size) {
      // for each deck the card is being added to, add the card to the deck.
      const deckUpdates = Array.from(card.decks.keys()).map(deckId =>
        this.deckShare.addCardToDeck({
          cardId: card.uid,
          deckId
        })
      );
      defaultWrites.push(...deckUpdates);
    }
    return forkJoin(defaultWrites);
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
   * Returns a list of all cards the user has access to
   * @param user the user to return the cards for
   */
  public list(params: { user: User }): Observable<Card[]> {
    const { user } = params;
    return combineLatest(
      user.cards
        ? Array.from(user.cards.keys()).map(cardId =>
            this.db
              .collection(Collections.Cards)
              .doc<Card>(cardId)
              .valueChanges()
          )
        : []
    );
  }
}
