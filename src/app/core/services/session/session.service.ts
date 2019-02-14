import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  QueryFn,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Session } from 'src/app/models/session';
import { User } from 'src/app/models/user';
import { Deck } from 'src/app/models/deck';
import { forkJoin, Observable } from 'rxjs';
import { Collections } from 'src/app/config/collections';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionCollection: AngularFirestoreCollection<Session>;
  constructor(private db: AngularFirestore) {
    this.sessionCollection = this.db.collection(Collections.Sessions);
  }

  public create(params: {
    deck: Deck;
    correct: string[];
    missed: string[];
    skipped: string[];
    user: User;
  }): Observable<Session> {
    const { deck, correct, missed, skipped, user } = params;
    const uid = this.db.createId();
    const session: Session = {
      correct,
      skipped,
      missed,
      deck: deck.uid,
      group: deck.group,
      createdBy: user.uid,
      createdOn: new Date(),
      uid
    };
    return forkJoin(this.sessionCollection.doc(uid).set(session)).pipe(
      map(() => session)
    );
  }

  public list(queryFn: QueryFn): Observable<Session[]> {
    return this.db
      .collection<Session>(Collections.Sessions, queryFn)
      .valueChanges();
  }
}
