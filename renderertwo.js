var count=0;
const folder='/Users/msivraj/Documents/2006_12_25';
var PouchDB = require('pouchdb');
var db = new PouchDB('my_db');
var remoteCouch=false;



// this is all for pouchdb
// function addTodo(text){
//   var todo={
//     _id:new Date().toISOString(),
//     title: text,
//     completed: false
//   };
//   
//   db.put(todo, function callback(err, result){
//     if(!err){
//       console.log('Successfully posted a todo!');
//     }
//   });
// }
// 
// function showTodos(){
//   db.allDocs({include_docs:true,descending:true}, function(err,doc){
//     redrawTodosUI(doc.rows);
//   });
// }





window.addEventListener("DOMContentLoaded", function(event) {
  startApp();
    window.setTimeout(function() { lazyload(); }, 200);
});


function displayNextTwoHundredImages(items){
  var internalCount=0;
  for (count; count<items.length; count++) {
     if(isImage(items[count])){
       if(internalCount<10){
    var f = folder+'/'+items[count];
    var id="img"+ count;
    
    var newImg=document.createElement('img');
    newImg.src=f;
    // newImg.id=id;
    //PUT THESE BACK IN LINE 19-20
    // document.getElementById(id).classList.add('thumbnail');
    // document.getElementById(id).classList.add(imageCssClass());
    addImagesToPage(newImg, f, id, count);
    // var newDiv=document.createElement('div');
    // var imageClass=imageCssClass();
    // newDiv.innerHTML='<img src="'+f+'" class="'+imageCssClass()+' thumbnail"  id="'+id+'" display="inline"/> <p>hello</p>';
    // document.body.appendChild(newDiv);
    
    internalCount++;
  }else{
    break;
  }
}
  }
   }
   
   function addImagesToPage(img, path, href, imgNum){
     var newSpan=document.createElement('span');
     newSpan.id='sp'+imgNum; 
    // <input type="image" class="thumb0" src="/Users/msivraj/Downloads/delicate-arch-night-stars-landscape.jpg" onClick= "this.style.visibility= 'hidden', action();" /> 

    // newSpan.innerHTML=' <a class="lightbox" href="#div'+imgNum+'">' +
    // '<img class="lazyload thumbnail thumb0" data-src="'+path+'"/></a>' +
    // '<div class="lightbox-target" id="div'+imgNum+'">' +
    // ' <div id="buttonDiv">' +
    // '<textarea class="textbox" id="memory'+imgNum+'" ></textarea>'+
    // ' <input id="memorySave" type="button" value="Save" onclick="this.style.visibility= \'visible\'; saveMemory(this, '+imgNum+');"/>' +
    // '</div> <a name="work"> <img id="img'+imgNum+'" src="'+path+'"> ' +
    // '<a class="lightbox-close" href="#work"> </a> </div>';
    
    newSpan.innerHTML=' <a class="lightbox" href="#div'+imgNum+'">' +
    '<input type="image" class="lazyload thumbnail thumb0" data-src="'+path+'" onclick="displaySavedMemory('+imgNum+');"/></a>' +
    '<div class="lightbox-target" id="div'+imgNum+'">' +
    ' <div id="buttonDiv">' +
    '<textarea class="textbox" id="memory'+imgNum+'" ></textarea>'+
    ' <input id="memorySave" type="button" value="Save" onclick="this.style.visibility= \'visible\'; saveMemory(this, '+imgNum+');"/>' +
    '</div> <a name="work"> <img id="img'+imgNum+'" src="'+path+'"> ' +
    '<a class="lightbox-close" href="#work"> </a> </div>';
    
     document.getElementById('images').appendChild(newSpan);
     //var imageElement=document.getElementById(id); NOT SURE IF COMMENTING THIS OUT IS THE RIGHT MOVE
    //  window.onload=getDateandTime;
     getDateandTime(img, path, imgNum);
   }
   
   function saveMemory(buttonId, imgNum){
     var folderLocation="/Users/msivraj/Documents/memories"
     var file='/memory'+imgNum;
     var textBoxId='memory'+imgNum;
     var filePath= folderLocation + file;
     
     
     var toWrite=document.getElementById(textBoxId).value;
     writeToFile(filePath, toWrite);
   }
   
   function displaySavedMemory(imgNumber){
     var folderLocation="/Users/msivraj/Documents/memories"
     var file='/memory'+imgNumber;
     var textBoxId='memory'+imgNumber;
     var filePath= folderLocation + file;
     var fs = require('fs');
     fs.readdir(filePath, function(err, items){
       
       //document.write(items);
       document.getElementById(textBoxId).value = items;
     });
     
     //make image tags input tags and add method to display saved memores in text area tag
     
   }
   
   function isVisible(){
     
     
   }
   
   function writeToFile(fileLocation, dataToWrite){
     var fs=require('fs');
    
     fs.writeFile(fileLocation, dataToWrite, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
   }
   
  //  (function hideSaveButton(buttonId){
  //  var button = document.getElementById(buttonId);
  //      var myDiv = document.getElementById("myDiv");
   // 
  //      function toggle() {
  //          if (myDiv.style.visibility === "hidden") {
  //              myDiv.style.visibility = "visible";
  //          } else {
  //              myDiv.style.visibility = "hidden";
  //          }
  //      }
   // 
  //      button.addEventListener("click", toggle(), false);
  //  })()
   
   //MOM DOES NOT WANT THIS 
  //  function imageCssClass(){
  //    var returnVal="thumb";
  //    var randNum1to10=Math.floor(Math.random()*11);
  //    returnVal+=randNum1to10;
  //    return returnVal;
  //  }

function getExtension(filename) {
  if(filename==undefined){
    return;
  }
    var parts = filename.split('.');
    return parts[parts.length - 1];
}

function isImage(filename) {
  if(filename==undefined){
    return;
  }
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
    case 'jpg':
    case 'gif':
    case 'bmp':
    case 'png':
    case 'tiff':
        //etc
        return true;
    }
    return false;
}

