var React = require('react');
var Layout = require('./layout');

function packageList(props) {

    //var all_packages = props.packages_list;
    var all_packages = [];
    props.packages_list.map(item=>{
        all_packages.push(item)
    })

    var packageInfo = [];

    //Add the packages to appropriate tea(id) and then splice these packages
    //from all_packages variable
    function packagesReducer(type){
        
        if (all_packages.length < 1){
            packageInfo = [];
            return
        } 

        packageInfo = [];

        for(var i=0; i<all_packages.length; i++){
            if(all_packages[i].type.toString() == type){
                
                packageInfo.push({
                   id: all_packages[i]._id,
                   tea_name: all_packages[i].tea.name,
                   amount: all_packages[i].amount,
                   unit: all_packages[i].unit,
                   url: all_packages[i].url,
                   type: all_packages[i].type
                })

               all_packages.splice(i,1);
               i = i-1;
            }
        }
        //console.log(packageInfo)
    }    

    var copied_packages = {};

    function packageSorter(){
        //console.log('PACKAGES SORTER!!')
       // console.log(props.packages_list.length);
        for(var j=0; j<props.packages_list.length; j++){
            var type = props.packages_list[j].type
            if (copied_packages.type == undefined) {
                copied_packages.type = {}
            }

            var id = props.packages_list[j]._id
            copied_packages.type = {
                ...copied_packages.type,
                id : {
                    tea_name: props.packages_list[j].tea.name
                }
            }
        }
    }

     var sortionPackages = props.packages_list.map(package_item => {
        if (all_packages.length < 1){
            packageInfo = [];
            return
        } 
        if(packageInfo.length > 0){
            if (packageInfo[0].type == package_item.type) return
        }
        
        return (
            <div id={'div'+package_item._id}>
                <h2>{package_item.type}</h2>
                {packagesReducer(package_item.type.toString())}
                <ul id={package_item.id}>
                    {packageInfo.map(item => {
                        return(
                            <li id={item._id}>
                                <a class="tea_stock" href={item.url}>
                                    <p><strong>{item.tea_name}</strong> - {item.amount} {item.unit}</p>
                                </a>
                                
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    })

    return (
    <Layout>
        <h2>{props.title}</h2>
        <div class="list_container_producer">
            {sortionPackages}
        </div>
    </Layout>
    )
}

module.exports = packageList;