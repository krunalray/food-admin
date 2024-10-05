import React  from 'react';
import $ from 'jquery';
import * as config from '../../../system/config';
var moment = require('moment');

require('moment-timezone');

export function totalFormat(value){
  value = parseFloat(value);
  if(isNaN(value)){
    return <span><i className="fa fa-inr"></i> 0</span>;
  }
  value = value.toFixed(2).replace(/(\d)(?=(\d{2})+\.)/g, "$1,");
  return <span><i className="fa fa-inr"></i>{value}</span>;
}

export function amountFormat(value){
  value = parseFloat(value);
  if(isNaN(value)){
    return <span><i className="fa fa-inr"></i> 0</span>;
  }
  value = value.toFixed(2).replace(/(\d)(?=(\d{2})+\.)/g, "$1,");
  return <span><i className="fa fa-inr"></i>{value}</span>;
}

export function htmlDecode(str){
  if(str && typeof str === 'string') {
    var element = document.createElement('div');
    // strip script/html tags
    str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
    str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
    element.innerHTML = str;
    str = element.textContent;
    element.textContent = '';
  }
  return str;
  /*if(str && typeof str === 'string') {
    str = str.replace(/\&amp;/g,'&');
		str = str.replace(/\&lt;/g,'<');
  }
  return str;*/
}

export function ucwords(str){
  if(str && typeof str === 'string') {
    str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
      return letter.toUpperCase();
    });
  }
  return str;
}

export function toHtml(str){
  //var str_html = $("<div/>").html(str).text();
  //return <div dangerouslySetInnerHTML = {{__html : str_html }}/>;
  return <div dangerouslySetInnerHTML={{__html: str}} />
}

export function focusDiv(get_ref) {
  window.location.hash = get_ref;
}

export function strtotime(date){
  /*import strtotime from 'locutus/php/datetime/strtotime';
  return strtotime(date);*/
  //require('locutus/php/datetime/strtotime');
  return date;
}

export function imageExists(url, callback) {
  var img = new Image();
  img.onload = function() { callback(true); };
  img.onerror = function() { callback(false); };
  img.src = url;
}

