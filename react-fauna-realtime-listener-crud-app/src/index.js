import {createRoot} from 'react-dom/client';
import styled from '@emotion/styled';
import '@fontsource/kaushan-script';
import './index.css';
import {Transaction} from './components/Transaction';

const StyledContainer = styled.div`
  display: flex;
  border: 1px solid;
  margin: 0 auto;
  max-width: 400px;
  flex-direction: column;
  @media screen and (max-width: 768px) {
  }
`;

const App = ({context}) => {
  return (
    <StyledContainer>
      <Transaction />
    </StyledContainer>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
