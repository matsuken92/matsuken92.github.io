---
layout: post
title: "How to use MathJax in Jekyll generated Github pages"
author: Haixing Hu
category: programming
tags: [web development, ruby, javascript, html, jekyll, github]
use_math: true
---

There are many solutions to support [MathJax](www.mathjax.org) in
[Jekyll](http://jekyllrb.com/) on the web, but few of them could meet my
requirement. After spending a whole day to google the solution, at last I solve
the problem. My solution is not perfect, but it works well for me.

<!--more-->

Suppose that you have correctly installed and configured the Jekyll for your
site. If you don't know how to do that, goolge it by yourself. The following
instructions will help you to use MathJax in Jekyll.

### Use the correct Markdown processor

I have tried almost all the markdown processors. For example,
[kramdown](http://kramdown.rubyforge.org/), which was said to have build-in
support of math. But actually it has some problems for the inline math formula
with special characters (say, a pipe character like this `$$|\psi\rangle$$`),
and it have to leave a blank line before and after the display math formula.

At last I found that the default markdown processor
[maruku](http://maruku.rubyforge.org/) was the only one meet my
requirement. And most importantly, it is officially supported by the [Github
Pages](http://pages.github.com/).

Change your `_config.yml` as follows to use the
[maruku](http://maruku.rubyforge.org/) processor:

    markdown: maruku

### Modify the page template

Now we have to modify the page template to add the support of MathJax.

Create a file named with `mathjax_support` in your `_include` directory as
follows:

{% highlight html %}
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    TeX: {
      equationNumbers: {
        autoNumber: "AMS"
      }
    },
    tex2jax: {
      inlineMath: [ ['$','$'], ['\(', '\)'] ],
      displayMath: [ ['$$','$$'] ],
      processEscapes: true,
    }
  });
</script>
<script type="text/javascript"
        src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
{% endhighlight %}

Note that the above configuration enables the support of automatic equation
numbering (the line around `autoNumber: "AMS"`). If you do not need equation
numbering, remove the corresponding codes.

Next, modify the layout template of your pages like follows:

{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    {%raw%}{% include html_meta %}{%endraw%}
    <title>{{ page.title }} -- {{ site.title }}</title>
    <link href="/bootstrap/css/bootstrap.2.2.2.min.css" rel="stylesheet">
    <link href="/css/style.css" rel="stylesheet" type="text/css" media="all">
    {%raw%}{% if page.use_math %}{%endraw%}
      {%raw%}{% include mathjax_support %}{%endraw%}
    {%raw%}{% endif %}{%endraw%}
  </head>
  <body>
    {%raw%}{% include navigation_bar %}{%endraw%}
    <div class="container-narrow">
      <div class="content">
        {%raw%}{{ content }}{%endraw%}
      </div>
      <hr/>
      {%raw%}{% include footer %}{%endraw%}
    </div>
    {%raw%}{% include JB/analytics %}{%endraw%}
  </body>
</html>
{% endhighlight %}

Note the lines around `include mathjax_support`, those lines include the
file `mathjax_support` you just created in the `_include` directory, if the
post's front-matter contains a configuration `use_math : true`.

### Typeset math formula in post

In order to use the math formula in a post, the front-matter of the post
must have a variable `use_math` and set its value to `true`.

For example, the following is a post using math:

    ---
    layout: post
    title: "Test math"
    author: Haixing Hu
    category: misc
    tags: [test]
    use_math: true
    ---

    Let's test some inline math $x$, $y$, $x_1$, $y_1$.

    Now a inline math with special character: $|\psi\rangle$, $x'$, $x^\*$.

    Test a display math:
    $$
       |\psi_1\rangle = a|0\rangle + b|1\rangle
    $$
    Is it O.K.?

    Test a display math with equation number:
    \begin{equation}
       |\psi_1\rangle = a|0\rangle + b|1\rangle
    \end{equation}
    Is it O.K.?

    Test a display math with equation number:
    $$
      \begin{align}
        |\psi_1\rangle &= a|0\rangle + b|1\rangle \\\\
        |\psi_2\rangle &= c|0\rangle + d|1\rangle
      \end{align}
    $$
    Is it O.K.?

    And test a display math without equaltion number:
    $$
      \begin{align\*}
        |\psi_1\rangle &= a|0\rangle + b|1\rangle \\\\
        |\psi_2\rangle &= c|0\rangle + d|1\rangle
      \end{align\*}
    $$
    Is it O.K.?

    Test a display math with equation number:
    \begin{align}
        |\psi_1\rangle &= a|0\rangle + b|1\rangle \\\\
        |\psi_2\rangle &= c|0\rangle + d|1\rangle
    \end{align}
    Is it O.K.?

    And test a display math without equaltion number:
    \begin{align\*}
        |\psi_1\rangle &= a|0\rangle + b|1\rangle \\\\
        |\psi_2\rangle &= c|0\rangle + d|1\rangle
    \end{align\*}
    Is it O.K.?

Here are some notes about the above example:
1. The inline formula is between `$ ... $`.
2. The display formula is between `$$ ... $$`.
3. You can use the math envrionment directly, for example,
   `\begin{equation}...\end{equation}` or `\begin{align}...\end{align}`.
4. Whenever in the inline math or display math, the star character `'*'` **must**
   be escaped.
5. In the multi-lines display math, the line break symbol double-backslash `'\\'` should
   be escaped, i.e., use four backslash `'\\\\'`.
6. If you found error while typeseting math formula, try to escape some special
   characters.

### Effect of example

Here is the effect of the above example:

- - -

Let's test some inline math $x$, $y$, $x_1$, $y_1$.

Now a inline math with special character: $|\psi\rangle$, $x'$, $x^\*$.

Test a display math:
$$
   |\psi_1\rangle = a|0\rangle + b|1\rangle
$$
Is it O.K.?

Test a display math with equation number:
\begin{equation}
   |\psi_1\rangle = a|0\rangle + b|1\rangle
\end{equation}
Is it O.K.?

Test a display math with equation number:
$$
  \begin{align}
    |\psi_1\rangle &= a|0\rangle + b|1\rangle \\\\
    |\psi_2\rangle &= c|0\rangle + d|1\rangle
  \end{align}
$$
Is it O.K.?

And test a display math without equaltion number:
$$
  \begin{align\*}
    |\psi_1\rangle &= a|0\rangle + b|1\rangle \\\\
    |\psi_2\rangle &= c|0\rangle + d|1\rangle
  \end{align\*}
$$
Is it O.K.?

Test a display math with equation number:
\begin{align}
    |\psi_1\rangle &= a|0\rangle + b|1\rangle \\\\
    |\psi_2\rangle &= c|0\rangle + d|1\rangle
\end{align}
Is it O.K.?

And test a display math without equaltion number:
\begin{align\*}
    |\psi_1\rangle &= a|0\rangle + b|1\rangle \\\\
    |\psi_2\rangle &= c|0\rangle + d|1\rangle
\end{align\*}
Is it O.K.?

- - -

OK, that's all. Have fun with math!
