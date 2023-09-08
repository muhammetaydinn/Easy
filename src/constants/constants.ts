import axios from 'axios';

export const baseUrl: string = 'http://172.29.0.1:8090';
export const header = {
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5LmRlbW9AZ21haWwuY29tIiwiaWF0IjoxNjk0MTkyMjczLCJleHAiOjE2OTYyNjU4NzN9.l1nwIrTEX8-V1n9k-EqoGSH6Crsmjxahz9J98mmVCUc',
};

// import { Article } from "./models/article";
//  export  const dummyArticle: Article[] = [
//     {
//       image: 'https://picsum.photos/200/300',
//       newsCategories: 'Sports',
//       newsUUID: '1',
//       text: 'lorem ipsum dolor sit amet',
//       title: 'lorem',
//       authorId: "author1",
//       creationTime: '2023-08-24T12:34:56Z',
//     },
//     {
//       image: 'https://picsum.photos/400/300',
//       newsCategories: 'string',
//       newsUUID: '2',
//       text: 'string',
//       title: 'string',
//       authorId: 'string',
//       creationTime: '2023-08-24T12:34:56Z',
//     },
//   ];
