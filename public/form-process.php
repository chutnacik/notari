<?php
$errorMSG = "";

if (empty($_POST["email"])) {
	$errorMSG .= "Email is required. ";
} else {
	$email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
	if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		$errorMSG .= "Invalid email format. ";
	}
}

$to = "chutnak.jakub@gmail.com";
$subject = "Test cez formulár";
$message = "Test z formulára na notari.chutnak.sk";
$headers = "From: noreply@notari.chutnak.sk\r\n";
$headers .= "Reply-To: " . $email;

if ($errorMSG == "") {
	if (mail($to, $subject, $message, $headers)) {
		echo "✅ Odoslané";
	} else {
		echo "❌ Zlyhalo odoslanie";
	}
} else {
	echo $errorMSG;
}
