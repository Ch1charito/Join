import { Injectable, inject, OnDestroy} from '@angular/core';
import {
  Firestore,
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from '@angular/fire/firestore';
import { ContactInterface } from '../interfaces/contact.interface';
import { TaskInterface } from '../interfaces/task.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService implements OnDestroy {
  firestore = inject(Firestore);
  /* unsubscribe: () => void; */
  contactList: ContactInterface[] = [];
  taskList: TaskInterface[] = [];       // für add-task
  unsubscribeContacts: () => void;
  unsubscribeTasks: () => void; 
  private taskListSubject = new BehaviorSubject<TaskInterface[]>([]);
  taskList$: Observable<TaskInterface[]> = this.taskListSubject.asObservable();

  constructor() {
    this.unsubscribeContacts = onSnapshot(
      collection(this.firestore, 'contacts'),
      (contacts) => {
        this.contactList = [];
        contacts.forEach((element) => {
          this.contactList.push(
            this.setContactObject(element.id, element.data())
          );
        });
        this.contactList.sort((a, b) => a.name.localeCompare(b.name));
      }
    );
    this.unsubscribeTasks = onSnapshot(
      collection(this.firestore, 'tasks'),
      (tasks) => {
        this.taskList = [];
        tasks.forEach((element) => {
          this.taskList.push(
            this.setTaskObject(element.id, element.data())
          );
        });
        this.taskListSubject.next([...this.taskList]);
        // this.taskList.sort((a, b) => a.title.localeCompare(b.title));
      }
    );
  }

  //#region contacs
  setContactObject(id: string, obj: any): ContactInterface {
    return {
      id: id,
      name: obj.name,
      email: obj.email,
      phone: obj.phone,
    };
  }

  async addContactToDatabase(contacts: ContactInterface) {
    await addDoc(collection(this.firestore, 'contacts'), contacts);
  }

  async updateContactInDatabase(id: string, contacts: ContactInterface) {
    await updateDoc(doc(this.firestore, 'contacts', id), {
      name: contacts.name,
      email: contacts.email,
      phone: contacts.phone,
    });
  }

  async deleteContactFromDatabase(id: string) {
    await deleteDoc(doc(this.firestore, 'contacts', id));
  }
  //#endregion

  ngOnDestroy() {
    if (this.unsubscribeContacts) this.unsubscribeContacts();
    if (this.unsubscribeTasks) this.unsubscribeTasks();
  }


  //#region tasks
  setTaskObject(id: string, obj: any): TaskInterface {
    return {
      id: id,
      title: obj.title,
      description: obj.description,
      date: obj.date,
      priority: obj.priority,
      assignedContacts: obj.assignedContacts,
      category: obj.category,
      subtasks: obj.subtasks,
      status: obj.status,
      order: obj.order ?? 0,
    };
  }

  async addTaskToDatabase(tasks: TaskInterface) {
      tasks.order = tasks.order ?? 0;
    await addDoc(collection(this.firestore, 'tasks'), tasks);
  }

  async updateTaskInDatabase(id: string, tasks: TaskInterface) {
    await updateDoc(doc(this.firestore, 'tasks', id), {
      title: tasks.title,
      description: tasks.description,
      date: tasks.date,
      priority: tasks.priority,
      assignedContacts: tasks.assignedContacts,
      category: tasks.category,
      subtasks: tasks.subtasks,
      status: tasks.status,
      order: tasks.order ?? 0
    });
  }

  async deleteTaskFromDatabase(id: string) {
    await deleteDoc(doc(this.firestore, 'tasks', id));
  }
  //#endregion
}
