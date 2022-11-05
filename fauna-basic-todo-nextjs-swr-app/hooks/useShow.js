import {useState} from 'react';
import useSWR from 'swr';

const useShow = () => {
  const [newShow, setNewShow] = useState('');

  const getShows = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/getShows', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        const {data} = {...json};
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

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
        resolve(body);
      } catch (error) {
        reject(error);
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
