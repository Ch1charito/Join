import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  taskList: any = {};

  @Output() taskListChange = new EventEmitter<any>();

  onCategoryChange() {
    this.taskListChange.emit(this.taskList);
  }
}