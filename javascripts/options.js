var showVertical;
var showSettings;
var showLabel;
var labelUnder;
var labelNext;
var saveButton;
var saveButtonTop;
var iconBreak;

var wholeshebang;
var completelist;
var userlist;
var completeListArray = new Array();
var completeListArrayLength;
var wholeshebangArray = new Array();
var wholeshebangArrayLength;
var userListArray = new Array();
var userListArrayLength;


function init() {
  completelist = localStorage.completelist || "";
  wholeshebang = localStorage.wholeshebang || "";
  userlist = localStorage.userList || "";

  completeListArray = completelist.split(',');
  completeListArray.pop();
  completeListArray.sort(function(x,y){ 
      var a = String(x).toUpperCase(); 
      var b = String(y).toUpperCase(); 
      if (a > b) 
      return 1 
      if (a < b) 
      return -1 
      return 0; 
      });
  completeListArrayLength = completeListArray.length;

  //document.getElementById("services-number").innerHTML = completeListArrayLength + " ";
  //document.getElementById("servicesFilter").value = "";

  showSettings = document.getElementById("show-settings");
  showLabel = document.getElementById("show-label");
  labelUnder = document.getElementById("label-under");
  labelNext = document.getElementById("label-next");
  showVertical = document.getElementById("show-vertical");
  saveButton = document.getElementById("save-button");
  saveButtonTop = document.getElementById("save-button-top");
  iconBreak = document.getElementById("icon-break");

  //(localStorage.alwaysTab == "true") ? alwaysTab.checked = true : alwaysTab.checked = false;
  //(localStorage.noFocusTab == "true") ? noFocusTab.checked = true : noFocusTab.checked = false;
  (localStorage.showSettings == "true") ? showSettings.checked = true : showSettings.checked = false;
  (localStorage.showVertical == "true") ? showVertical.checked = true : showVertical.checked = false;
  if (localStorage.showLabel == "true") {
    showLabel.checked = true;
    labelUnder.disabled = false;
    labelNext.disabled = false;
  } else {
    showLabel.checked = false;
    labelUnder.disabled = true;
    labelNext.disabled = true;
  }
  (localStorage.labelUnder == "true") ? labelUnder.setAttribute('checked','checked') : labelNext.setAttribute('checked','checked');
  if (localStorage.getItem("iconBreak") != undefined)
    iconBreak.value = localStorage.getItem("iconBreak");

  renewLists();

  markClean();

  // show which size has been selected
  var currentSize = localStorage["icon-size"];

  switch (currentSize) {
    case "16":
      document.getElementById("16").setAttribute("class", "icon-size-selected");
    break;
    case "24":
      document.getElementById("24").setAttribute("class", "icon-size-selected");
    break;
    case "32":
      document.getElementById("32").setAttribute("class", "icon-size-selected");
    break;
    case "42":
      document.getElementById("42").setAttribute("class", "icon-size-selected");
    break;
    case "48":
      document.getElementById("48").setAttribute("class", "icon-size-selected");
    break;
    case "64":
      document.getElementById("64").setAttribute("class", "icon-size-selected");
    break;
    default:
    document.getElementById("16").setAttribute("class", "icon-size-selected");
    break;
  }
}

