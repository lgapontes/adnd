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
                array_key_exists("atributo",$_GET)
            ) {
                
                if ( array_key_exists("valor",$_GET) ) {
                    
                    // Salvar
                    $json = salvar($conexao,$_GET["personagem"],$_GET["atributo"],$_GET["valor"]);
                    $json = array("atualizado"=>true,"msg"=>"Valor de {$_GET["personagem"]} do atributo {$_GET["atributo"]} atualizado com sucesso para {$_GET["valor"]}");
                    header('Content-Type: application/json');
                    echo json_encode($json, JSON_UNESCAPED_UNICODE);
                    die();
                    
                } else {
                    
                    // Obter
                    $json = obter($conexao,$_GET["personagem"],$_GET["atributo"]);
                    header('Content-Type: application/json');
                    echo json_encode($json, JSON_UNESCAPED_UNICODE);
                    die();
                    
                }
                
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