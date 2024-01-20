import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertDismissibleExample({error,status = 0,success = 0}) {
  const [show, setShow] = useState(!status);

  if (show) {
    return (
      <Alert variant={success ? "success" : "danger"} onClose={() => setShow(status)} dismissible>
        {
          !success ? <Alert.Heading>Oh snap! You got an error!</Alert.Heading> : <Alert.Heading>Hurrrrrrrrrr !!!!!!!</Alert.Heading>
        }
        <p>
        {error}
        </p>
      </Alert>
    );
  }
}

export default AlertDismissibleExample