import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="w-20 mx-auto mt-20">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
