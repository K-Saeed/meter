export class DashboardSummary {
    totalTransactions?: number;
    totalUsers?: number;
    waiting?: number;
    jobs?: number;
    paid?: number;
    customers?: number;
    approvedProducts?: number;
    totalRequests?: number;
    services?: number;
    consultations?: number;
    providers?: number;
    sellers?: number;
  
    constructor(init?: Partial<DashboardSummary>) {
      Object.assign(this, init);
    }
  }