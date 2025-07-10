import { Injectable, inject, OnDestroy } from '@angular/core';
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

@Injectable({
  providedIn: 'root',
})
export class FirebaseService implements OnDestroy {
  firestore = inject(Firestore);
  unsubscribe: () => void;
  contactList: ContactInterface[] = [];

  constructor() {
    this.unsubscribe = onSnapshot(
      collection(this.firestore, 'contacts'),
      (contacts) => {
        this.contactList = [];
        contacts.forEach((element) => {
          this.contactList.push(
            this.setContactObject(element.id, element.data())
          );
        });
        console.log(this.contactList);
      }
    );
  }

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

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
