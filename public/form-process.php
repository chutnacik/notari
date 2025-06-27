<?php

$errorMSG = "";

// FNAME
if (empty($_POST["fname"])) {
	$errorMSG = "First Name is required. ";
} else {
	$fname = $_POST["fname"];
}

// LNAME
if (empty($_POST["lname"])) {
	$errorMSG = "Last Name is required. ";
} else {
	$lname = $_POST["lname"];
}

// EMAIL
if (empty($_POST["email"])) {
	$errorMSG .= "Email is required. ";
} else {
	$email = $_POST["email"];
}

// PHONE
if (empty($_POST["phone"])) {
	$errorMSG .= "Phone is required. ";
} else {
	$phone = $_POST["phone"];
}

// MESSAGE
if (empty($_POST["message"])) {
	$errorMSG .= "Message is required. ";
} else {
	$message = $_POST["message"];
}

$subject = $_POST['subject'] . ' - Contact from site';

$EmailTo = "chutnak.jakub@gmail.com"; // Replace with your email.

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $fname . " " . $lname;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= "Phone: ";
$Body .= $phone;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $message;
$Body .= "\n";

// send email
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
	$errorMSG .= "Invalid email format. ";
}

$headers = "From: noreply@notari.chutnak.sk\r\n";
$headers .= "Reply-To: " . $email;
$success = @mail($EmailTo, $subject, $Body, $headers);

// redirect to success page
if ($success && $errorMSG == "") {
	echo "✅ Správa úspešne odoslaná! Ozeme sa Vám čoskoro.";
} else {
	if ($errorMSG == "") {
		echo "❌ Zlyhalo odoslanie. Skúste to znova.";
	} else {
		echo $errorMSG;
	}
}
$subject = "Notársky formulár - správa z webu";