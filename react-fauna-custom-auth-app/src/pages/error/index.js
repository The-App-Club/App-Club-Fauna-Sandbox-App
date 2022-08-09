import {useNavigate} from 'react-router-dom';

const ErrorPage = ({style}) => {
  const navigate = useNavigate();

  const handleReTryMagic = (e) => {
    navigate('/');
  };

  return (
    <>
      <div>{'Something Went Wrong...'}</div>
      <button onClick={handleReTryMagic}>retry magic!!</button>
    </>
  );
};

export {ErrorPage};
