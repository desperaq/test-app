import { Component, OnInit } from '@angular/core';
import { Board } from '../board/board';
import { BoardService } from '../board/board.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  boards: Board[];

  constructor(private _bs: BoardService, private _router: Router) { }

  ngOnInit() {
    this.boards = [];
    this._bs.getAll().subscribe(
      (boards: Board[]) =>{
        this.boards = boards;
      });

      setTimeout(function() {
        document.getElementById('boards-wrapper').style.backgroundColor = "#fff";
      }, 100);
  }

  public addBoard() {
    console.log('Adding new board');
    this._bs.post(<Board>{ name: "New board"})
    .subscribe((board: Board) => {
      this._router.navigate(['/b', board._id]);
      console.log('new board added');
    })
  }

}
