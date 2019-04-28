import { Board } from './board';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { List } from '../list/list';
import { Card } from '../card/card';

const API = environment.apiUrl;

@Injectable()
export class BoardService {
    board= '/getAllBoardCards/5cc2d42322ebf63c3b17ae4b';
    boardId = '/board/5cc1c143fd898549d7d72a8d';
    listCards = 'card/getAllListCards/5cb98b2533bfe1141b31b8e7';
    putBoard = '/board/5cc2c10aae1f383070455758';


    boardsCache: Board[] = [];

    constructor(private _http: HttpClient) {}

    getAll() {
        return this._http.get(API + this.board).pipe(map((res: any) => <Board[]>res.data))
    }

    get(id: string) {
        return this._http.get(API + this.boardId).pipe(
            map(
                (res: any) => <Board>res.data
            )
        );
    }

    getLists(id: string) {
        return this._http.get(API + this.listCards).pipe(
            map(
                (res: any) => <List[]>res.data
            )
        )
    }

    getCards() {
        return this._http.get(API + '/' + '/card').pipe(
            map(
                (res: any) => <Card[]>res.data
            )
        );
    }

    put(board: Board) {
        let body = JSON.stringify(board);
        console.log(body);
        this._http.put(API + this.putBoard,body)
        .toPromise()
        .then(res => console.log(res));
    }

    post(board: Board) {
        let body = JSON.stringify(board);

        return this._http.post(API + this.putBoard, body)
        .pipe(
            map(
                (res: any) => <Board>res.data
            )
        );
    }

    
}