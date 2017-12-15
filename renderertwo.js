var count=0;
var numberOfImages;
var numberOfImagesPath="/Users/msivraj/Documents/imgIndex/numberOfImages.txt"
const imgFolder='/Users/msivraj/Documents/2006_12_25';
// var menu = document.getElementById("numOfImgMenu");
// var imgsToDisplay = menu.options[menu.selectedIndex].text;
var numOfDisplayedImgs=10;
var PouchDB = require('pouchdb');
var db = new PouchDB('my_db');
var remoteCouch=false;
// const fs = require('fs-extra')


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
  startApp(3);
    // window.setTimeout(function() { lazyload(); }, 200);
});

function deleteImages(){
  document.getElementById('images').innerHTML="";

}

function loadNextImages(){
  if(count!=0){
    deleteImages();
  }
  // else{
    // var menu = document.getElementById("numOfImgMenu");
    // var num = menu.options[menu.selectedIndex].text;
    // if(num=="Number of Images Displayed"){
    //   alert("Please select how many images you want displayed.");
    //   return;
    // }
    // var fileName="/Users/msivraj/Documents/imgIndex/"+count+":"+dateTimeval+".txt";
    for(var i=0;i<numOfDisplayedImgs;i++){
      count++;
      var srcLoc="/Users/msivraj/Documents/imgIndex/"+count+"/src.txt"
      addImagesToPageOne(srcLoc, count);
    }
    window.setTimeout(function() { lazyload(); }, 200);
  // }
    
  
// count+=num;
  
}

function loadPreviousImages(){
  var tempCount=count-=numOfDisplayedImgs;
  count-=numOfDisplayedImgs;
  if(count<=0){
    deleteImages();
    alert("You cannot go back from image 0!");
    return;
  }
  // else{
    // var menu = document.getElementById("numOfImgMenu");
    // var num = menu.options[menu.selectedIndex].text;
    // if(num=="Number of Images Displayed"){
    //   alert("Please select how many images you want displayed.");
    //   return;
    // }
    deleteImages();
    for(count;count<tempCount;count++){
      var srcLoc="/Users/msivraj/Documents/imgIndex/"+count+"/src.txt"
      addImagesToPageOne(srcLoc, count);
    }
  // }
  
}

