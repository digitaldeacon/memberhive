import { Address } from '../../common/common.model';

export enum SettingType {
  layout,
  people,
  system,
  dashboard,
  profile,
  filter
}

export interface SettingsPayload {
  type: SettingType;
  data: any;
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
  filter: string;
}

export interface ContextButton {
  icon: string;
  link: string;
  title?: string;
}
