// ==UserScript==
// @name           SE Prettify Extension Includer
// @author         Murukesh Mohanan (murukesh.mohanan+github@gmail.com)
// @version        0.2
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
	var tagsInclude = function (word) {
		var tags = document.getElementsByClassName('post-tag');
		for (var i = 0; i < tags.length; i++) {
			var t = tags[i];
			if (t.textContent.includes(word)) {
				return true;
			}
		}
		return false;
	};
	// Run by default only on (meta)vi.se, or if the post tags contain `vim`.
	if (!window.location.hostname.endsWith("vi.stackexchange.com") && !tagsInclude('vim')) {
		console.log('Not highlighting!');
		return;
	}

	var setLanguage = function (lang) {
		var className = 'lang-' + lang + ' prettyprint';
		var pres = document.getElementsByTagName('pre');
		for (var i = 0; i < pres.length; i++) {
			var p = pres[i];
			if (/prettyprint(?:ed|-override)/.test(p.className)) {
				continue;
			}
			p.className = className;
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
			observer = new MutationObserver(setLanguage);
			observer.observe(document.body, {childList: true});
		});
	};
	xhr.open("GET", "https://raw.githubusercontent.com/vi-se/PrettifyExtender/master/lang-vim.js", true);
	xhr.send();
});
