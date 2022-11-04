import {css, cx} from '@emotion/css';

const Spacer = ({height = `1rem`, className = css``}) => {
  return (
    <div
      className={cx(
        css`
          height: ${height};
        `,
        className
      )}
    />
  );
};

export default Spacer;