function getDateandTime(imageElement, path, imgNum) {
  if(imageElement==undefined){
    return;
  }
    
  EXIF.getData(imageElement, function (imageWithData) {
      //document.write(EXIF.pretty(this));
      // document.write(EXIF.getTag(this, "DateTimeOriginal"))
    var dateTimeval=EXIF.getTag(this, "DateTimeOriginal");
    // var dateTimeSpan=document.createElement("span");
    // dateTimeSpan.innerHTML=dateTimeval;
    // imageElement.appendChild(dateTimeSpan);
    createIndex(path, dateTimeval, imgNum); //PUT BACK IN THE CREATE INDEX
    // 
  });

}

function startApp(){
  var fs = require('fs');
  fs.readdir(folder, function(err, items){
    
    //document.write(items);
    displayNextTwoHundredImages(items);
    
  });

}



function createIndex(path, dateTime, imgNum){
  //var data=dateTime+"-"+path+"\n";
  // var emptyFs= require('extfs');
  // emptyFs.isEmpty('/Users/msivraj/Documents/imgindex.txt', function (empty){
  //  USE THIS JS PACKAGE TO CHECK IF FILE IS EMPTY 
  // });
  var data=imgNum+"-"+dateTime+"-"+path+"\n";
  // writeToFile(path, data);
  // addTodo(data);
  // var fs = require('fs');
  // fs.appendFile('/Users/msivraj/Documents/imgindex.txt', data, function(err){
  //   if(err){
  //     throw err;
  //   }
  // });
  
}

function clearIndex(){
  //THIS CODE WORKS BUT ONLY FOR A SINGLE FILE
  // var fs=require('fs');
  // fs.truncate('/Users/msivraj/Documents/imgindex.txt', 0, function(){
  //   
  // });
}
// 
// function searchImages(date){
//   //2006:12:25 09:41:06
//   var fs=require('fs');
//   
// }
// 
// function readYear(){
//   
// }
// 
// function readMonth(){
//   
// }
// 
// function readDay(){
//    
// }

//make dateTime object that is made up of year day month objects 
  //class dateTime class year class month class day