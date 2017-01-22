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
