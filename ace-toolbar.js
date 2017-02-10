

function acetoolbar(htmlElement, customOptions) {
    var refObj = this;                              // Reference for this object
    var element = $(htmlElement);                   // jQuery object of the selected HTML element
    var editorElement = $("<div></div>");           // Content for Ace Editor
    var editor = ace.edit(editorElement.get(0));    // Ace Editor
    var toolbar = $("<div></div>");                 // Content for toolbar
    var statusbar = $("<div></div>");               // Content for statusbar
    var options;


    this.loadLangConfig = function(lang) {
        $.getScript("mode/" + lang + ".js", function(script, textStatus, jqXHR) {
            var optionsToolbar = refObj.toolbar(editor, customOptions);
            var optionsStatusbar = refObj.statusbar(editor, customOptions);

            refObj.processOptions(customOptions, {
                toolbar: optionsToolbar,
                statusbar: optionsStatusbar
            });

        });
    }


    this.processOptions = function(customOptions, defaultOptions) {
        this.options = customOptions;

        for(attribute in defaultOptions) {
            switch(attribute) {
                case "toolbar":
                case "statusbar":
                    break;
                default:
                    if(!(attribute in this.options))    // Copy values not present in options
                        this.options[attribute] = defaultOptions[attribute];
            }
        }
    }

    
    function listButtons(list, buttons) {
        for(button in buttons) {
            var indexBefore = list.indexOf(buttons[button].before);          // Index of before
            var indexAfter = list.indexOf(buttons[button].after);            // Index of after
            if(indexBefore >= 0) list.splice(indexBefore, 0, button);        // Insert before
            else if(indexAfter >= 0) list.splice(indexAfter + 1, 0, button); // Insert after
            else if(list.indexOf(button) < 0) list.push(button);             // Push if not present
        }
        return list;
    }


    this.loadLangConfig(customOptions.lang);
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


jQuery.fn.extend({
    acetoolbar: function (options) {
        return this.each(function () {
            return new acetoolbar(this, options);
        });
    }
});
