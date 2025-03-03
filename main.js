let URL = "http://localhost:3000/posts";
var global;
LoadSync();
function Load(){
    fetch(URL).then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);
    }).catch(function(error){
        console.log(error);
    })
}
async function LoadSync(){
    try {
        let response = await fetch(URL);
        let posts = await response.json();
        posts = posts.filter(p=>!p.isDeleted);
        global = posts;
        let body = document.getElementById("body");
        body.innerHTML="";
        for (const post of posts) {
            body.innerHTML+=ConvertFromObjToHTML(post);
        }
    } catch (error) {
        console.log(error);
    }
}
function ConvertFromObjToHTML(post){
    let string = `<tr>`;
    string +=`<td>${post.id}</td>`
    string +=`<td>${post.title}</td>`
    string +=`<td>${post.views}</td>`
    string +=`<td><button onclick="Delete(${post.id});return false">Delete </button></td>`
    string += `</tr>`
    return string;
}

function CheckExist(id){
    return global.find(function(p){
        return p.id==id
    })
}
function getMax(){
    let ids = global.map(p=>Number.parseInt(p.id)); 
    return Math.max(...ids);
}

function Save(){
    let id = document.getElementById("id").value;
    if(id.length==0||isNaN(id)){
        id = (getMax()+1)+"";
    }
    let Obj = {
        id:id,
        title:document.getElementById("title").value,
        views:document.getElementById("views").value
    }
    if(CheckExist(id)){
        fetch(URL+"/"+id,{
            method:'PUT',
            body:JSON.stringify(Obj),
            headers:{
                "Content-Type":"application/json",
            }
        }).then(function(){
            LoadSync();
        })
    }else{
        fetch(URL,{
            method:'POST',
            body:JSON.stringify(Obj),
            headers:{
                "Content-Type":"application/json",
            }
        }).then(function(){
            LoadSync();
        })
    }
}

function Delete(id){
    let post = CheckExist(id);
    if(post){
        post.isDeleted = true;
        fetch(URL+"/"+id,{
            method:'PUT',
            body:JSON.stringify(post),
            headers:{
                "Content-Type":"application/json",
            }
        }).then(function(){
            LoadSync();
        })
    }else{
        //
    }
    
}

