export enum UserFieldKey {
  id = 'id',
  username = 'username',
  password = 'password',
  address = 'address',
  updatedAt = 'updatedAt',
}

export interface UserFieldConfigItem {
  field: UserFieldKey;
  defaultValue: string;
  type: 'text' | 'password';
  label: string;
}

export type UserFieldConfig = {
  [key: string]: UserFieldConfigItem;
};

export const userFieldConfig: UserFieldConfig = {
  [UserFieldKey.username]: {
    field: UserFieldKey.username,
    type: 'text',
    label: 'User name',
    defaultValue: '',
  },
  [UserFieldKey.password]: {
    field: UserFieldKey.password,
    type: 'password',
    label: 'Password',
    defaultValue: '',
  },
  [UserFieldKey.address]: {
    field: UserFieldKey.address,
    type: 'text',
    label: 'Address',
    defaultValue: '',
  },
};

export interface UserDataType {
  [UserFieldKey.id]: number;
  [UserFieldKey.username]: string;
  [UserFieldKey.address]: string;
  [UserFieldKey.updatedAt]: Date;
}

export interface UserUpdateType {
  [UserFieldKey.id]: number;
  [UserFieldKey.username]: string;
  [UserFieldKey.password]: string;
  [UserFieldKey.address]: string;
  passwordChanged: boolean;
}
