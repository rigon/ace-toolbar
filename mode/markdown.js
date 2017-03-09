/**************************************************************************
 * Customizable toolbars for Ace Editor - https://github.com/rigon/ace-toolbar
 * Copyright (C) 2017  rigon<ricardompgoncalves@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *************************************************************************/

acetoolbar.prototype.toolbar = function (options) {

	this.bold	= function (editor) { editor.insert("****"); editor.selection.moveCursorLeft(); editor.selection.moveCursorLeft(); }
	this.italic	= function (editor) { editor.insert("**"); editor.selection.moveCursorLeft() }
	this.quote	= function (editor) { editor.insert("\n\n> "); }
	this.code	= function (editor) { editor.insert("\n\n    "); }
	this.ul		= function (editor) { editor.insert("\n\n - "); }
	this.ol		= function (editor) { editor.insert("\n\n 1. "); }
	this.header	= function (editor) { editor.insert("\n\n# "); }
	this.undo	= function (editor) { editor.getSession().getUndoManager().undo(); }
	this.redo	= function (editor) { editor.getSession().getUndoManager().redo(); }

	this.image = function (editor, self) {
		bootpopup({
			title: "Add image",
			content: [
				{ p: { text: "Insert image info here:" } },
				{ text: { label: "Title", name: "title", placeholder: "Description for image" } },
				{ url: { label: "Link", name: "link", placeholder: "Hyperlink for image" } }
			],
			buttons: ["cancel", "ok"],
			ok: function (data, e) {
				editor.insert("![" + data.title + "](" + data.link + ")");
			},
		});
	}

	this.link = function (editor) {
		bootpopup({
			title: "Add hyperlink",
			content: [
				{ p: { text: "Insert hyperlink info here:" } },
				{ text: { label: "Title", name: "title", placeholder: "Description for hyperlink" } },
				{ url: { label: "URL", name: "url", placeholder: "Hyperlink" } }
			],
			buttons: ["cancel", "ok"],
			ok: function (data, e) {
				editor.insert("[" + data.title + "](" + data.url + ")");
			},
		});
	}

	return {
		list: ["bold", "italic", "space",
			"quote", "code", "image", "link", "space",
			"ol", "ul", "header", "table", "space",
			"undo", "redo"
		],
		buttons: {
			bold: { title: "Bold", icon: "fa fa-bold", onclick: this.bold },
			italic: { title: "Italic", icon: "fa fa-italic", onclick: this.italic },

			quote: { title: "Quote text", icon: "fa fa-quote-left", onclick: this.quote },
			code: { title: "Block of code", icon: "fa fa-code", onclick: this.code },
			image: { title: "Add image", icon: "fa fa-image", onclick: this.image },
			link: { title: "Hyperlink", icon: "fa fa-link", onclick: this.link },

			ol: { title: "Ordered list", icon: "fa fa-list-ol", onclick: this.ol },
			ul: { title: "Unordered list", icon: "fa fa-list-ul", onclick: this.ul },
			header: { title: "Header", icon: "fa fa-header", onclick: this.header },
			table: { title: "Table", icon: "fa fa-table", onclick: this.table },

			undo: { title: "Undo", icon: "fa fa-undo", onclick: this.undo },
			redo: { title: "Redo", icon: "fa fa-repeat", onclick: this.redo }
		}
	};
}

acetoolbar.prototype.statusbar = function (editor, options) {
	return {
		buttons: {}
	};
}
