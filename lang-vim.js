// Copyright (C) 2012 Kyo Nagashima <kyo@hail2u.net>
// Copyright (C) 2016 Murukesh Mohanan <murukesh.mohanan+github@gmail.com>
//
// LICENSE: http://hail2u.mit-license.org/2012



/**
 * @fileoverview
 * Registers a language handler for Vim script.
 *
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code in an HTML tag like
 *      <pre class="prettyprint lang-vim"></pre>
 *
 *
 * @author kyo@haiil2u.net
 */

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
            // Whitespace
            [PR['PR_PLAIN'], /^[\t\n\r \xA0\u2028\u2029]+/, null, '\t\n\r \xA0\u2028\u2029']
        ],
        [
            // Double quoted string
            [PR['PR_STRING'], /^\"[^\"\r\n]*?\"/],
            // Single quoted string
            [PR['PR_STRING'], /^\'[^\'\r\n]*?\'/],
            // Line comment
            [PR['PR_COMMENT'], /^[\"\u2018\u2019][^\r\n\u2028\u2029]*/],
            // Keywords
			//autocmd
            [PR['PR_KEYWORD'], /^(?:au(?:tocmd)?|aug(?:roup)?|do(?:autocmd)?|doautoall)\b!?/],

			//change
            [PR['PR_KEYWORD'], /^(?:delete|join|change|le(?:ft)?|:s|sub(?:stitute)?|sno(?:magic)?|sm(?:agic)?|promptf(?:ind|epl)?|ret(?:ab)?|reg(?:isters)?|di(?:splay)?|yank|pu(?:t)?|co(?:py)?|move|ce(?:nter)?|ri(?:ght)?|le(?:ft)?|autocmd|sort)\b!?/],

			//editing
            [PR['PR_KEYWORD'], /^(?:keepalt|0f|file|buffers|files|ls|edit|enew|find|ex|vi(?:sual)?|view|ar(?:gs)?|arge(?:dit)?|arga(?:dd)?|argd(?:elete)?|argu(?:ment)?|w?[nN](?:ext)?|prev(?:ious)?|rew(?:ind)?|fir(?:st)?|la(?:st)?|wp(?:revious)?|argl(?:ocal)?|argg(?:lobal)?|argdo|write|sav(?:eas)?|up(?:date)?|wa(?:ll)?|conf(?:irm)?|cq|quit|wq|ex(?:it)?|conf(?:irm)?|w?qa(?:ll)?|quita(?:ll)?|xa(?:ll)?|conf(?:irm)?|bro(?:wse)?|l?cd|l?chd(?:ir)?|pwd|checkt(?:ime)?)\b!?/],

			//eval
            [PR['PR_KEYWORD'], /^(?:fun(?:ction)?|endf(?:un|unction)?|delf(?:un|unction)?|return|call|let|unlet|lockv(?:ar)?|unlo(?:ckvar)?|if|end(?:if)?|el(?:se)?|elseif|while|endw(?:hile)?|for|endfor|in|con(?:tinue)?|break|try|endt(?:ry)?|catch|finally|throw|echo(?:n|hl|msg|err)?|exe(?:cute)?|san(?:dbox)?)\b!?/],

			//helphelp
            [PR['PR_KEYWORD'], /^(?::h|h(?:e|elp)|helpc(?:lose)?|helpg(?:rep)?|lh(?:elpgrep)?|exu(?:sage)?|viu(?:sage)?|helpf(?:ind)?|helpt(?:ags)?)\b!?/],

			//extra langs
            [PR['PR_KEYWORD'], /^(?:lua|luado|luafile|mz(?:scheme)?|mzf(?:ile)?|pe(?:rl)?|perldo|py(?:thon)?|pydo|pyf(?:ile)?|ruby|rubydo|rubyf(?:ile)?|tcl|tcldo|tclf(?:ile)?)\b!?/],

			//insert
            [PR['PR_KEYWORD'], /^(?:XMLns|XMLent|append|insert|star(?:tinsert)?|stopi(?:nsert)?|startr(?:eplace)?|startg(?:replace)?|read)\b!?/],

			//map
            [PR['PR_KEYWORD'], /^(?:[nvxoilc]?(?:nore|un)?map(?:clear)?|[nic]?(?:un)?ab(?:brev|clear)?|(?:un)??ab(?:breviate)?|com(?:mand)?|delc(?:ommand)?|comc(?:lear)?)\b!?/],

			//motion
            [PR['PR_KEYWORD'], /^(?:go(?:to)?|ma(?:rk)?|marks|delm(?:arks)?|loc(?:kmarks)?|kee(?:pmarks)?|keepj(?:umps)?|ju(?:mps)?|changes)\b!?/],

			//options
            [PR['PR_KEYWORD'], /^(?:set|setl(?:ocal)?|setg(?:lobal)?|setf(?:iletype)?|bro(?:wse)?|opt(?:ions)?|fix(?:del)?)\b!?/],

			//quickfix
            [PR['PR_KEYWORD'], /^(?:cc|ll|cq(?:uit)?|cdo|[cl](?:[nN](?:ext)?|prev(?:ious)?|[nN]f(?:ile)?|pf(?:ile)?|rewind|fir(?:st)?|la(?:st)?|file?|getfile|addf(?:ile)?|buffer|getb(?:uffer)?|ad(?:dbuffer)?|ex(?:pr)?|gete(?:xpr)?|adde(?:xpr)?|list|fdo|ope(?:n)?|cl(?:ose)?|win(?:dow)?|ol(?:der)?|new(?:er)?)|l?(?:mak(?:e)?|vim(?:grep)?|vimgrepa(?:dd)?|gr(?:ep)?|grepa(?:dd)?)|comp(?:iler)?|set)\b!?/],

			//repeat
            [PR['PR_KEYWORD'], /^(?::g|global|vg(?:lobal)?|so(?:urce)?|ru(?:ntime)?|pa(?:ckadd)?|packloadall|scripte(?:ncoding)?|scr(?:iptnames)?|fini(?:sh)?|breaka(?:dd)?|breakd(?:el)?|breakl(?:ist)?|0?debugg(?:reedy)?|prof(?:ile)?|profd(?:el)?)\b!?/],

			//spell
            [PR['PR_KEYWORD'], /^(?:spell(?:good|wrong|undo|repall|dump|info)?|mksp(?:ell)?)\b!?/],

			//starting
            [PR['PR_KEYWORD'], /^(?:sus(?:pend)?|st(?:op)?|mk(?:exrc)?|mkv(?:imrc)?|mks(?:ession)?|mkvie(?:w)?|lo(?:adview)?|rv(?:iminfo)?|wv(?:iminfo)?|ol(?:dfiles)?|bro(?:wse)?)\b!?/],

			//syntax
            [PR['PR_KEYWORD'], /^(?:TOhtml|syn(?:tax)?|color(?:scheme)?|hi(?:ghlight)?|syntime|noh(?:lsearch)?|[23]?mat(?:ch)?)\b!?/],

			//tabpage
            [PR['PR_KEYWORD'], /^(?:tabe(?:dit)?|tabnew|tabf(?:ind)?|tab|tabc(?:lose)?|tabo(?:nly)?|tabn(?:ext)?|tabp(?:revious)?|tabN(?:ext)?|tabr(?:ewind)?|tabfir(?:st)?|tabl(?:ast)?|tabs|tabm(?:ove)?|tabd(?:o)?)\b!?/],

			//tagsrch
            [PR['PR_KEYWORD'], /^(?:ta(?:g)?|po(?:p)?|ta(?:g)?|tags|ts(?:elect)?|sts(?:elect)?|tj(?:ump)?|stj(?:ump)?|tn(?:ext)?|tp(?:revious)?|tN(?:ext)?|tr(?:ewind)?|tf(?:irst)?|tl(?:ast)?|lt(?:ag)?|pts(?:elect)?|ptj(?:ump)?|ptn(?:ext)?|ptp(?:revious)?|ptN(?:ext)?|ptr(?:ewind)?|ptf(?:irst)?|ptl(?:ast)?|is(?:earch)?|il(?:ist)?|ij(?:ump)?|isp(?:lit)?|ds(?:earch)?|dli(?:st)?|dj(?:ump)?|dsp(?:lit)?|che(?:ckpath)?)\b!?/],

			//undo
            [PR['PR_KEYWORD'], /^(?:undo|redo|undoj(?:oin)?|undol(?:ist)?|earlier|later|wundo|rundo|display)\b!?/],

			//various
            [PR['PR_KEYWORD'], /^(?:redr(?:aw)?|redraws(?:tatus)?|as(?:cii)?|[pP](?:rint)?|nu(?:mber)?|norm(?:al)?|sh(?:ell)?|ve(?:rsion)?|redi(?:r)?|sil(?:ent)?|uns(?:ilent)?|verb(?:ose)?|sl(?:eep)?)\b!?/],

			//windows
            [PR['PR_KEYWORD'], /^(?:sp(?:lit)?|vs(?:plit)?|new|vne(?:w)?|sv(?:iew)?|sf(?:ind)?|vert(?:ical)?|lefta(?:bove)?|abo(?:veleft)?|rightb(?:elow)?|bel(?:owright)?|to(?:pleft)?|bo(?:tright)?|quit|clo(?:se)?|hid(?:e)?|on(?:ly)?|winc(?:md)?|res(?:ize)?|vertical|al(?:l)?|sal(?:l)?|sa(?:rgument)?|sn(?:ext)?|spr(?:evious)?|sN(?:ext)?|sre(?:wind)?|sfir(?:st)?|sla(?:st)?|dr(?:op)?|windo|bufdo|sta(?:g)?|pta(?:g)?|pc(?:lose)?|pp(?:op)?|ped(?:it)?|ps(?:earch)?|files|buffers|ls|badd|bd(?:elete)?|bw(?:ipeout)?|bun(?:load)?|s?(?:buffer|bn(?:ext)?|bN(?:ext)?|bp(?:revious)?|br(?:ewind)?|bf(?:irst)?|bl(?:ast)?|bm(?:odified)?|un(?:hide)?|ba(?:ll)?))\b!?/],

			//misc
            [PR['PR_KEYWORD'], /^(?:his(?:tory)?|keepp(?:atterns)?|quit|qall|diff(?:split|this|patch|off|update|get|put)?|dig(?:raphs)?|filetype|fo(?:ld)?|fold(?:open|close)?|fold(?:do)?(?:open|closed)?|winp(?:os)?|win(?:size)?|be(?:have)?|[et]m(?:enu)?|tu(?:nmenu)?|popup|te(?:aroff)?|sim(?:alt)?|lan(?:guage)?|menut(?:ranslate)?|ha(?:rdcopy)?|syncbind|sign|mode|nos(?:wapfile)?|pre(?:serve)?|rec(?:over)?|open|ws(?:verb)?)\b!?/],
            // Literal number
            [PR['PR_LITERAL'], /^\d+|(?:v:(?:true|false|none|null))/],

			//keys
            [PR['PR_LITERAL'], /<Nul>|<BS>|<Tab>|<NL>|<FF>|<CR>|<Return>|<Enter>|<Esc>|<Space>|<lt>|<Bslash>|<Bar>|<Del>|<CSI>|<xCSI>|<EOL>|<Up>|<Down>|<Left>|<Right>|<S-Up>|<S-Down>|<S-Left>|<S-Right>|<C-Left>|<C-Right>|<(?:S-)?F[0-9]>|<(?:S-)?F1[0-2]>|<Help>|<Undo>|<Insert>|<Home>|<End>|<PageUp>|<PageDown>|<kHome>|<kEnd>|<kPageUp>|<kPageDown>|<kPlus>|<kMinus>|<kMultiply>|<kDivide>|<kEnter>|<kPoint>|<k[0-9]>|<[SCMAD]-[a-z0-9]+?>|<t_..>/i],

			//maps
            [PR['PR_LITERAL'], /<(?:map)?leader>|<buffer>|<nowait>|<silent>|<special>|<script>|<expr>|<unique>/],

			//cmd
            [PR['PR_LITERAL'], /<cword>|<cWORD>|<cfile>|<afile>|<abuf>|<amatch>|<sfile>|<slnum>/],

			//autocmd events
            [PR['PR_LITERAL'], /BufNewFile|BufWrite|(?:Buf|File)(?:Read|Write)(?:Pre|Post|Cmd)?|(?:Filter|Stdin)Read(?:Pre|Post)|FileAppend(?:Pre|Post|Cmd)|FilterWrite(?:Pre|Post)|Buf(?:Add|Create|Delete|Wipeout|Unload|Hidden|New)|BufFile(?:Pre|Post)|Buf(?:Win)?Enter|Buf(?:Win)?Leave|SwapExists|FileType|Syntax|EncodingChanged|TermChanged|OptionSet|(?:Vim|GUI)Enter|GUIFailed|TermResponse|QuitPre|VimLeave(?:Pre)?|FileChangedShell(?:Post)?|FileChangedRO|Shell(?:Cmd|Filter)Post|(?:Cmd|Func)Undefined|FuncUndefined|SpellFileMissing|Source(?:Pre|Cmd)|VimResized|FocusGained|FocusLost|Cursor(?:Hold|Moved)I?|(?:Cmdwin|Win|Tab|Insert)(?:Enter|Leave)|InsertChange|InsertCharPre|TextChangedI?|ColorScheme|RemoteReply|QuickFixCmd(?:Pre|Post)|SessionLoadPost|MenuPopup|CompleteDone|User/],
            // Identifier
            [PR['PR_PLAIN'], /^(?:(?:[a-z]|_\w)[\w:]*)/i],
            // Punctuation
            [PR['PR_PUNCTUATION'], /^[^\s\w<>\'\"]+/]
        ]
    ),
    ['vim']
);
