export interface MovieReviews {
    author: string;
    created_at: string;
    id:number;
    content:boolean;
    author_details:{avatar_path:string,rating:number};    
}