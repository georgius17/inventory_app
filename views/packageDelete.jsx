var React = require('react');
var Layout = require('./layout');

function packageDelete(props) {

    var errorMessage = props.error !== undefined ? props.error : '';

    return (
    <Layout>
        <div class="detail">
            {errorMessage}
            <h2>Are you sure you want to delete the package for <u>{props.package_item.tea.name}</u>  with ID: <u>{props.package_item._id.toString()}</u>  ? </h2>
            <h3>Type: <mark>{props.package_item.type}</mark></h3>
            <h3>Amount: <mark>{props.package_item.amount} {props.package_item.unit}</mark> </h3>
            <h3>Price: <mark>{props.package_item.price} €</mark></h3>
            <h3>Stock: <mark>{props.package_item.stock}</mark></h3>
        </div>
        <div class="detail_buttons">
            <form method="POST" action="">
                <input type="password" name="password" id="password" placeholder="PASSWORD" />
                <input class="deleteBut" type="submit" value="Delete" />
            </form>
        </div>
    </Layout>
    )
}

module.exports = packageDelete;