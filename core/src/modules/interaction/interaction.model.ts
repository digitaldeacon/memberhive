export interface Interaction {
    id: number;
    uid: string;
    type: string;
    text: string;
    icon: string;
    actions: any;
    author: any;
    createdAt: number;
    updatedAt: number;
    refId: string;
    authorId: string;
    recipients: Array<string>;
    dueOn: string;
    visibility: string;
}

export interface InteractionCollection {
    [uid: string]: Interaction[];
}

export interface InteractionType {
    id: number;
    type: string;
    iconString: string;
}

export interface InteractionPayload {
    id: string;
    me: string;
    noMarkup?: boolean;
    author?: string;
}

