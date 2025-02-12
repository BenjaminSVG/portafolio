<?php
session_start(); // Iniciar sesión para el control de spam

// Función para verificar el tiempo entre envíos
function checkSpamTime() {
    if (isset($_SESSION['last_submit_time'])) {
        $timeDiff = time() - $_SESSION['last_submit_time'];
        // Limitar a un envío cada 60 segundos
        if ($timeDiff < 60) {
            return false;
        }
    }
    return true;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar si ha pasado suficiente tiempo desde el último envío
    if (!checkSpamTime()) {
        header("Location: index.html?mensaje=spam#contact");
        exit();
    }

    // Recoger los datos del formulario
    $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $asunto = filter_var($_POST['asunto'], FILTER_SANITIZE_STRING);
    $mensaje = filter_var($_POST['mensaje'], FILTER_SANITIZE_STRING);
    
    // Validaciones básicas
    if (empty($nombre) || empty($email) || empty($asunto) || empty($mensaje)) {
        header("Location: index.html?mensaje=incompleto#contact");
        exit();
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: index.html?mensaje=email_invalido#contact");
        exit();
    }
    
    // Configurar el correo
    $para = "benjaminarevalos06@gmail.com";
    $asunto_email = "Nuevo mensaje de contacto: $asunto";
    
    // Crear el cuerpo del mensaje
    $cuerpo_mensaje = "Has recibido un nuevo mensaje desde el formulario de contacto.\n\n";
    $cuerpo_mensaje .= "Nombre: $nombre\n";
    $cuerpo_mensaje .= "Email: $email\n";
    $cuerpo_mensaje .= "Asunto: $asunto\n\n";
    $cuerpo_mensaje .= "Mensaje:\n$mensaje\n";
    
    // Cabeceras del correo
    $cabeceras = "From: $email\r\n";
    $cabeceras .= "Reply-To: $email\r\n";
    $cabeceras .= "X-Mailer: PHP/" . phpversion();
    
    // Enviar el correo
    if(mail($para, $asunto_email, $cuerpo_mensaje, $cabeceras)) {
        // Registrar el tiempo del envío exitoso
        $_SESSION['last_submit_time'] = time();
        header("Location: index.html?mensaje=enviado#contact");
    } else {
        header("Location: index.html?mensaje=error#contact");
    }
} else {
    // Si alguien intenta acceder directamente al script
    header("Location: index.html");
}
?>