function renewLists() {
  wholeshebangArray = wholeshebang.split(',');
  wholeshebangArray.pop();
  wholeshebangArray.sort(function(x,y){ 
      var a = String(x).toUpperCase(); 
      var b = String(y).toUpperCase(); 
      if (a > b) 
      return 1 
      if (a < b) 
      return -1 
      return 0; 
      });
  wholeshebangArrayLength = wholeshebangArray.length;

  userListArray = userlist.split(',');
  userListArray.pop();
  userListArrayLength = userListArray.length;

  // first of all remove all services, if there are any
  var holder = document.getElementById("linkeSpalte");
  while(holder.hasChildNodes()){
    holder.removeChild(holder.lastChild);
  }
  holder = document.getElementById("rechteSpalte");
  while(holder.hasChildNodes()){
    holder.removeChild(holder.lastChild);
  }
  // create dummies
  document.getElementById("linkeSpalte").innerHTML = '<div id="dummySpanLinks" style="visibility:hidden;height:0;width:0;">kleiner test-dummy</div>';
  document.getElementById("rechteSpalte").innerHTML = '<div id="dummySpanRechts" style="visibility:hidden;height:0;width:0;">kleiner test-dummy</div>';

  // active filter?
  //var filter = document.getElementById("servicesFilter").value;
  //filter = filter.toLowerCase().replace(/\*/g, "").replace(/\+/g, "");	

  // create left list
  var counter = 0;
  for (var i = 0; i < wholeshebangArrayLength; i++) {
    var result1 = true;
    

    var idStripped = wholeshebangArray[i].replace(/\ /g, "").toLowerCase();

    // new table
    var myOuterSpan = document.createElement('div');
    var myInnerSpan = document.createElement('span');
    var myInvisibleTitle = document.createElement('span');
    var myMoveButtonUp = document.createElement('image');
    var myMoveButtonDown = document.createElement('image');
    myMoveButtonDown.setAttribute('style','cursor:pointer');
    myMoveButtonDown.setAttribute('onclick','moveVertical(this.parentNode, 1)');
    myMoveButtonDown.setAttribute('class','verticalMoveButton');
    myMoveButtonDown.setAttribute('align','top');
    myMoveButtonDown.setAttribute('src','images/options/arrow_down.png');
    myMoveButtonDown.setAttribute('title','Move service one down');
    myMoveButtonUp.setAttribute('style','cursor:pointer');
    myMoveButtonUp.setAttribute('onclick','moveVertical(this.parentNode, -1)');
    myMoveButtonUp.setAttribute('class','verticalMoveButton');
    myMoveButtonUp.setAttribute('align','absmiddle');
    myMoveButtonUp.setAttribute('src','images/options/arrow_up.png');
    myMoveButtonUp.setAttribute('title','Move service one up');
    myInnerSpan.setAttribute('style','cursor:pointer');
    myInnerSpan.setAttribute('onclick','moveHorizontal(this.parentNode)');
    myInnerSpan.setAttribute('title', wholeshebangArray[i] + '\n' + localStorage.getItem(wholeshebangArray[i] + '_tooltip'));
    var size = localStorage["icon-size"];
    myInnerSpan.innerHTML = ' <img src="images/services/' + idStripped + '-' + size + '.png" align="absmiddle">&nbsp;' + wholeshebangArray[i];
    myOuterSpan.setAttribute('id',idStripped);if (result1 || result2) {
      myOuterSpan.setAttribute('class',counter%2 == 1 ? 'one' : 'zero');
      myOuterSpan.setAttribute('style','margin:2px;');
      counter++;
    } else {
      myOuterSpan.setAttribute('class','hiddenService');
    }
    //myOuterSpan.setAttribute('class',i%2 == 1 ? 'one' : 'zero');
    myInvisibleTitle.setAttribute('title',wholeshebangArray[i]);
    myInvisibleTitle.setAttribute('style','visibility:hidden;width:0;');

    myOuterSpan.appendChild(myMoveButtonUp);
    myOuterSpan.appendChild(myMoveButtonDown);
    myOuterSpan.appendChild(myInnerSpan);
    myOuterSpan.appendChild(myInvisibleTitle);

    document.getElementById('linkeSpalte').insertBefore(myOuterSpan, document.getElementById("dummySpanLinks"));
  }
  // create right list
  for (var i = 0; i < userListArrayLength; i++) {
    var idStripped = userListArray[i].replace(/\ /g, "").toLowerCase();
    if (idStripped.substr(0,12) == "custombutton")
      idStripped = "custombutton";

    // new table
    var myOuterSpan = document.createElement('div');
    var myInnerSpan = document.createElement('span');
    var myInvisibleTitle = document.createElement('span');
    var myMoveButtonUp = document.createElement('image');
    var myMoveButtonDown = document.createElement('image');
    var myMoveButtonFullUp = document.createElement('image');
    var myMoveButtonFullDown = document.createElement('image');

    myMoveButtonDown.setAttribute('style','cursor:pointer');
    myMoveButtonDown.setAttribute('onclick','moveVertical(this.parentNode, 1)');
    myMoveButtonDown.setAttribute('class','verticalMoveButton');
    myMoveButtonDown.setAttribute('align','absmiddle');
    myMoveButtonDown.setAttribute('src','images/options/arrow_down.png');
    myMoveButtonDown.setAttribute('title','Move service one down');

    myMoveButtonUp.setAttribute('style','cursor:pointer');
    myMoveButtonUp.setAttribute('onclick','moveVertical(this.parentNode, -1)');
    myMoveButtonUp.setAttribute('class','verticalMoveButton');
    myMoveButtonUp.setAttribute('align','absmiddle');
    myMoveButtonUp.setAttribute('src','images/options/arrow_up.png');
    myMoveButtonUp.setAttribute('title','Move service one up');

    myMoveButtonFullUp.setAttribute('style','cursor:pointer');
    myMoveButtonFullUp.setAttribute('onclick','moveVertical(this.parentNode, -11)');
    myMoveButtonFullUp.setAttribute('class','verticalMoveButton');
    myMoveButtonFullUp.setAttribute('align','absmiddle');
    myMoveButtonFullUp.setAttribute('src','images/options/arrow_full_up.png');
    myMoveButtonFullUp.setAttribute('title','Move service to the top');

    myMoveButtonFullDown.setAttribute('style','cursor:pointer');
    myMoveButtonFullDown.setAttribute('onclick','moveVertical(this.parentNode, 11)');
    myMoveButtonFullDown.setAttribute('class','verticalMoveButton');
    myMoveButtonFullDown.setAttribute('align','absmiddle');
    myMoveButtonFullDown.setAttribute('src','images/options/arrow_full_down.png');
    myMoveButtonFullDown.setAttribute('title','Move service to the bottom');


    var label = "";
    if (localStorage.getItem(userListArray[i] + "_name") != undefined && localStorage.getItem(userListArray[i] + "_name") != "")
      label = '<span style="color:#52A0DE;">' + localStorage.getItem(userListArray[i] + "_name") + '</span>';
    else if (localStorage.getItem(userListArray[i] + "_customURL") != undefined && localStorage.getItem(userListArray[i] + "_customURL") != "")
      label = '<span style="color:#52A0DE;">' + userListArray[i] + '</span>';
    else
      label = userListArray[i];

    myInnerSpan.setAttribute('style','cursor:pointer');
    myInnerSpan.setAttribute('onclick','moveHorizontal(this.parentNode)');
    myInnerSpan.setAttribute('title', userListArray[i] + '\n' + localStorage.getItem(userListArray[i] + '_tooltip'));
    var imgStyle = "";
    if (idStripped.substr(0,12) == "custombutton") {
      idStripped = "custombutton";
      var imageSrc = "http://www.google.com/s2/favicons?domain_url=" + escape(localStorage.getItem(userListArray[i] + "_customURL"));
      if (size > 16) {
        imgStyle = "padding:" + ((size - 16) / 2 - 1) + "; border: 1px solid #CCCCCC; border-radius: 3px; background: #F0F0F0;";
      }
      myInnerSpan.innerHTML = ' <img id="img-' + userListArray[i] + '" src="' + imageSrc + '" align="absmiddle" style="' + imgStyle + '">&nbsp;' + label;
    } else {
      var size = localStorage["icon-size"];
      myInnerSpan.innerHTML = ' <img id="img-' + userListArray[i] + '" src="images/services/' + idStripped + '-' + size + '.png" align="absmiddle">&nbsp;' + label;
    }
    myOuterSpan.setAttribute('id',idStripped);
    myOuterSpan.setAttribute('style','margin:2px;');
    myOuterSpan.setAttribute('class',i%2 == 1 ? 'one' : 'zero');
    myInvisibleTitle.setAttribute('title',userListArray[i]);
    myInvisibleTitle.setAttribute('style','visibility:hidden;width:0;');

    myOuterSpan.appendChild(myMoveButtonUp);
    myOuterSpan.appendChild(myMoveButtonDown);
    myOuterSpan.appendChild(myMoveButtonFullUp);
    myOuterSpan.appendChild(myMoveButtonFullDown);

    myOuterSpan.appendChild(myInnerSpan);
    myOuterSpan.appendChild(myInvisibleTitle);

    document.getElementById('rechteSpalte').insertBefore(myOuterSpan, document.getElementById("dummySpanRechts"));
  }
}

