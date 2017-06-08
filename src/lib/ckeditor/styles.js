/**
 * Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

// This file contains style definitions that can be used by CKEditor plugins.
//
// The most common use for it is the "stylescombo" plugin, which shows a combo
// in the editor toolbar, containing all styles. Other plugins instead, like
// the div plugin, use a subset of the styles on their feature.
//
// If you don't have plugins that depend on this file, you can simply ignore it.
// Otherwise it is strongly recommended to customize this file to match your
// website requirements and design properly.

CKEDITOR.stylesSet.add( 'default', [
	/* Block Styles */

	// These styles are already available in the "Format" combo ("format" plugin),
	// so they are not needed here by default. You may enable them to avoid
	// placing the "Format" combo in the toolbar, maintaining the same features.
	/*
	{ name: 'Paragraph',		element: 'p' },
	{ name: 'Heading 1',		element: 'h1' },
	{ name: 'Heading 2',		element: 'h2' },
	{ name: 'Heading 3',		element: 'h3' },
	{ name: 'Heading 4',		element: 'h4' },
	{ name: 'Heading 5',		element: 'h5' },
	{ name: 'Heading 6',		element: 'h6' },
	{ name: 'Preformatted Text',element: 'pre' },
	{ name: 'Address',			element: 'address' },
	*/
	{ name: 'Def. Copy', element: 'p', styles: {
		"font-family": "Arial, Helvetica, sans-serif",
		"font-size": "16px",
		"color": "#505050",
		"text-align":"left",
		"line-height":"21px",
		"margin-bottom": "1em",
		"font-weight":"normal"
	}},
	
	{ name: 'Def. h1', element: 'h1', styles: {
		"font-family": "Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif;",
		"font-size": "48px",
		"color": "#00529c",
		"line-height":"40px",
		"font-weight":"600",
		"text-decoration":"none",
		"text-transform":"uppercase",
		"text-align":"center"
	}},
	{ name: 'Def. h3', element: 'h3', styles: {
		"font-family": "Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif;",
		"font-size": "28px",
		"color": "#00529c",
		"line-height":"36px",
		"font-weight":"bold",
		"text-decoration":"none",
	}},
	{ name: 'PassoverCopy', element: 'p', styles: {
		"font-family": "'Trebuchet MS',sans-serif",
		"font-size": "16px",
		"color": "#6d6e70",
		"text-align":"left",
		"line-height":"1.3",
		"margin-bottom": "10px",
		"font-weight":"normal"
    }},
	{ name: 'CalloutCopy', element: 'p', styles: {
		"font-family": "Verdana,sans-serif",
		"font-size": "21px",
		"color": "#a61d26 !important",
		"text-align":"left",
		"line-height":"1.3",
		"margin-bottom": "10px",
		"font-weight":"bold",
		"padding": "10px",
    	"border-top": "1px solid #505050",
		"border-bottom": "1px solid #505050"	
    }},
	{ name: 'Title',		element: 'h2', styles: { 'font-style': 'italic', 'color':'#505050', 'text-align':'center' } },
	{ name: 'Subtitle',			element: 'h3', styles: { 'color': '#aaa', 'font-style': 'italic' } },
	{
		name: 'Special Container',
		element: 'div',
		styles: {
			padding: '5px 10px',
			background: '#eee',
			border: '1px solid #ccc',
		}
	},
	{
		name: 'Subhead',
		element: 'p',
		styles: {
			"padding": '0',
			"color": '#00529c',
			"font-family": 'Georgia, Constantia, Lucida Bright, DejaVu Serif, serif',
			"font-size": '28px',
			"font-weight": 400,
			"line-height": 1.3,
			"margin": '0 0 10px 9',
			"text-align": 'center',
			"word-wrap": 'normal'
		}
	},

	/* Inline Styles */

	{ name: 'Bold',			element: 'b' },
	{ name: 'Emphasis',			element: 'i' },
	{ name: 'Underline',		element: 'u' },
	{ name: 'Strikethrough',	element: 'strike' },
	{ name: 'Subscript',		element: 'sub' },
	{ name: 'Superscript',		element: 'sup' },
	
] );