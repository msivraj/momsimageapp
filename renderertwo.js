//785055600000
// /Users/msivraj/Documents/imgs/2011-09-22/fast photos.jpg
// randYear = 2010
// 
// randMonth = 10
// 
// randDay = 15
//ADD A GOTO PAGE BUTTON

var numberOfIndexs=0;
var numberOfImages=0;
var count=0;
var searchCount=0;
var indexTxtData={};
indexTxtData.jpgDataArr=[];
var searchImgs=[];
var numberOfImagesPath="/Users/msivraj/Documents/imgIndex/numberOfImages.txt"
var path = require('path');
var appDir = path.dirname(require.main.filename);//"/Users/msivraj/IdeaProjects/HTMLCSSJSProjects/momsimageapp"
var indexLoc=appDir+"/index.txt";
// const imgFolder='/Users/msivraj/Documents/2006_12_25';
const imgFolder="/Users/msivraj/Documents/imgs"
// var menu = document.getElementById("numOfImgMenu");
// var imgsToDisplay = menu.options[menu.selectedIndex].text;
var numOfDisplayedImgs=98;
// const fs = require('fs-extra')
const {dialog} = require('electron').remote;


window.addEventListener("DOMContentLoaded", function(event) {
  dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']})
  startApp(3);
    // window.setTimeout(function() { lazyload(); }, 200);
});



function deleteImages(){
  document.getElementById('images').innerHTML="";

}

function clearIndex(){
  var fs = require('fs');
fs.truncate(indexLoc, 0, function(){console.log('done')});
}

function loadNextImages(){
  // var fs=require('fs-extra');
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
      
      // var srcLoc="/Users/msivraj/Documents/imgIndex/"+count+"/src.txt"
      // var srcLoc=appDir+"/imgIndex/"+count+"/src.txt";
      
      var src=indexTxtData.jpgDataArr[count].src;
      
      // if(fs.existsSync(srcLoc)){
        addImagesToPageOne(src, count);
        count++;
      // }
      // else{
      //   i--;
      // }
      
    
    }
    window.setTimeout(function() { lazyload(); }, 500);
  // }
    
  
// count+=num;
  
}