function editService(title) {
  document.getElementById("modifyService").style.visibility = "visible";
  document.getElementById("modifyService").style.height = "";
  document.getElementById("td-modifyService").setAttribute("class", "bottom");
  if (document.getElementById("img-" + title))
    var src = document.getElementById("img-" + title).src;
  else
    var src = "images/custombutton.gif";

  document.getElementById("img-modifyService").src = src;	
  document.getElementById("custom-name").placeholder = title;
  document.getElementById("span-modifyService").innerHTML = title;

  if (localStorage.getItem(title + '_name') == undefined || localStorage.getItem(title + '_name') == "") {	
    document.getElementById("custom-name").value = "";
  }
  else {
    document.getElementById("custom-name").value = localStorage.getItem(title + '_name');
  }

  if (localStorage.getItem(title + '_url') == undefined)
    document.getElementById("custom-url").placeholder = "http://www.google.com";
  else
    document.getElementById("custom-url").placeholder = localStorage.getItem(title + '_url');

  if (localStorage.getItem(title + '_customURL') == undefined || localStorage.getItem(title + '_customURL') == "")		
    document.getElementById("custom-url").value = "";
  else
    document.getElementById("custom-url").value = localStorage.getItem(title + '_customURL');

  console.log("url in storage: " + localStorage.getItem(title + '_customURL'));
}

