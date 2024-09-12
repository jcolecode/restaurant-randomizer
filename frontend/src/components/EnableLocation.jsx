import React from 'react';
import { Link } from 'react-router-dom';

function EnableLocation() {
  return (
    <><div id='stars'></div><div className="container text-center">
          <h1>Enable Location Services</h1>
          <p>To use this app, please enable geolocation services in your browser settings.</p>
          <a href='https://support.google.com/chrome/answer/142065?hl=en&co=GENIE.Platform%3DDesktop'  target="_blank" rel="noopener noreferrer" className='btn btn-secondary border border-black m-1 mb-3'>Google Chrome Guide</a>
          <p>After enabling, please return to the <Link to="/">home page</Link>.</p>
      </div></>
  );
}

export default EnableLocation;
