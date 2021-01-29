<?php
    $to = "jldlcv@gmail.com";
    $email = $_POST["email"];
    $header = "Enviado desde el portafolio de GitHub";
    mail($to, "Contacto", $header);

    echo "<script> alert('Email ebviado exitosamente') </script>";
    echo "<script> setTimeout(\"location.href='index.html'\", 1000) </script>";
?>