function saveModifiedService() {
  save();

  var url = document.getElementById("custom-url").value;
  var name = document.getElementById("custom-name").value;
  var title = document.getElementById("span-modifyService").innerHTML;
  var placeholder_url = document.getElementById("custom-url").placeholder;
  var placeholder_name = document.getElementById("custom-name").placeholder;

  // check if modified
  if (url != placeholder_url && url != "") {
    if (validURL(url))
      localStorage.setItem(title + '_customURL', url);
    else
      return;
    console.log("url in storage: " + localStorage.getItem(title + '_customURL'));
  } else if (url == placeholder_url && url == "http://www.google.com")
    localStorage.setItem(title + '_customURL', url);

  if (name != placeholder_name)
    localStorage.setItem(title + '_name', name);
  // check if empty or same as original
  if (name == "" || name == placeholder_name)
    localStorage.removeItem(title + '_name');
  if (url == "" || (url == placeholder_url && url != "http://www.google.com"))
    localStorage.removeItem(title + '_customURL');

  // check if it's a new custom button
  if ((placeholder_name.substr(0,13) == "Custom Button") && (userlist.search(placeholder_name) == -1)) {
    if (validURL(url))
      localStorage.setItem(title + '_customURL', url);
    else
      return;
    localStorage.userList += placeholder_name + ",";
    userlist = localStorage.userList;
    localStorage.setItem(title + '_tooltip', "This is a custom Button");
    localStorage.customCount = parseInt(localStorage.customCount) + 1;
  }

  document.getElementById("modifyService").style.visibility = "hidden";
  document.getElementById("modifyService").style.height = "0";
  document.getElementById("td-modifyService").removeAttribute("class");

  renewLists();
}

function cancelModifiedService () {
  document.getElementById("modifyService").style.visibility = "hidden";
  document.getElementById("modifyService").style.height = "0";
  document.getElementById("td-modifyService").removeAttribute("class");
}

function validURL(str) {
  var j = new RegExp();
  j.compile("^(https?|ftp)+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-+_%&\?\/\|.,=]+$");	

  var k = new RegExp();
  k.compile("^(chrome://)+[A-Za-z0-9-_]+");

  if (!j.test(str))
  {	
    if (!k.test(str)) {
      alert("This seems to be neither a valid URL nor a valid Chrome page.\nPlease check again your input.");
      return false;
    } else {
      console.log("valid Chrome page: " + str);
      return true;
    }
  } else {
    console.log("valid URL: " + str);
    return true;
  }
}

function addCustomButton() {
  var customCount = localStorage.customCount;
  customCount++;

  editService("Custom Button " + customCount);
}

function updateLists() {
  // save lists temporarily
  userlist = "";
  wholeshebang = "";

  try {
    var holder = document.getElementById("linkeSpalte");
    var sibling = holder.firstChild;
    console.log(sibling.nodeType);
    while (sibling) {
      if (sibling.id != "dummySpanLinks")
        wholeshebang += sibling.lastChild.title + ",";
      sibling = sibling.nextSibling;
    }

    holder = document.getElementById("rechteSpalte");
    sibling = holder.firstChild;
    while (sibling) {
      if (sibling.id != "dummySpanRechts")
        userlist += sibling.lastChild.title + ",";
      sibling = sibling.nextSibling;
    }
  } catch (e) {
    console.error("Error in updateLists:\n" + e.name + ", " + e.message);
  }

  console.log("wholeshebang: " + wholeshebang);	
  console.log("userlist: " + userlist);
}

function sortUserList() {
  userListArray = userlist.split(',');
  userListArray.pop();
  userListArray.sort(function(x,y){ 
      var a = String(x).toUpperCase(); 
      var b = String(y).toUpperCase(); 
      if (a > b) 
      return 1 
      if (a < b) 
      return -1 
      return 0; 
      });

  userlist = "";

  for (var i = 0; i < userListArrayLength; i++) {
    userlist += userListArray[i] + ",";
  }

  renewLists();
  markDirty();
}

