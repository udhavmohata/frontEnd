var KeyConvert = null;
var finalObject = {};
const submitbtn=document.getElementById('submit');
const convertbtn=document.getElementById("Convert");
window.onload=function(){
    submitbtn.addEventListener('click',redirect);
    convertbtn.addEventListener('click',conversion);
}

function redirect(){
    var json = document.getElementById("myFile").value;
    var KJSON = JSON.parse(json)
    var keys = [];
    for(var k in KJSON) {
        keys.push(k);
        for(var i in KJSON[k]){
            if(isNaN(i)){
                keys.push(i);
            }
        }
    }
    KeyConvert = keys;
    assignKeys(keys,KJSON);}
    // catch(err){
    //     document.getElementById("JSON_error").innerHTML= err.message +". Enter a valid JSON.";
    // }


function assignKeys(keys,KJSON){

        var container = document.getElementById("container");
        while (container.hasChildNodes()) {
            container.removeChild(container.lastChild);
        }
        for (i=0;i<keys.length;i++){
            container.appendChild(document.createTextNode(keys[i]+":"));
            var input = document.createElement("input");
            input.type = "text";
            input.id = keys[i];
            input.value=KJSON[keys[i]];
            container.appendChild(input);
            container.appendChild(document.createElement("br"));
            container.appendChild(document.createElement("br"));
        }
    
    
}

function conversion(){
    //var finalcontainer = document.getElementById("finalcontainer");
    var finalKeys=[];
    for (i=0;i<KeyConvert.length;i++){
        finalKeys[i]=document.getElementById(KeyConvert[i])
        finalObject[KeyConvert[i]] = finalKeys[i].value;
    }
    alert("Successfully Converted to JSON");
    console.log(finalObject);
    RegistersendData()
}

async  function RegistersendData(){
    var buf = JSON.stringify(finalObject);
  $.ajax({
      method: "POST",
      crossDomain: true,
      headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json' 
      },
      url: "http://localhost:8080/api/convert/v2",
      dataType: "json",
      data: buf,
      async:false,
      success: function(result){
        console.log('successful');
        success.innerHTML="Convertion to JSON successful";
        setTimeout(loadpage,2000)
        },
      error:function(jqXHR, textStatus, errorThrown){
          if(jqXHR.status==400)
          {
            alert("BAD REQUEST");
          }
      }
       });
    }

