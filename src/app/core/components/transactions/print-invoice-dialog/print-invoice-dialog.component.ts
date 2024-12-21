import { Component } from '@angular/core';
import { TransactionService } from 'src/app/shared/service/transaction-call.service';
import { FileResponse } from '../../work-submission/models/file-response';

@Component({
  selector: 'app-print-invoice-dialog',
  templateUrl: './print-invoice-dialog.component.html',
  styleUrls: ['./print-invoice-dialog.component.css']
})
export class PrintInvoiceDialogComponent {

  startDate!:Date;
  endDate!:Date;

  constructor(private transactionService:TransactionService){}
  

  getInvoices(type:string){
    
    this.transactionService.getInvoicesByDate(type,this.startDate, this.endDate).subscribe({
      next:(n)=>{
        console.log(n);
        if(n != null){
          this.downloadFile(n)
        }else{
          alert("No Invoices Between These Two Dates")
        }
      },
      error:(e)=>{
        console.log(e);
      }
    })
  }


  downloadFile(fileResponse:FileResponse): void {
    if (fileResponse.fileType === 'application/pdf') {
      window.open(fileResponse.filePath, '_blank');
    }else{
      const link = document.createElement('a');
      link.href = fileResponse.filePath;
      link.download = fileResponse.fileName;
      link.type = fileResponse.fileType;
      
      document.body.appendChild(link);
      link.click();
    
      document.body.removeChild(link);
    }
  }
  
  isEnabled(): boolean {
    return this.startDate != null && this.endDate != null;
  }
  

}
