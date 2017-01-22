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


    
    // function textEditorInsert(text) {
    //     markdownEditor.insert(text);
    //     markdownEditor.focus();
    // }
    // $("#editor-text .btn-bold").click(function() {
    //     textEditorInsert("****");
    //     markdownEditor.selection.moveCursorLeft();
    //     markdownEditor.selection.moveCursorLeft();
    // });
    // $("#editor-text .btn-italic").click(function() {
    //     textEditorInsert("**");
    //     markdownEditor.selection.moveCursorLeft();
    // });
    // $("#editor-text .btn-quote").click(function() { textEditorInsert("\n\n> "); });
    // $("#editor-text .btn-code").click(function() { textEditorInsert("\n\n    "); });
    // $("#editor-text .btn-image").click(function() { 
    //     bootpopup({
    //         title: "Add image",
    //         content: [
    //             { p: {text: "Insert image info here:"}},
    //             { text: {label: "Title", name: "title", placeholder: "Description for image"}},
    //             { url: {label: "Link", name: "link", placeholder: "Hyperlink for image"}}],
    //         buttons: ["cancel", "ok"],
    //         ok: function(data,e) {
    //             textEditorInsert("![" + data[0].value + "](" + data[1].value + ")");
    //         },
    //     });
    // });
    // $("#editor-text .btn-hyperlink").click(function() { 
    //     bootpopup({
    //         title: "Add hyperlink",
    //         content: [
    //             { p: {text: "Insert hyperlink info here:"}},
    //             { text: {label: "Title", name: "title", placeholder: "Description for hyperlink"}},
    //             { url: {label: "URL", name: "url", placeholder: "Hyperlink"}}],
    //         buttons: ["cancel", "ok"],
    //         ok: function(data,e) {
    //             textEditorInsert("[" + data[0].value + "](" + data[1].value + ")");
    //         },
    //     });
    // });
    // $("#editor-text .btn-newpage").click(function() { 
    //     bootpopup({
    //         title: "Add new page",
    //         content: [
    //             { p: {text: "Insert new page info here:"}},
    //             { text: {label: "Name", name: "Name", placeholder: "Page title", id: "newpage-name", onkeyup: function(obj) {
    //                 var url = S($(obj).val());
    //                 $("#newpage-url").val(url.slugify().s);
    //             }}},
    //             { text: {label: "URL", name: "url", placeholder: "URL for page", id: "newpage-url"}}],
    //         buttons: ["cancel", "ok"],
    //         ok: function(data,e) {
    //             textEditorInsert("[" + data[0].value + "](" + data[1].value + ")");
    //         },
    //     });
    // });
    // $("#editor-text .btn-ul").click(function() { textEditorInsert("\n\n - "); });
    // $("#editor-text .btn-ol").click(function() { textEditorInsert("\n\n 1. "); });
    // $("#editor-text .btn-header").click(function() { textEditorInsert("\n\n# "); });
    // $("#editor-text .btn-undo").click(function() { markdownEditor.getSession().getUndoManager().undo(); markdownEditor.focus(); });
    // $("#editor-text .btn-redo").click(function() { markdownEditor.getSession().getUndoManager().redo(); markdownEditor.focus(); });
					
}
