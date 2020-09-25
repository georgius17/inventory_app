var React = require('react');
var Layout = require('./layout');

function typeDelete(props) {

    var type_teas = props.type_teas.map(tea => {
        return (
            <h3><a href={tea.url}>{tea.name}</a></h3>
            )
    })

    var button = props.type_teas.length > 0 ? <button class="goBackBut"><a href={"/type/"+props.type._id}>Go back</a></button> : <form method="POST" action=""> <input type="password" name="password" id="password" placeholder="PASSWORD" /> <input class="deleteBut" type="submit" value="Delete" /></form>

    var errorMessage = props.error !== undefined ? props.error : '';

    return (
    <Layout>
        <div class="detail">
            {errorMessage}
            <h2>{props.type.name}</h2>
            <h3>{props.type.description !== undefined ? "Description:" + props.type.description : ""}</h3>
            <h2>{ props.type_teas.length > 0 ? 'First you have to delete associated teas' : 'Are you sure you want to delete this type?' }</h2>
            {type_teas}
            
        </div>
        <div class="detail_buttons">
            {button}
        </div>
    </Layout>
    )
}

module.exports = typeDelete;