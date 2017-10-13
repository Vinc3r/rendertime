var inputElmts = [];
var valuesArray = {};
var lastFrameRateSet = 25;
var dtnInputElmts = [];

function on_load() {
  /*
    Init needed when page is loaded
  */


  /* init all select elements */

  /* time select element, limited to [0,59] */
  var sexagesimalArray = [];
  for (var i = 0; i < 60; i++) {
    sexagesimalArray.push(i);
  };
  /* framerate select element */
  var framerateArray = [12, 24, 25, 30, 48, 50, 60, 72, 90, 100, 120, 144, 300]
  /* send params */
  set_html_select_time("animDtnM", sexagesimalArray, 0);
  set_html_select_time("animDtnS", sexagesimalArray, 0);
  set_html_select_time("avgFrmTimeM", sexagesimalArray, 0);
  set_html_select_time("frmRatePreset", framerateArray, lastFrameRateSet);

  /*  adding listener */
  inputElmts = document.getElementsByClassName("watchUserInput");
  for (var i = 0; i < inputElmts.length; i++) {
    valuesArray[inputElmts[i].id] = inputElmts[i].value;
    inputElmts[i].addEventListener('input', get_value);
  };

  /* list duration input, so as to set frame number */
  var j = document.getElementsByClassName("dtnInput");
  for (var i = 0; i < j.length; i++) {
    dtnInputElmts.push(j[i].id);
  }
};

function get_value(elt) {
  /*
          Update array of values, and relaunch time calcultion
  */

  elt = elt.target;
  valuesArray[elt.id] = Number(elt.value);

  // special case of framerate
  switch (elt.id) {
    case "frmRatePreset":
      lastFrameRateSet = elt.value;
      document.getElementById("frmRateUser").value = null;
      break;
    case "frmRateUser":
      lastFrameRateSet = elt.value;
      document.getElementById("frmRatePreset").value = null;
      break;
    default:
      break;
  };

  // relation between anim duration input and frame number
  if (elt.className.indexOf("dtnInput") >= 0) {

  }

  time_calculation();
};

function time_calculation() {
  /*
      Caculate time needed
  */
  var animDtn = valuesArray["animDtnS"] + valuesArray["animDtnM"] * 60 + valuesArray["animDtnH"] * 3600;
  var totalFrames = animDtn * lastFrameRateSet;
};

function time_to_frame(value, mode) {
  /*
      Convert time to frame, or seconds (mode = true)
      or
      convert frame (or seconds) to time in h:m:s (mode = false)
  */
  if (mode == true) {

  } else {

  };
}

function set_html_select_time(selectHTMLElement, selectHTMLArray, selectHTMLselected) {
  /*
      Get a select element, and a table of values. You can send which element will be selected by default.
  */
  selectHTMLElement = document.getElementById(selectHTMLElement);
  for (var i = 0; i < selectHTMLArray.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", selectHTMLArray[i]);
    option.text = selectHTMLArray[i];
    if (selectHTMLArray[i] == selectHTMLselected) {
      option.selected = "selected";
    };
    selectHTMLElement.appendChild(option);
  };
};
