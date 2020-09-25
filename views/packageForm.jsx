var React = require('react');
var Layout = require('./layout');

function packageForm(props) {

  var teas = props.teas.map(tea => {
    if (props.packageItem !== undefined) {
      if (props.packageItem.tea._id.toString() == tea._id.toString()){
        return <option selected value={tea._id} id={tea._id} > {tea.name} </option>
      }
    }
    return <option value={tea._id} id={tea._id} > {tea.name} </option>
  })

  var errorMessage = ''
  if (props.errors){
    errorMessage = props.errors.map(error => {
     return <h5>{error.msg}</h5>
    })
    
  }

  var typesOptions = [{name: 'Tea bags'}, {name: 'Loose tea'}, {name: 'Compressed tea'}, {name: 'Instant tea'}, {name: 'Bottled tea'}]

  var unitOptions = [{name: 'g'}, {name: 'ml'}, {name: 'pcs'}];

  var units = unitOptions.map(unit => {
    if (props.packageItem !== undefined){
      if (props.packageItem.unit == unit.name){
        return <option selected value={unit.name} > {unit.name} </option>
      }
    }
    return <option value={unit.name} > {unit.name} </option>
  })

  var types = typesOptions.map(type => {
    if (props.packageItem !== undefined){
      if (props.packageItem.type == type.name){
        return <option selected value={type.name} > {type.name} </option>
      }
    }
    return <option value={type.name} > {type.name} </option>
  })

  var passwordInput = props.packageItem !== undefined ?  <input type="password" name="password" id="password" placeholder="PASSWORD" /> : ''

  return (
    <Layout title={props.title}>
        <div>
            <h2> Add a new package</h2>
            {errorMessage}
            <form class="teaForm" method="POST" action="">

                <label for="tea">Choose a tea:
                  <select class="select-css" name="tea" id="tea">
                    {teas}
                  </select>
                </label>

                <label for="type">Choose a type:
                  <select class="select-css" name="type" id="type">
                    {types}
                  </select>
                </label>

                <label for="amount">Amount: </label>
                <input value={props.packageItem !== undefined ? props.packageItem.amount : ''} name="amount" type="number" id="amount" placeholder="100" />

                <label for="unit">Choose an unit:
                  <select class="select-css" name="unit" id="unit">
                    {units}
                  </select>
                </label>

                <label for="price">Price in €: </label>
                <input value={props.packageItem !== undefined ? props.packageItem.price : ''} name="price" type="number" id="price" placeholder="5" />

                <label for="stock">Number in stock: </label>
                <input value={props.packageItem !== undefined ? props.packageItem.stock : ''} name="stock" type="number" id="stock" placeholder="5" />

                {props.packageItem !== undefined ? <label class="passwordLabel" for="password">You have to enter the password </label> : ''}
                {passwordInput}

                <input class="goBackBut" type="submit" value="Submit" />   
            </form>  
            <h4><a href="/">Go back</a></h4>

        </div>
    </Layout>
  );
}

module.exports = packageForm;