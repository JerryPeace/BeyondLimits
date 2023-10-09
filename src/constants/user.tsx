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

export const userColumnNameMap = {
  [UserFieldKey.username]: 'User Name',
  [UserFieldKey.password]: 'Password',
  [UserFieldKey.address]: 'Address',
  [UserFieldKey.updatedAt]: 'Last Updated',
} as const;

export interface UserDataType {
  [UserFieldKey.id]: number;
  [UserFieldKey.username]: string;
  [UserFieldKey.address]: string;
  [UserFieldKey.updatedAt]: Date;
}
// user initialState
export const initialState: UserDataType = {
  [UserFieldKey.id]: 0,
  [UserFieldKey.username]: '',
  [UserFieldKey.address]: '',
  [UserFieldKey.updatedAt]: new Date(),
};
