
export class Note {
    id: number;
    uid: string;
    type: string;
    typeId: number; // TODO: remove when types move to options
    text: string;
    icon: string;
    actions: any = {
        doneOn: undefined,
        completedOn: undefined,
        completedBy: '',
        response: '',
        delegatedBy: '',
        delegatedOn: undefined
    };
    author: any = {
        id: '',
        name: '',
        avatar: ''
    };
    createdAt: number;
    updatedAt: number;
    ownerId: string;
    authorId: string;
    recipients: Array<string> = [];
    recipientType: string;
    dueOn: string;

    public deserialize(input: any): Note {
        this.id = input.id;
        this.uid = input.uid;
        this.type = input.type;
        this.typeId = input.typeId;
        this.text = input.text;
        this.icon = input.icon;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
        this.ownerId = input.ownerId;
        this.authorId = input.authorId;
        this.author = input.author;
        this.recipients = input.recipients;
        this.recipientType = input.recipientType;
        this.actions = input.actions;
        this.dueOn = input.dueOn;
        return this;
    }
}

export class NoteType {
    id: number;
    type: string;
    iconString: string;

    public deserialize(input: any): NoteType {
        this.id = input.id;
        this.type = input.type;
        this.iconString = input.iconString;
        return this;
    }
}
