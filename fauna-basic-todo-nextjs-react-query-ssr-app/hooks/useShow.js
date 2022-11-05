import {useState} from 'react';
import useSWR from 'swr';
import {queryClient} from '@/config/query';

export const SHOW_KEY = 'SHOW_KEY';

export const getShows = async () => {
  const response = await fetch('/api/getShows', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  const {data} = {...json};
  console.log(data);
  return data;
};

const useShow = () => {
  const [newShow, setNewShow] = useState('');

  const addShows = (newShow) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/addShow', {
          method: 'POST',
          body: JSON.stringify({
            title: newShow,
          }),
        });
        const body = await response.json();
        setNewShow('');
        queryClient.invalidateQueries([SHOW_KEY]);
        resolve(body);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

  const updateShow = (willUpdatedShow) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/updateShow', {
          method: 'POST',
          body: JSON.stringify(willUpdatedShow),
        });
        const body = await response.json();
        queryClient.invalidateQueries([SHOW_KEY]);
        resolve(body);
      } catch (error) {
        reject(error);
      }
    });
  };

  const deleteShow = (willDeletedShow) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/deleteShow', {
          method: 'POST',
          body: JSON.stringify(willDeletedShow),
        });
        const body = await response.json();
        queryClient.invalidateQueries([SHOW_KEY]);
        resolve(body);
      } catch (error) {
        reject(error);
      }
    });
  };
  return {
    newShow,
    setNewShow,
    addShows,
    updateShow,
    deleteShow,
  };
};

export default useShow;
