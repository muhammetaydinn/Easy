export interface Follower {
  content: User[];
  pageable: string;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface User {
  userId: string;
  name: string;
  image: string;
  role: any;
  email: string;
  password: string;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export const initalFollowers: Follower = {
  content: [],
  pageable: 'INSTANCE',
  last: false,
  totalElements: 1,
  totalPages: 1,
  size: 1,
  number: 0,
  sort: {
    empty: true,
    sorted: false,
    unsorted: true,
  },
  first: true,
  numberOfElements: 1,
  empty: false,
};
