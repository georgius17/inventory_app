var React = require('react');
var Layout = require('./layout');

function teaDelete(props) {

    var tea_packages = props.packages.map(item => {
        return (
            <div class="tea_stock" id={item._id}>
                <a href={"/package/"+item._id}>
                    <p>{item.type}</p>
                    <p>{item.amount}{item.unit}</p>
                    <p>{item.stock}</p>
                    {item.stock > 0 ? <p class="tea_stock_detail green">IN STOCK</p> : <p class="tea_stock_detail red">OUT OF STOCK</p> }
                    <p>{item.price}€</p>
                </a>          
            </div>
        )
    })

    var button = props.packages.length > 0 ? <button class="goBackBut"><a href={"/tea/"+props.tea._id}>Go back</a></button> : <form method="POST" action=""> <input type="password" name="password" id="password" placeholder="PASSWORD" /> <input class="deleteBut" type="submit" value="Delete" /></form>

    var errorMessage = props.error !== undefined ? props.error : '';

    return (
    <Layout>
        <div class="detail">
            {errorMessage}
            <h2>{props.tea.name}</h2>
            <h3>Type: <mark>{props.tea.type.name}</mark></h3>
            <h3>{props.tea.producer !== undefined ? "Producer:" + props.tea.producer.name : ""}</h3>
            <h2>{ props.packages.length > 0 ? 'First you have to delete associated packages' : 'Are you sure you want to delete this tea?' }</h2>
            
            {tea_packages}
        </div>
        <div class="detail_buttons">
            {button}
        </div>
    </Layout>
    )
}

module.exports = teaDelete;