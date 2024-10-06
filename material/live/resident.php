<?php
    //header('Access-Control-Allow-Origin: *');
    //header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    //header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("conexao.php");
    include("repositorio.php");

    try {

        $conexao = conectar();

        /*
            Este trecho é necessário caso o navegador faça um OPTIONS
            para verificar quais são os métodos permitidos.

            https://flechamagica.com.br/live/twd.php
        */
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

            header("Access-Control-Allow-Methods: GET,POST,OPTIONS,DELETE,PUT");
            die();

        } else if ($_SERVER["REQUEST_METHOD"] === "GET") {

            $json = resident($conexao);
            header('Content-Type: application/json');
            echo stripslashes(json_encode($json, JSON_UNESCAPED_UNICODE));
            die();

        } else if ($_SERVER["REQUEST_METHOD"] === "PUT") {

          $body = file_get_contents("php://input");
          // $dados = json_decode($body,true);

          //$array = get_object_vars($body);
          //print_r($dados['calendario-dnd']['tempo']);
          //die();

          $personagens = array("resident-evil");
          $atributos = array('todos');
          
          foreach ($personagens as $personagem) {
            foreach ($atributos as $atributo) {
              salvar($conexao,$personagem,$atributo,$body);
            }
          }

          header("HTTP/1.1 200 OK");
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
