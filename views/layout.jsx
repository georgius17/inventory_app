var React = require('react');

function Layout(props) {

  return (
    <html>
      <head>
        <title>{props.title}</title>
        <link rel="stylesheet" type="text/css" href="/stylesheets/style.css" />
        </head>
      <header>
        <div class="home-logo">
          <a href="/">TEA INVENTORY </a> 
        </div>
        <ul class="menu">
          <li><a href='/teas'> Teas </a></li>
          <li><a href='/types'> Tea Types </a></li>
          <li><a href='/producers'> Producers </a></li>
          <li><a href='/packages'> Packages </a></li>
        </ul>
      </header>
      <body>
        <div class="container">
          {props.children}
        </div>
      </body>
      <footer>
      <p>ASDASD</p>
      </footer>
    </html>
  );
}

module.exports = Layout;