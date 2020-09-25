var React = require('react');
var Layout = require('./layout');

function producerList(props) {

    var all_producers = props.producers_list.map(producer => {
        return (<div class="producer-item" id={producer._id}> 
                    <h2>{producer.country}</h2> 
                    <h3>{producer.name}</h3> 
                    <button class="producer-detail-but"><a href={"/producer/"+producer._id}>VIEW DETAIL</a></button> 
                    </div>
                )
    })

    return (
    <Layout>
        <h2>{props.title}</h2>
        <div class="list_container_producer">
            {all_producers}
        </div>
    </Layout>
    )
}

module.exports = producerList;