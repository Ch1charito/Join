import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  taskList: any = {
    category: ''
  };

  @Output() taskListChange = new EventEmitter<any>();

  onCategoryChange() {
    this.taskListChange.emit(this.taskList.category);
  }

  resetCategory() {
    this.taskList.category = '';
  }
}