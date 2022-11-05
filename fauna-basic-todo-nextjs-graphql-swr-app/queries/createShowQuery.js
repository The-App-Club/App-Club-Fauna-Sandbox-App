export const createShowQuery = `
  mutation createShow($data: ShowInput!) {
    createShow(data: $data) {
      _id
      _ts
      title
      watched
    }
  }
`;