export function onlyTimeFormat(str){
  var open = str.split(":");
  var hours = open[0];
  var minutes = open[1];
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

//make list
//https://jsfiddle.net/justindevs/wgk63o1y/
export function getTimeIntervals(time1, time2, interval) {
  time1 = parseIn(time1);
  time2 = parseIn(time2);

  var arr = [];
  while(time1 < time2){
    arr.push(time1.toTimeString().substring(0,5));
    time1.setMinutes(time1.getMinutes() + interval);
  }
  return arr;
}

//Parse In
export function parseIn(date_time){
  var d = new Date();
  d.setHours(date_time.substring(11,13));
  d.setMinutes(date_time.substring(14,16));

  return d;
}


//title, summary, details, severity, dismissible, autoDismiss, appendToId
export function createAlert(alert_data) {
  //https://codepen.io/codysechelski/pen/dYVwjb?q=alert&limit=all&type=type-pens
  if(alert_data.type == undefined || !alert_data.type){
    alert_data.class = 'success';
  } else {
    alert_data.class = alert_data.type;
  }
  if(alert_data.dismissible == undefined){
    alert_data.dismissible = true;
  }
  if(alert_data.autoDismiss == undefined){
    alert_data.autoDismiss = true;
  }


  var iconMap = {
    info: "fa fa-info-circle",
    success: "fa fa-thumbs-up",
    warning: "fa fa-exclamation-triangle",
    danger: "fa ffa fa-exclamation-circle"
  };

  var iconAdded = false;

  var alertClasses = ["alert", "animated", "flipInX"];
  alertClasses.push("alert-" + alert_data.class.toLowerCase());


  if (alert_data.dismissible != undefined && alert_data.dismissible) {
    alertClasses.push("alert-dismissible");
  }

  var msgIcon = $("<i />", {
    "class": iconMap[alert_data.class] // you need to quote "class" since it's a reserved keyword
  });

  var msg = $("<div />", {
    "class": alertClasses.join(" ") // you need to quote "class" since it's a reserved keyword
  });
  if (alert_data.title) {
    var msgTitle = $("<h4 />", {
      html: alert_data.title
    }).appendTo(msg);

    if(!iconAdded){
      msgTitle.prepend(msgIcon);
      iconAdded = true;
    }
  } else {
    var msgTitle = $("<h4 />", {
      html: 'Success'
    }).appendTo(msg);

    if(!iconAdded){
      msgTitle.prepend(msgIcon);
      iconAdded = true;
    }
  }

  if (alert_data.sub_title != undefined && alert_data.sub_title) {
    var msgSummary = $("<strong />", {
      html: alert_data.sub_title
    }).appendTo(msg);

    if(!iconAdded){
      msgSummary.prepend(msgIcon);
      iconAdded = true;
    }
  }

  if (alert_data.message) {
    var msgDetails = $("<p />", {
      html: alert_data.message
    }).appendTo(msg);

    if(!iconAdded){
      msgDetails.prepend(msgIcon);
      iconAdded = true;
    }
  }


  if (alert_data.dismissible) {
    var msgClose = $("<span />", {
      "class": "close", // you need to quote "class" since it's a reserved keyword
      "data-dismiss": "alert",
      html: "<i class='fa fa-times-circle'></i>"
    }).appendTo(msg);
  }

  //$('#' + appendToId).prepend(msg);
  $('#pageMessages').prepend(msg);
  if (alert_data.play_sound != undefined && alert_data.play_sound == true) {
    document.getElementById('sound').play();
  }
  if(alert_data.autoDismiss){
    setTimeout(function(){
      msg.addClass("flipOutX");
      setTimeout(function(){
        msg.remove();
      },1000);
    }, 5000);
  }
}

export function getFullYear() {
  var d = new Date();
  return d.getFullYear();
}

export function Ucfirst(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getCombinations(allOptionsArray, combination){
  if(allOptionsArray.length > 0) {
    for(var i=0; i < allOptionsArray[0].length; i++) {
      var tmp = allOptionsArray.slice(0);
      combination.codes[combination.counter] = allOptionsArray[0][i];
      tmp.shift();
      combination.counter++;
      getCombinations(tmp, combination);
    }
  } else {
    var combi = combination.codes.slice(0);
    combination.result.push(combi);
  }
  combination.counter--;
}
export function formatDateForDifference(date) {
  var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
  //console.log(month+"::"+day+"::"+year);
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}

export function Decodetohtml(str){
  var str_html = str;
  return <div dangerouslySetInnerHTML = {{__html : str_html }}/>;
}

export function currencyFormat(value, currency, toFixedPoint){
  if(currency.constructor === Object) {
    var amount = value;
    var symbol_left = currency['symbol_left'];
    var symbol_right = currency['symbol_right'];
    var decimal_place = currency['decimal_place'];
    //var value = currency['value'];
    var string = '';
    if (symbol_left) {
      string += symbol_left;
    }

    string += number_format(amount, parseInt(decimal_place), '.', ',');
    if (symbol_right) {
      string += symbol_right;
    }
    return string;
  } else {
    value = parseFloat(value);
    var currencyPrefix = '₹';
    //var toFixedPoint = 2;
    if(toFixedPoint == undefined){
      var toFixedPoint = 2;
    }
    if(!currency){
      currencyPrefix = '₹';
    } else if(currency == "USD"){
      currencyPrefix = '$';
    }
    if(isNaN(value)){
      return currencyPrefix+"0";
    }

    value = value.toFixed(toFixedPoint).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    return currencyPrefix+value;
  }
}

function number_format(number, decimals, decPoint, thousandsSep) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
  var n = !isFinite(+number) ? 0 : +number
  var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
  var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
  var s = ''

  var toFixedFix = function (n, prec) {
    var k = Math.pow(10, prec)
    return '' + (Math.round(n * k) / k)
      .toFixed(prec)
  }

  // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }

  return s.join(dec)
}

export function changeNameTitleToSeoUrl(name) {
  var temp_name = name;
  var url_text = temp_name;
  var characters = [' ', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '_', '{', '}', '[', ']', '|', '/', '<', '>', ',', '?', ';', '"', '.', '--', "'", "`"];
  for (var i = 0; i < characters.length; i++) {
    var char = String(characters[i]);
    url_text = url_text.replace(new RegExp("\\" + char, "g"), '-');
  }
  url_text = url_text.replace(/--/g, "-");
  url_text = url_text.replace(/-\s*$/, "");
  url_text = url_text.toLowerCase();
  temp_name = url_text;
  temp_name = temp_name.replace(/ /g, "-"); // globally replace the string
  temp_name = temp_name.toLowerCase();

  return temp_name;
}

export function dateFormat(date, type = false, format = false, timezone){
  var date_format = "DD-MM-YYYY";
  if(format){
    date_format = format;
  } else if(type == 'datetime'){
    date_format = date_format+' hh:mm A';
  }

  //return moment(date).format(date_format);
  /*var newDate = moment(date).format(date_format);
  console.log("date>>>>>>>", date);
  console.log("Los_Angeles>>>>>>>", moment(date).tz("America/Los_Angeles").format(date_format));
  console.log("Kolkata>>>>>>>", moment(date).tz("Asia/Kolkata").format(date_format));

  var newYork    = moment.tz(newDate, "America/New_York");
  console.log("newYork>>>>>", newYork);*/

  if(timezone != undefined && timezone){
    //const nDate = new Date(date).toLocaleString("en-US", { timeZone: timezone });
    return moment(date).tz(timezone).format(date_format);
  } else {
    return moment(date).tz("Asia/Kolkata").format(date_format);
  }

  //return moment(date).tz("Asia/Kolkata").format(date_format);
  //return moment(date).tz("America/Los_Angeles").format(date_format);
  //return moment.tz(date, 'Asia/Kolkata').format(date_format);
}

export function dateFormatOnly(date, type = false, format = false){
  var date_format = "DD-MM-YYYY";
  if(format){
    date_format = format;
  } else if(type == 'datetime'){
    date_format = date_format+' hh:mm A';
  }
  return moment(date).format(date_format);  
}

export function menuUrl(data) {
  var url = config.LINK_PREFIX;
  if(data.model_id > 0){
    url = config.LINK_PREFIX+"/model/list/"+data.model_keyword;
  } else if(data.route != '') {
    if(data.project_id == 2) {
      url = (data.route_freelansify ? config.LINK_PREFIX + "/" + data.route_freelansify : config.LINK_PREFIX + "/" + data.route);
    } else {
      url = config.LINK_PREFIX+"/"+data.route;
    }
  } else if(data.keyword != '') {
    url = config.LINK_PREFIX+"/model/list/"+data.keyword;
  }
  return url;
}

export function trialDays(date){
  var today = new Date();
  today = new Date(today).toUTCString();
  today = new Date(today.split(' ').slice(1, 4).join('-'));

  var added = new Date(date);
  added = new Date(added).toUTCString();
  added = new Date(added.split(' ').slice(1, 4).join('-'));

  var timeDiff = Math.abs(added.getTime() - today.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays;
}

export function number12Format(hours){
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  var str = hours + ':00 ' + ampm;
  return str;
}

export function convertNumberToWords(amount) {
  var words = new Array();
  words[0] = '';
  words[1] = 'One';
  words[2] = 'Two';
  words[3] = 'Three';
  words[4] = 'Four';
  words[5] = 'Five';
  words[6] = 'Six';
  words[7] = 'Seven';
  words[8] = 'Eight';
  words[9] = 'Nine';
  words[10] = 'Ten';
  words[11] = 'Eleven';
  words[12] = 'Twelve';
  words[13] = 'Thirteen';
  words[14] = 'Fourteen';
  words[15] = 'Fifteen';
  words[16] = 'Sixteen';
  words[17] = 'Seventeen';
  words[18] = 'Eighteen';
  words[19] = 'Nineteen';
  words[20] = 'Twenty';
  words[30] = 'Thirty';
  words[40] = 'Forty';
  words[50] = 'Fifty';
  words[60] = 'Sixty';
  words[70] = 'Seventy';
  words[80] = 'Eighty';
  words[90] = 'Ninety';
  amount = amount.toString();
  var atemp = amount.split(".");
  var number = atemp[0].split(",").join("");
  var n_length = number.length;
  var words_string = "";
  if (n_length <= 9) {
    var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
    var received_n_array = new Array();
    for (var i = 0; i < n_length; i++) {
      received_n_array[i] = number.substr(i, 1);
    }
    for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
      n_array[i] = received_n_array[j];
    }
    for (var i = 0, j = 1; i < 9; i++, j++) {
      if (i == 0 || i == 2 || i == 4 || i == 7) {
        if (n_array[i] == 1) {
          n_array[j] = 10 + parseInt(n_array[j]);
          n_array[i] = 0;
        }
      }
    }

    let value = "";
    for (var i = 0; i < 9; i++) {
      if (i == 0 || i == 2 || i == 4 || i == 7) {
        value = n_array[i] * 10;
      } else {
        value = n_array[i];
      }
      if (value != 0) {
        words_string += words[value] + " ";
      }
      if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
        words_string += "Crores ";
      }
      if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
        words_string += "Lakhs ";
      }
      if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
        words_string += "Thousand ";
      }
      if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
        words_string += "Hundred and ";
      } else if (i == 6 && value != 0) {
        words_string += "Hundred ";
      }
    }
    words_string = words_string.split("  ").join(" ");
  }
  return words_string;
}

