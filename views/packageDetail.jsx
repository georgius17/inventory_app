var React = require('react');
var Layout = require('./layout');

function packageDetail(props) {

    return (
    <Layout>
        <div id={props.package_item._id}  class="detail">
            <h1>Package detail for tea: {props.package_item.tea.name}</h1>
            <h2>{props.package_item._id.toString()}</h2>
            <h3>Type: <mark>{props.package_item.type}</mark></h3>
            <h3>Amount: <mark>{props.package_item.amount} {props.package_item.unit}</mark></h3>
            <h3>Price: <mark>{props.package_item.price}€</mark></h3>
            <h3>Stock: <mark>{props.package_item.stock}</mark></h3>
        </div>
        <div class="detail_buttons">
            <button class="editBut"><a href={"/package/"+props.package_item._id+"/update"}>Edit</a></button>
            <button class="deleteBut"><a href={"/package/"+props.package_item._id+"/delete"}>Delete</a></button>
        </div>
    </Layout>
    )
}

module.exports = packageDetail;