import { CreateCardForm } from 'src/app/modules/card-create/create-card-form';
import { Action } from '@ngrx/store';

export enum CardActionTypes {
  Create = '[Card] create'
}

export type CardActions = CreateCard;

export class CreateCard implements Action {
  readonly type = CardActionTypes.Create;
  constructor(public payload: CreateCardForm) {}
}
