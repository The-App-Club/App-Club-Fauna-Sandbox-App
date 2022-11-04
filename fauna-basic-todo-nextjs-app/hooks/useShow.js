import {useState} from 'react';
import useSWR from 'swr';

const useShow = () => {
  const [newShow, setNewShow] = useState('');

  const getShows = async () => {
    try {
      const response = await fetch('/api/getShows', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      const {data} = {...json};
      return data;
    } catch (error) {
      return error;
    }
  };

  const addShows = async (newShow) => {
    try {
      const response = await fetch('/api/addShows', {
        method: 'POST',
        body: JSON.stringify({
          title: newShow,
        }),
      });
      const body = await response.json();
      setNewShow('');
      return body;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const updateShow = async (willUpdatedShow) => {
    try {
      const response = await fetch('/api/updateShow', {
        method: 'POST',
        body: JSON.stringify(willUpdatedShow),
      });
      const body = await response.json();
      return body;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteShow = async (willDeletedShow) => {
    try {
      const response = await fetch('/api/deleteShow', {
        method: 'POST',
        body: JSON.stringify(willDeletedShow),
      });
      const body = await response.json();
      return body;
    } catch (error) {
      console.log(error);
    }
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