function save() {
  localStorage.showVertical = showVertical.checked;
  localStorage.showSettings = showSettings.checked;
  localStorage.showLabel = showLabel.checked;
  localStorage.labelUnder = labelUnder.checked;
  if (iconBreak.value != "") {
    localStorage.setItem("iconBreak", iconBreak.value);
  } else {
    localStorage.removeItem("iconBreak");
  }
  localStorage.setItem('userList', userlist);
  localStorage.setItem('wholeshebang', wholeshebang);
  console.log("userList in storage: " + localStorage.getItem('userList'));
  markClean();

  // call init from popup.html
  chrome.extension.sendRequest({action: "init"});
}

function moveHorizontal(myItem) {
  if (myItem.parentNode.id == "linkeSpalte") {
    document.getElementById("rechteSpalte").insertBefore(myItem, document.getElementById("dummySpanRechts"));
    markDirty();
  } else {
    if(myItem.lastChild.title.substr(0,13) == "Custom Button") {
      localStorage.removeItem(myItem.lastChild.title + "_name");
      localStorage.removeItem(myItem.lastChild.title + "_url");
      document.getElementById(myItem.parentNode.id).removeChild(myItem);
      localStorage.userList = localStorage.userList.replace(myItem.lastChild.title + ",", "");
    }
    else {
      document.getElementById("linkeSpalte").insertBefore(myItem, document.getElementById("dummySpanLinks"));
      markDirty();
    }
  }
  updateLists();
  renewLists();
}

function moveVertical(myItem, direction) {
  if (direction == -1) { // move up
    var sibling = myItem.previousSibling;
    // avoid whitespaces as nodes
    while (sibling && sibling.nodeType != 1) {
      sibling = sibling.previousSibling;
    }
    if (sibling != null) {
      sibling.parentNode.insertBefore(myItem, sibling);
      updateLists();
      renewLists();
    }
  } else if (direction == 1) { // move down
    var sibling = myItem.nextSibling;
    // avoid whitespaces as nodes
    while (sibling && sibling.nodeType != 1) {
      sibling = sibling.nextSibling;
    }
    if (sibling != null && sibling.id != "dummySpanLinks" && sibling.id != "dummySpanRechts") {
      sibling.parentNode.insertBefore(sibling, myItem);
      updateLists();
      renewLists();
    }
  } else if (direction == -11) { // move complete up
    myItem.parentNode.insertBefore(myItem, myItem.parentNode.firstChild);
    updateLists();
    renewLists();
  } else if (direction == 11) { // move complete down
    myItem.parentNode.insertBefore(myItem, myItem.parentNode.lastChild);
    updateLists();
    renewLists();
  }
  markDirty();
}

function reset() {
  showSettings.checked = true;
  showLabel.checked = false;

  showVertical.checked = false;
  iconBreak.value = "";
  localStorage.removeItem("iconBreak");
  localStorage["icon-size"] = 16;

  localStorage.setItem('userList', "kaixin,");
  localStorage.setItem('wholeshebang', "sina,");
  localStorage.setItem('appsDomainName', "");

  init();
}

function selectAllServices() {
  userlist += wholeshebang;
  wholeshebang = "";
  renewLists();
  sortUserList();

  markDirty();
}

function deselectAllServices() {
  wholeshebang += userlist;
  userlist = "";
  renewLists();

  markDirty();
}

function markDirty() {
  saveButton.disabled = false;
  saveButtonTop.disabled = false;
  saveButtonTop.setAttribute("class","btn-dirty");

  if (showLabel.checked) {
    labelUnder.disabled = false;
    labelNext.disabled = false;
  } else {
    showLabel.checked = false;
    labelUnder.disabled = true;
    labelNext.disabled = true;
  }
}

function markClean() {
  saveButton.disabled = true;
  saveButtonTop.disabled = true;
  saveButtonTop.setAttribute("class","btn");
}

function devMode() {
  document.getElementById("devSpan").innerHTML = "userlist: " + localStorage.userList + "<br>wholeshebang: " + localStorage.wholeshebang + "<br>completelist: " + localStorage.completelist;
}

function plusTen() {
  var oldHeight = parseInt(document.getElementById('linkeSpalte').style.height);
  oldHeight += parseInt(50);
  document.getElementById('linkeSpalte').setAttribute('style', 'height:' + oldHeight + 'px; overflow:auto;');
  document.getElementById('rechteSpalte').setAttribute('style', 'height:' + oldHeight + 'px; overflow:auto;');
}

function minusTen() {
  var oldHeight = parseInt(document.getElementById('linkeSpalte').style.height);
  oldHeight -= parseInt(50);
  document.getElementById('linkeSpalte').setAttribute('style', 'height:' + oldHeight + 'px; overflow:auto;');
  document.getElementById('rechteSpalte').setAttribute('style', 'height:' + oldHeight + 'px; overflow:auto;');
}

