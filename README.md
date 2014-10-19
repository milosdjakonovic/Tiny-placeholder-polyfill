Tiny-placeholder-polyfill
=========================

Placeholder polyfill in less than 1KB! 
NO jQuery dependency, but compatible with jQuery.


Usage:

simply include script: <script src="path/to/js/tpp.min.js"></script>  

Case jQuery present:
Tiny placeholder polyfill will release tpp variable in global namespace (window.tpp), create jQuery.fn.tpp so you can intialize
placeholder polyfill on selected element e.g. $('input,textarea').tpp() and automatically initialize polyfill on all found input and
textarea elements on document load event.

Case jQuery not present:
Tiny placeholder polyfill will release tpp variable in global namespace (window.tpp) so you can pass selected element as function
argument e.g. tpp(document.getElementById('#myInput'))
