
export class Note {
    id: number;
    uid: string;
    type: string;
    text: string;
    icon: string;
    authorName: string;
    createdAt: number;
    updatedAt: number;
    ownerId: string;

    public deserialize(input: any): Note {
        this.id = input.id;
        this.uid = input.uid;
        this.type = input.type;
        this.text = input.text;
        this.authorName = input.authorName;
        this.icon = input.icon;
        this.createdAt = input.createdAt;
        this.ownerId = input.ownerId;
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
