import { Component, Input, Output, EventEmitter, HostListener, ViewChild } from '@angular/core'; 
import { FormsModule, NgModel } from '@angular/forms'; 
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
  @Input() category: string = '';
  @Output() taskListChange = new EventEmitter<any>();
  showCategoryDropdown: boolean = false;

  @ViewChild('category') categoryNgModel!: NgModel;

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
    
      if (this.categoryNgModel) {
        this.categoryNgModel.control.markAsTouched();
      }
    }
  }

  onCategoryChange() {
    this.taskListChange.emit(this.taskList.category);
    
    if (this.categoryNgModel) {
      this.categoryNgModel.control.markAsTouched();
    }
  }

  resetCategory() {
    this.taskList.category = '';

    if (this.categoryNgModel) {
      this.categoryNgModel.control.markAsUntouched();
      this.categoryNgModel.control.markAsPristine();
      this.categoryNgModel.control.updateValueAndValidity();
    }
  }


  toggleCategoryDropdown(): void {
    this.showCategoryDropdown = !this.showCategoryDropdown;
    
    if (this.categoryNgModel) {
      this.categoryNgModel.control.markAsTouched();
    }
  }


  selectCategory(category: string): void {
    this.taskList.category = category;
    this.onCategoryChange();
    this.showCategoryDropdown = false;
    
    if (this.categoryNgModel) {
      this.categoryNgModel.control.markAsDirty();
      this.categoryNgModel.control.markAsTouched();
      this.categoryNgModel.control.updateValueAndValidity(); 
    }
  }

  ngOnChanges() {
    this.taskList.category = this.category;
  }
}