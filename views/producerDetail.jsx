var React = require('react');
var Layout = require('./layout');

function producerDetail(props) {

    var producer_teas = props.producer_teas.map(tea => {
        return (
            <h3><a href={tea.url}>{tea.name}</a></h3>
            )
    })

    return (
    <Layout>
        <div id={props.producer._id} class="detail">
            <h1>{props.producer.name} Teas</h1>
            <h3>Country of origin: <mark>{props.producer.country}</mark></h3>
            <h3>Established: <mark>{props.producer.established}</mark></h3>
            {producer_teas}
        </div>
        <div class="detail_buttons">
            <button class="editBut"><a href={"/producer/"+props.producer._id+"/update"}>Edit</a></button>
            <button class="deleteBut"><a href={"/producer/"+props.producer._id+"/delete"}>Delete</a></button>
        </div>
    </Layout>
    )
}

module.exports = producerDetail;