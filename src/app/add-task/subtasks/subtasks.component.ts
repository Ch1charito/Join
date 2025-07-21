import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subtasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subtasks.component.html',
  styleUrls: ['./subtasks.component.scss']
})
export class SubtasksComponent {
  newSubtask: string = '';
  subtasks: { text: string; editing: boolean }[] = [];

  @Output() subtasksChange = new EventEmitter<{ text: string; editing: boolean }[]>();

  private emitSubtasks() {
    this.subtasksChange.emit(this.subtasks);
  }

  addSubtask() {
    const trimmed = this.newSubtask.trim();
    if (trimmed) {
      this.subtasks.push({ text: trimmed, editing: false });
      this.newSubtask = '';
      this.emitSubtasks();
    }
  }

  deleteSubtask(index: number) {
    this.subtasks.splice(index, 1);
    this.emitSubtasks();
  }

  startEdit(index: number) {
    this.subtasks[index].editing = true;
  }

  confirmEdit(index: number, newText: string) {
    const trimmed = newText.trim();
    if (trimmed) {
      this.subtasks[index].text = trimmed;
      this.subtasks[index].editing = false;
      this.emitSubtasks();
    }
  }

  cancelEdit(index: number) {
    this.subtasks[index].editing = false;
  }
}