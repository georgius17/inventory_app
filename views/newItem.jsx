var React = require('react');

function newItem(props) {

  return (
        <div class="addNewItem">
            <img src={props.imgSrc} />
            <h5>{props.description}</h5>
            <a class="newLink" href={props.linkSrc}>{props.link}</a>
        </div>
  );
}

module.exports = newItem;