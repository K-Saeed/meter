export class Roles {
  id!: number;
  roleName!: string;
  roleType!: string;
  rolePermissions!: RolePermission[];
}

export class RolePermission {
  page!: Page;
  permission!: Permission;
}

export class Page {
  pageName!: string;
  rolePermissions!: RolePermission[];
}

export class Permission {
  permissionName!: string;
}

export class RoleDto {
  name!: string;
  pagePermission!: PageDto[];
}
export class PageDto {
  id!: number;
  name!: string;
  permissions!: string[];
}
