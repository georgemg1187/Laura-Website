<?php

        echo 'Processing...';

        $name = $_POST['name'];
        $subject = $_POST['subject'];
        $email = $_POST['email'];
        $message = $_POST['message'];
    
        $mailTo = "george@shotokankaratediary.com";
        $headers = "From: ".$email;
        $txt = "You have recived an e-mail from ".$name.".\n\n".$message;

        mail($mailTo, $subject, $txt, $headers);
        // header("Location: index.php?mailsend");
?>