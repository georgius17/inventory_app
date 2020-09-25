var React = require('react');
var Layout = require('./layout');

function producerDelete(props) {

    var producer_teas = props.producer_teas.map(tea => {
        return (
            <h3><mark><a href={tea.url}>{tea.name}</a></mark></h3>
            )
    })

    var errorMessage = props.error !== undefined ? props.error : '';

    return (
    <Layout>
        <div class="detail">
            {errorMessage}
            <h2>Are you sure you want to delete <u>{props.producer.name}</u>  ? </h2>
            <h3>Country of origin: <mark>{props.producer.country}</mark> </h3>
            <h3>Established: <mark>{props.producer.established}</mark> </h3>
            <h3>This producer contains following teas: </h3>
            {producer_teas}
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

module.exports = producerDelete;