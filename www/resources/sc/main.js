// (function(window, document, undefined)
// {
//
//     // helper functions
//
//     var trim = function(str)
//     {
//         return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
//     };
//
//     var hasClass = function(el, cn)
//     {
//         return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
//     };
//
//     var addClass = function(el, cn)
//     {
//         if (!hasClass(el, cn)) {
//             el.className = (el.className === '') ? cn : el.className + ' ' + cn;
//         }
//     };
//
//     var removeClass = function(el, cn)
//     {
//         el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
//     };
//
//     var hasParent = function(el, id)
//     {
//         if (el) {
//             do {
//                 if (el.id === id) {
//                     return true;
//                 }
//                 if (el.nodeType === 9) {
//                     break;
//                 }
//             }
//             while((el = el.parentNode));
//         }
//         return false;
//     };
//
//     // normalize vendor prefixes
//
//     var doc = document.documentElement;
//
//     window.App = (function()
//     {
//
//         var _init = false, app = { };
//
//         var inner = document.getElementById('inner-wrap'),
//
//             nav_open = false,
//
//             nav_class = 'js-nav';
//
//
//         app.init = function()
//         {
//             if (_init) {
//                 return;
//             }
//             _init = true;
//
//             var closeNavEnd = function(e)
//             {
//                 nav_open = false;
//             };
//
//             app.closeNav =function(e)
//             {
//                 if (nav_open) {
//                     // close navigation after transition or immediately
//                         closeNavEnd(null);
//                 }
//                 removeClass(doc, nav_class);
//             };
//
//             app.openNav = function()
//             {
//                 if (nav_open) {
//                     return;
//                 }
//                 addClass(doc, nav_class);
//                 nav_open = true;
//             };
//
//             app.toggleNavNoEvent = function()
//             {
//                 if (nav_open && hasClass(doc, nav_class)) {
//                     app.closeNav();
//                 } else {
//                     app.openNav();
//                 }
//                 return;
//             };
//
//             app.toggleNav = function(e)
//             {
//                 if (nav_open && hasClass(doc, nav_class)) {
//                     app.closeNav();
//                     e.stopPropagation();
//                 } else {
//                     app.openNav();
//                     e.stopPropagation();
//                 }
//                 if (e) {
//                     e.preventDefault();
//                 }
//             };
//
//
//
//             // open nav with main "nav" button
//            $('.nav-btn').on('touchstart', function(e){
//                app.toggleNav(e);
//            });
//
//             // close nav by touching the partial off-screen content
//             document.addEventListener('click', function(e)
//                 {
//                     $('.music-nav').css('display', 'block');
//                     if(event.target.id === 'nav-open-btn' || event.target.id === 'header-absolute'){
//                         e.preventDefault();
//                         app.toggleNav(e);
//                     }
//                 },
//                 true);
//
//             addClass(doc, 'js-ready');
//
//         };
//
//         return app;
//
//     })();
// })(window, window.document);
