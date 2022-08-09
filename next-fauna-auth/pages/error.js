import Link from 'next/link';

const Error = ({}) => {
  return (
    <>
      <div>{'Error Page'}</div>
      <Link href="/">
        <a>Go To Home Page</a>
      </Link>
    </>
  );
};

export default Error;
