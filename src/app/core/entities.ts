export interface IPicture {
    id: string;
    cropped_picture: string;
    author?: string;
    camera?: string;
    tags?: string;
    full_picture?: string;
    tagList?: string[];
    index?: number;
}

export interface IPicPage {
    pictures: IPicture[];
    page: number;
    pageCount: number;
    hasMore: boolean;
}