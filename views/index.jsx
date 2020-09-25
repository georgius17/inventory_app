var React = require('react');
var Layout = require('./layout');
var NewItem = require('./newItem')

function Index(props) {

  return (
    <Layout title={props.title}>
  
          <q>You can never get a cup of tea large enough or a book long enough to suit me. </q>
          

        <div class="headerDiv">
            <h1>Welcome to Tea Inventory app!</h1>
            <h2> Thats what we have so far:</h2>
            <h4><u>{props.data.tea_count} Teas</u>, <u>{props.data.tea_package_count} Packages</u> and <u>{props.data.type_count} Tea Types </u> from <u> {props.data.producer_count}</u>  different <u>Producers </u> </h4>
        </div>

        <div class="addNewContainer">
            <NewItem imgSrc="images/1.jpg" description="" linkSrc="/tea/create" link="ADD NEW TEA" />
            <NewItem imgSrc="images/2.jpg" description="" linkSrc="/type/create" link="ADD NEW TEA TYPE" />
            <NewItem imgSrc="images/4.jpg" description="" linkSrc="/producer/create" link="ADD NEW PRODUCER" />
            <NewItem imgSrc="images/7.jpg" description="" linkSrc="/package/create" link="ADD NEW PACKAGE" />
        </div>
    </Layout>
    
  );
}

module.exports = Index;