function on_load(){
    
    /* init time select elements (minutes and seconds) */
    var selectHTMLArray = [];
    for(var i = 0; i < 60; i++){
        selectHTMLArray.push(i);
    };
    var selectHTMLselected = 0;
    set_html_select_time("animDtnM", selectHTMLArray, selectHTMLselected);
    set_html_select_time("animDtnS", selectHTMLArray, selectHTMLselected);
    set_html_select_time("avgFrmTimeM", selectHTMLArray, selectHTMLselected);
    
}

function set_html_select_time(selectHTMLElement, selectHTMLArray, selectHTMLselected){
    selectHTMLElement = document.getElementById(selectHTMLElement);
    for (var i = 0; i < selectHTMLArray.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", selectHTMLArray[i]);
        option.text = selectHTMLArray[i];
        if(selectHTMLArray[i] == selectHTMLselected){
          option.selected = "selected";
        };
        selectHTMLElement.appendChild(option);
    }   
}