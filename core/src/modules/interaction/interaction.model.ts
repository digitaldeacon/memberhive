export interface Interaction {
    id: number;
    uid: string;
    type: string;
    actionType?: string;
    text: string;
    icon: string;
    actions: InteractionActionCollection[];
    author: any;
    createdAt: number;
    updatedAt: number;
    refId: string;
    authorId: string;
    recipients?: Array<string>;
    dueOn: string;
    visibility: string;
}

export interface InteractionPersonAction {
  doneOn?: Date;
  completedOn?: Date;
  completedBy?: number;
  response?: string;
  delegatedBy?: number;
  delegatedOn?: Date;
}

export interface InteractionActionCollection {
  [uid: string]: InteractionPersonAction[];
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

export interface InteractionCompletePayload {
  id: number;
  complete: boolean;
}
