import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskInterface } from '../../interfaces/task.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() task!: TaskInterface;
  @Output() cardClicked = new EventEmitter<void>();

  onCardClick() {
    this.cardClicked.emit();
  }

  /**
   * Berechnet den Fortschritt in Prozent (optional verwendbar)
   */
  calculateProgress(): number {
    const total = this.getTotalSubtasks();
    const completed = this.getCompletedSubtasks();
    return total > 0 ? (completed / total) * 100 : 0;
  }

  /**
   * Gibt Anzahl der erledigten Subtasks zurück, falls gültig
   */
  getCompletedSubtasks(): number {
    if (Array.isArray(this.task?.subtasks)) {
      return this.task.subtasks.filter(
        (s: any) => typeof s === 'object' && s.completed === true
      ).length;
    }
    return 0;
  }

  /**
   * Gibt Gesamtzahl der Subtasks zurück, falls gültig
   */
  getTotalSubtasks(): number {
    return Array.isArray(this.task?.subtasks) ? this.task.subtasks.length : 0;
  }

  /**
   * Formatiert die Priorität mit Großbuchstaben am Anfang
   */
  formatPriority(priority: string): string {
    if (!priority) return '';
    return priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();
  }
}
