var React = require('react');
var Layout = require('./layout');

function teaDetail(props) {

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

    return (
    <Layout>
        <div id={props.tea._id} class="detail">
            <img src={props.tea.picture ? props.tea.picture : "https://res.cloudinary.com/dndibfvkz/image/upload/v1601043658/samples/tln36nnv02vp8kz4kuic.jpg"} class="teaImg" />
            <h2>{props.tea.name}</h2>
            <h4>ID:</h4>
            <h3 class="grey">{props.tea._id.toString()}</h3>
            <h4>Type:</h4>
            <h3 class="type">{props.tea.type.name}</h3>
            {props.tea.producer !== undefined ? <h4>Country of origin:</h4> : '' }
            <h3>{props.tea.producer !== undefined ? props.tea.producer.name : ''}</h3>
            <h4>Description:</h4>
            <p class="description grey">{props.tea.description}</p>
        </div>
        <div class="tea_detail_packages">
            <h3>Available packages:</h3>

            {props.packages.length > 0 ? <div class="tea_stock"> <p>TYPE</p> <p>AMOUNT</p> <p>STOCK</p> <p></p> <p>PRICE</p> </div> : 'This tea has no packages'}
            
            {tea_packages}
        </div>
        <div class="detail_buttons">
            <button class="editBut"><a href={"/tea/"+props.tea._id+"/update"}>Edit</a></button>
            <button class="deleteBut"><a href={"/tea/"+props.tea._id+"/delete"}>Delete</a></button>
        </div>
    </Layout>
    )
}

module.exports = teaDetail;