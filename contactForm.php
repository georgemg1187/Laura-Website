<?php

        echo 'Processing...';

        $name = (string)$_POST['name'];
        $subject = (string)$_POST['subject'];
        $email = (string)$_POST['email'];
        $message = (string)$_POST['message'];
    
        $mailTo = "LauraPutzservice@gmail.com;
        $headers = "From: ".$email;
        $txt = "You have recived an e-mail from ".$name.".\n\n".$message;

        mail($mailTo, $subject, $txt, $headers);
        // header("Location: index.php?mailsend");
?>