function loadPreviousImages(){
  var tempCount=count-=numOfDisplayedImgs;
  count-=numOfDisplayedImgs;
  
  if(count<0){
    deleteImages();
    alert("You cannot go back from image 0!");
    count=0;
    return;
  }
  else if(count==0){
    deleteImages();
    for(count;count<tempCount;count++){
      var src=indexTxtData.jpgDataArr[count].src;
      addImagesToPageOne(src, count);
    }
  }
  // else if(tempCount==73){
  //   deleteImages();
  //   for(count;count<tempCount;count++){
  //     var src=indexTxtData.jpgDataArr[count].src;
  //     addImagesToPageOne(src, count);
  //   }
  // }
  else{
    deleteImages();
    for(count;count<tempCount;count++){
      // var srcLoc=appDir+"/imgIndex/"+count+"/src.txt";
      var src=indexTxtData.jpgDataArr[count].src;
      addImagesToPageOne(src, count);
    }
  }
  // else{
    // var menu = document.getElementById("numOfImgMenu");
    // var num = menu.options[menu.selectedIndex].text;
    // if(num=="Number of Images Displayed"){
    //   alert("Please select how many images you want displayed.");
    //   return;
    // }
    
  // }
  window.setTimeout(function() { lazyload(); }, 500);
  
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
   
   function addImagesToPageOne(src, imgNum){
    //  var fs=require('fs-extra');
    //  fs.readFile(srcLoc, 'utf8', function(err, items){
      //  var path=items;
       var newSpan=document.createElement('span');
       newSpan.id='sp'+imgNum;
       newSpan.margin='auto';
      
      newSpan.innerHTML=' <a class="lightbox" href="#div'+imgNum+'" onclick="displaySavedMemory('+imgNum+');">' +
      '<img class="lazyload thumbnail thumb0" data-src="'+src+'"/></a>' +
      '<div class="lightbox-target" id="div'+imgNum+'">' +
      ' <div id="saveButton">' +
      '<textarea class="textbox" id="memory'+imgNum+'" ></textarea>'+
      ' <input id="memorySave" type="button" value="Save" onclick=" saveMemory(this, '+imgNum+');"/>' +
      '<div id="rotate">'+
      ' <input id="rotateNinty" type="button" value="90"/>' +
      ' <input id="rotateBackNinty" type="button" value="-90"/>' +
      '</div>'+
      '</div> <a name="work"> <img id="img'+imgNum+'" src="'+src+'"> ' +
      '<a class="lightbox-close" href="#work"> </a> </div>';
      
       document.getElementById('images').appendChild(newSpan);
    //  });   
    //  window.setTimeout(function() { lazyload(); }, 500);

   }
   
   function nextSearchImgs(){
     if(searchCount!=0){
    deleteImages();
  }
     for(var i=0;i<numOfDisplayedImgs;i++){
       
       var src=searchImgs[searchCount].src;
       var imgNum=searchImgs[searchCount].imgNum;
         addImagesToPageOne(src, imgNum);
         searchCount++;
     }
     window.setTimeout(function() { lazyload(); }, 200);
   }
   
   function previousSearchImgs(){
  var tempCount=searchCount-=numOfDisplayedImgs;
  searchCount-=numOfDisplayedImgs;
  

  if(searchCount<0){
    deleteImages();
    alert("You cannot go back from image 0!");
    searchCount=0;
    return;
  }else if(searchCount==0){
    deleteImages();
    for(searchCount;searchCount<tempCount;searchCount++){
      var src=searchImgs[searchCount].src;
      var imgNum=searchImgs[searchCount].imgNum;
      addImagesToPageOne(src, imgNum);
    }
  }
  
  else if(tempCount==73){
    deleteImages();
    for(searchCount;searchCount<tempCount;searchCount++){
      var src=searchImgs[searchCount].src;
      var imgNum=searchImgs[searchCount].imgNum;
      // var src=indexTxtData.jpgDataArr[searchCount].src;
      addImagesToPageOne(src, imgNum);
    }
    
  }else{
    deleteImages();
    for(searchCount;searchCount<tempCount;searchCount++){
      var src=searchImgs[searchCount].src;
      var imgNum=searchImgs[searchCount].imgNum;
      // var srcLoc=appDir+"/imgIndex/"+count+"/src.txt";
      // var src=indexTxtData.jpgDataArr[searchCount].src;
      addImagesToPageOne(src, imgNum);
    }
  }
  // else{
    // var menu = document.getElementById("numOfImgMenu");
    // var num = menu.options[menu.selectedIndex].text;
    // if(num=="Number of Images Displayed"){
    //   alert("Please select how many images you want displayed.");
    //   return;
    // }
    
  // }
  window.setTimeout(function() { lazyload(); }, 500);
  
}
   
   function addImagesToPage(arrOfImgs){
     
     for(var i=0;i<arrOfImgs.length; i++){
       var src=arrOfImgs[i].src;
       var imgNum=arrOfImgs[i].imgNum;
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
     
     
     
   }
   
   function saveMemory(buttonId, imgNum){
     var fs=require('fs-extra');
     //  var fileLocation=appDir+"/memories/"+imgNum+"/memory.txt";
     var image=document.getElementById("img"+imgNum+"")
     var fileLocation=image.src+".memory.txt"
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
    //  var fileLocation=appDir+"/memories/"+imgNum+"/memory.txt";
    //  var file='/memory'+imgNumber+'.txt';
    var image=document.getElementById("img"+imgNum+"")
    var fileLocation=image.src+".memory.txt"
     var textBoxId='memory'+imgNum;
    //  var filePath= folderLocation + file;
     var fs = require('fs-extra');

     fs.readFile(fileLocation, function(err, items){
       document.getElementById(textBoxId).value = items;
     });     
   }
   
   function generateIndexLoc(){
    //  var imgFolder=appDir+"/imgIndex/"+numberOfImages;
    var imgFolder;
    if(numberOfImages<=5000){
      imgFolder=appDir+"/imgIndex/"+numberOfImages;
    }
     else if(numberOfImages>5000){
      //  numberOfImages=1;
       numberOfIndexs=numberOfImages/5000>>0;
       imgFolder=appDir+"/imgIndex"+numberOfIndexs+"/"+numberOfImages;
     }
     console.log(numberOfImages);
     console.log(imgFolder);
     
     
     return imgFolder;
     
   }
   
   function generateRandomDate(seed, adder){
     var randNum=Math.floor(Math.random() * seed)+adder;
     return randNum;
   }
   
   function createDataArray(imgSrc, imgDateTime){
    //  var fs=require('fs-extra');
    //  var srcLoc=generateIndexLoc()+"/src.txt";
    //  var imgDateTimeLoc=generateIndexLoc()+"/datetime.txt";
    // 
    //  fs.outputFile(srcLoc, imgSrc, (err) => {
    //    if (err) throw err;
    // });
    // 
    // fs.outputFile(imgDateTimeLoc, imgDateTime, (err)=>{
    //   if(err) throw err;
    // });
    // console.log(imgSrc);
    // for(var i=0;i<30000;i++){
    
    var jpgData={};
    if(imgDateTime==undefined){
      //PUT LOGIC HERE TO RANDOMIZE DATE THAT IS ENTERED FOR IMAGES WITHOUT DATE
      // var randYear=generateRandomDate(46,1994);
      // var randMonth=generateRandomDate(12,1);
      // var randDay=generateRandomDate(28,1);
      // // jpgData.date=new Date(2000,0,1).getTime();
      // jpgData.date=new Date(randYear,randMonth,randDay).getTime();
      // jpgData.src=imgSrc;
      var fs=require('fs-extra');
      // var date=new Date(fs.statSync(imgSrc).birthtime.getTime());
      jpgData.src=imgSrc;
      jpgData.date=new Date(fs.statSync(imgSrc).birthtime).getTime();
      
    }else{
      // var dateTime="2007:06:13 09:33:56";
      var pieces=imgDateTime.split(" ");
      var jpgDate=pieces[0].split(":");
      var month=parseInt(jpgDate[1])-1;
      
      jpgData.date=new Date(jpgDate[0], month, jpgDate[2]).getTime();
      jpgData.src=imgSrc;
    }
    indexTxtData.jpgDataArr.push(jpgData);
    console.log(numberOfImages+" :: "+JSON.stringify(jpgData));
    // }
    
   }
   
   function writeDataToFile(){
     
     require('fs').writeFile(

    appDir+"/index.txt",

    JSON.stringify(indexTxtData),

    function (err) {
        if (err) {
            console.error('Crap happens');
        }
    }
);
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
        // etc
        return true;
    }
    return false;
}

function getDateandTime(imgSrc) {
  // if(imageElement==undefined){
  //   return;
  // }
  //   
  // EXIF.getData(imageElement, function (imageWithData) {
  //     //document.write(EXIF.pretty(this));
  //     // document.write(EXIF.getTag(this, "DateTimeOriginal"))
  //   var imgDateTime=EXIF.getTag(this, "DateTimeOriginal");
  //   // var dateTimeSpan=document.createElement("span");
  //   // dateTimeSpan.innerHTML=dateTimeval;
  //   // imageElement.appendChild(dateTimeSpan);
  //   // createIndex(path, dateTimeval, imgNum); //PUT BACK IN THE CREATE INDEX
  //   // var imgFolder="/Users/msivraj/Documents/imgIndex/"+imgNum+"";
  //   // var imgFolder=appDir+"/imgIndex/"+imgNum;
  // 
  //   //THIS METHOD CREATES THE IMG INDEX
  //   writeToFolder(imgSrc, imgDateTime);
  // });
  var ExifImage = require('kinda-exif').ExifImage;
  // var isGo=true;
  try{
  var image = new ExifImage({
    // image: pathModule.join(__dirname, 'space-invader.jpg')
    // image: (imgSrc.replace(/ /g, '/'))
    image: (imgSrc)
  
  });
  
  var imgDateTime=image.exifData.exif.DateTimeOriginal;
  //LEAVING LINE 373 IN WILL MAKE IT SO THAT ONLY JPGS ARE DISPLAYED.
  // createDataArray(imgSrc, imgDateTime);
}
catch(err){
  console.log("ERROR"+imgSrc+imgDateTime);
   return;
}
  // var imgFolder=appDir+"/imgIndex/"+imgNum;
  //THIS METHOD CREATES THE IMG INDEX
  //LEAVING LINE 381 AND 376 IN WILL ALLOW FOR ALL IMG TYPES TO BE DISPLAYED EVEN CORRUPTED ONES
  createDataArray(imgSrc, imgDateTime);
}

function startApp(whatToDo){
  // var fs = require('fs-extra');
  // fs.readdir(imgFolder, function(err, items){
    
    //document.write(items);
    if(whatToDo==1){
      var exfs = require('extfs');
      if(!exfs.isEmptySync(indexLoc)){
        clearIndex();
      }
      recurseDirs(imgFolder);
      writeDataToFile();
      // var nOIPath=appDir+"/imgIndex/numberOfImages.txt"
      // var fs=require('fs-extra');
      // fs.outputFile(nOIPath, numberOfImages, (err) => {
      //   if (err) throw err;
   // console.log('The file has been saved!');
    //  });
      // var nonImgCount=createIndex(items);
    //   numberOfImages=items.length-nonImgCount;
    //   var nOIPath=""+appDir+"/imgIndex/numberOfImages.txt"
    //   fs.outputFile(nOIPath, numberOfImages, (err) => {
    //     if (err) throw err;
    //  });
    }
    else if(whatToDo==2){
      // var fs=require('fs-extra');
      // var content=fs.readFileSync(indexLoc, 'utf8');
      // jpgDataArr=JSON.parse(content);
      searchImages();
    }
    else if(whatToDo==3){
      // loadIntialImages(items);
      var fs=require('fs-extra');
      var exfs = require('extfs');
      if(exfs.isEmptySync(indexLoc)){
        console.log(indexTxtData.jpgDataArr.length);
        
          alert("Please click create index button.");
          return;
      }
      var content=fs.readFile(indexLoc, 'utf8', function(err, content){
        // try{
          indexTxtData=JSON.parse(content);
        // }catch(err){
        //   alert("Please click create index button.")
        // }
        
        
      });
      // console.log(indexTxtData.jpgDataArr.length);
      // if(indexTxtData.jpgDataArr.length==0){
      //   alert("Please click create index button.");
      //   return;
      // }
       console.log("finished");
    }
      // });

}
//}


function recurseDirs(nextDir){
  // var imgCount=imgCountIn;
  var fs=require('fs-extra');
  // var path=imgFolder;
  // fs.readdir(nextDir, function(err, items){
  var items=fs.readdirSync(nextDir)
    for(var i=0;i<items.length;i++){
      // var stats = fs.statSync(nextDir+"/"+items[i]).isDirectory();
      if(fs.statSync(nextDir+"/"+items[i]).isDirectory()){//breaks of the statSync method.
        recurseDirs(nextDir+"/"+items[i])
      }else{
        // imgCount=createIndex(nextDir+"/"+items[i], imgCount);
        createIndex(nextDir+"/"+items[i]);
        // numberOfImages=items.length-nonImgCount;
        
      }
      }
      
    // });
    
  }


 function createIndex(file){
  
      if(isImage(file)){
        
        numberOfImages++;
        
        getDateandTime(file);
        // if(numberOfImages==18022){
        // console.log("error here");
        // }
        
    }
  }


function readYear(){
  var menu = document.getElementById("years");
  var year = menu.options[menu.selectedIndex].text;
  return year;
}

function readMonth(){
  var menu = document.getElementById("months");
  var month = menu.options[menu.selectedIndex].text;
  return month;
}

function readDay(){
  var menu = document.getElementById("days");
  var day = menu.options[menu.selectedIndex].text;
   return day;
}
function clearSearch(){
  searchCount=0;
  searchImgs=[];
  document.getElementById("buttons").style.display="";
  document.getElementById("searchMenus").style.display="";
  document.getElementById("searchButtons").style.display="none";
  deleteImages();
}

function searchImages(){
  searchCount=0;
  var countHere=1;
  deleteImages();
  document.getElementById("buttons").style.display="none";
  document.getElementById("searchMenus").style.display="none";
  document.getElementById("searchButtons").style.display="inline";
  // document.getElementById("searchButtons").innerHTML=  '<input type="button" class="searchButtons" id="search" value="Clear Search" onclick="clearSearch();"/>'+
  // '<input type="button" class="searchButtons" id="search" value="Next Page" onclick="clearSearch();"/>'+
  // '<input type="button" class="searchButtons" id="search" value="Previous Page" onclick="clearSearch();"/>';
  var year=readYear();
  var month=readMonth();
  var day=readDay();
  // var arrOfImgs=[];
  
  // fs.readFile(indexLoc, 'utf8', function(err, items){
  // var content=fs.readFileSync(indexLoc, 'utf8');
    // jpgDataArr=JSON.parse(items);
    // console.log("date:", jpgDataArr.date);
    for(var i=0;i<indexTxtData.jpgDataArr.length;i++){
      
      var date=indexTxtData.jpgDataArr[i].date;
      var src=indexTxtData.jpgDataArr[i].src;
      
      
      var isExist=parseDate(day, month, year, date);
      if(isExist){
        if(countHere==1592){
          console.log("error");
        }
        var imgObj={};
        imgObj.src=src;
        console.log(src+":"+countHere);
        imgObj.imgNum=i;
        searchImgs.push(imgObj);
        countHere++;
        // addImagesToPageOne();
      }
    }
  // });
  // addImagesToPageOne(arrOfImgs);
  nextSearchImgs();
  // window.setTimeout(function() { lazyload(); }, 200);
}

function parseDate(dayIn, monthIn, yearIn, dateIn){
  if(dateIn==1289804400000){
    console.log("error here");
  }
  var date= new Date(dateIn);
  // console.log(date.getFullYear()+":",date.getMonth()+":",date.getDate()+":",date);
  // var day=date.getDay();
  // var month=date.getMonth();
  // var year=date.getFullYear();
  if(yearIn=="Year"){
      alert("Please specify the year of your search.");
      return;
    }else{
      var isExist=parseYear(dayIn, monthIn, yearIn, date);
          
    }
  return isExist;
}

//THESE FUNCTION CREATE A FILE SYSTEM INDEX
// function searchImages(){
//   deleteImages();
//   
//   var year=getYear();
//   var month=getMonth();
//   var day=getDay();
//   var jpgDate=new Date(year, month, day);
//   if(year=="Year"){
//     alert("Please specify the year of your search.");
//     return;
//   }
//   var dataTimeStr;
//   var fs=require('fs-extra');
//   var strNumberOfImages=fs.readFileSync(numberOfImagesPath);
//   numberOfImages=parseInt(strNumberOfImages,10);
//     for(var i=0;i<numberOfImages;i++){
//       var dateTimePath="/Users/msivraj/Documents/imgIndex/"+i+"/datetime.txt";
//       var srcPath="/Users/msivraj/Documents/imgIndex/"+i+"/src.txt"
// 
// if(fs.existsSync(dateTimePath)) {
//   dateTimeStr=fs.readFileSync(dateTimePath, 'utf8');
//     var isExist=parseYear(day, month, year, dateTimeStr);
//     if(isExist){
//       addImagesToPageOne(srcPath, i);
//     }
//   
//   
// }   
//     } 
//   
// }
// 
function parseYear(day, month, year, dateTime){
  var yearComp=dateTime.getFullYear();
  // numberOfImages++;
  // console.log(numberOfImages);
  // if(yearComp==2010){
  //   console.log("here");
  // }
  // var index=0;
  // for(index;index<dateTime.length;index++){
  //   if(dateTime[index]==":"){
  //     break;
  //   }
  //   // console.log(dateTime[i]);
  //    yearComp+=dateTime[index];
  // }
  if(yearComp==parseInt(year)&&month!="Month"){
    
    return parseMonth(day, month, dateTime);
  }else if(yearComp==parseInt(year)&&month=="Month"){
    return true;
  }
  else{
    return false;
  }
  
}

function parseMonth(day, month, dateTime){
  var monthComp=dateTime.getMonth();
  // for(index;index<dateTime.length;index++){
  //   if(dateTime[index]==":"){
  //     break;
  //   }
  //   // console.log(dateTime[i]);
  //    monthComp+=dateTime[index];
  // }
  if(monthComp==parseInt(month)-1&&day!="Day"){
    
    return parseDay(day, dateTime);
  }else if(monthComp==parseInt(month)-1&&day=="Day"){
  return true;  
  }
  else{
    return false;
  }
}

function parseDay(day, dateTime, index){
  var dayComp=dateTime.getDate();
  // for(index;index<dateTime.length;index++){
  //   if(dateTime[index]==" "){
  //     break;
  //   }
  //   // console.log(dateTime[i]);
  //    dayComp+=dateTime[index];
  // }
  if(dayComp==parseInt(day)){
    return true;
  }else{
    return false;
  }
}
