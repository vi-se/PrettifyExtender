// ==UserScript==
// @name           SE Prettify Extension Includer
// @author         Murukesh Mohanan (murukesh.mohanan+github@gmail.com)
// @version        0.1
// @namespace      github.com/vi-se
// @description    Add extensions to Google Prettify on Stack Exchange sites
// @include        http://*.stackexchange.com/*
// @include        http://stackoverflow.com/*
// @include        http://askubuntu.com/*
// @include        http://superuser.com/*
// @include        http://serverfault.com/*
// @include        http://meta.vi.stackexchange.com/*
// @license        GPLv3
// @website        https://github.com/vi-se/PrettifyExtender
// @grant          none
// ==/UserScript==

(function (func) {
	// helper for injecting the script into the page
	var script = document.createElement("script");
	// insert a script element...

	script.type = 'text/javascript';
	script.appendChild(
			// with a function which is called on document ready
			document.createTextNode("$(" + func + ")")
			);
	// run the script after other scripts
	document.body.appendChild(script);
})(function () {
	// Helper to check if post tags contain `vim`
	var tagsIncludeVim = function () {
		var tags = document.getElementsByClassName('post-tag');
		for (var i = 0; i < tags.length; i++) {
			var t = tags[i];
			if (t.textContent.includes("vim")) {
				return true;
			}
		}
		return false;
	};
	// Run by default only on vi.se, or if the post tags contain `vim`.
	if (window.location.hostname != "vi.stackexchange.com" && !tagsIncludeVim()) {
		console.log('Not highlighting!');
		return;
	}

	var setLanguage = function () {
		var pres = document.getElementsByTagName('pre');
		for (var i = 0; i < pres.length; i++) {
			var p = pres[i];
			if (/prettyprint(?:ed|-override)/.test(p.className)) {
				continue;
			}
			p.className = 'lang-vim prettyprint';
		}
		prettyPrint();
	};

	var langscript = document.createElement("script");
	langscript.type = 'text/javascript';

	/*
	Since Github blocks hotlinking of scripts, and I really don't feel
	like using a third-party site for it, I'll fetch the script
	manually...
	*/
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			langscript.appendChild(document.createTextNode(xhr.responseText));
		}

		/*
		Need to ensure Prettify is loaded.
		See http://meta.stackexchange.com/a/278614/270345
		*/
		StackExchange.using('prettify', function () {
			document.body.appendChild(langscript);
			setLanguage();
		});
	};
	xhr.open("GET", "https://raw.githubusercontent.com/hail2u/google-code-prettify-language-handlers/master/lang-vim.js", true);
	xhr.send();
});
