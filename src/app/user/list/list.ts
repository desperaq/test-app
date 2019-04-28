import { Card } from '../card/card';


export class List {
    _id: string;
    title: string;
    name: string;
    boardId: string;
    order: number;

    cards: Card[];
}