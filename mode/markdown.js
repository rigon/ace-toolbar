
function toolbar(editor, options) {

    function bold() { editor.insert("****"); editor.selection.moveCursorLeft(); editor.selection.moveCursorLeft(); }
    function italic() { editor.insert("**"); editor.selection.moveCursorLeft() }
    function quote() { editor.insert("\n\n> "); }
    function code() { editor.insert("\n\n    "); }
    function ul() { editor.insert("\n\n - "); }
    function ol() { editor.insert("\n\n 1. "); }
    function header() { editor.insert("\n\n# "); }
    function undo() { editor.getSession().getUndoManager().undo(); }
    function redo() { editor.getSession().getUndoManager().redo(); }

    function image() { 
        bootpopup({
            title: "Add image",
            content: [
                { p: {text: "Insert image info here:"}},
                { text: {label: "Title", name: "title", placeholder: "Description for image"}},
                { url: {label: "Link", name: "link", placeholder: "Hyperlink for image"}}],
            buttons: ["cancel", "ok"],
            ok: function(data,e) {
                editor.insert("![" + data[0].value + "](" + data[1].value + ")");
            },
        });
    }
    
    function link() { 
        bootpopup({
            title: "Add hyperlink",
            content: [
                { p: {text: "Insert hyperlink info here:"}},
                { text: {label: "Title", name: "title", placeholder: "Description for hyperlink"}},
                { url: {label: "URL", name: "url", placeholder: "Hyperlink"}}],
            buttons: ["cancel", "ok"],
            ok: function(data,e) {
                editor.insert("[" + data[0].value + "](" + data[1].value + ")");
            },
        });
    }

    return {
        buttons: {
            boldtest: '<button type="button" class="btn btn-default btn-bold" title="Bold"><span class="fa fa-bold"></span></button>',
            
            bold: { title: "Bold", icon: "fa fa-bold", onclick: bold },
            italic: { title: "Italic", icon: "fa fa-italic", onclick: italic },

            quote: { title: "Quote text", icon: "fa fa-quote-left", onclick: quote },
            code: { title: "Block of code", icon: "fa fa-code", onclick: code },
            image: { title: "Add image", icon: "fa fa-image", onclick: image },
            link: { title: "Hyperlink", icon: "fa fa-link", onclick: link },
            
            ol: { title: "Ordered list", icon: "fa fa-ol", onclick: ol },
            ul: { title: "Unordered list", icon: "fa fa-ul", onclick: ul },
            header: { title: "Header", icon: "fa fa-header", onclick: header },
            table: { title: "Table", icon: "fa fa-table", onclick: table },
            
            undo: { title: "Undo", icon: "fa fa-undo", onclick: undo },
            redo: { title: "Redo", icon: "fa fa-repeat", onclick: redo }
        }
    };
}
