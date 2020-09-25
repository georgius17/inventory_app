var React = require('react');
var Layout = require('./layout');

function typeDetail(props) {

    var type_teas = props.type_teas.map(tea => {
        return (
            <h3><a href={tea.url}>{tea.name}</a></h3>
            )
    })

    var description = props.type.description !== undefined ? <h3>Description: <mark>{props.type.description}</mark></h3> : '';

    return (
    <Layout>
        <div id={props.type._id} class="detail">
        <img src={props.type.picture ? props.type.picture : "https://res.cloudinary.com/dndibfvkz/image/upload/v1601043864/samples/5_bb0ip3.jpg"} class="teaImg" />
            <h1>{props.type.name} Teas</h1>
            {description}
            <h3> Saved teas: </h3>
            {props.type_teas.length > 0 ? type_teas : 'This type has no saved teas'}
           
        </div>
        <div class="detail_buttons">
            <button class="editBut"><a href={"/type/"+props.type._id+"/update"}>Edit</a></button>
            <button class="deleteBut"><a href={"/type/"+props.type._id+"/delete"}>Delete</a></button>
        </div>
    </Layout>
    )
}

module.exports = typeDetail;