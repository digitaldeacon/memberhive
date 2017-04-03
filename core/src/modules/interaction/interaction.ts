export interface Interaction {
    id: number;
    uid: string;
    type: string;
    typeId: number; // TODO: remove when types move to options
    text: string;
    icon: string;
    actions: any;
    author: any;
    createdAt: number;
    updatedAt: number;
    ownerId: string;
    authorId: string;
    recipients: Array<string>;
    recipientType: string;
    dueOn: string;
}

export interface InteractionType {
    id: number;
    type: string;
    iconString: string;
}
