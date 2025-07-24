import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  taskList: any = {
    category: ''
  };

  @Output() taskListChange = new EventEmitter<any>();
  showCategoryDropdown: boolean = false; 

  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const categoryDiv = document.getElementById('categoryDiv');
    const categoryDropdown = document.getElementById('categoryDropdown');

    if (
      categoryDiv &&
      categoryDropdown &&
      !categoryDiv.contains(event.target as Node) &&
      !categoryDropdown.contains(event.target as Node)
    ) {
      this.showCategoryDropdown = false;
    }
  }

  onCategoryChange() {
    this.taskListChange.emit(this.taskList.category);
  }

  resetCategory() {
    this.taskList.category = '';
  }

  
  toggleCategoryDropdown(): void {
    this.showCategoryDropdown = !this.showCategoryDropdown;
  }

 
  selectCategory(category: string): void {
    this.taskList.category = category;
    this.onCategoryChange(); 
    this.showCategoryDropdown = false; 
  }
}