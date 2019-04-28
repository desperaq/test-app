import { Injectable, EventEmitter } from "@angular/core";
import { List } from '../user/list/list';
import { Card } from '../user/card/card';
import { environment } from 'src/environments/environment';


const API = environment.apiUrl;
declare var io;

@Injectable()
export class WebSocketService {
    socket: any;
    public onListAdd: EventEmitter<List>;
    public onCardAdd: EventEmitter<Card>;
    public onListUpdate: EventEmitter<List>;
    public onCardUpdate: EventEmitter<Card>;

    constructor() {
        this.onListAdd = new EventEmitter();
        this.onCardAdd = new EventEmitter();
        this.onListUpdate = new EventEmitter();
        this.onCardUpdate = new EventEmitter();
    }

    connect() {
        this.socket = io(API);

        this.socket.on('addList', data => {
            this.onListAdd.emit(<List>data.list);
        });
        this.socket.on('addCard', data=> {
            this.onCardAdd.emit(<Card>data.card);
        });
        this.socket.on('updateList', data=> {
            this.onListUpdate.emit(<List>data.list);
        });
        this.socket.on('updateCard', data=> {
            this.onCardUpdate.emit(<Card>data.card);
        });
    }

    join(boardId: string){
        this.socket.emit('joinBoard', boardId);
    }

    leave(boardId: string) {
        this.socket.emit('leaveBoard', boardId);
      }
    
      addList(boardId:string, list: List){
        this.socket.emit('addList', { boardId: boardId, list: list });
      }
    
      addCard(boardId: string, card: Card) {
        this.socket.emit('addCard', { boardId: boardId, card: card });
      }
    
      updateList(boardId: string, list: List) {
        this.socket.emit('updateList', { boardId: boardId, list: list });
      }
    
      updateCard(boardId: string, card: Card) {
        this.socket.emit('updateCard', { boardId: boardId, card: card });
      }

}