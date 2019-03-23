import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Group } from 'src/app/models/group';
import { GroupSecurityService } from 'src/app/core/services/group-security/group-security.service';

@Component({
  selector: 'app-group-card',
  template: `
    <mat-card class="margin-top-bottom">
      <mat-card-header fxLayout="row" fxLayoutAlign="end">
        <mat-icon mat-card-avatar class="center-icon icon"> group </mat-icon>
        <mat-card-title> {{ group.name }} </mat-card-title>
        <mat-card-subtitle>
          <div># of decks: {{ group.deckCount || 0 }}</div>
          <div># of users: {{ group.userCount || 0 }}</div>
        </mat-card-subtitle>
        <div class="card-action">
          <button mat-icon-button aria-label="menu" [matMenuTriggerFor]="menu">
            <mat-icon>more_vert</mat-icon>
          </button>
          <mat-menu #menu="matMenu">
            <button
              type="button"
              mat-menu-item
              *ngIf="canLeave()"
              (click)="leave.emit(group)"
            >
              Leave
            </button>
            <button
              type="button"
              mat-menu-item
              *ngIf="canInvite()"
              (click)="invite.emit(group)"
            >
              Invite
            </button>
            <button
              type="button"
              mat-menu-item
              *ngIf="canEdit()"
              (click)="addDeck.emit(group)"
            >
              Add Deck
            </button>
            <button
              type="button"
              mat-menu-item
              *ngIf="canEdit()"
              (click)="edit.emit(group)"
            >
              Edit
            </button>
          </mat-menu>
        </div>
      </mat-card-header>
      <mat-card-content>
        <p>{{ group.description }}</p>
      </mat-card-content>
      <mat-card-actions align="end">
        <button
          type="button"
          (click)="viewDecks.emit(group)"
          mat-button
          *ngIf="group.deckCount"
        >
          Decks
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupCardComponent implements OnInit {
  @Input() group: Group;
  @Output() leave = new EventEmitter();
  @Output() invite = new EventEmitter();
  @Output() addDeck = new EventEmitter();
  @Output() viewDecks = new EventEmitter();
  @Output() edit = new EventEmitter();
  constructor(private groupSecurity: GroupSecurityService) {}

  ngOnInit() {}

  public canLeave(): boolean {
    return true;
  }

  public canInvite(): boolean {
    // TODO
    return true;
  }

  public canEdit(): boolean {
    // TODO
    return true;
  }
}
