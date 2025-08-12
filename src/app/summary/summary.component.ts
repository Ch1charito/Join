import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { SideBarComponent } from "../shared/side-bar/side-bar.component";
import { RouterLink } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { TaskInterface } from '../interfaces/task.interface';
import { Subscription } from 'rxjs';
import { Firestore, doc, getDoc, serverTimestamp, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-summary',
  imports: [HeaderComponent, SideBarComponent, RouterLink],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit, OnDestroy {

  todoCount = 0;
  doneCount = 0;
  urgentCount = 0;
  allTasksCount = 0;
  inProgressCount = 0;
  awaitingFeedbackCount = 0;
  upcomingDeadline: string | null = null;
  greetingText = '';

  private subscription!: Subscription;

  constructor(
    private firebaseService: FirebaseService,
    private firestore: Firestore
  ) {}

  async ngOnInit() {
    this.subscription = this.firebaseService.taskList$.subscribe((tasks: TaskInterface[]) => {
      this.allTasksCount = tasks.length;
      this.todoCount = tasks.filter(t => t.status === 'todo').length;
      this.doneCount = tasks.filter(t => t.status === 'done').length;
      this.urgentCount = tasks.filter(t => t.priority === 'urgent').length;

      this.inProgressCount = tasks.filter(t => t.status === 'progress').length;
      this.awaitingFeedbackCount = tasks.filter(t => t.status === 'feedback').length;

      const urgentTasks = tasks
        .filter(t => t.priority === 'urgent')
        .filter(t => !!t.date)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      if (urgentTasks.length > 0) {
        const nextDeadline = new Date(urgentTasks[0].date);
        this.upcomingDeadline = nextDeadline.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
      } else {
        this.upcomingDeadline = null;
      }
    });

    await this.setGreetingFromServerTime();
  }

  private async setGreetingFromServerTime() {
    const ref = doc(this.firestore, 'serverTime', 'now');
    await setDoc(ref, { timestamp: serverTimestamp() });
    const snap = await getDoc(ref);
    const serverDate = snap.data()?.['timestamp']?.toDate() as Date;

    if (serverDate) {
      const hour = serverDate.getHours();
      if (hour >= 4 && hour < 12) {
        this.greetingText = 'Good Morning';
      } else if (hour >= 12 && hour < 18) {
        this.greetingText = 'Good Afternoon';
      } else {
        this.greetingText = 'Good Evening';
      }
    } else {
      this.greetingText = 'Hello';
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
