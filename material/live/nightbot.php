<?php
    
    include("conexao.php");
    include("repositorio.php");

    try {

        $conexao = conectar();

        /*
            Este trecho é necessário caso o navegador faça um OPTIONS
            para verificar quais são os métodos permitidos.
        */
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

            header("Access-Control-Allow-Methods: GET,POST,OPTIONS,DELETE,PUT");
            die();
        
        } else if ($_SERVER["REQUEST_METHOD"] === "GET") {

            if (
                array_key_exists("personagem",$_GET) &&
                array_key_exists("usuario",$_GET)
            ) {
                
                // Salvar
                $json = salvar($conexao,$_GET["personagem"],"flecha","sim");
                echo "🏹🧡 " . $_GET["usuario"] . " deu uma Flecha Mágica para " . $_GET["personagem"];
                die();
                
            }

        } else {
            header("HTTP/1.1 405");
            die();
        }

        desconectar($conexao);

    } catch (Exception $e) {
        echo $e;
        header("HTTP/1.1 500");
        die();
    }