import { Action } from '@ngrx/store';
import { Deck } from 'src/app/models/deck';
import { Card } from 'src/app/models/card';

export enum DeckStudyActionTypes {
  // main setup/tear down actions
  INIT = '[DeckStudy] INIT',
  CLEAR = '[DeckStudy] CLEAR',

  // select the card to study
  SELECT = '[DeckStudy] SELECT',
  FLIP = '[DeckStudy] DECK',

  // card related actions
  SKIP = '[DeckStudy] SKIP',
  CORRECT = '[DeckStudy] CORRECT',
  INCORRECT = '[DeckStudy] MISSED'
}

export type DeckStudyActions =
  | InitDeckStudy
  | ClearDeckStudy
  | SelectCard
  | FlipCard
  | SkipCard
  | GotCardIncorrect
  | GotCardCorrect;

export class InitDeckStudy implements Action {
  readonly type = DeckStudyActionTypes.INIT;
  constructor(
    public payload: {
      deck: Deck;
      cards: Card[];
    }
  ) {}
}

export class ClearDeckStudy implements Action {
  readonly type = DeckStudyActionTypes.CLEAR;
}

export class SelectCard implements Action {
  readonly type = DeckStudyActionTypes.SELECT;
  constructor(public payload: string) {}
}

export class FlipCard implements Action {
  readonly type = DeckStudyActionTypes.FLIP;
  constructor(public payload: string) {}
}
export class SkipCard implements Action {
  readonly type = DeckStudyActionTypes.SKIP;
  constructor(public payload?: string) {}
}

export class GotCardIncorrect implements Action {
  readonly type = DeckStudyActionTypes.INCORRECT;
  constructor(public payload?: string) {}
}

export class GotCardCorrect implements Action {
  readonly type = DeckStudyActionTypes.CORRECT;
  constructor(public payload?: string) {}
}
