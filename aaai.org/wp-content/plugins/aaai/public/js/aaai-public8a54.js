(function($) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 */

	$(window).ready(function() {
		if ($("#login_form").length) {
			var info_notice_html = `
<div class="notice hidden notice-info is-dismissible">
	<p class="spinner is-active">
		Checking user credentials...
	</p>
</div>`;
			$('#pi_mca input[type="password"]').after(info_notice_html);
		}
		$("#login_form").on('submit', function(e) {
			e.preventDefault();
			$("#pi_mca .notice-info").toggleClass('hidden');

			var username = $("input[name=user]").val();
			var password = $("input[name=pass]").val();
			var actions = {
				'action': 'test_user',
				'username': username,
				'password': password
			}
			//console.log(ajax.ajaxurl);
			//console.log(actions);

			$.get(ajax.ajaxurl, actions, function (msg) {
				//console.log(msg);
				if ( msg.result === 'success' ) {
					$("#pi_mca .notice-info").toggleClass('hidden');
					//redirect to any page or close popup
					//$(".response_div").html('<div class="notice notice-success is-dismissible"><p>'+msg.message+'</p></div>');
					window.location.replace(ajax.redirecturl);
				} else {
					var error_notice_html = `
<div class="notice hidden notice-error is-dismissible">
	<p>`+msg.message+`</p>
</div>`;
					$('#pi_mca input[type="password"]').after(error_notice_html);
					//keep popup open
					$("#pi_mca .notice-info").toggleClass('hidden');
					$("#pi_mca .notice-error").toggleClass('hidden');
					setTimeout(function() {
						$("#pi_mca .notice-error").fadeOut(250);
					}, 5000);
				}
			});
		});
	});

})( jQuery );
