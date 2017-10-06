export interface Tag {
    id: number;
    name: string;
}

export interface Tags {
    context: string;
    tags: Tag[];
}