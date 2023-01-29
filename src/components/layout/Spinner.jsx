import React from 'react';
import spinner from './assets/spinner.gif';

function Spinner() {
  return (
    <div className='w-100 mt-20'>
      <img
        src={spinner}
        alt='Loading...'
        className='text-center mx-auto'
        width={180}
        // style={{ width: '100px', margin: 'auto', display: 'block' }}
      />
    </div>
  );
}

export default Spinner;
