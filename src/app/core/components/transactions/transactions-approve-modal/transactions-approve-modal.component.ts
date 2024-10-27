import { Component, Input } from "@angular/core";
import { TransactionService } from "src/app/shared/service/transaction-call.service";

@Component({
  selector: "app-transactions-approve-modal",
  templateUrl: "./transactions-approve-modal.component.html",
  styleUrls: ["./transactions-approve-modal.component.css"],
})
export class TransactionsApproveModalComponent {
  @Input() transactionId?: string;

  constructor(private transactionService: TransactionService) {}

  updateStatus(transactionId: string, newStatus: string): void {
    this.transactionService
      .updateTransactionStatus(transactionId, newStatus)
      .subscribe({
        next: () => {
          window.location.reload();
          console.log(
            `Transaction ${transactionId} updated successfully to ${newStatus}`
          );
        },
        error: (err) => {
          window.location.reload();
          console.error("Error updating transaction status:", err);
        },
      });
  }
}
