import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceRequestsComponent } from './core/components/service-requests/service-requests.component';
import { UsersComponent } from './core/components/users/users.component';
import { ProvidersProposalsComponent } from './core/components/providers-proposals/providers-proposals.component';
import { ConversationComponent } from './core/components/conversation/conversation.component';
import { TransactionsComponent } from './core/components/transactions/transactions.component';
import { NotificationsComponent } from './core/components/notifications/notifications.component';
import { EmployeesComponent } from './core/components/employees/employees.component';
import { RoleComponent } from './core/components/role/role.component';
import { SettingsComponent } from './core/components/settings/settings.component';
import { ProductsComponent } from './core/components/products/products.component';
import { WorkSubmissionComponent } from './core/components/work-submission/work-submission.component';
import { ChatComponent } from './core/components/chat/chat.component';
import { SignInComponent } from './core/components/sign-in/sign-in.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { AuthGuardService } from './shared/service/auth/auth-guard.service';

const routes: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'servicerequests', component: ServiceRequestsComponent, canActivate: [AuthGuardService] },
  { path: 'users', component: UsersComponent},
  { path: 'providersproposal', component: ProvidersProposalsComponent, canActivate: [AuthGuardService] },
  { path: 'conversations', component: ConversationComponent, canActivate: [AuthGuardService] },
  { path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuardService] },
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuardService] },
  { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuardService] },
  { path: 'roles', component: RoleComponent, canActivate: [AuthGuardService] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuardService] },
  { path: 'worksubmission', component: WorkSubmissionComponent, canActivate: [AuthGuardService] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuardService] },
  { path: 'WorkSubmission', component: WorkSubmissionComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: '/signin', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/signin' } // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
