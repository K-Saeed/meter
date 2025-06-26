export class AddRoleDTO {
  name!: string;
  permissions?: { [key: string]: string[] };

  constructor(init?: Partial<AddRoleDTO>) {
    Object.assign(this, init);
  }
}