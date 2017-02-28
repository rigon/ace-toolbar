

function acetoolbar(htmlElement, customOptions) {
    var self = this;                                // Reference for this object
    
    this.container = $(htmlElement);                // jQuery object of the selected HTML element
    this.editor = $("<div></div>");                 // Container for Ace Editor
    this.aceEditor = ace.edit(this.editor.get(0));  // Ace Editor
    this.options = {                                // List of default options
        toolbar: { show: true, attr: {}, list: [], buttons: {} },
        statusbar: { show: true, attr: {}, list: [], buttons: {} }
    };
    // Global reference for this object
    var self_id = "acetoolbar_" + String(Math.random()).substr(2);  // Create a random ID
    eval(self_id + " = this");  // Reference for this object in a var with name self_id


    this.loadLangConfig = function(lang) {
        $.getScript("mode/" + lang + ".js", function(script, textStatus, jqXHR) {
            var optionsToolbar = self.toolbar(this.aceEditor, customOptions);
            var optionsStatusbar = self.statusbar(this.aceEditor, customOptions);

            // Load default configurations for selected language
            self.processOptions({
                toolbar: optionsToolbar,
                statusbar: optionsStatusbar
            });
            // Load custom options specific for this instance
            self.processOptions(customOptions);

            self.create();
        });
    }


    this.processOptions = function(newOptions) {
        // Incompatible data type
        if(typeof newOptions !== "object") return;

        // Iterate over newOptions
        for(var attribute in newOptions) {
            switch(attribute) {
                case "toolbar":
                case "statusbar":
                    // Check if exist in this.options
                    if(attribute in this.options) {
                        var src = newOptions[attribute];
                        var dst = this.options[attribute];

                        // Merge buttons
                        if(typeof src.buttons === "object")
                            for(btn in src.buttons)
                                dst.buttons[btn] = src.buttons[btn];
                        
                        // List of buttons
                        var hasSrcList = (typeof src.list === "object");
                        var list = (hasSrcList ? src.list : dst.list);
                        for(var button in dst.buttons) {
                            var indexBefore = list.indexOf(dst.buttons[button].before);         // Index of before
                            var indexAfter = list.indexOf(dst.buttons[button].after);           // Index of after
                            if(indexBefore >= 0) list.splice(indexBefore, 0, button);           // Insert before
                            else if(indexAfter >= 0) list.splice(indexAfter + 1, 0, button);    // Insert after
                            else if(!hasSrcList && list.indexOf(button) < 0) list.push(button); // Push if not present
                        }
                        dst.list = list;

                        // Copy attributes in an incremental way
                        for(var attr in src.attr)
                            dst.attr[attr] = src.attr[attr];

                        // Copy the remaining values, i. e. everything except "attr", "buttons" and "list"
                        for(var value in src)
                            if(!["attr", "buttons", "list"].includes(value))
                                dst[value] = src[value];
                        
                        break;
                    }
                    // If not doesn't exist, copy everything
                    // (continue for default action)
                default:
                    // Copy values to in options
                    this.options[attribute] = newOptions[attribute];
            }
        }
    }


    function createButtons(list, buttons, element, self_id) {
        var obj;
        var group = $("<div></div>", { class: "btn-group", role: "group" });

        for(var i in list) {
            var name = list[i];
            var button = buttons[name];

            if(name === "space") {
                element.append(group);
                group = $("<div></div>", { class: "btn-group", role: "group" });
                continue;
            }

            switch(typeof button) {
                case "string":
                    // Create an element with the HTML
                    group.append($(button));
                    break;
                case "object":
                    // Create button
                    obj = $('<button type="button" class="btn btn-default"></button>');

                    // If has icon
                    if("icon" in button) {
                        var icon = $("<span></span>", { class: button.icon });
                        obj.append(icon);
                        delete button.icon;
                    }
                    // If has text
                    if("text" in button) {
                        obj.append(" " + button.text);
                        delete button.text;
                    }
                    // Convert functions to string
                    for(attribute in button)
                        if(typeof button[attribute] === "function")
                            button[attribute] = "("+ button[attribute] + ")(" + self_id + ".aceEditor, " + self_id + ")";
                    
                    // Set attributes
                    obj.attr(button);

                    // Add button to the group
                    group.append(obj);
                    break;
                default:
                    throw "Wrong button type";
            }
        }

        // Append the last group
        element.append(group);
    }

    function createToolbar(options, container, self_id) {
        var toolbar;
        var attr = options.attr;
        var selector = options.selector;
        var list = options.list;
        var buttons = options.buttons;

        // Container for toolbar
        if(typeof selector === "undefined") {
            toolbar = $("<div></div>");
            container.append(toolbar);
        }
        else
            toolbar = $(selector);
        
        // Set attributes for toolbar
        toolbar.attr(attr);

        // Create toolbar
        toolbar.each(function(index, element) {
            createButtons(list, buttons, $(element), self_id);
        });
    }

    this.create = function() {
        // Create Toolbar
        createToolbar(this.options.toolbar, this.container, self_id);

        // Append editor
        this.editor.attr(this.options.attr);
        //this.container.append(this.editor);

        // Create Statusbar
        createToolbar(this.options.statusbar, this.container, self_id);
        
        // Configure Ace Editor
        this.aceEditor.setTheme("ace/theme/" + this.options.theme);
        this.aceEditor.getSession().setMode("ace/mode/" + this.options.lang);
        this.aceEditor.focus();

        for(var key in this.options) {
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


    // Start by loading configurations for language
    this.loadLangConfig(customOptions.lang);
}

jQuery.fn.extend({
    acetoolbar: function(options) {
        // If custom options not provided
        if(typeof options === "undefined")
            options = {};

        return this.each(function () {
            // Deep copy of options
            return new acetoolbar(this, jQuery.extend(true, {}, options));
        });
    }
});
