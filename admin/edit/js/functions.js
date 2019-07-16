/* GET SCRIPTS CODE:

i = 0;
	Messenger().run({
	  progressMessage: 'Loading scripts...',
	  errorMessage: 'Error loading scripts... Retrying soon...',
	  successMessage: 'Scripts loaded.',
	  action: function(opts) {
		if (++i < 3) {
		  $.getScript( "session1s.js" )
			  .done(function( script, textStatus ) {
				session1();
				return opts.success();
			  })
			  .fail(function( jqxhr, settings, exception ) {
				return opts.error({
						status: 500,
						readyState: 0,
						responseText: 0
					  });
			});
		} else {
		  return opts.error();
		}
		
	  }
	});
	
	*/

// Spin code - <div id="wait"><script type="text/javascript">$("#wait").spin("large", "black");</script></div>

(function($) {
	$.fn.spin = function(opts, color) {
		var presets = {
			"tiny": { lines: 8, length: 2, width: 2, radius: 3 },
			"small": { lines: 8, length: 4, width: 3, radius: 5 },
			"large": { lines: 10, length: 8, width: 4, radius: 8 }
		};
		if (Spinner) {
			return this.each(function() {
				var $this = $(this),
					data = $this.data();

				if (data.spinner) {
					data.spinner.stop();
					delete data.spinner;
				}
				if (opts !== false) {
					if (typeof opts === "string") {
						if (opts in presets) {
							opts = presets[opts];
						} else {
							opts = {};
						}
						if (color) {
							opts.color = color;
						}
					}
					data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin(this);
				}
			});
		} else {
			throw "Spinner class not available.";
		}
	};
})(jQuery);

function warnPortrait() {
	if(window.innerWidth <= 480) {
		if(window.orientation != -90 && window.orientation !=90) {
			$('#warnPortraitModal').modal();
		} else {
			$('#warnPortraitModal').modal('hide')
		}
	}
}

function sizeWindows() {
	if($(document).height()>=$(window).height()){
	  $(".inner-wrap, .left-off-canvas-menu, .main-section").height($(document).height() - $(".fixed").height());
	  //alertm("1");
	} else {
	  $(".inner-wrap, .left-off-canvas-menu, .main-section").height($(window).height() - $(".fixed").height());
	  //alertm("2");
	}
}

function filterRound() {
	$("#filterRoundField").toggle();	
}