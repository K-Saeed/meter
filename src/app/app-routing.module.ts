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
  { path: 'users', component: UsersComponent },
  { path: 'providersproposal', component: ProvidersProposalsComponent },
  { path: 'conversations', component: ConversationComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'roles', component: RoleComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'worksubmission', component: WorkSubmissionComponent },
  { path: 'chat', component: ChatComponent },
  { path: '', redirectTo: '/signin', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/signin' } // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
