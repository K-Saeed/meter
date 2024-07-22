import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceRequestsComponent } from './core/components/service-requests/service-requests.component';
import { UsersComponent } from './core/components/users/users.component';
import { ProvidersProposalsComponent } from './core/components/providers-proposals/providers-proposals.component';
import { ConversationComponent } from './core/components/conversation/conversation.component';

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
    path:'Conversations',
    component: ConversationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
