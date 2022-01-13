import { Address, Filter } from '../../common/common.model';

export enum SettingType {
  LAYOUT = 'layout',
  PEOPLE = 'people',
  SYSTEM = 'system',
  DASHBOARD = 'dashboard',
}

export interface SettingsPayload {
  section: SettingType;
  key: string;
  value: any;
}

export interface SystemSettings {
  churchName: string;
  churchAddress?: Address;
  googleApiKey?: string;
}

export interface LayoutSettings {
  showDrawer?: boolean;
  title?: string;
  module?: string;
  contextButtons?: ContextButton[];
}

export interface PersonSettings {
  list: Array<string>;
  filter: Filter;
}

export interface ContextButton {
  icon: string;
  link: string;
  title?: string;
}
