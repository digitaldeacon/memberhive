export interface SettingsPayload {
    key: string;
    data: any;
}

export interface SysSettings {
    churchName: string;
}

export interface PersonSettings {
    list: Array<string>;
    maritalStatus: Array<any>;
}

export interface ContextButton {
    icon: string;
    link: string;
}