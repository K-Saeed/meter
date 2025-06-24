
export class EmployeeResponse {
  id!: number;
  name!: string;
  email!: string;
  phoneNumber!: string;
  registeredDate!: string; 
  role!: string;
  selected: boolean = false;

  constructor(init?: Partial<EmployeeResponse>) {
    Object.assign(this, init);
  }
}
