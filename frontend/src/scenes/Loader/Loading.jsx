import Spinner from 'react-bootstrap/Spinner';
import React from 'react';

const Loading = () => {
  return (
    <Spinner animation="border" role="status" style={{width : "100px" ,height : "100px",display : "block", margin : "auto" }}  >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default Loading;