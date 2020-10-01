var obj = [{body:"b1"},{body:"b2"}]

//console.log(JSON.stringify(obj))

var item;

for (item of obj) {
    console.log(item)
    console.log(item.body)
    //console.log(obj[item].body)
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~")
}