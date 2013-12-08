// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

(function($) {

	$.fn
			.extend({
				shareLinks : function(options) {
					var defaults = {
						media : '',
						title : document.title,
						shareUrl : window.location.href.split('#').join('?dl='),
						description : $('meta[name="description"]').attr(
								"content"),
						listClass : 'share-links'
					};
					options = $.extend({}, defaults, options);
					// console.log(options);
					//
					return this.each(function() {
						var o = options;
						var obj = $(this);
						initContainer(obj);
						// obj.destroy = function() { destroyContainer(obj)};
					});
					//
					function initContainer($container) {
						var siteSettings = {
							facebook : {
								text : "Facebook",
								className : "facebook",
								url : "http://www.facebook.com/sharer.php?u={u}&amp;t={t}"
							},
							google : {
								text : "Google+",
								className : "google",
								url : "https://plus.google.com/share?url={u}"
							},
							twitter : {
								text : "Twitter",
								className : "twitter",
								url : "http://twitter.com/home?status={t}%20{u}"
							},
							email : {
								text : 'Email',
								className : 'email',
								url : 'mailto:?subject={t}&body={u}%20{d}'
							},
							tumblr : {
								text : 'Tumblr',
								className : 'tumblr',
								url : 'http://www.tumblr.com/share/link?url={u}&name={t}&description={d}'
							}
						};
						var sites = options.media.split(',');
						var listItem = '';
						for ( var i = 0; i < sites.length; i++) {
							if(	siteSettings[sites[i]]){
								siteSettings[sites[i]]['url'] = siteSettings[sites[i]]["url"]
										.replace("{t}", encodeURI(options.title))
										.replace("{u}", encodeURI(options.shareUrl))
										.replace("{d}",
												encodeURI(options.description));
								listItem += get_li(
										siteSettings[sites[i]]["className"],
										siteSettings[sites[i]]["url"],
										siteSettings[sites[i]]["text"]);
							}
							
						}
						$container.append('<ul class="' + options.listClass
								+ '">' + listItem + '</ul>');
					}
					;

					function get_li(className, url, text) {
						return '<li class="li-' + className + '"><a href="'
								+ url
								+ '" target="_blank" rel="nofollow" class="a-'
								+ className + '"><span class="link-text">'
								+ text + '</span></a><span class="li-text">'
								+ text + "</span></li>";
					}

				}
			});
})(jQuery);
// Place any jQuery/helper plugins in here.
