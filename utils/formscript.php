<?php
use PHPMailer\PHPMailer\PHPMailer;
require 'vendor/autoload.php';
    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.fr';
    $mail->Port = 587;
    $mail->SMTPAuth = true;
    $mail->Username = 'nico@makh.fr';
    $mail->Password = 'YD4LsThNGNqAVR6//*';
    $mail->setFrom('nico@makh.fr', 'Nico');
    $mail->addAddress('exemple@gmail.com', 'Nom du destinataire');
    if ($mail->addReplyTo($_POST['email'], $_POST['name'])) {
        $mail->Subject = 'Formulaire de contact PHPMailer';
        $mail->isHTML(false);
        $mail->Body = <<<EOT
E-mail: {$_POST['email']}
Nom: {$_POST['name']}
Message: {$_POST['message']}
EOT;
        if (!$mail->send()) {
            $msg = 'Désolé, quelque chose a mal tourné. Veuillez réessayer plus tard.';
        } else {
            $msg = 'Message envoyé ! Merci de nous avoir contactés.';
        }
    } else {
        $msg = 'Partagez-les avec nous !';
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Formulaire de contact</title>
</head>
<body>
<h1>Vous avez des idées ?</h1>
<?php if (!empty($msg)) {
    echo "<h2>$msg</h2>";
} ?>
<form method="POST">
    <label for="name">Nom: <input type="text" name="name" id="name"></label><br><br>
    <label for="email">E-mail: <input type="email" name="email" id="email"></label><br><br>   
    <label for="message">Message: <textarea name="message" id="message" rows="8" cols="20"></textarea></label><br><br>
    <input type="submit" value="Envoyer">
</form>
</body>
</html>