export const deleteShowQuery = `
  mutation deleteShow($id: ID!) {
    deleteShow(id: $id) {
      _id
      _ts
      title
      watched
    }
  }
`;
