/**
 *  fix-cjk-linebreak.js
 *
 *  Fix the extra space between CJK symbols and punctuations introduced by the
 *  line break in the souce file of a HTML page.
 *
 *  (c) copyright Haixing Hu, 2013
 *  https://github.com/haixing-hu/fix-cjk-linebreak.js
 *
 *  Note that this script depends on the XRegExp package: http://xregexp.com/
 */

// The regular expression representing the range of CJK symbols and punctuations
// See: http://en.wikipedia.org/wiki/CJK_Symbols_and_Punctuation
var cjk_range = "[\\p{Han}"
               + "\\p{InCJK_Symbols_and_Punctuation}]";

// The XRegExp object matching the line break between CJK symbols and
// punctuations
var cjk_linebreak_pattern = XRegExp("(" + cjk_range + ")"
                                    + "[\\r\\n\\s]+"
                                    + "(" + cjk_range + ")",
                                   "gm");

/**
 *  Fixes the extra space between CJK symbols and punctuations introduced by
 *  the line break in the souce file of an HTML page.
 *
 *  @param el
 *   The DOM element to be fixed. This function will fix all '<p>' elements
 *   in the sub-tree of `el`.
 */
function fix_cjk_linebreak(el) {
    var paragraphs = el.getElementsByTagName("p");
    for (var i in paragraphs) {
        var p = paragraphs[i];
        p.innerHTML = XRegExp.replace(p.innerHTML, cjk_linebreak_pattern, "$1$2");
    }
}
