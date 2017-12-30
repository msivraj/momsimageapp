//785055600000
// /Users/msivraj/Documents/imgs/2011-09-22/fast photos.jpg
// randYear = 2010
// 
// randMonth = 10
// 
// randDay = 15
//ADD A GOTO PAGE BUTTON
const __fs = require('fs');
const __path = require('path');
const __os = require('os');
const __fsExtra = require('fs-extra');
const __electron = require('electron');
const __extfs = require('extfs');
const __kindaExif = require('kinda-exif');

var TOTAL_FILES_TO_INDEX=0;
var TOTAL_FILES_ALREADY_INDEXED=0;
var numberOfIndexs=0;
var numberOfImages=0;
var count=0;
var searchCount=0;
var indexTxtData={};
indexTxtData.jpgDataArr=[];
var searchImgs=[];
// var numberOfImagesPath="/Users/msivraj/Documents/imgIndex/numberOfImages.txt"
var launchDir = __path.dirname(require.main.filename);//"/Users/msivraj/IdeaProjects/HTMLCSSJSProjects/momsimageapp"
var appDir = __os.homedir() + "/.mia";
var indexLoc=appDir+"/index.txt";
// const imgFolder='/Users/msivraj/Documents/2006_12_25';
// const imgFolder="/Users/msivraj/Documents/imgs"
// var menu = document.getElementById("numOfImgMenu");
// var imgsToDisplay = menu.options[menu.selectedIndex].text;
var numOfDisplayedImgs=70;

const {dialog} = __electron.remote;


window.addEventListener("DOMContentLoaded", function(event) {
  startApp(3);
    // window.setTimeout(function() { lazyload(); }, 1);
});



function deleteImages(){
  document.getElementById('images').innerHTML="";

}

function clearIndex() {
  // indexTxtData = {};
  // indexTxtData.jpgDataArr=[];

  __fs.truncate(indexLoc, 0, function(){console.log('done')});
}

