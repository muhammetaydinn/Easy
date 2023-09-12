export interface Root {
  content: Content[];
  pageable: Pageable;
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

export interface Content {
  newsId: string;
  title: string;
  text: string;
  image?: string;
  author: Author;
  creationTime: string;
  category: Category;
  comments: Comment[];
}

export interface Author {
  userId: string;
  name: string;
  image?: string;
  userToken: string;
  role: number;
}

export interface Category {
  categoryId: number;
  name: string;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
export interface Comment {
  commentUUID: string;
  text: string;
  author: Author;
  creationTime: string;
}
