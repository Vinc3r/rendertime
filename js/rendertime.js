function on_load(){

/* init all select elements */

    /* time select element, limited to [0,59] */
    var sexagesimalArray = [];
    for(var i = 0; i < 60; i++){
        sexagesimalArray.push(i);
    };
    /* framerate select element */
    var framerateArray = [12,24,25,30,48,50,60,72,90,100,120,144,300]
    /* send params */
    set_html_select_time("animDtnM", sexagesimalArray, 0);
    set_html_select_time("animDtnS", sexagesimalArray, 0);
    set_html_select_time("avgFrmTimeM", sexagesimalArray, 0);
    set_html_select_time("frmRatePreset", framerateArray, 25);

    var inputElmts = document.getElementsByClassName("watchUserInput");
    for(var i = 0; i < inputElmts.length; i++){
        inputElmts[i].addEventListener('input', ohYeah);
    }

    //    document.getElementsByClassName("inputTime").addEventListener('input', ohYeah);

};

function ohYeah(elt){
    elt = elt.originalTarget
    console.log(elt.id)
    console.log(elt.value)
}

function set_html_select_time(selectHTMLElement, selectHTMLArray, selectHTMLselected){
/*
    Get a select element, and a table of values. You can send which element will be selected by default.
*/
    selectHTMLElement = document.getElementById(selectHTMLElement);
    for (var i = 0; i < selectHTMLArray.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", selectHTMLArray[i]);
        option.text = selectHTMLArray[i];
        if(selectHTMLArray[i] == selectHTMLselected){
          option.selected = "selected";
        };
        selectHTMLElement.appendChild(option);
    };
};
