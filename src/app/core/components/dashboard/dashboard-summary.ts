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
  usersCountPerMonth?: UsersCountPerMonth[];

  latestUserDate?: number;
  latestUser?: string;
  proposal?: string;
  proposalDate?: number;
  request?: string;
  requestDate?: number;

  constructor(init?: Partial<DashboardSummary>) {
    Object.assign(this, init);
  }
}

export class UsersCountPerMonth {
  month!: number;
  totalUsers!: number;
  customers!: number;
  providers!: number;
  sellers!: number;

  constructor(init?: Partial<UsersCountPerMonth>) {
    Object.assign(this, init);
  }
}
