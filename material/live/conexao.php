<?php

    $DEBUG = true;

    ini_set("include_path", '/home2/linuc318/php');
    ini_set("include_path", '/opt/cpanel/ea-php74/root/usr/share/pear');
    if ($DEBUG) {
        ini_set('display_errors', '1');
        ini_set('display_startup_errors', '1');
        error_reporting(E_ALL);
    }

    function conectar() {        
        // Conexao remota
        $conexao = mysqli_connect("localhost","linuc318_fmuser","123eja","linuc318_flechamagica");
        
        if (!$conexao) {
            throw new Exception("Erro no banco de dados: " . mysqli_connect_error());
        }
        $conexao->set_charset("utf8");
        return $conexao;
    }

    function desconectar($conexao) {
        mysqli_close($conexao);
    }