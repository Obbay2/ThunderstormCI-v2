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
	
function warnPortrait() {
	if(window.innerWidth <= 480) {
		if(window.orientation != -90 && window.orientation !=90) {
			$('#warnPortraitModal').modal();
		} else {
			$('#warnPortraitModal').modal('hide')
		}
	}
}