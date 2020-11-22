import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="w-10 mx-auto mt-20">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
