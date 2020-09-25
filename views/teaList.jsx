var React = require('react');
var Layout = require('./layout');

function teaList(props) {

    var all_packages = props.packages

    var teaInfo = []

    //Add the packages to appropriate tea(id) and then splice these packages
    //from all_packages variable
    function packagesReducer(id){
        if (all_packages.length < 1){
            teaInfo = [];
            return
        } 
       
        teaInfo = [];

        for(var i=0; i<all_packages.length; i++){
            if(all_packages[i].tea._id.toString() == id){
                
                teaInfo.push({
                   id: all_packages[i]._id,
                   type: all_packages[i].type,
                   amount: all_packages[i].amount,
                   unit: all_packages[i].unit,
                   stock: all_packages[i].stock
                })

               all_packages.splice(i,1);
               i = i-1;
            }
        }

}


    

    var all_teas = props.teas.map(tea => {
        return (
        <div class="tea-item" id={tea._id}> 
             <h2>{tea.name}</h2> 
             <h3>{tea.type.name}</h3>
             {packagesReducer(tea._id)}
             {teaInfo.map(item => {
                 return (
                    <div class="tea_stock" id={item._id}>
                        <p>{item.type}</p>
                        <p>{item.amount}{item.unit}</p>
                        <p>{item.stock}</p>
                        {item.stock > 0 ? <p class="tea_stock_detail green">IN STOCK</p> : <p class="tea_stock_detail red">OUT OF STOCK</p> }
                    </div>
                    )
             })}
             <button class="tea-detail-but"><a href={"/tea/"+tea._id}>VIEW DETAIL</a></button>  
        </div>
        )
 })

    return (
    <Layout>
        <h2>{props.title}</h2>
        <div class="list_container">
            {all_teas}
        </div>
    </Layout>
    )
}

module.exports = teaList;