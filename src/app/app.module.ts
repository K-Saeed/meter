import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { TopbarComponent } from './core/components/topbar/topbar.component';
import { ServiceRequestsComponent } from './core/components/service-requests/service-requests.component';
// import { TableOfServiceComponent } from './core/components/service-requests/table/table.component';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './core/components/users/users.component';
import { RequestActionComponent } from './core/components/service-requests/request-action/request-action.component';
import { RequestTableComponent } from './core/components/service-requests/request-table/request-table.component';
import { RequestTitleComponent } from './core/components/service-requests/request-title/request-title.component';
import { RequestDeleteModalComponent } from './core/components/service-requests/request-delete-modal/request-delete-modal.component';
import { RequestShowModalComponent } from './core/components/service-requests/request-show-modal/request-show-modal.component';
import { RequestShowDetailsModalComponent } from './core/components/service-requests/request-show-details-modal/request-show-details-modal.component';
import { RequestShowAttachmentsModalComponent } from './core/components/service-requests/request-show-attachments-modal/request-show-attachments-modal.component';
import { RequestFilterModalComponent } from './core/components/service-requests/request-filter-modal/request-filter-modal.component';
import { UserTitleComponent } from './core/components/users/user-title/user-title.component';
import { UserTableComponent } from './core/components/users/user-table/user-table.component';
import { UserActionComponent } from './core/components/users/user-action/user-action.component';
import { UserFilterModalComponent } from './core/components/users/user-filter-modal/user-filter-modal.component';
import { RequestRejectModalComponent } from './core/components/service-requests/request-reject-modal/request-reject-modal.component';
import { RequestApproveModalComponent } from './core/components/service-requests/request-approve-modal/request-approve-modal.component';
import { UserShowModalComponent } from './core/components/users/user-show-modal/user-show-modal.component';
import { UserDeleteModalComponent } from './core/components/users/user-delete-modal/user-delete-modal.component';
import { UserShowDetailsModalComponent } from './core/components/users/user-show-details-modal/user-show-details-modal.component';
import { UserShowAttachmentModalComponent } from './core/components/users/user-show-attachment-modal/user-show-attachment-modal.component';
import { UserRejectModalComponent } from './core/components/users/user-reject-modal/user-reject-modal.component';
import { UserApproveModalComponent } from './core/components/users/user-approve-modal/user-approve-modal.component';
import { ProvidersProposalsComponent } from './core/components/providers-proposals/providers-proposals.component';
import { ProposalTitleComponent } from './core/components/providers-proposals/proposal-title/proposal-title.component';
import { ProposalActionComponent } from './core/components/providers-proposals/proposal-action/proposal-action.component';
import { ProposalFilterModalComponent } from './core/components/providers-proposals/proposal-filter-modal/proposal-filter-modal.component';
import { ProposalTableComponent } from './core/components/providers-proposals/proposal-table/proposal-table.component';
import { ProposalDeleteModalComponent } from './core/components/providers-proposals/proposal-delete-modal/proposal-delete-modal.component';
import { ProposalShowModalComponent } from './core/components/providers-proposals/proposal-show-modal/proposal-show-modal.component';
import { ProposalShowDetailsModalComponent } from './core/components/providers-proposals/proposal-show-details-modal/proposal-show-details-modal.component';
import { ProposalShowAttechmentModalComponent } from './core/components/providers-proposals/proposal-show-attechment-modal/proposal-show-attechment-modal.component';
import { ProposalRejectModalComponent } from './core/components/providers-proposals/proposal-reject-modal/proposal-reject-modal.component';
import { ProposalApproveModalComponent } from './core/components/providers-proposals/proposal-approve-modal/proposal-approve-modal.component';
import { ConversationComponent } from './core/components/conversation/conversation.component';
import { ConversationTitleComponent } from './core/components/conversation/conversation-title/conversation-title.component';
import { ConversationActionComponent } from './core/components/conversation/conversation-action/conversation-action.component';
import { ConversationTableComponent } from './core/components/conversation/conversation-table/conversation-table.component';
import { ConversationChatModalComponent } from './core/components/conversation/conversation-chat-modal/conversation-chat-modal.component';
import { TransactionsComponent } from './core/components/transactions/transactions.component';
import { TransactionsTitleComponent } from './core/components/transactions/transactions-title/transactions-title.component';
import { TransactionsActionComponent } from './core/components/transactions/transactions-action/transactions-action.component';
import { TransactionsFilterModalComponent } from './core/components/transactions/transactions-filter-modal/transactions-filter-modal.component';
import { TransactionsTableComponent } from './core/components/transactions/transactions-table/transactions-table.component';
import { TransactionsShowModalComponent } from './core/components/transactions/transactions-show-modal/transactions-show-modal.component';
import { TransactionsDeleteModalComponent } from './core/components/transactions/transactions-delete-modal/transactions-delete-modal.component';
import { TransactionsApproveModalComponent } from './core/components/transactions/transactions-approve-modal/transactions-approve-modal.component';
import { TransactionsRejectModalComponent } from './core/components/transactions/transactions-reject-modal/transactions-reject-modal.component';
import { NotificationsComponent } from './core/components/notifications/notifications.component';
import { NotificationsTitleComponent } from './core/components/notifications/notifications-title/notifications-title.component';
import { NotificationsActionComponent } from './core/components/notifications/notifications-action/notifications-action.component';
import { NotificationsFilterModalComponent } from './core/components/notifications/notifications-filter-modal/notifications-filter-modal.component';
import { NotificationsTableComponent } from './core/components/notifications/notifications-table/notifications-table.component';
import { NotificationsDeleteModalComponent } from './core/components/notifications/notifications-delete-modal/notifications-delete-modal.component';
import { NotificationsShowModalComponent } from './core/components/notifications/notifications-show-modal/notifications-show-modal.component';
import { NotificationsSendModalComponent } from './core/components/notifications/notifications-send-modal/notifications-send-modal.component';
// import { RequestPaginationComponent } from './core/components/service-requests/request-pagination/request-pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    TopbarComponent,
    ServiceRequestsComponent,
    UsersComponent,
    RequestActionComponent,
    RequestTableComponent,
    RequestTitleComponent,
    RequestDeleteModalComponent,
    RequestShowModalComponent,
    RequestShowDetailsModalComponent,
    RequestShowAttachmentsModalComponent,
    RequestFilterModalComponent,
    UserTitleComponent,
    UserTableComponent,
    UserActionComponent,
    UserFilterModalComponent,
    RequestRejectModalComponent,
    RequestApproveModalComponent,
    UserShowModalComponent,
    UserDeleteModalComponent,
    UserShowDetailsModalComponent,
    UserShowAttachmentModalComponent,
    UserRejectModalComponent,
    UserApproveModalComponent,
    ProvidersProposalsComponent,
    ProposalTitleComponent,
    ProposalActionComponent,
    ProposalFilterModalComponent,
    ProposalTableComponent,
    ProposalDeleteModalComponent,
    ProposalShowModalComponent,
    ProposalShowDetailsModalComponent,
    ProposalShowAttechmentModalComponent,
    ProposalRejectModalComponent,
    ProposalApproveModalComponent,
    ConversationComponent,
    ConversationTitleComponent,
    ConversationActionComponent,
    ConversationTableComponent,
    ConversationChatModalComponent,
    TransactionsComponent,
    TransactionsTitleComponent,
    TransactionsActionComponent,
    TransactionsFilterModalComponent,
    TransactionsTableComponent,
    TransactionsShowModalComponent,
    TransactionsDeleteModalComponent,
    TransactionsApproveModalComponent,
    TransactionsRejectModalComponent,
    NotificationsComponent,
    NotificationsTitleComponent,
    NotificationsActionComponent,
    NotificationsFilterModalComponent,
    NotificationsTableComponent,
    NotificationsDeleteModalComponent,
    NotificationsShowModalComponent,
    NotificationsSendModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
