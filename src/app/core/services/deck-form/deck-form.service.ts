import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Deck } from 'src/app/models/deck';

@Injectable({
  providedIn: 'root'
})
export class DeckFormService {
  constructor(private fb: FormBuilder) {}

  public form(deck?: Deck): FormGroup {
    if (!deck) {
      return this.fb.group({
        name: this.fb.control('', [Validators.required]),
        description: this.fb.control(''),
        group: this.fb.control(undefined, [Validators.required]),
        cards: this.fb.array([this.cardForm()])
      });
    }
    const cards = !!deck.cards
      ? Object.values(deck.cards).map(card => this.cardForm())
      : [this.cardForm()];
    return this.fb.group({
      name: this.fb.control('', [Validators.required]),
      description: this.fb.control(''),
      group: this.fb.control(undefined, [Validators.required]),
      cards: this.fb.array([cards])
    });
  }

  public cardForm(): FormGroup {
    return this.fb.group({
      front: this.fb.control('', [Validators.required]),
      back: this.fb.control('', [Validators.required])
    });
  }
}
