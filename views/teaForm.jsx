var React = require('react');
var Layout = require('./layout');

function teaForm(props) {

  var all_types = props.types.map(type => {
    if (props.tea !== undefined) {
      if (props.tea.type._id.toString() == type._id.toString()){
        return <option selected id={type._id} value={type._id} > {type.name} </option>
      }
    }
    return <option id={type._id} value={type._id} > {type.name} </option>
  })

  var all_producers = props.producers.map(producer => {
    if (props.tea !== undefined) {
      if (props.tea.producer !== undefined){
        if (props.tea.producer._id.toString() == producer._id.toString()){
        return <option selected id={producer._id} value={producer._id}> {producer.name} </option>
      }
      }
    }
    return <option id={producer._id} value={producer._id}> {producer.name} </option>
  })

  var errorMessage = ''
  if (props.errors){
    errorMessage = props.errors.map(error => {
     return <h5>{error.msg}</h5>
    })
  }

  var passwordInput = props.tea !== undefined ?  <input type="password" name="password" id="password" placeholder="PASSWORD" /> : ''

  return (
    <Layout title={props.title}>
        <div>
            {errorMessage}
            <h2> Add a new tea</h2>
            <form class="teaForm" method="POST" action="" enctype="multipart/form-data">
                <label for="name">Tea name:</label>
                <input name="name" type="text" id="name" required placeholder="Oolong tea" value={props.tea !== undefined ? props.tea.name : ''} />

                <label for="type">Choose a type:
                  <select class="select-css" name="type" id="type">
                    {all_types}
                  </select>
                </label>

                <label for="producer">Choose a producer:
                  <select class="select-css" name="producer" id="producer">
                    {all_producers}
                  </select>
                </label>

              <label for="description">Description:</label>
              <textarea name="description" id="description" value={props.tea !== undefined ? props.tea.description : ''}  /> 
              {/* <input name="description" type="text" id="description" value={props.tea !== undefined ? props.tea.description : ''} placeholder="Young fresh tea leaves" /> */}
              <label for="pictureInput">Upload a picture: </label>
              <input name="pictureInput" type="file" id="pictureInput" />

              {props.tea !== undefined ? <label class="passwordLabel" for="password">You have to enter the password </label> : ''}
              {passwordInput}

              <input class="goBackBut" type="submit" value="Submit" />
            </form>  
            <h4><a href="/">Go back</a></h4>

        </div>
    </Layout>
  );
}

module.exports = teaForm;