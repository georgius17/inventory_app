var React = require('react');
var Layout = require('./layout');

function producerForm(props) {


  var errorMessage = ''
  if (props.errors){
    errorMessage = props.errors.map(error => {
     return <h5>{error.msg}</h5>
    })
  }

  var passwordInput = props.producer !== undefined ?  <input type="password" name="password" id="password" placeholder="PASSWORD" /> : ''

  return (
    <Layout title={props.title}>
        <div>
            <h2> Add a new producer</h2>
            {errorMessage}
            <form class="teaForm" method="POST" action="">
                <label for="country_name">Country name:</label>
                <input name="country_name" type="text" id="country_name" value={props.producer !== undefined ? props.producer.country : ''} placeholder="Japan" />

                <label for="farm_name">Farm name:</label>
                <input name="farm_name" type="text" id="farm_name" value={props.producer !== undefined ? props.producer.name : ''} placeholder="Mountains of central Taiwan" />

                <label for="established">Year of establishment: </label>
                <input name="established" type="number" value={props.producer !== undefined ? props.producer.established : ''} id="established" placeholder="1950" />

                {props.producer !== undefined ? <label class="passwordLabel" for="password">You have to enter the password </label> : ''}
                {passwordInput}

                <input class="goBackBut" type="submit" value="Submit" />
            </form>  
            <h4><a href="/">Go back</a></h4>

        </div>
    </Layout>
  );
}

module.exports = producerForm;