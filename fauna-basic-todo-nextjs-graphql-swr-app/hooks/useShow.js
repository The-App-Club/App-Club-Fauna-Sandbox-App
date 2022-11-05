import {useGraphqlClinet} from '@/pages/_app';
import {createShowQuery} from '@/queries/createShowQuery';
import {deleteShowQuery} from '@/queries/deleteShowQuery';
import {getShowsQuery} from '@/queries/getShowsQuery';
import {partialUpdateShowQuery} from '@/queries/partialUpdateShowQuery';
import {useState} from 'react';
import useSWR from 'swr';

const useShow = () => {
  const client = useGraphqlClinet();
  const [newShow, setNewShow] = useState('');

  const getShows = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          data: {
            getShows: {data},
          },
        } = await client.query(getShowsQuery).toPromise();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const addShows = (newShow) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          data: {createShow},
        } = await client
          .mutation(createShowQuery, {
            data: {
              title: newShow,
              watched: false,
            },
          })
          .toPromise();
        setNewShow('');
        resolve({
          result: {
            data: createShow,
          },
          statusCode: 200,
          message: `success`,
        });
      } catch (error) {
        reject({
          result: {
            data: {
              title: newShow,
            },
          },
          statusCode: 500,
          message: `something went wrong...`,
        });
      }
    });
  };

  const updateShow = (willUpdatedShow) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          data: {partialUpdateShow},
        } = await client
          .mutation(partialUpdateShowQuery, {
            id: willUpdatedShow._id,
            data: {
              watched: willUpdatedShow.watched,
            },
          })
          .toPromise();
        resolve({
          result: {
            data: partialUpdateShow,
          },
          statusCode: 200,
          message: `success`,
        });
      } catch (error) {
        reject({
          result: {
            data: willUpdatedShow,
          },
          statusCode: 500,
          message: `something went wrong...`,
        });
      }
    });
  };

  const deleteShow = (willDeletedShow) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          data: {deleteShow},
        } = await client
          .mutation(deleteShowQuery, {
            id: willDeletedShow._id,
          })
          .toPromise();
        resolve({
          result: {
            data: deleteShow,
          },
          statusCode: 200,
          message: `success`,
        });
      } catch (error) {
        reject({
          result: {
            data: willDeletedShow,
          },
          statusCode: 500,
          message: `something went wrong...`,
        });
      }
    });
  };
  return {
    newShow,
    setNewShow,
    getShows,
    addShows,
    updateShow,
    deleteShow,
  };
};

export default useShow;
