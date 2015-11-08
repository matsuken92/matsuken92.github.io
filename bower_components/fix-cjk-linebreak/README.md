fix-cjk-linebreak
====================

This is a simple javascript used to fix the extra space between CJK symbols and
punctuations introduced by the line break in the souce file of a HTML page.

## The Problem

The HTML specification does not talking about how to render the line break in
the HTML source file. It simplely treat it as a single space. For the western
languages, this treatment is O.K., since there should be a space between each
word. But for the CJK languages, usually there is no space between two CJK
symbols or punctuations. Therefore, the line break in the source file of an
HTML page will lead to undesired extra space.

For example, consider the following HTML source codes:

    <p>1. 测试样例：这是源码中的第一行，以中文字符结束
          这是源码中的第二行，以中文字符开头</p>
    <p>1. 正确结果：这是源码中的第一行，以中文字符结束这是源码中的第二行，以中文字符开头</p>

The text in the first `<p>` element will have an undesired extra space between
two lines in the souce code.

## The Solution

We use a javascript to modify the innel HTML of `<p>` elements, removing all
the extra spaces introduced by the line breaks.

## Dependency

This script depends on the following packages:

- XRegExp: (http://xregexp.com/)
- DomReady: (https://github.com/ded/domready)

## Installation

### Manually

You can install the script manually.

1. Downloads this scripts at (https://raw.github.com/Haixing-Hu/fix-cjk-linebreak/master/fix-cjk-linebreak.js).
2. Downloads the XRegExp script at (https://raw.github.com/slevithan/xregexp/master/build/xregexp-all-min.js)
3. Downloads the DomReady script at (https://raw.github.com/ded/domready/master/ready.min.js)
4. Puts the scripts to some directory of your site, and include all those
   scripts in your HTML pages.

### Use Bower

You can use the package manager [Bower](http://bower.io/) to install the
script:

    bower install fix-cjk-linebreak

The script and all the dependened packages will be downloaded and installed
in the `bower_components` directory.

### Build from the Source

1. Checkout the source form the github:
    git clone https://github.com/Haixing-Hu/fix-cjk-linebreak.js.git
2. Download the dependened packages using [Bower](http://bower.io/):
    bower install
3. Check the test page under the `test` directory.
4. Copys the scripts to some directory of your site, and include all the
   scripts in your HTML pages.

## Usage

In your webpage, add the following codes in the `<head>..</head>` part:

    <script type="text/javascript" src="bower_components/domready/ready.min.js"></script>
    <script type="text/javascript" src="bower_components/xregexp/min/xregexp-all-min.js"></script>
    <script type="text/javascript" src="bower_components/fix-cjk-linebreak/fix-cjk-linebreak.js"></script>
    <script type="text/javascript">
    domready(function() {
       fix_cjk_linebreak(document.getElementsByTagName("body")[0]);
    });
    </script>

Note the last script snippet. It calls the `fix_cjk_linebreak` function with
the DOM element `<body>` of the page, as soon as the page's DOM is ready.  The
`fix_cjk_linebreak` function has a single parameter, which should be a DOM
element. The function will fix all the `<p>` elements under the parameter DOM
element by removing the extra spaces between CJK characters introduced by
the linebreaks in the source.

Please check the test pages under the `test` directory for the usage example.

**NOTE:** Before you open the test webpages, you should install the dependency
packages by running the following command in the root directory of the project:

    bower install

## Browser support

I have test the scripts under the following browsers.

- Firefox: 23.0.1
- Chrome 23.0.1271.97

If anyone test it under other browsers, please let me know. Thanks a lot.
