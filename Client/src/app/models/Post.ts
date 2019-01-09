import {Comment} from './Comment';

export class Post {
    text: string;
    img: string;
    createdData: Date;
    author: string;
    _id: string;
    comments: Comment[];
    newComment: string;
}
