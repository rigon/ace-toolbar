jQuery.fn.extend({
    acetoolbar: function (options) {
        return this.each(function () {
            console.log(this, options);
            start(this, options);
        });
    }
});


function start(htmlObj, opts) {
    var obj = $(htmlObj);

    $.getScript("mode/" + opts.lang + ".js", function(script, textStatus, jqXHR) {
        var defaultOptions = toolbar(editor, obj);
        var finalOptions = processOptions(defaultOptions, opts);
        create(obj, finalOptions);
    });
}

function processOptions(defaultOptions, customOptions) {
    for(attribute in customOptions)
        ;
}

function create(elem, options) {
    var toolbar = opts.toolbar;
    $("<div></div>", toolbar.attrs).appendTo(obj);

    var editorElement = $("<div></div>", opts.attrs).get(0);
    obj.append(editorElement);

    
    var statusbar = opts.statusbar;
    $("<div></div>", statusbar.attrs).appendTo(obj);


    var editor = ace.edit(editorElement);
    editor.setTheme("ace/theme/" + opts.theme);
    editor.getSession().setMode("ace/mode/" + opts.lang);
    editor.setShowPrintMargin(false);
    editor.focus();

    for(var key in opts) {
        switch(key) {
            case "toolbar":
            case "statusbar":
            case "attrs":
                // Options already processed
                continue;
            case "split":
                // split: "none" "below" "beside",
                break;
            case "fontSize":
                // fontSize: "12px"
                break;
            case "folding":
                // folding: "manual" "markbegin" "markbeginend",
                break;
            case "keybinding":
                // keybinding: "ace" "vim" "emacs" "custom",
                break;
            case "softWrap":
                // softWrap: "off" "40" "80" "free",
                break;
            case "selectFullLine":
                // selectFullLine: false,
                break;
            case "highlightActiveLine":
                // highlightActiveLine: true,
                break;
            case "showHidden":
                // showHidden: true,
                break;
            case "showIndentGuides":
                // showIndentGuides: true,
                break;
            case "showHScroll":
                // showHScroll: false,
                break;
            case "showVScroll":
                // showVScroll: false,
                break;
            case "animateScroll":
                // animateScroll: false,
                break;
            case "showGutter":
                // showGutter: true,
                break;
            case "showPrintMargin":
                // showPrintMargin: true,
                break;
            case "softTab":
                // softTab: false,
                break;
            case "highlightSelectedWord":
                // highlightSelectedWord: false,
                break;
            case "enablBehaviours":
                // enablBehaviours: true,
                break;
            case "fadeFoldWidgets":
                // fadeFoldWidgets: true,
                break;
            case "elasticTabstops":
                // elasticTabstops: false,
                break;
            case "incrementalSearch":
                // incrementalSearch: false,
                break;
            case "highlightToken":
                // highlightToken: false,
                break;
            case "readOnly":
                // readOnly: true,
                break;
            case "scrollPastEnd":
                // scrollPastEnd: false,
                break;
            default:
        }
    }
}
