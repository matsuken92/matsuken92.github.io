/**
 *  Adds "table" and "table-bordered" class for tables generated from the
 *  markdown.
 *
 *  @param el
 *    An DOM element. This function will fix all `<table>` elements under this
 *    element.
 */
function fix_table_style(el) {
    var tables = el.getElementsByTagName("table");
    for (var j = 0; j < tables.length; ++j) {
        var tb = tables[j];
        tb.className += "table table-bordered";
    }
}
