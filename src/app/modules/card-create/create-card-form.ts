import { Deck } from 'src/app/models/deck';

export interface CreateCardForm {
  front: string;
  back: string;
  deck: Deck;
}
