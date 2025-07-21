import { Component } from '@angular/core';
import { SideBarComponent } from '../shared/side-bar/side-bar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { BoardTopComponent } from './board-top/board-top.component';
import { BoardBottomComponent } from './board-bottom/board-bottom.component';

@Component({
  selector: 'app-board',
  imports: [
    SideBarComponent,
    HeaderComponent,
    BoardTopComponent,
    BoardBottomComponent,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {}
