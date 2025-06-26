export class RolePermissionsDTO {
  id?: number;
  roleName?: string;
  permissions?: { [key: string]: string[] };

  constructor(init?: Partial<RolePermissionsDTO>) {
    Object.assign(this, init);
  }
}
