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

const routes: Routes = [
  {
    path:'servicerequests',
    component: ServiceRequestsComponent,
  },
  {
    path:'users',
    component: UsersComponent,
  },
  {
    path:'providersproposal',
    component: ProvidersProposalsComponent,
  },
  {
    path:'conversations',
    component: ConversationComponent,
  },
  {
    path:'transactions',
    component: TransactionsComponent,
  },
  {
    path:'notifications',
    component: NotificationsComponent,
  },
  {
    path:'employees',
    component: EmployeesComponent,
  },
  {
    path:'roles',
    component: RoleComponent,
  },
  {
    path:'settings',
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
