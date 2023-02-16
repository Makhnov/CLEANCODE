<?php
// sendmail.php
use PHPMailer\PHPMailer\PHPMailer;
//require_once('config.php');
require 'vendor/autoload.php';

// Vérifie si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Récupère les données du formulaire
    $nom = htmlspecialchars($_POST['nom']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Envoi du mail avec PHPMailer
    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->SMTPDebug = 2;
    $mail->Host = 'smtp.hostinger.fr';
    $mail->Port = 587;
    $mail->SMTPAuth = true;
    $mail->Username = 'nico@makh.fr';
    $mail->Password = "YD4LsThNGNqAVR6//*";
    $mail->setFrom($email, $nom);
    $mail->addReplyTo($email, $nom);
    $mail->addAddress('montauriol@tutanota.com', 'Nicolas');
    $mail->Subject = 'Formulaire de contact';
    $mail->msgHTML($message, __DIR__);
    $mail->Body = $message;
    //$mail->addAttachment('test.txt');
    if (!$mail->send()) {
        echo 'Erreur de Mailer : ' . $mail->ErrorInfo;
    } else {
        echo 'Le message a été envoyé.';
    }
}
?>