//21-04-2020
export function validateFile(file){
  //console.log("validate file >>>>>>>", file);
  var error = false;

  var maxSize = 2 * 1000 * 1000;
  // Allowed file extension types
  var allowed_file_types = ['zip','txt','png','jpe','jpeg','jpg','gif','bmp','ico','tiff','tif','svg','svgz','zip','rar','msi','cab','mp3','qt','mov','pdf','psd','ai','eps','ps','doc'];
  //console.log("file extension>>>>", file.originalname.split('.').pop());return false;
  var file_type = file.name.split('.').pop();

  if(allowed_file_types.indexOf(file_type) == -1){
    error = "Invalid file type!";
  }

  var file_name = file.name.substr(0, file.name.lastIndexOf('.'));
  if ((file_name.length < 3) || (file_name.length > 64)) {
    error = "Filename must be between 3 and 64 characters!";
  }

  // Allowed file mime types
  var allowed_mime_types = ['text/plain','image/png','image/jpeg','image/gif','image/bmp','image/tiff','image/svg+xml','application/zip','"application/zip"','application/x-zip','"application/x-zip"','application/x-zip-compressed','"application/x-zip-compressed"','application/rar','"application/rar"','application/x-rar','"application/x-rar"','application/x-rar-compressed','"application/x-rar-compressed"','application/octet-stream','"application/octet-stream"','audio/mpeg','video/quicktime','application/pdf'];
  if(!error && allowed_mime_types.indexOf(file.type) == -1){
    error = "Invalid file type!";
  }

  if(!error && file.size > maxSize){
    error = "File size too large!";
  }

  return error;
}
//21-04-2020
//11-05-2020
export function nameTextSort(name){
  var words = name.split(" ");
  var text = '';
  if(words.length == 2){
    text = words[0].substr(0,1)+words[1].substr(0,1);
  } else {
    text = name.substr(0,2);
  }
  return text.toUpperCase();
}
//11-05-2020
//18-11-2020
export function normalizeField(normalizers){
  return function(value, previousValue, allValues, previousAllValues){
    var i = 0;
    var normalizersLength = normalizers.length;
    var currentValue = value;
    while(i < normalizersLength)
    {
        var currentNormalizer = normalizers[i];
        if(typeof currentNormalizer == "string")
        {
          currentValue = eval(currentNormalizer)(currentValue ,previousValue , allValues , previousAllValues);
        }
        i++;
    }
    return currentValue;
  }
}
var trimStart = function(value , previousValue , allValues , previousAllValues){
  return value.trimStart();
}
var trimEnd = function(value , previousValue , allValues , previousAllValues){
  return value.trimEnd();
}
var trim = function(value , previousValue , allValues , previousAllValues){
  return value.trim();
}
var upperCase = function(value , previousValue , allValues , previousAllValues){
  return value.toUpperCase();
}
var lowerCase = function(value , previousValue , allValues , previousAllValues){
  return value.toLowerCase();
}
var onlyNums = function(value , previousValue , allValues , previousAllValues){
  if (!value) {
    return value
  }

  return value.replace(/[^\d]/g, '');
}
//18-11-2020
