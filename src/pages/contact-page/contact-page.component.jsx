import React from 'react';

import './contact-page.styles.scss';

const ContactPage = () => {
  return (
    <div className="container contact-page">
      <h1>Contact</h1>
      <p>
        You can send me an email by clicking here{' '}
        <a href="mailto:quidwatchers@gmail.com">quidwatchers@gmail.com</a> if
        you need help or if you have any specific request.
      </p>
    </div>
  );
};

export default ContactPage;