function loadNextImages() {
  
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
    for(var i=0;i<numOfDisplayedImgs;i++) {
      
      // var srcLoc="/Users/msivraj/Documents/imgIndex/"+count+"/src.txt"
      // var srcLoc=appDir+"/imgIndex/"+count+"/src.txt";
      
      if(indexTxtData.jpgDataArr[count]) {
        var src=indexTxtData.jpgDataArr[count].src;
        
        // if(__fs.existsSync(srcLoc)){
          addImagesToPageOne(src, count);
          count++;
        // }
        // else{
        //   i--;
        // }
      } else {
        break;
      }
    
    }
    window.setTimeout(function() { lazyload(); }, 1);
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
  window.setTimeout(function() { lazyload(); }, 1);
  
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
    
    //  __fs.readFile(srcLoc, 'utf8', function(err, items){
      //  var path=items;
       var newSpan=document.createElement('span');
       newSpan.id='sp'+imgNum;
       newSpan.margin='auto';
      
      newSpan.innerHTML=' <a class="lightbox" href="#div'+imgNum+'" onclick="displaySavedMemory('+imgNum+');">' +
      '<img class="lazyload thumbnail thumb0" id="img'+imgNum+'" data-src="'+src+'"/></a>' +
      '<div class="lightbox-target" id="div'+imgNum+'">' +
      // '<textarea id="memory'+imgNum+'" ></textarea>'+
      '<div id="lightboxButtons">'+
      '<div ><textarea id="memory'+imgNum+'" ></textarea></div>'+
      '<button id="memorySave" type="button" onclick=" saveMemory(this, '+imgNum+');">Save</button>'+
      '<button id="rotateNinty" type="button" onclick="rotateCounterClockwise('+imgNum+');">Rotate Left</button>'+
      '<button id="rotateBackNinty" type="button" onclick="rotateClockwise('+imgNum+');">Rotate Right</button>'+
      
      // ' <input id="memorySave" type="button" value="Save" onclick=" saveMemory(this, '+imgNum+');"/>' +
      // ' <input id="rotateNinty" type="button" value="Rotate Clockwise" onclick="rotateClockwise();"/>' +
      // ' <input id="rotateBackNinty" type="button" value="Rotate Counter Clockwize" onclick="rotateCounterClockwise();"/>' +
      
      '</div> <a name="work"> <img id="lightboxImg'+imgNum+'" src="'+src+'"> ' +
      '<a class="lightbox-close" href="#work"> </a> </div>';
      
       document.getElementById('images').appendChild(newSpan);
    //  });   
    //  window.setTimeout(function() { lazyload(); }, 1);

   }
   
   function nextSearchImgs(){
     if(!searchImgs.length==0){
     if(searchCount!=0){
       deleteImages();
     }if(numOfDisplayedImgs>searchImgs.length){
       numOfDisplayedImgs=searchImgs.length;
     }
     
     for(var i=0;i<numOfDisplayedImgs;i++) {
       
       var src=searchImgs[searchCount].src;
       var imgNum=searchImgs[searchCount].imgNum;
         addImagesToPageOne(src, imgNum);
         searchCount++;
     }
     
     window.setTimeout(function() { lazyload(); }, 1);
   }else{
     alert("No images were indexed for this year.");
     clearSearch();
   }
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
  window.setTimeout(function() { lazyload(); }, 1);
  
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
   
  function saveMemory(buttonId, imgNum) {
     
    //  var fileLocation=appDir+"/memories/"+imgNum+"/memory.txt";
    var image=document.getElementById("img"+imgNum+"")
    var memoryLocation = appDir + image.src.substring(7) + ".memory.txt";

    //  var file='/memory'+imgNum+'.txt';
    var textBoxId='memory'+imgNum;
    //  var filePath= folderLocation + file;
    var toWrite=document.getElementById(textBoxId).value;
    __fsExtra.outputFile(memoryLocation, toWrite, (err) => {
      if (err) throw err;
      // console.log('The file has been saved!');
    });
    
    //writeToFile(filePath, toWrite);
  }
   
   function displaySavedMemory(imgNum){
    //  var fileLocation=appDir+"/memories/"+imgNum+"/memory.txt";
    //  var file='/memory'+imgNumber+'.txt';
    var image=document.getElementById("img"+imgNum+"")
    var memoryLocation = appDir + image.src.substring(7) + ".memory.txt";
    var textBoxId='memory'+imgNum;
    //  var filePath= folderLocation + file;

     __fsExtra.readFile(memoryLocation, function(err, items){
       if(items) {
         document.getElementById(textBoxId).value = items;
       }
     });     
   }
   
  //  function generateIndexLoc(){
  //   //  var imgFolder=appDir+"/imgIndex/"+numberOfImages;
  //   var imgFolder;
  //   if(numberOfImages<=5000){
  //     imgFolder=appDir+"/imgIndex/"+numberOfImages;
  //   }
  //    else if(numberOfImages>5000){
  //     //  numberOfImages=1;
  //      numberOfIndexs=numberOfImages/5000>>0;
  //      imgFolder=appDir+"/imgIndex"+numberOfIndexs+"/"+numberOfImages;
  //    }
  //    console.log(numberOfImages);
  //    console.log(imgFolder);
     
     
  //    return imgFolder;
     
  //  }
   
   function generateRandomDate(seed, adder){
     var randNum=Math.floor(Math.random() * seed)+adder;
     return randNum;
   }
   
   function createDataArray(imgSrc, imgDateTime, loadBar){
    
    //  var srcLoc=generateIndexLoc()+"/src.txt";
    //  var imgDateTimeLoc=generateIndexLoc()+"/datetime.txt";
    // 
    //  __fsExtra.outputFile(srcLoc, imgSrc, (err) => {
    //    if (err) throw err;
    // });
    // 
    // __fsExtra.outputFile(imgDateTimeLoc, imgDateTime, (err)=>{
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
      // var date=new Date(__fsExtra.statSync(imgSrc).birthtime.getTime());
      jpgData.src=imgSrc;
      jpgData.date=new Date(__fsExtra.statSync(imgSrc).birthtime).getTime();
      
    } else {
      // var dateTime="2007:06:13 09:33:56";
      var pieces=imgDateTime.split(" ");
      var jpgDate=pieces[0].split(":");
      var month=parseInt(jpgDate[1])-1;
      
      jpgData.date=new Date(jpgDate[0], month, jpgDate[2]).getTime();
      jpgData.src=imgSrc;
    }
    indexTxtData.jpgDataArr.push(jpgData);
    //console.log(numberOfImages+" :: "+JSON.stringify(jpgData));


    var loadBarSpan = loadBar.querySelector('span');
    var currentWidth = ((TOTAL_FILES_ALREADY_INDEXED * 100) / TOTAL_FILES_TO_INDEX); //parseInt(loadBarSpan.style.width.substring(0, loadBarSpan.style.width.length-1));
    //console.log("currentWidth :: "+currentWidth);
    //console.log("TOTAL_FILES_ALREADY_INDEXED :: "+TOTAL_FILES_ALREADY_INDEXED);
    //console.log("TOTAL_FILES_TO_INDEX :: "+TOTAL_FILES_TO_INDEX);
    loadBarSpan.style.width = currentWidth + '%';
    loadBar.querySelector('p').innerHTML = loadBarSpan.style.width;          
    if(TOTAL_FILES_TO_INDEX === TOTAL_FILES_ALREADY_INDEXED) {
      writeDataToFile(loadBar);
    }

    // }
    
   }
   
   function writeDataToFile(loadBar) {
     
      __fs.writeFile(
        indexLoc,
        // appDir+"/index.txt",

        JSON.stringify(indexTxtData),

        function (err) {
          setTimeout(function() { loadBar.style.visibility='hidden'; }, 10000);
          if (err) {
              console.error('Crap happens');
          }
        }
      );
      
      console.log("Wrote index to file!!!");
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
    return false;
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

function getDateandTime(imgSrc, loadBar) {
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
  var ExifImage = __kindaExif.ExifImage;
  // var isGo=true;
  try {
    ++TOTAL_FILES_ALREADY_INDEXED;
    var image = new ExifImage({
      // image: pathModule.join(__dirname, 'space-invader.jpg')
      // image: (imgSrc.replace(/ /g, '/'))
      image: (imgSrc)
    
    });
    
    var imgDateTime = image.exifData.exif.DateTimeOriginal;
    //LEAVING LINE 373 IN WILL MAKE IT SO THAT ONLY JPGS ARE DISPLAYED.
    // createDataArray(imgSrc, imgDateTime);
  }
  catch(err){
    console.log("ERROR: " + imgSrc + " :: " + imgDateTime + " :: " + err);
    return;
  }

  // var imgFolder=appDir+"/imgIndex/"+imgNum;
  //THIS METHOD CREATES THE IMG INDEX
  //LEAVING LINE 381 AND 376 IN WILL ALLOW FOR ALL IMG TYPES TO BE DISPLAYED EVEN CORRUPTED ONES
  createDataArray(imgSrc, imgDateTime, loadBar);
}

function startApp(whatToDo){
  
  // __fsExtra.readdir(imgFolder, function(err, items){
    
    //document.write(items);
    if(whatToDo==1){
      
      var loadBar = document.getElementById('progressBar');

      if(!__extfs.isEmptySync(indexLoc)){
        clearIndex();
      }
      var imgFolders = dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']})
      loadBar.style.visibility='visible';
      loadBar.querySelector('span').style.width = '0%';
      loadBar.querySelector('p').innerHTML = '0%';
      TOTAL_FILES_TO_INDEX=0;
      TOTAL_FILES_ALREADY_INDEXED=0;
      recurseDirs(imgFolders[0], loadBar).then(function() {
        //writeDataToFile();
      });
      // var nOIPath=appDir+"/imgIndex/numberOfImages.txt"
      
      // __fsExtra.outputFile(nOIPath, numberOfImages, (err) => {
      //   if (err) throw err;
   // console.log('The file has been saved!');
    //  });
      // var nonImgCount=createIndex(items);
    //   numberOfImages=items.length-nonImgCount;
    //   var nOIPath=""+appDir+"/imgIndex/numberOfImages.txt"
    //   __fsExtra.outputFile(nOIPath, numberOfImages, (err) => {
    //     if (err) throw err;
    //  });
    }
    else if(whatToDo==2){
      
      // var content=__fsExtra.readFileSync(indexLoc, 'utf8');
      // jpgDataArr=JSON.parse(content);
      searchImages();
    }
    else if(whatToDo==3){
      // loadIntialImages(items);
      if(!__fs.existsSync(appDir)){
        __fs.mkdirSync(appDir);
      }
      
      if(__extfs.isEmptySync(indexLoc)){
        console.log(indexTxtData.jpgDataArr.length);
        
          alert("Please click create index button.");
          // return;
      }else{
        var content=__fsExtra.readFile(indexLoc, 'utf8', function(err, content){
        
            indexTxtData=JSON.parse(content);
              });
      }
        // try{
        
        // }catch(err){
        //   alert("Please click create index button.")
        // }
        
        
    
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


function recurseDirs(nextDir, loadBar){
  // var imgCount=imgCountIn;
  
  // var path=imgFolder;
  // __fsExtra.readdir(nextDir, function(err, items){
  return new Promise((resolve, reject) => {
    __fsExtra.readdir(nextDir, function(err, items) {
      var itemsChecked = 0;
      const MAX_ITEMS = items.length;
      for(var i=0;i<MAX_ITEMS;i++) {
        // var stats = __fsExtra.statSync(nextDir+"/"+items[i]).isDirectory();
        var statFunc = function(filePath) {
          return function(err, dirToCheck) {
            if(dirToCheck.isDirectory()) {//breaks of the statSync method.
              recurseDirs(filePath, loadBar).then(function() {
                //resolve(true);
            
                // var loadBarSpan = loadBar.querySelector('span');
                // var currentWidth = parseInt(loadBarSpan.style.width.substring(0, loadBarSpan.style.width.length-1));
                // loadBarSpan.style.width = (currentWidth+1) + '%';
                // loadBar.querySelector('p').innerHTML = loadBarSpan.style.width;          
              });
            } else {
              // imgCount=createIndex(nextDir+"/"+items[i], imgCount);
              createIndex(filePath, loadBar);
              // var loadBarSpan = loadBar.querySelector('span');
              // var currentWidth = parseInt(loadBarSpan.style.width.substring(0, loadBarSpan.style.width.length-1));
              // loadBarSpan.style.width = (currentWidth+1) + '%';
              // loadBar.querySelector('p').innerHTML = loadBarSpan.style.width;          
            // numberOfImages=items.length-nonImgCount;
            }

            ++itemsChecked;
            if(itemsChecked >= MAX_ITEMS) {
              resolve(true);
            }
          };
        }

        __fsExtra.stat(nextDir+"/"+items[i], statFunc(nextDir+"/"+items[i]));
      }
    });
  });
      
}


 function createIndex(file, loadBar){
  
      if(!indexTxtData[file] && isImage(file)){
        
        indexTxtData[file] = true;

        ++TOTAL_FILES_TO_INDEX;
        
        setTimeout(function() { numberOfImages++; getDateandTime(file, loadBar); }, 10);
        
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
  
  // __fs.readFile(indexLoc, 'utf8', function(err, items){
  // var content=__fsExtra.readFileSync(indexLoc, 'utf8');
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
  // window.setTimeout(function() { lazyload(); }, 1);
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

//   var strNumberOfImages=__fsExtra.readFileSync(numberOfImagesPath);
//   numberOfImages=parseInt(strNumberOfImages,10);
//     for(var i=0;i<numberOfImages;i++){
//       var dateTimePath="/Users/msivraj/Documents/imgIndex/"+i+"/datetime.txt";
//       var srcPath="/Users/msivraj/Documents/imgIndex/"+i+"/src.txt"
// 
// if(__fsExtra.existsSync(dateTimePath)) {
//   dateTimeStr=__fsExtra.readFileSync(dateTimePath, 'utf8');
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

function getDegree(styleIn){
  var firstSplit=styleIn.split('(');
  var str="";
  var returnValInt=0;
  if(styleIn==""){
    returnValInt=0;
  }else{
    for(var i=0 ;i<firstSplit[1].length;i++){
      if(firstSplit[1].charAt(i)=="d"){
        break;
      }else{
        str+=firstSplit[1].charAt(i)
        returnValInt=parseInt(str);
      }
    }
  }
  
  return returnValInt;
}

function calcDegRight(styleIn){
  var rightDegree=getDegree(styleIn);
  var returnRightStr="";
  // if(degree==0){
  //   degree=90;
  //   returnRightStr="rotate("+rightDegree+"deg)";
  //   
  // }else{
    rightDegree+=90;
    returnRightStr="rotate("+rightDegree+"deg)";
  // }
  
  console.log(returnRightStr);
  return returnRightStr;
}

function rotateClockwise(imgNumIn){
  var lboxImg=document.getElementById("lightboxImg"+imgNumIn);
  var style=lboxImg.style.transform;
  lboxImg.style.transform=calcDegRight(style);
  // lboxImg.webkit-transform="rotate(90deg)";
}

function calcDegLeft(styleIn){
  var leftDegree=getDegree(styleIn);
  var returnLeftStr="";

    leftDegree-=90;
    returnLeftStr="rotate("+leftDegree+"deg)";
    console.log(returnLeftStr);
    return returnLeftStr;
  
    

  
}

function rotateCounterClockwise(imgNumIn){
  var lboxImg=document.getElementById("lightboxImg"+imgNumIn);
  var style=lboxImg.style.transform;
  lboxImg.style.transform=calcDegLeft(style);
  
  // var lboxImg=document.getElementById("lightboxImg"+imgNumIn);
  // lboxImg.style.transform="rotate(-90deg)"
}