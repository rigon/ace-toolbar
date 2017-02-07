
acetoolbar.prototype.toolbar = function(editor, options) {

    this.bold = function() { editor.insert("****"); editor.selection.moveCursorLeft(); editor.selection.moveCursorLeft(); }
    this.italic = function() { editor.insert("**"); editor.selection.moveCursorLeft() }
    this.quote = function() { editor.insert("\n\n> "); }
    this.code = function() { editor.insert("\n\n    "); }
    this.ul = function() { editor.insert("\n\n - "); }
    this.ol = function() { editor.insert("\n\n 1. "); }
    this.header = function() { editor.insert("\n\n# "); }
    this.undo = function() { editor.getSession().getUndoManager().undo(); }
    this.redo = function() { editor.getSession().getUndoManager().redo(); }

    this.image = function() { 
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
    
    this.link = function() {
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
            
            bold: { title: "Bold", icon: "fa fa-bold", onclick: this.bold },
            italic: { title: "Italic", icon: "fa fa-italic", onclick: this.italic },

            quote: { title: "Quote text", icon: "fa fa-quote-left", onclick: this.quote },
            code: { title: "Block of code", icon: "fa fa-code", onclick: this.code },
            image: { title: "Add image", icon: "fa fa-image", onclick: this.image },
            link: { title: "Hyperlink", icon: "fa fa-link", onclick: this.link },
            
            ol: { title: "Ordered list", icon: "fa fa-ol", onclick: this.ol },
            ul: { title: "Unordered list", icon: "fa fa-ul", onclick: this.ul },
            header: { title: "Header", icon: "fa fa-header", onclick: this.header },
            table: { title: "Table", icon: "fa fa-table", onclick: this.table },
            
            undo: { title: "Undo", icon: "fa fa-undo", onclick: this.undo },
            redo: { title: "Redo", icon: "fa fa-repeat", onclick: this.redo }
        }
    };
}



acetoolbar.prototype.statusbar = function(editor, options) {
}