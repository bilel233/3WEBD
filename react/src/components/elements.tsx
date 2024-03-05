export interface ChangeData {
  id: string;
  type: "add-cover" | "edit-book" | "add-book";
  timestamp: string;
  changes: [{ key: string }];
}

export interface SimplifiedChangeData {
  type: "add-cover" | "edit-book" | "add-book";
  timestamp: number;
  bookId: string;
  book?: BookInfo; // Propriété facultative

}


export interface BookInfo {
  title: string;
  authorName: string[];
  key: string;
  firstPublishYear: number;
  publishDate: string[];
  coverId: number;
  covers?: number[]; // Assuming 'covers' is an array of cover IDs
  by_statement?: string;

}
