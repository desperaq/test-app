import { Component, OnInit, Input, Output, EventEmitter, NgZone, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Card } from './card';
import { WebSocketService } from 'src/app/services/ws.service';
import { CardService } from './card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  card: Card;
  @Output() cardUpdate: EventEmitter<Card>;
  editingCard = false;
  currentTitle: string;
  zone: NgZone;

  constructor(
    private el: ElementRef,
    private _ref: ChangeDetectorRef,
    private _ws: WebSocketService,
    private _cardService: CardService
  ) {
    this.zone = new NgZone({enableLongStackTrace: false});
    this.cardUpdate = new EventEmitter();
   }

  ngOnInit() {
    this._ws.onCardUpdate.subscribe((card: Card) => {
      if(this.card._id === card._id){
        this.card.name = card.name;
        this.card.order = card.order;
        this.card.listId = card.listId;
      } 
    });
  }

  blurOnEnter(event) {
      if(event.keyCode === 13) {
        event.target.blur();
      }
      else if(event.keyCode === 27) {
        this.card.name = this.currentTitle;
        this.editingCard = false;
      }
  }

  editCard() {
    this.editingCard = true;
    this.currentTitle = this.card.name;

    let textArea = this.el.nativeElement.getElementByTagName('textarea')[0];

    setTimeout(function() {
      textArea.focus();
    }, 0);
  }

  updateCard() {
    if (!this.card.name || this.card.name.trim() === '') {
      this.card.name = this.currentTitle;
    }

    this._cardService.put(this.card).then(res => {
      this._ws.updateCard(this.card.boardId, this.card);
    });
    this.editingCard = false;
  }


}
