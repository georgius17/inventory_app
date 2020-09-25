var React = require('react');
var Layout = require('./layout');

function typeList(props) {

    var all_types = props.types_list.map(type => {
        return (<div class='type-item' id={type._id}> 
                    <h2>{type.name}</h2>
                    <button class="tea-detail-but"><a href={"/type/"+type._id}>VIEW DETAIL</a></button>  
                </div>
                    )
    })

    return (
    <Layout>
        <h2>{props.title}</h2>
        <div class="list_container">
            {all_types}
        </div>
    </Layout>
    )
}

module.exports = typeList;