// Anonymous function prevents namespace pollution
(function () {

// Nasty hack to normalise the nav links without absolute paths
// in case there is no webserver
var relPath = '';
var pathSplit = window.location.href.split('/');
if (pathSplit.includes('posts')) {
    // Build a relative path prefix based on how far down the
    // directory structure we have to go to find the web root.
    // This assumes that only pages under the 'posts' path will need this
    var pageDirLevel = (pathSplit.length - 1) - pathSplit.indexOf('posts');
    relPath = '../'.repeat(pageDirLevel);
}

// Can no longer import an HTML as the relative path must be
// injected into the nav html
var navStr =
    '<nav>' +
    '<ul>' +
    '<li class="index"><a href="' + relPath + 'index.html">Index</a></li>' +
    '<li class="aboutMe"><a href="' + relPath + 'aboutMe.html">About Me</a></li>' +
    '<li class="contact"><a href="' + relPath + 'contact.html">Contact</a></li>' +
    '<li class="posts"><a href="' + relPath + 'posts.html">Posts</a></li>' +
    '</ul>' +
    '</nav>';

$('#navMenu').html(navStr);
    
})();
