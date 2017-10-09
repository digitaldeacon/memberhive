export interface Tag {
    id: number;
    text: string;
    type: string;
    context: string;
    updated_by?: string;
    updated_at?: Date;
}

export interface Tags {
    context: string;
    type: string;
    tags: Tag[];
}