import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { SummaryComponent } from './summary/summary.component';
import { BoardComponent } from './board/board.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { LegalNoticeGuestComponent } from './legal-notice-guest/legal-notice-guest.component';
import { PrivacyPolicyGuestComponent } from './privacy-policy-guest/privacy-policy-guest.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'add-task', component: AddTaskComponent},
    {path: 'contacts', component: ContactsComponent},
    {path: 'summary', component: SummaryComponent},
    {path: 'board', component: BoardComponent},
    {path: 'help', component: HelpPageComponent},
    {path: 'login', component: LoginComponent},
    {path: 'legal-notice', component: LegalNoticeComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path: 'legal-notice-guest', component: LegalNoticeGuestComponent},
    {path: 'privacy-policy-guest', component: PrivacyPolicyGuestComponent}
];