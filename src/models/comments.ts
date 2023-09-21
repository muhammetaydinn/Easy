export interface CommentRoot {
  content: Comment[];
  pageable: string;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}
export interface Comment {
  name: string;
  userId: string;
  image: any;
  text: string;
  creationTime: string;
}

export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}
