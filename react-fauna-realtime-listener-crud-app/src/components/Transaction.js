import {css} from '@emotion/css';
import {Item} from './Item';
import {Button} from '@mui/material';
import {
  useMemo,
  createRef,
  useLayoutEffect,
  useState,
  useCallback,
} from 'react';
import {default as chance} from 'chance';
import {
  addDoc,
  watch,
  getDocs,
  removeDocs,
  removeDoc,
  updateDoc,
} from '../fauna/shop';
import {LoremIpsum} from 'lorem-ipsum';
import useSWR from 'swr';
import FlipMove from 'react-flip-move';
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    min: 2,
    max: 4,
  },
  wordsPerSentence: {
    min: 3,
    max: 6,
  },
});
const Transaction = () => {
  const [refId, setRefId] = useState(null);

  const imageURL = ({id}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`https://picsum.photos/id/${id}/200/300`);
        resolve(response.url);
      } catch (error) {
        reject(error);
      }
    });
  };
  const createItem = async () => {
    return {
      name: chance().name(),
      price: chance().integer({min: 100, max: 500}),
      category: chance().cc_type(),
      thumbnail: await imageURL({id: chance().integer({min: 1, max: 100})}),
      description: lorem.generateParagraphs(1),
    };
  };

  const logger = useCallback((e) => {
    console.log('[logger]', e);
  }, []);

  const handleAdd = async (e) => {
    const itemInfo = await createItem();
    try {
      const response = await addDoc({itemInfo});
      setRefId(response.refId);
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = useCallback(async (e, {refId}) => {
    try {
      const response = await updateDoc({
        collectionName: `shop`,
        refId,
        updateInfo: {
          price: chance().integer({min: 100, max: 500}),
          category: chance().cc_type(),
          thumbnail: await imageURL({id: chance().integer({min: 1, max: 100})}),
          description: lorem.generateParagraphs(1),
        },
      });
      console.log(response);
      mutate();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDelete = useCallback(async (e, {refId}) => {
    try {
      const response = await removeDoc({collectionName: `shop`, refId});
      console.log(response);
      mutate();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDeleteAll = async (e) => {
    try {
      const response = await removeDocs({collectionName: `shop`});
      console.log(response);
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    if (refId) {
      const stream = watch({logger, refId});
      return () => {
        stream.close();
      };
    }
  }, [refId, logger]);

  const {data, error, mutate} = useSWR('a', async (a) => {
    try {
      const {status, result, message} = await getDocs();
      if (status === 200) {
        return result;
      } else {
        return message || `something went wrong...`;
      }
    } catch (error) {
      return error;
    }
  });

  const itemRefs = useMemo(() => {
    return data?.map((item, index) => {
      return createRef();
    });
  }, [data]);

  // console.log('[data]', data);

  if (error) {
    return <p>something went wrong...</p>;
  }

  return (
    <div
      className={css`
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        height: 560px;
        overflow: hidden;
        overflow-y: auto;
      `}
    >
      <div
        className={css`
          position: sticky;
          width: 100%;
          top: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          background: white;
          z-index: 1;
          margin-top: 3vh;
        `}
      >
        <Button variant="outlined" onClick={handleAdd}>
          Add Item
        </Button>
        <Button variant="outlined" onClick={handleDeleteAll}>
          All Delete
        </Button>
      </div>
      <FlipMove
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 2rem;
          margin: 3vh 0;
        `}
      >
        {data?.map((itemInfo, index) => {
          return (
            <Item
              ref={itemRefs[index]}
              key={index}
              name={itemInfo.name}
              paragraph={itemInfo.description}
              thumbnail={itemInfo.thumbnail}
              refId={itemInfo.refId}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          );
        })}
      </FlipMove>
    </div>
  );
};

export {Transaction};
