<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'vendor/autoload.php';

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.hostinger.fr';
        $mail->SMTPAuth = true;
        $mail->Username = 'nico@makh.fr';
        $mail->Password = 'YD4LsThNGNqAVR6//*';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('nico@makh.fr', 'Nicolas');
        $mail->addAddress('montauriol@tutanota.com');

        $mail->isHTML(true);
        $mail->Subject = "Sujet du mail";
        $mail->Body    = "Contenu du mail que j'ai envoyé pour tester";

        $mail->send();
        echo 'Le message a été envoyé.';
    } catch (Exception $e) {
        echo 'Erreur de Mailer : ' . $mail->ErrorInfo;
    }
?>
