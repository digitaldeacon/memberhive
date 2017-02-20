
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
    authorId: string;

    public deserialize(input: any): Note {
        this.id = input.id;
        this.uid = input.uid;
        this.type = input.type;
        this.text = input.text;
        this.icon = input.icon;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
        this.ownerId = input.ownerId;
        this.authorName = input.authorName;
        this.authorId = input.authorId;
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
