import { List } from '../list/list';
import { Card } from '../card/card';


export class Board {
    _id: string;
    title: string;
    name: string;
    lists: List[];
    cards: Card[];
}