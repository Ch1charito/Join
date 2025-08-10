import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { SummaryComponent } from './summary/summary.component';
import { BoardComponent } from './board/board.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'add-task', component: AddTaskComponent},
    {path: 'contacts', component: ContactsComponent},
    {path: 'summary', component: SummaryComponent},
    {path: 'board', component: BoardComponent},
];
