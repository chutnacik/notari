<?php
$to = "chutnak.jakub@gmail.com";
$subject = "Testovací email z notari.chutnak.sk";
$message = "Toto je test odoslaný cez mail() v PHP.";
$headers = "From: test@notari.chutnak.sk";

if (mail($to, $subject, $message, $headers)) {
	echo "✅ Email odoslaný";
} else {
	echo "❌ Zlyhalo odoslanie emailu";
}