function loadIntialImages(items){
  var internalCount=0;
  for (count; count<items.length; count++) {
     if(isImage(items[count])){
       if(internalCount<10){//469 is the last img when iC is 469 c is 470 102 is the number images i want to display
    var f = imgFolder+'/'+items[count];
    // var id="img"+ count;
    
    var newImg=document.createElement('img');
    newImg.src=f;
    // newImg.id=id;
    //PUT THESE BACK IN LINE 19-20
    // document.getElementById(id).classList.add('thumbnail');
    // document.getElementById(id).classList.add(imageCssClass());
    // addImagesToPage(newImg, f, id, count);
      addImagesToPage(f, count);

    // getDateandTime(newImg, f, count);
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
   
   function addImagesToPageOne(srcLoc, imgNum){
     var fs=require('fs-extra');
     fs.readFile(srcLoc, function(err, items){
       var path=items;
       var newSpan=document.createElement('span');
       newSpan.id='sp'+imgNum; 
      
      newSpan.innerHTML=' <a class="lightbox" href="#div'+imgNum+'" onclick="displaySavedMemory('+imgNum+');">' +
      '<img class="lazyload thumbnail thumb0" data-src="'+path+'"/></a>' +
      '<div class="lightbox-target" id="div'+imgNum+'">' +
      ' <div id="buttonDiv">' +
      '<textarea class="textbox" id="memory'+imgNum+'" ></textarea>'+
      ' <input id="memorySave" type="button" value="Save" onclick="this.style.visibility= \'visible\'; saveMemory(this, '+imgNum+');"/>' +
      '</div> <a name="work"> <img id="img'+imgNum+'" src="'+path+'"> ' +
      '<a class="lightbox-close" href="#work"> </a> </div>';
      
       document.getElementById('images').appendChild(newSpan);
     });   
     
   }
   
   function addImagesToPage(path, imgNum){
     
     var newSpan=document.createElement('span');
     newSpan.id='sp'+imgNum; 
    
    newSpan.innerHTML=' <a class="lightbox" href="#div'+imgNum+'" onclick="displaySavedMemory('+imgNum+');">' +
    '<img class="lazyload thumbnail thumb0" data-src="'+path+'"/></a>' +
    '<div class="lightbox-target" id="div'+imgNum+'">' +
    ' <div id="buttonDiv">' +
    '<textarea class="textbox" id="memory'+imgNum+'" ></textarea>'+
    ' <input id="memorySave" type="button" value="Save" onclick="this.style.visibility= \'visible\'; saveMemory(this, '+imgNum+');"/>' +
    '</div> <a name="work"> <img id="img'+imgNum+'" src="'+path+'"> ' +
    '<a class="lightbox-close" href="#work"> </a> </div>';
    
     document.getElementById('images').appendChild(newSpan);
     
   }
   
   function saveMemory(buttonId, imgNum){
     var fs=require('fs-extra');
     var fileLocation="/Users/msivraj/Documents/imgIndex/"+imgNum+"/memory.txt"
    //  var file='/memory'+imgNum+'.txt';
     var textBoxId='memory'+imgNum;
    //  var filePath= folderLocation + file;
     var toWrite=document.getElementById(textBoxId).value;
     fs.outputFile(fileLocation, toWrite, (err) => {
       if (err) throw err;
  // console.log('The file has been saved!');
    });
     //writeToFile(filePath, toWrite);
   }
   
   function displaySavedMemory(imgNum){
     var fileLocation="/Users/msivraj/Documents/imgIndex/"+imgNum+"/memory.txt"
    //  var file='/memory'+imgNumber+'.txt';
     var textBoxId='memory'+imgNum;
    //  var filePath= folderLocation + file;
     var fs = require('fs-extra');

     fs.readFile(fileLocation, function(err, items){
       document.getElementById(textBoxId).value = items;
     });     
   }
   
   function isVisible(){
     
     
   }
   
   
   function writeToFolder(folderLocation, imgSrc, imgDateTime){
     var fs=require('fs-extra');
     var srcLoc=folderLocation+"/src.txt";
     var imgDateTimeLoc=folderLocation+"/datetime.txt";
    
     fs.outputFile(srcLoc, imgSrc, (err) => {
       if (err) throw err;
  // console.log('The file has been saved!');
    });

    fs.outputFile(imgDateTimeLoc, imgDateTime, (err)=>{
      if(err) throw err;
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

function getDateandTime(imageElement, imgSrc, imgNum) {
  if(imageElement==undefined){
    return;
  }
    
  EXIF.getData(imageElement, function (imageWithData) {
      //document.write(EXIF.pretty(this));
      // document.write(EXIF.getTag(this, "DateTimeOriginal"))
    var imgDateTime=EXIF.getTag(this, "DateTimeOriginal");
    // var dateTimeSpan=document.createElement("span");
    // dateTimeSpan.innerHTML=dateTimeval;
    // imageElement.appendChild(dateTimeSpan);
    // createIndex(path, dateTimeval, imgNum); //PUT BACK IN THE CREATE INDEX
    var imgFolder="/Users/msivraj/Documents/imgIndex/"+imgNum+"";
    //THIS METHOD CREATES THE IMG INDEX
    writeToFolder(imgFolder, imgSrc, imgDateTime);
  });

}

function startApp(whatToDo){
  var fs = require('fs-extra');
  fs.readdir(imgFolder, function(err, items){
    
    //document.write(items);
    if(whatToDo==1){
      var nonImgCount=createIndex(items);
      numberOfImages=items.length-nonImgCount;
      var nOIPath="/Users/msivraj/Documents/imgIndex/numberOfImages.txt"
      fs.outputFile(nOIPath, numberOfImages, (err) => {
        if (err) throw err;
   // console.log('The file has been saved!');
     });
    }else if(whatToDo==2){
      searchImages(items);
    }
    // else if(whatToDo==3){
    //   loadIntialImages(items);
    //   
    // }
      });

}



 function createIndex(items){
   var nonImageCount=0;
   for (var indexCount =0; indexCount<items.length; indexCount++) {
      if(!isImage(items[indexCount])){
        nonImageCount++;
        // indexCount--;
      }else{
       //  if(internalCount<500){
     var f = imgFolder+'/'+items[indexCount];
     //var id="img"+ count;
     
     var newImg=document.createElement('img');
     newImg.src=f;
     // newImg.id=id;
     //PUT THESE BACK IN LINE 19-20
     // document.getElementById(id).classList.add('thumbnail');
     // document.getElementById(id).classList.add(imageCssClass());
     getDateandTime(newImg, f, indexCount);
     // var newDiv=document.createElement('div');
     // var imageClass=imageCssClass();
     // newDiv.innerHTML='<img src="'+f+'" class="'+imageCssClass()+' thumbnail"  id="'+id+'" display="inline"/> <p>hello</p>';
     // document.body.appendChild(newDiv);
     
   // }else{
   //   break;
   // }
 }
   }
   //console.log(indexCount);
   return nonImageCount;
    }


function getYear(){
  var menu = document.getElementById("years");
  var year = menu.options[menu.selectedIndex].text;
  return year;
}

function getMonth(){
  var menu = document.getElementById("months");
  var month = menu.options[menu.selectedIndex].text;
  return month;
}

function getDay(){
  var menu = document.getElementById("days");
  var day = menu.options[menu.selectedIndex].text;
   return day;
}

function searchImages(items){
  deleteImages();
  var year=getYear();
  var month=getMonth();
  var day=getDay();
  var dataTimeStr;
  var fs=require('fs-extra');
  var strNumberOfImages=fs.readFileSync(numberOfImagesPath);
  numberOfImages=parseInt(strNumberOfImages,10);
  // fs.readFile(numberOfImagesPath, function(err, items){
  //   numberOfImages=items;
    for(var i=0;i<numberOfImages;i++){
      var dateTimePath="/Users/msivraj/Documents/imgIndex/"+i+"/datetime.txt";
      var srcPath="Users/msivraj/Documents/imgIndex/"+i+"/src.txt"
      fs.readFile(dateTimePath, 'utf8', function(err, items){
        dateTimeStr=items;
        if(items!=undefined){
          var isExist=parseYear(day, month, year, dateTimeStr);
          if(isExist){
            addImagesToPageOne(fs.readFileSync(srcPath, 'utf8'), i);
          }
        
        }
      });       
    }
  // }); 
  
}

function parseYear(day, month, year, dateTime){
  var yearComp="";
  var index=0;
  for(index;index<dateTime.length;index++){
    if(dateTime[index]==":"){
      break;
    }
    // console.log(dateTime[i]);
     yearComp+=dateTime[index];
  }
  if(yearComp===year){
    
    return parseMonth(day, month, dateTime, index+1);
  }else{
    return false;
  }
  
}

function parseMonth(day, month, dateTime, index){
  var monthComp="";
  for(index;index<dateTime.length;index++){
    if(dateTime[index]==":"){
      break;
    }
    // console.log(dateTime[i]);
     monthComp+=dateTime[index];
  }if(monthComp===month){
    
    return parseDay(day, dathTime, index+1);
  }else{
    return false;
  }
}

function parseDay(day, dateTime, index){
  var dayComp="";
  for(index;index<dateTime.length;index++){
    if(dateTime[index]==" "){
      break;
    }
    // console.log(dateTime[i]);
     dayComp+=dateTime[index];
  }
  if(dayComp===day){
    return true;
  }else{
    return false;
  }
}