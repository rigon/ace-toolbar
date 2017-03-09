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

function acetoolbar(htmlElement, customOptions) {
	var self = this;					// Reference for this object

	this.container = $(htmlElement);	// jQuery object of the selected HTML element
	this.editor;						// Container for Ace Editor
	this.aceEditor;						// Ace Editor
	this.options = {					// List of default options
		toolbar: {
			show: true,
			attr: {},
			list: [],
			buttons: {}
		},
		statusbar: {
			show: true,
			attr: {},
			list: [],
			buttons: {}
		}
	};

	this.loadLangConfig = function(lang) {
		$.getScript("mode/" + lang + ".js", function (script, textStatus, jqXHR) {
			var optionsToolbar = self.toolbar(customOptions);
			var optionsStatusbar = self.statusbar(customOptions);

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
							for(button in src.buttons)
								dst.buttons[button] = src.buttons[button];

						// Copy attributes in an incremental way
						for(var attr in src.attr)
							dst.attr[attr] = src.attr[attr];

						// Copy the remaining values, i. e. everything except "attr", "buttons" and "list"
						for(var value in src)
							if (!["attr", "buttons"].includes(value))
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

	function createToolbar(options, container, context) {
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

		// Pass context to the toobar buttons
		options.context = context;

		// Create toolbar
		toolbar.each(function(index, element) {
			$(element).toolbar(options);
		});
	}

	this.create = function() {
		this.editor = $("<div></div>");
		this.editor.attr(this.options.attr);
		// Append editor
		this.container.append(this.editor);
		this.aceEditor = ace.edit(this.editor.get(0));

		// Create Toolbar
		createToolbar(this.options.toolbar, this.container, this.aceEditor);

		// Create Statusbar
		createToolbar(this.options.statusbar, this.container, this.aceEditor);

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

		return this.each(function() {
			// Deep copy of options
			return new acetoolbar(this, jQuery.extend(true, {}, options));
		});
	}
});
