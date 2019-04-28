import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Board } from './board';
import { WebSocketService } from 'src/app/services/ws.service';
import { BoardService } from './board.service';
import { ListService } from '../list/list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { List } from '../list/list';
import { Card } from '../card/card';
import { CardService } from '../card/card.service';

declare var jQuery: any;
var curYPos = 0,
    curXPos = 0,
    curDown = false;
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  board: Board;
  addingColumn = false;
  addColumnText: string;
  editingTitle = false;
  currentTitle: string;
  boardWidth: number;
  columnsAdded: number = 0;
  constructor(
    public el: ElementRef,
    private _ws: WebSocketService,
    private _boardService: BoardService,
    private _listService: ListService,
    private _cardService: CardService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._boardService.getAll().subscribe(
      res => console.log(res)
    )
    this._ws.connect();
    this._ws.onListAdd.subscribe(list =>{
      console.log('adding list from server');
      this.board.lists.push(list);
    });

    this._ws.onCardAdd.subscribe(card => {
      console.log('adding card from server');
      this.board.cards.push(card);
    });

    let boardId = this._route.snapshot.params['id'];
    this.getColumns();
    this.getCards();
    this.setupView();
  }

  getColumns() {
    this._listService.getAll().subscribe(
      data => {this.board.lists = data}
    )
  }

  getCards() {
    this._cardService.getAll().subscribe(
      data => {this.board.cards.push(data)}
    )
  }

  ngOnDestroy(){
    console.log(`leaving board ${this.board._id}`);
    this._ws.leave(this.board._id);
  }

  setupView() {
    let component = this;
    setTimeout(function () {
      var startColumn;
      jQuery('#main').sortable({
        items: '.sortable-column',
        handler: '.header',
        connectWith: "#main",
        placeholder: "column-placeholder",
        dropOnEmpty: true,
        tolerance: 'pointer',
        start: function (event, ui) {
          ui.placeholder.height(ui.item.find('.column').outerHeight());
          startColumn = ui.item.parent();
        },
        stop: function (event, ui) {
          var columnId = ui.item.find('.column').attr('column-id');

          component.updateColumnOrder({
            columnId: columnId
          });
        }
      }).disableSelection();

      window.addEventListener('resize', function (e) {
        component.updateBoardWidth();
      });
      component.updateBoardWidth();
      document.getElementById('content-wrapper').style.backgroundColor = '';
    }, 100);
  }


  updateBoardWidth() {
    this.boardWidth = ((this.board.lists.length + 1)* 280)+10;

    if(this.boardWidth > document.body.scrollWidth) {
      document.getElementById('main').style.width = this.boardWidth + 'px';
    } else {
      document.getElementById('main').style.width = '100%';
    }

    if(this.columnsAdded > 0) {
      let wrapper = document.getElementById('content-wrapper');
      wrapper.scrollLeft = wrapper.scrollWidth;
    }
    this.columnsAdded++;
  }

  updateBoard() {
    if (this.board.title && this.board.title.trim() !== '') {
      this._boardService.put(this.board);
    } else {
      this.board.title = this.currentTitle;
    }
    this.editingTitle = false;
    document.title = this.board.title + " | Generic Task Manager";
  }

  editTitle() {
    this.currentTitle = this.board.title;
    this.editingTitle = true;

    let input = this.el.nativeElement
      .getElementsByClassName('board-title')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function () { input.focus(); }, 0);
  }

  updateColumnElements(column: List) {
    let columnArr = jQuery('#main .column');
    let columnEl = jQuery('#main .column[columnid=' + column._id + ']');
    let i = 0;
    for (; i < columnArr.length - 1; i++) {
      column.order < +columnArr[i].getAttibute('column-order');
      break;
    }

    columnEl.remove().insertBefore(columnArr[i]);
  }

  updateColumnOrder(event) {
    let i: number = 0,
      elBefore: number = -1,
      elAfter: number = -1,
      newOrder: number = 0,
      columnEl = jQuery('#main'),
      columnArr = columnEl.find('.column');

    for (i = 0; i < columnArr.length - 1; i++) {
      if (columnEl.find('.column')[i].getAttribute('column-id') == event.columnId) {
        break;
      }
    }

    if (i > 0 && i < columnArr.length - 1) {
      elBefore = +columnArr[i - 1].getAttribute('column-order');
      elAfter = +columnArr[i + 1].getAttribute('column-order');

      newOrder = elBefore + ((elAfter - elBefore) / 2);
    }
    else if (i == columnArr.length - 1) {
      elBefore = +columnArr[i - 1].getAttribute('column-order');
      newOrder = elBefore + 1000;
    } else if (i == 0) {
      elAfter = +columnArr[i + 1].getAttribute('column-order');

      newOrder = elAfter / 2;
    }

    let column = this.board.lists.filter(x => x._id === event.columnId)[0];
    column.order = newOrder;
    this._listService.put(column).then(res => {
      this._ws.updateList(this.board._id, column);
    });
  }

  blurOnEnter(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    }
  }

  enableAddColumn() {
    this.addingColumn = true;
    let input = jQuery('.add-column')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function () { input.focus(); }, 0);
  }

  addColumn() {
    let newColumn = <List>{
      title: this.addColumnText,
      order: (this.board.lists.length + 1) * 1000,
      boardId: this.board._id
    };
    this._listService.post(newColumn)
      .subscribe(column => {
        this.board.lists.push(column)
        console.log('column added');
        this.updateBoardWidth();
        this.addColumnText = '';
        this._ws.addList(this.board._id, column);
      });
  }

  addColumnOnEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      if (this.addColumnText && this.addColumnText.trim() !== '') {
        this.addColumn();
      } else {
        this.clearAddColumn();
      }
    }
    else if (event.keyCode === 27) {
      this.clearAddColumn();
    }
  }

  addColumnOnBlur() {
    if (this.addColumnText && this.addColumnText.trim() !== '') {
      this.addColumn();
    }
    this.clearAddColumn();
  }

  clearAddColumn() {
    this.addingColumn = false;
    this.addColumnText = '';
  }

  addCard(card: Card) {
    this.board.cards.push(card);
  }

  foreceUpdateCards() {
    var cards = JSON.stringify(this.board.cards);
    this.board.cards = JSON.parse(cards);
  }


  onCardUpdate(card: Card) {
    this.foreceUpdateCards();
  }

}
