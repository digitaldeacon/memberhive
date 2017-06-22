export enum SettingType {layout, people, system, dashboard, profile}

export interface SettingsPayload {
    type: SettingType;
    data: any;
}

export interface SystemSettings {
    churchName: string;
    googleApiKey?: string;
}

export interface LayoutSettings {
    showDrawer: boolean;
    contextButtons?: ContextButton[];
}

export interface PersonSettings {
    list: Array<string>;
    maritalStatus: Array<any>;
}

export interface ContextButton {
    icon: string;
    link: string;
    title?: string;
}