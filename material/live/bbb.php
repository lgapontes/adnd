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

            $json = bbb($conexao);
            header('Content-Type: application/json');
            echo stripslashes(json_encode($json, JSON_UNESCAPED_UNICODE));
            die();

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