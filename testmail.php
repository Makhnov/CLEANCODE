<?php   
    ini_set( 'display_errors', 1 );
    error_reporting ( E_ALL );
    $from = "nico@makh.fr";
    $to = "montauriol@tutanota.com";
    $subject = "Checking PHP mail"; 
    $message = "PHP mail works just fine";
    $headers = "From" . $from;
    mail($to, $subject, $message, $headers);
    echo "the email message was sent.";
?>