import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./core/components/header/header.component";
import { ServiceRequestsComponent } from "./core/components/service-requests/service-requests.component";
import { SidebarComponent } from "./core/components/sidebar/sidebar.component";
import { TopbarComponent } from "./core/components/topbar/topbar.component";
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeesComponent } from './core/components/employees/employees.component';
import { EmployeesTitleComponent } from './core/components/employees/employees-title/employees-title.component';
import { EmployeesActionComponent } from './core/components/employees/employees-action/employees-action.component';
import { EmployeesFilterModalComponent } from './core/components/employees/employees-filter-modal/employees-filter-modal.component';
import { EmployeesTableComponent } from './core/components/employees/employees-table/employees-table.component';
import { EmployeesDeleteModalComponent } from './core/components/employees/employees-delete-modal/employees-delete-modal.component';
import { EmployeesAddModalComponent } from './core/components/employees/employees-add-modal/employees-add-modal.component';
import { EmployeesVerificationModalComponent } from './core/components/employees/employees-verification-modal/employees-verification-modal.component';
import { EmployeesEditModalComponent } from './core/components/employees/employees-edit-modal/employees-edit-modal.component';
import { RoleComponent } from './core/components/role/role.component';
import { RoleTitleComponent } from './core/components/role/role-title/role-title.component';
import { RoleActionComponent } from './core/components/role/role-action/role-action.component';
import { RoleCardsComponent } from './core/components/role/role-cards/role-cards.component';
import { RoleEditModalComponent } from './core/components/role/role-edit-modal/role-edit-modal.component';
import { RoleDeleteModalComponent } from './core/components/role/role-delete-modal/role-delete-modal.component';
import { RoleAddModalComponent } from './core/components/role/role-add-modal/role-add-modal.component';
import { SettingsComponent } from './core/components/settings/settings.component';
import { SettingsTitleComponent } from './core/components/settings/settings-title/settings-title.component';
import { SettingsEditComponent } from './core/components/settings/settings-edit/settings-edit.component';
import { ProductsComponent } from './core/components/products/products.component';
import { ProductsTitleComponent } from './core/components/products/products-title/products-title.component';
import { ProductsActionComponent } from './core/components/products/products-action/products-action.component';
import { ProductsFilterModalComponent } from './core/components/products/products-filter-modal/products-filter-modal.component';
import { ProductsTableComponent } from './core/components/products/products-table/products-table.component';
import { ProductsDeleteModalComponent } from './core/components/products/products-delete-modal/products-delete-modal.component';
import { ProductsShowModalComponent } from './core/components/products/products-show-modal/products-show-modal.component';
import { ProductsShowDetailsModalComponent } from './core/components/products/products-show-details-modal/products-show-details-modal.component';
import { ProductsShowAttechmentModalComponent } from './core/components/products/products-show-attechment-modal/products-show-attechment-modal.component';
import { ProductsShowRejectModalComponent } from './core/components/products/products-show-reject-modal/products-show-reject-modal.component';
import { ProductsApproveModalComponent } from './core/components/products/products-approve-modal/products-approve-modal.component';
import { WorkSubmissionComponent } from './core/components/work-submission/work-submission.component';
import { WorkSubmissionTitleComponent } from './core/components/work-submission/work-submission-title/work-submission-title.component';
import { WorkSubmissionActionComponent } from './core/components/work-submission/work-submission-action/work-submission-action.component';
import { WorkSubmissionFilterModalComponent } from './core/components/work-submission/work-submission-filter-modal/work-submission-filter-modal.component';
import { WorkSubmissionTableComponent } from './core/components/work-submission/work-submission-table/work-submission-table.component';
import { WorkSubmissionDeleteModalComponent } from './core/components/work-submission/work-submission-delete-modal/work-submission-delete-modal.component';
import { WorkSubmissionShowModalComponent } from './core/components/work-submission/work-submission-show-modal/work-submission-show-modal.component';
import { WorkSubmissionDetailsModalComponent } from './core/components/work-submission/work-submission-details-modal/work-submission-details-modal.component';
import { WorkSubmissionAttachmentModalComponent } from './core/components/work-submission/work-submission-attachment-modal/work-submission-attachment-modal.component';
import { WorkSubmissionShowRejectModalComponent } from './core/components/work-submission/work-submission-show-reject-modal/work-submission-show-reject-modal.component';
import { WorkSubmissionShowApproveModalComponent } from './core/components/work-submission/work-submission-show-approve-modal/work-submission-show-approve-modal.component';
import { ChatComponent } from './core/components/chat/chat.component';
import { ChatListsComponent } from './core/components/chat/chat-lists/chat-lists.component';
import { ChatMsgComponent } from './core/components/chat/chat-msg/chat-msg.component';
import { UserAddModalComponent } from './core/components/users/user-add-modal/user-add-modal.component';
import { TransactionsRefundModalComponent } from './core/components/transactions/transactions-refund-modal/transactions-refund-modal.component';
import { UserCustomerComponent } from './core/components/users/user-add-modal/user-customer/user-customer.component';
import { UserProviderComponent } from './core/components/users/user-add-modal/user-provider/user-provider.component';
import { UserVerificationModalComponent } from './core/components/users/user-verification-modal/user-verification-modal.component';
import { UserProviderModalComponent } from './core/components/users/user-add-modal/user-provider/user-provider-modal/user-provider-modal.component';
import { UserProviderNextModalComponent } from './core/components/users/user-add-modal/user-provider/user-provider-next-modal/user-provider-next-modal.component';
import { UserSellerNextModalComponent } from './core/components/users/user-add-modal/user-seller-next-modal/user-seller-next-modal.component';
import { UserSellerModalComponent } from './core/components/users/user-add-modal/user-seller/user-seller-modal/user-seller-modal.component';
import { UserSellerComponent } from './core/components/users/user-add-modal/user-seller/user-seller.component';
import { SignInComponent } from './core/components/sign-in/sign-in.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { DashboardTitleComponent } from './core/components/dashboard/dashboard-title/dashboard-title.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";
import { CommonModule } from "@angular/common";
import { AuthGuardService } from "./shared/service/auth/auth-guard.service";
import { RquestCallService } from "./shared/service/request-call.service";
import { JwtInterceptor } from "./shared/service/auth/auth.interceptor";
import { DashboardUsersChartComponent } from './core/components/dashboard/dashboard-users-chart/dashboard-users-chart.component';
import { DashboardRequestsStatisticsComponent } from './core/components/dashboard/dashboard-requests-statistics/dashboard-requests-statistics.component';
import { DashboardCardsComponent } from './core/components/dashboard/dashboard-cards/dashboard-cards.component';
import { DashboardLastActivityComponent } from './core/components/dashboard/dashboard-last-activity/dashboard-last-activity.component';
import { UserMatricsOverviewComponent } from './core/components/users/user-matrics-overview/user-matrics-overview.component';
import { HasPermissionDirective } from "./shared/service/auth/has-permission.directive";
import { ErrorModalComponent } from "./error-modal/error-modal.component";
import { RequestEditModalComponent } from './core/components/service-requests/request-edit-modal/request-edit-modal.component';
import { RequestModalComponent } from './core/components/service-requests/request-edit-modal/request-modal/request-modal.component';
import { ConsolationModalComponent } from './core/components/service-requests/request-edit-modal/consolation-modal/consolation-modal.component';
import { JobModalComponent } from './core/components/service-requests/request-edit-modal/job-modal/job-modal.component';
import { SendMessageToAllComponent } from './core/components/chat/send-message-to-all/send-message-to-all.component';
import { UserUnfinishedComponent } from './core/components/users/user-unfinished/user-unfinished.component';
import { UserUnfinishedTitleComponent } from './core/components/users/user-unfinished/user-unfinished-title/user-unfinished-title.component';
import { UserUnfinishedTableComponent } from './core/components/users/user-unfinished/user-unfinished-table/user-unfinished-table.component';
import { UserUnfinishedActionComponent } from './core/components/users/user-unfinished/user-unfinished-action/user-unfinished-action.component';
import { PrintInvoiceDialogComponent } from './core/components/transactions/print-invoice-dialog/print-invoice-dialog.component';
import { SocketChatComponent } from "./core/components/new-chat/socket-chat/socket-chat.component";
import { SendToAllComponent } from './core/components/new-chat/send-to-all/send-to-all.component';
import { SlicePipe } from './slice.pipe';
import { RequestPendingModalComponent } from "./core/components/service-requests/request-pending-modal/request-pending-modal.component";
import { DevicesProposalsComponent } from "./core/components/devices-proposals/devices-proposals.component";
import { DevicesDevicesProposalDeleteModalComponent } from "./core/components/devices-proposals/devices-proposal-delete-modal/devices-proposal-delete-modal.component";
import { DevicesProposalActionComponent } from "./core/components/devices-proposals/devices-proposal-action/devices-proposal-action.component";
import { DevicesProposalApproveModalComponent } from "./core/components/devices-proposals/devices-proposal-approve-modal/devices-proposal-approve-modal.component";
import { DevicesProposalFilterModalComponent } from "./core/components/devices-proposals/devices-proposal-filter-modal/devices-proposal-filter-modal.component";
import { DevicesProposalRejectModalComponent } from "./core/components/devices-proposals/devices-proposal-reject-modal/devices-proposal-reject-modal.component";
import { DevicesProposalShowAttechmentModalComponent } from "./core/components/devices-proposals/devices-proposal-show-attechment-modal/devices-proposal-show-attechment-modal.component";
import { DevicesProposalShowDetailsModalComponent } from "./core/components/devices-proposals/devices-proposal-show-details-modal/devices-proposal-show-details-modal.component";
import { DevicesProposalShowModalComponent } from "./core/components/devices-proposals/devices-proposal-show-modal/devices-proposal-show-modal.component";
import { DevicesProposalTableComponent } from "./core/components/devices-proposals/devices-proposal-table/devices-proposal-table.component";
import { DevicesProposalTitleComponent } from "./core/components/devices-proposals/devices-proposal-title/devices-proposal-title.component";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    EmployeesComponent,
    EmployeesTitleComponent,
    EmployeesActionComponent,
    EmployeesFilterModalComponent,
    EmployeesTableComponent,
    EmployeesDeleteModalComponent,
    EmployeesAddModalComponent,
    EmployeesVerificationModalComponent,
    EmployeesEditModalComponent,
    RoleComponent,
    RoleTitleComponent,
    RoleActionComponent,
    RoleCardsComponent,
    RoleEditModalComponent,
    RoleDeleteModalComponent,
    RoleAddModalComponent,
    SettingsComponent,
    SettingsTitleComponent,
    SettingsEditComponent,
    ProductsComponent,
    ProductsTitleComponent,
    ProductsActionComponent,
    ProductsFilterModalComponent,
    ProductsTableComponent,
    ProductsDeleteModalComponent,
    ProductsShowModalComponent,
    ProductsShowDetailsModalComponent,
    ProductsShowAttechmentModalComponent,
    ProductsShowRejectModalComponent,
    ProductsApproveModalComponent,
    WorkSubmissionComponent,
    WorkSubmissionTitleComponent,
    WorkSubmissionActionComponent,
    WorkSubmissionFilterModalComponent,
    WorkSubmissionTableComponent,
    WorkSubmissionDeleteModalComponent,
    WorkSubmissionShowModalComponent,
    WorkSubmissionDetailsModalComponent,
    WorkSubmissionAttachmentModalComponent,
    WorkSubmissionShowRejectModalComponent,
    WorkSubmissionShowApproveModalComponent,
    ChatComponent,
    ChatListsComponent,
    ChatMsgComponent,
    UserAddModalComponent,
    TransactionsRefundModalComponent,
    UserCustomerComponent,
    UserProviderComponent,
    UserVerificationModalComponent,
    UserProviderModalComponent,
    UserProviderNextModalComponent,
    UserSellerNextModalComponent,
    UserSellerModalComponent,
    UserSellerComponent,
    SignInComponent,
    DashboardComponent,
    DashboardTitleComponent,
    DashboardUsersChartComponent,
    DashboardRequestsStatisticsComponent,
    DashboardCardsComponent,
    DashboardLastActivityComponent,
    UserMatricsOverviewComponent,
    HasPermissionDirective,
    ErrorModalComponent,
    RequestEditModalComponent,
    RequestModalComponent,
    ConsolationModalComponent,
    JobModalComponent,
    SendMessageToAllComponent,
    UserUnfinishedComponent,
    UserUnfinishedTitleComponent,
    UserUnfinishedTableComponent,
    UserUnfinishedActionComponent,
    PrintInvoiceDialogComponent,
    SocketChatComponent,
    SendToAllComponent,
    SlicePipe,
    RequestPendingModalComponent,
    DevicesProposalsComponent,
    DevicesDevicesProposalDeleteModalComponent,
    DevicesProposalActionComponent,
    DevicesProposalApproveModalComponent,
    DevicesProposalFilterModalComponent,
    DevicesProposalRejectModalComponent,
    DevicesProposalShowAttechmentModalComponent,
    DevicesProposalShowDetailsModalComponent,
    DevicesProposalShowModalComponent,
    DevicesProposalTableComponent,
    DevicesProposalTitleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  
  providers: [
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    RquestCallService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
