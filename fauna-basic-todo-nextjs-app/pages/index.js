import {useState} from 'react';
import useSWR from 'swr';

export default function Home() {
  let [newShow, setNewShow] = useState('');

  function handleNewShow(e) {
    setNewShow(e.target.value);
  }

  const {
    data: shows,
    error,
    mutate,
  } = useSWR({}, async () => {
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
  });

  async function handleAddShow() {
    try {
      const response = await fetch('/api/addShows', {
        method: 'POST',
        body: JSON.stringify({
          title: newShow,
        }),
      });
      const body = await response.json();
      console.log(body);
      setNewShow('');
      mutate();
    } catch (error) {
      console.log(error);
    }
  }
  async function handleUpdateShow(e) {
    try {
      const response = await fetch('/api/updateShow', {
        method: 'POST',
        body: JSON.stringify({
          title: e.target.value,
          watched: e.target.checked,
        }),
      });
      const body = await response.json();
      console.log(body);
      mutate();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        return false;
      }}
    >
      <fieldset className="todo-list">
        <legend className="todo-list__title">Shows I want to watch</legend>
        <input
          name="newShow"
          type="text"
          value={newShow}
          onChange={handleNewShow}
        />
        <input type="button" value="Add" onClick={handleAddShow} />
        {shows?.map((show, index) => {
          return (
            <label className="todo-list__label" key={index}>
              <input
                type="checkbox"
                name="showWatched"
                value={show.data.title}
                onClick={handleUpdateShow}
                defaultChecked={show.data.watched}
              />
              <i className="check"></i>
              <span>{show.data.title}</span>
            </label>
          );
        })}
      </fieldset>
    </form>
  );
}
