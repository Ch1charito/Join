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
   * Gibt Initialen aus Vor- und Nachnamen zurück (z. B. "John Doe" → "JD")
   */
  getInitials(name: string): string {
    if (!name) return '';
    const parts = name.trim().split(' ');
    const first = parts[0]?.charAt(0).toUpperCase() || '';
    const last = parts[1]?.charAt(0).toUpperCase() || '';
    return first + last;
  }

  /**
   * Berechnet den Fortschritt in Prozent
   */
  calculateProgress(): number {
    const total = this.getTotalSubtasks();
    const completed = this.getCompletedSubtasks();
    return total > 0 ? (completed / total) * 100 : 0;
  }

  /**
   * Gibt Anzahl der erledigten Subtasks zurück
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
   * Gibt Gesamtzahl der Subtasks zurück
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
