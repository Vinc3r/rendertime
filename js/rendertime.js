var inputElmts = [];
var valuesArray = {};
var lastFrameRateSet = 25;
var dtnInputElmts = [];
var totalFrames = 0

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
  set_html_select_time("animDtnS", sexagesimalArray, 1);
  set_html_select_time("avgFrmTimeM", sexagesimalArray, 0);
  set_html_select_time("avgFrmTimeS", sexagesimalArray, 1);
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
  var eltValue = Number(elt.value);
  valuesArray[elt.id] = eltValue;

  // special cases of framerate, and also frame number direct input
  switch (elt.id) {
    case "frmRatePreset":
      lastFrameRateSet = eltValue;
      document.getElementById("frmRateUser").value = null;
      break;
    case "frmRateUser":
      lastFrameRateSet = eltValue;
      document.getElementById("frmRatePreset").value = null;
      break;
    case "frmNb":
      var frames = Math.floor(eltValue / lastFrameRateSet);
      var framesMod = eltValue % lastFrameRateSet;
      var duration = convert_number_to_time(frames)
      document.getElementById("animDtnH").value = duration[0];
      document.getElementById("animDtnM").value = duration[1];
      document.getElementById("animDtnS").value = duration[2];
      if (framesMod > 0) {
        document.getElementById("animDtnS").value = duration[2] + 1;
        document.getElementById("approxS").innerHTML = "&plusmn";
      } else {
        document.getElementById("approxS").innerHTML = "";
      };
      break;
    default:
      break;
  };

  // relation between anim duration input and frame number
  if (elt.className.indexOf("dtnInput") >= 0) {
    totalFrames = ((Number(valuesArray["animDtnH"] * 3600) + Number(valuesArray["animDtnM"] * 60) + Number(valuesArray["animDtnS"])) * lastFrameRateSet);
    document.getElementById("frmNb").value = totalFrames;
  }

  time_calculation();
};

function convert_number_to_time(nb) {
  // ~~ === Math.floor if I well understand, it looks cooler.
  nb = Number(nb);
  var h = ~~(nb / 3600);
  var m = ~~((nb % 3600) / 60);
  var s = nb % 60;
  return [h, m, s];
}

function time_calculation() {
  /*
      Caculate time needed
  */
  var frameNumber = Number(document.getElementById("frmNb").value);
  var computerz = Number(document.getElementById("hardWorkerz").value);
  var frameTime = Number(document.getElementById("avgFrmTimeH").value * 3600) + Number(document.getElementById("avgFrmTimeM").value * 60) + Number(document.getElementById("avgFrmTimeS").value);
  var totalTime = Math.floor((frameNumber * frameTime) / computerz);
  var totalTimeMod = (frameNumber * frameTime) % computerz;
  console.log("if anyone interested, raw total time in: \n seconds = " + totalTime + "\n minutes = " + totalTime / 60 + "\n hourz = " + (totalTime / 3660) + "\n dayz = " + (totalTime / (3660 * 24)) + "\n months (30 days) = " + (totalTime / ((3660 * 24) * 30)) + "\n years = " + (totalTime / (((3660 * 24) * 30)*12)));
  console.log("++++++++++++++++++++++++++++");
  totalTime = convert_number_to_time(totalTime);
  var d = ~~(totalTime[0] / 24);
  var h = totalTime[0] % 24;
  var m = totalTime[1];
  var s = totalTime[2];
  if (totalTimeMod > 0) {
    s++;
  };
  document.getElementById("finalTime").innerHTML = d + " d : " + h + " h : " + m + " m : " + s + " s"
};

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
