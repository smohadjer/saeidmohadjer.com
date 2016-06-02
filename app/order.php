<?php
if ( isset($_REQUEST['email']) ) {
	//send email
	$email = $_REQUEST['email'];
	$email_message = "Name: " . $_REQUEST['first_name'] . $_REQUEST['last_name'] . "\n";
    $email_message .= "Email: " . $email . "\n";
	$subject = 'form submission via email';

	mail("saeid@fastmail.fm", $subject, $email_message, "From:" . $email, "-f info@saeidmohadjer.com");
	echo "Thank you for using our mail form" . $email;
}
?>
