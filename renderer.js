// var myArr=[];
// for(var i=0;i<30000;i++){
//   var jpgData={};
//   var dateTime="2007:06:13 09:33:56";
//   var pieces=dateTime.split(" ");
//   var jpgDate=pieces[0].split(":");
// 
//   jpgData.date=new Date(jpgDate[0], jpgDate[1], jpgDate[2]).getTime();
//   jpgData.src="/Users/msivraj/Documents/imgs/2008-07-20 kings-peak-2/IMG_0507.JPG";
// 
//   myArr.push(jpgData);
//   console.log(i+" :: "+JSON.stringify(jpgData));
//   
// }
// JSON.stringify(myArr);
// how to read file
    // var jsonDataFromFile=fs.readFileSync("pathToJpgJsonData")
    // var myArr=JSON.parse(jsonDataFromFile);
    
    
// var str="/Users/msivraj/Documents/imgs/2011-02-10 Thans pictures1";    
// var replaced = str.replace(/ /g, "/");    
// alert(replaced);

// for(var i=0;i<1000;i++){
//   var randNum=Math.floor(Math.random() * 12)+1;
//   console.log(randNum);
// }

// var date= new Date(1289804400000);
// var year=date.getFullYear();

// var fs=require('fs-extra');
// var date=fs.statSync("/Users/msivraj/Documents/imgs/2006_12_16/img_0002.jpg").birthtime.getTime();
// var dateOne=new Date(fs.statSync("/Users/msivraj/Documents/imgs/2006_12_16/img_0002.jpg").birthtime).getTime();
// console.log(date);
// if(isImage("/Users/msivraj/Documents/imgs/2011-02-10 Thans pictures1/black flower.jpg")){
// try {
//   var ExifImage = require('kinda-exif').ExifImage;
//   var image = new ExifImage({
//     // image: pathModule.join(__dirname, 'space-invader.jpg')
//     // image: (imgSrc.replace(/ /g, '/'))
//     image: ("/Users/msivraj/Documents/imgs/2011-02-10 Thans pictures1/black flower.jpg")
//   });
//   
//   var imgDateTime=image.exifData.exif.DateTimeOriginal;
// }
// catch(err) {
//   console.log(err)
// }
// }
// 
// function getExtension(filename) {
//   if(filename==undefined){
//     return;
//   }
//     var parts = filename.split('.');
//     return parts[parts.length - 1];
// }
// 
// function isImage(filename) {
//   if(filename==undefined){
//     return;
//   }
//     var ext = getExtension(filename);
//     switch (ext.toLowerCase()) {
//     case 'jpg':
//     case 'gif':
//     case 'bmp':
//     case 'png':
//     case 'tiff':
//         // etc
//         return true;
//     }
//     return false;
// }

// window.addEventListener("DOMContentLoaded", function(event) {
//   startApp();
//     // window.setTimeout(function() { lazyload(); }, 200);
// });
// var $ = require('jquery');
// 
// function startApp(){
//   var bar = $('span');
//   var p = $('p');
// 
//   var barWidth = bar.attr('style');
//   barWidth = barWidth.replace("width:", "");
//   barWidth = barWidth.substr(0, barWidth.length-1);
//   bar.css('width', '0%');
// 
//   var interval;
//   var start = 0; 
//   var end = parseInt(barWidth);
//   var current = start;
// 
//   var countUp = function() {
//     current++;
//     bar.css('width', current + "%");
//     p.html(current + "%");


window.addEventListener("DOMContentLoaded", function(event) {
  var returnValStr="";
  var returnValInt=0;
  var lboxImg=document.getElementById("happy");
  lboxImg.style.transform="rotate(90deg)"
  var trans=lboxImg.style.transform;
  var firstSplit=trans.split('(')
  var secondSplit=firstSplit[1];
  for(var i=0 ;i<firstSplit[1].length;i++){
    if(Number.isInteger(parseInt(firstSplit[1].charAt(i)))){
      returnValStr+=firstSplit[1].charAt(i)
      returnValInt=parseInt(returnValStr);
    }
  }
  
  console.log(returnValInt);

  
  
    // window.setTimeout(function() { lazyload(); }, 200);
});


