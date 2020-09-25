var React = require('react');
var Layout = require('./layout');

function typeForm(props) {


  var errorMessage = ''
  if (props.errors){
    errorMessage = props.errors.map(error => {
     return <h5>{error.msg}</h5>
    }) 
  }

  var passwordInput = props.type !== undefined ?  <input type="password" name="password" id="password" placeholder="PASSWORD" /> : ''

  return (
    <Layout title={props.title}>
        <div>
            <h2> Add a new tea type</h2>
            {errorMessage}
            <form class="teaForm" method="POST" action="" enctype="multipart/form-data">
                <label for="name">Type name:</label>
                <input name="name" type="text" id="name" value={props.type !== undefined ? props.type.name : ''} placeholder="Green" />

                <label for="description">Type name:</label>
                <input name="description" type="text" id="description" value={props.type !== undefined ? props.type.description : ''} placeholder="Green teas are fermented..." />

                <label for="pictureInput">Upload a picture: </label>
                <input name="pictureInput" type="file" id="pictureInput" />

                {props.type !== undefined ? <label class="passwordLabel" for="password">You have to enter the password </label> : ''}
                {passwordInput}

                <input class="goBackBut" type="submit" value="Submit" />
            </form>  
            <h4><a href="/">Go back</a></h4>

        </div>
    </Layout>
    
  );
}

module.exports = typeForm;