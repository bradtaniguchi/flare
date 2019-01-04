import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { forkJoin, from, Observable } from 'rxjs';
import { Collections } from 'src/app/config/collections';
import { BareUid } from 'src/app/models/bare-uid';
import { Card, CardId } from 'src/app/models/card';
import { Deck, DeckId } from 'src/app/models/deck';
import { Group, GroupId } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { GenericDbService } from '../generic-db/generic-db.service';
import { UserShareService } from '../user-share/user-share.service';
import { DeckShareService } from '../deck-share/deck-share.service';
import { CardShareService } from '../card-share/card-share.service';
import { GroupShareService } from '../group-share/group-share.service';

@Injectable({
  providedIn: 'root'
})
export class DeckService extends GenericDbService {
  constructor(
    private db: AngularFirestore,
    private userShare: UserShareService,
    private cardShare: CardShareService,
    private groupShare: GroupShareService
  ) {
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
    const defaultWrites = [
      from(
        this.db
          .collection(Collections.Decks)
          .doc(uid)
          .set(deck)
      ),
      // update the user so they have access to this deck
      this.userShare.addDeckToUser(uid, user)
    ];
    if (deck.cards && deck.cards.size) {
      // update the cards
      const cards = Array.from(deck.cards.keys());
      const cardUpdates = cards.map(cardId =>
        this.cardShare.addDeckToCard({
          deckId: deck.uid,
          cardId
        })
      );
      defaultWrites.push(...cardUpdates);

      // update the users, that now have access to the cards
      const userUpdates = cards.map(cardId =>
        this.userShare.addCardToUser(cardId, user)
      );
      defaultWrites.push(...userUpdates);
    }
    if (deck.groups && deck.groups.size) {
      // update the groups so they have access to this deck
      const groupUpdates = Array.from(deck.groups.keys()).map(groupId =>
        // this.addDeckToGroup(deck, groupId)
        this.groupShare.addDeckToGroup({
          deckId: deck.uid,
          groupId
        })
      );
      defaultWrites.push(...groupUpdates);
    }
    return forkJoin(defaultWrites);
  }
}
