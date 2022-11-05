export const getShowsQuery = `
  query getShows {
    getShows {
      data {
        _id
        _ts
        title
        watched
      }
    }
  }
`;
