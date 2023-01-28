let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let searchmood = 'title';
let index;
//fun1:calculate total:
function getTotal(){
    if(price.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML= result;
        total.style.background='#040';
    } else{
        total.innerHTML= '';
        total.style.background='rgb(177, 4, 4)';
    }
}
//fun2:create product
let dataProduct;
if(localStorage.pro != null){
    dataProduct= JSON.parse(localStorage.pro);
}else{
     dataProduct = [];
}
submit.onclick = function(){
    let newProduct = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value != '' && price.value !=''&& category.value!= ''&& count.value < 100){
        if(mood==='create'){
            if(newProduct.count >1){
                for(let i =0; i < newProduct.count; i++){
                     dataProduct.push(newProduct);
                }
            }else{
                    dataProduct.push(newProduct);
            }
        }else{
            dataProduct[index] = newProduct;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearInputs();
    }
    

    localStorage.setItem('pro',JSON.stringify(dataProduct));
    show();
}
//fun3:clear inputs after creating new product:
function clearInputs(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}
//fun4: show the new data ion  the table 
function show(){
    let table = '';
    for(let i=0; i < dataProduct.length; i++){
         table+=`
         <tr>
         <td>${i+1}</td>
         <td>${dataProduct[i].title}</td>
         <td>${dataProduct[i].price}</td>
         <td>${dataProduct[i].taxes}</td>
         <td>${dataProduct[i].ads}</td>
         <td>${dataProduct[i].discount}</td>
         <td>${dataProduct[i].total}</td>
         <td>${dataProduct[i].category}</td>
         <td><button onclick="updatedata(${i})" id="update">update</button></td>
         <td><button onclick="deleteProduct(${ i })" id="delete">delete</button></td>
     </tr>
     `
    }
    document.getElementById('tbody').innerHTML=table;
    let btndelete = document.getElementById('deleteall');
    if(dataProduct.length>0){
        btndelete.innerHTML =
        `
             <button onclick="deleteAllData()">Delete All(${dataProduct.length})</button>
        `
    }else{
        btndelete.innerHTML=''; 
    }
    getTotal();
}
show();
//fun5: delete product
function deleteProduct(i){
     dataProduct.splice(i,1);
     localStorage.pro = JSON.stringify(dataProduct);
     show();
}
//delete all data product
function deleteAllData(){
    localStorage.clear();
    dataProduct.splice(0);
    show();
}
//update data of every product
function updatedata(i){
     title.value = dataProduct[i].title;
     price.value = dataProduct[i].price;
     taxes.value = dataProduct[i].taxes;
     ads.value = dataProduct[i].ads;
     discount.value = dataProduct[i].discount;
     getTotal();
     count.style.display ='none';
     category.value = dataProduct[i].category;
     submit.innerHTML ='Update';
     mood = 'Update';
     index = i;
     scroll({
        top:0,behavior:'smooth'
     })

}
//search product using title or category
function search(id){
    let searchinput = document.getElementById('search');
    if(id==='searchTitle'){
        searchmood = 'title'; 
    }else{
        searchmood = 'category';
    }
    searchinput.placeholder = 'Search By '+searchmood;
    searchinput.focus();
    searchinput.value = '';
    show();
}
function searchData(value){
    let table = '';
    if(searchmood == 'title'){
        for(let i=0; i < dataProduct.length; i++){
            if(dataProduct[i].title.includes(value.toLowerCase())){
                table+=`
         <tr>
         <td>${i}</td>
         <td>${dataProduct[i].title}</td>
         <td>${dataProduct[i].price}</td>
         <td>${dataProduct[i].taxes}</td>
         <td>${dataProduct[i].ads}</td>
         <td>${dataProduct[i].discount}</td>
         <td>${dataProduct[i].total}</td>
         <td>${dataProduct[i].category}</td>
         <td><button onclick="updatedata(${i})" id="update">update</button></td>
         <td><button onclick="deleteProduct(${ i })" id="delete">delete</button></td>
     </tr>
     `
            }else{

            }
            document.getElementById('tbody').innerHTML=table; 
        }
    }else{
        for(let i=0; i < dataProduct.length; i++){
            if(dataProduct[i].category.includes(value.toLowerCase())){
                table+=`
         <tr>
         <td>${i}</td>
         <td>${dataProduct[i].title}</td>
         <td>${dataProduct[i].price}</td>
         <td>${dataProduct[i].taxes}</td>
         <td>${dataProduct[i].ads}</td>
         <td>${dataProduct[i].discount}</td>
         <td>${dataProduct[i].total}</td>
         <td>${dataProduct[i].category}</td>
         <td><button onclick="updatedata(${i})" id="update">update</button></td>
         <td><button onclick="deleteProduct(${ i })" id="delete">delete</button></td>
     </tr>
     `
            }else{

            }
            document.getElementById('tbody').innerHTML=table; 
    }
}
}
