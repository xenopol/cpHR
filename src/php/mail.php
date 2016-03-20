<?php
require 'phpMailer/PHPMailerAutoload.php';

$mail = new PHPMailer;

$mail->isSMTP();
$mail->Host = '	smtp.unoeuro.com';
$mail->SMTPAuth = true;
$mail->Username = 'info@cphr.dk';
$mail->Password = 'rebopedeviyo57';
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

function sanitize($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

if (isset($_POST['workTypes']) && !empty($_POST['workTypes'])){
	$workTypes = $_POST['workTypes'];
	$emailBody = '<span><b>What kind of work:</b> ';
	foreach ($workTypes as $workType) {
		$emailBody .= $workType . ", ";
	}
}
if (isset($_POST['numberOfWorkers']) && !empty($_POST['numberOfWorkers'])) {
	$numberOfWorkers = $_POST['numberOfWorkers'];
	$emailBody .= '</span><br><span><b>How many workers:</b> ' . $numberOfWorkers . '</span><br>';
}
if (isset($_POST['workAddress']) && !empty($_POST['workAddress'])) {
	$workAddress = $_POST['workAddress'];
	$emailBody .= '<span><b>Where is the job located:</b> '. $workAddress . '</span><br>';
}
if (isset($_POST['userInfo']) && !empty($_POST['userInfo'])) {
	$userInfo = $_POST['userInfo'];
	$emailBody .= '<span><b>Contact information:</b> Name: ' . $userInfo['name'] . ', Email: ' . $userInfo['email'] . ', Phone number: ' . $userInfo['phone'] . ', CVR number: ' . $userInfo['cvr'] . '</span>';
}

$mail->setFrom(sanitize($userInfo['email']), sanitize($userInfo['name']));
$mail->addAddress('info@cphr.dk', 'cpHR');
$mail->addReplyTo(sanitize($userInfo['email']), sanitize($userInfo['name']));
$mail->isHTML(true);
$mail->Subject = sanitize($userInfo['name']) . ' sent you a message';
$mail->Body = $emailBody;

if(!$mail->send()) {
	echo 'Message could not be sent.';
	echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
	echo 'Success';
}

?>