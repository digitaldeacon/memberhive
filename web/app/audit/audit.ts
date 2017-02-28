export class ActionLog {
    id: number;
    context: string;
    refId: string;
    type: string;
    diff: string;
    refUser: string;
    createdAt: number;
    updatedAt: number;

    public deserialize(input: any): ActionLog {
        this.id = input.id;
        this.context = input.context;
        this.refId = input.refId;
        this.type = input.type;
        this.diff = input.diff;
        this.refUser = input.refUser;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
        return this;
    }
}
