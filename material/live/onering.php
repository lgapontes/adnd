<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

    include("conexao.php");
    include("repositorio.php");

    try {

        $conexao = conectar();

        /*
            Este trecho é necessário caso o navegador faça um OPTIONS
            para verificar quais são os métodos permitidos.

            https://flechamagica.com.br/live/onering.php
        */
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

            header("Access-Control-Allow-Methods: GET,POST,OPTIONS,DELETE,PUT");
            die();

        } else if ($_SERVER["REQUEST_METHOD"] === "GET") {

            $json = onering($conexao);
            header('Content-Type: application/json');
            echo stripslashes(json_encode($json, JSON_UNESCAPED_UNICODE));
            die();

        } else if ($_SERVER["REQUEST_METHOD"] === "PUT") {

          /*
          $body = file_get_contents("php://input");
          $dados = json_decode($body,true);

          $array = get_object_vars($body);
          print_r($array);
          die();

          $personagens = array("nirah","idril","torteck","bravo");
          $atributos_comuns = array("exausto","abatido","ferido","endurance","hope","shadow");
          $atributos_bravo = array("fellowship","ano","era","mes","dia","hora","estacao","tempo");
          
          $teste = array();
          
          foreach ($personagens as $personagem) {
            $atributos_temp = $atributos_comuns;
            if ($personagem == "bravo") {
                $atributos_temp = $atributos_bravo;
            }
            $teste[$personagem] = array();
            
            foreach ($atributos_temp as $atributo) {
              //salvar($conexao,$personagem,$atributo,$dados[$personagem][$atributo]);
              $teste[$personagem][$atributo] = $body;
            }
          }

          //echo obter($conexao,"bravo","fellowship");
          header('Content-Type: application/json');
          //echo stripslashes(json_encode(obter($conexao,"bravo","fellowship"), JSON_UNESCAPED_UNICODE));
          echo stripslashes(json_encode($teste, JSON_UNESCAPED_UNICODE));
          */
          
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
