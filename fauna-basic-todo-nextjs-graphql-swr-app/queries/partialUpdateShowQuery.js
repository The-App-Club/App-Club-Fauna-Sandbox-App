export const partialUpdateShowQuery = `
  mutation partialUpdateShow($id: ID!, $data: PartialUpdateShowInput!) {
    partialUpdateShow(id: $id, data: $data) {
      _id
      _ts
      title
      watched
    }
  }
`;
