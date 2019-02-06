import { Action } from '@ngrx/store';
import { Card } from 'src/app/models/card';
import { CreateCardForm } from 'src/app/modules/card-create/create-card-form';

export enum CardActionTypes {
  Create = '[Card] create',
  CreateSuccess = '[Card] createSuccess',
  CreateFailed = '[Card] createFailed',
  // // search
  // UpdateSearchedCards = '[Card] UpdateSearchedCards',
  // UpdateSearchCardsFailed = '[Card] searchFailed',
  // get cards for a given deck
  Get = '[Card] get',
  GetSuccess = '[Card] getSuccess',
  GetFailed = '[Card] getFailed'
}

export type CardActions =
  | CreateCard
  | CreateCardSuccess
  | CreateCardFailed
  // search
  // | UpdateSearchedCards
  // | UpdateSearchCardsFailed
  // gets cards for a given deck
  | GetCards
  | GetCardsSuccess
  | GetCardsFailed;

export class CreateCard implements Action {
  readonly type = CardActionTypes.Create;
  constructor(public payload: CreateCardForm) {}
}
export class CreateCardSuccess implements Action {
  readonly type = CardActionTypes.CreateSuccess;
  constructor(public payload: Card) {}
}
export class CreateCardFailed implements Action {
  readonly type = CardActionTypes.CreateFailed;
}

// search
// export class SearchCards implements Action {
//   readonly type = CardActionTypes.Search;
//   constructor(
//     public payload: {
//       queryFn?: QueryFn;
//       deckId?: string;
//     }
//   ) {}
// }
// export class UpdateSearchedCards implements Action {
//   readonly type = CardActionTypes.UpdateSearchedCards;
//   constructor(public payload: Card[]) {}
// }

// export class UpdateSearchCardsFailed implements Action {
//   readonly type = CardActionTypes.SearchFailed;
// }

export class GetCards implements Action {
  readonly type = CardActionTypes.Get;
  /**
   * @param payload The deckId
   */
  constructor(public payload: string) {}
}

export class GetCardsSuccess implements Action {
  readonly type = CardActionTypes.GetSuccess;
  constructor(public payload: Card[]) {}
}
export class GetCardsFailed implements Action {
  readonly type = CardActionTypes.GetFailed;
}
