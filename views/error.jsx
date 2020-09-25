var React = require('react');

function Error(props) {
  return (
    <html>
      <head><title>{props.title}</title></head>
      <body>
        <h2>{props.message}</h2>
        <h3>{props.error.status}</h3>
      </body>
    </html>
  );
}

module.exports = Error;