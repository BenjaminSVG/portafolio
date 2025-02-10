<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $asunto = $_POST['asunto'];
    $mensaje = $_POST['mensaje'];
    
    // Configurar el correo
    $para = "tucorreo@ejemplo.com"; // Cambia esto por tu correo
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
        // Redirigir con mensaje de éxito
        header("Location: index.html?mensaje=enviado#contact");
    } else {
        // Redirigir con mensaje de error
        header("Location: index.html?mensaje=error#contact");
    }
} else {
    // Si alguien intenta acceder directamente al script
    header("Location: index.html");
}
?>
