import {createRoot} from 'react-dom/client';
import styled from '@emotion/styled';
import {Button, Alert} from '@mui/material';
import {useState, useLayoutEffect, useCallback} from 'react';
import {css} from '@emotion/css';
import {Item} from './components/Item';
import {Layout} from './layouts/default';
import {addDoc, watch} from './fauna/gift';
import '@fontsource/kaushan-script';
import './index.scss';

import {createData} from './plugins/utils';

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  max-width: 400px;
  width: 100%;
  height: 90vh;
`;

const StyledStream = styled.div`
  border: 1px solid;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-basis: 80%;
  max-height: 80%;
  overflow: hidden;
  overflow-y: auto;
  @media screen and (max-width: 768px) {
  }
`;

const StyledMessage = styled.div`
  border: 1px solid;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 20%;
  flex-basis: 20%;
  padding: 1rem;
`;

const App = () => {
  const [refId, setRefId] = useState(null);
  const [cachedData, setCachedData] = useState([]);
  const [messageInfo, setMessageInfo] = useState(null);
  const logger = useCallback((e) => {
    setMessageInfo(e);
  }, []);

  const add = async (e) => {
    try {
      const response = await addDoc({itemInfo: createData()});
      setRefId(response.refId);
      setCachedData([...cachedData, response.data]);
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

  const reset = (e) => {
    setTimeout(() => {
      setCachedData([]);
    }, 400);
  };
  return (
    <>
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          gap: 1rem;
        `}
      >
        <Button variant="outlined" onClick={add}>
          Add
        </Button>
      </div>
      <StyledContainer>
        <StyledStream>
          <ul className="list">
            {cachedData.map((item, index) => {
              return (
                <Layout key={index} tearDown={reset}>
                  <Item
                    message={item.message}
                    name={item.name}
                    thumbnail={item.thumbnail}
                    price={item.price}
                  />
                </Layout>
              );
            })}
          </ul>
        </StyledStream>
        <StyledMessage>
          {messageInfo && (
            <Alert
              severity="success"
              className={css`
                width: 100%;
              `}
            >
              <p>
                {`support me by `}
                <b>{messageInfo.name}</b>
                <b>{` $ ${messageInfo.price}`}</b>
              </p>
            </Alert>
          )}
        </StyledMessage>
      </StyledContainer>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
