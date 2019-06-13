
//封装遍历表格的所有的列 A-Z AA-AZ ...
function AZ(){
    let arr = [];
    let a = 0;
    console.log('进来了AZ')
    for (var i = 0; i < 26; i++) {
        arr.push(String.fromCharCode((65 + i)))
        // console.log(String.fromCharCode((65 + i)))  
        // console.log(i)   
    }
    for (let j = 0; j < 26; j++) {
        for (var c = 0; c < 26; c++) {
            arr.push(arr[j]+String.fromCharCode((65 + c)))  
            // console.log(arr[j]+String.fromCharCode((65 + c)))
        }  
    }
    return arr
}

function Table(arr,callback){
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].sheets.length; j++) {
            console.log(arr[i].sheets[j])
            
            
        }
        
    }
}

export { Table }