export class Post {
    id?:string;
    title!: string;
    author!: string;
    authorID!: string;
    content!: string;
    image?: string;
    createdOn!: Date;
}
