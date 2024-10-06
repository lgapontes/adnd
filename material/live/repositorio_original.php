<?php

    function existe($conexao,$personagem,$atributo) {
        $resultado = $conexao->query("select exists(SELECT valor FROM flecha where personagem = '" . $personagem . "' and atributo = '" . $atributo . "') as existe");
        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }
        $resultado_sql = $resultado->fetch_assoc();

        if ($resultado_sql["existe"] == 0) {
            return FALSE;
        } else {
            return TRUE;
        }
    }

    function salvar($conexao,$personagem,$atributo,$valor) {
        if ( ($personagem == '') or ($atributo == '') or ($valor == '') ) {
            throw new Exception("Dados inválidos!");
        }

        $existe = existe($conexao,$personagem,$atributo);

        if ($existe) {
            $resultado = $conexao->query(
                "update flecha set valor = '{$valor}' where personagem = '{$personagem}' and atributo = '{$atributo}'"
            );
            if (!$resultado) {
                throw new Exception("Erro no banco de dados: " . $conexao->error);
            }
        } else {
            $resultado = $conexao->query(
                "insert into flecha (personagem,atributo,valor) values ('{$personagem}','{$atributo}','{$valor}')"
            );
            if (!$resultado) {
                throw new Exception("Erro no banco de dados: " . $conexao->error);
            }
        }
    }

    function obter($conexao,$personagem,$atributo) {
        if ( ($personagem == '') or ($atributo == '') ) {
            throw new Exception("Dados inválidos!");
        }

        $existe = existe($conexao,$personagem,$atributo);

        $retorno = array("encontrado"=> false, "valor"=> '');

        if ($existe == TRUE) {
            $resultado = $conexao->query("SELECT valor FROM flecha where personagem = '" . $personagem . "' and atributo = '" . $atributo . "'");
            if (!$resultado) {
                throw new Exception("Erro no banco de dados: " . $conexao->error);
            }
            $resultado_sql = $resultado->fetch_assoc();

            $retorno["encontrado"] = true;
            $retorno["valor"] = $resultado_sql["valor"];
        }

        return $retorno;
    }

    function bbb($conexao) {

        $retorno = array(
            "barbara"=>array( "flecha"=>'', "maldicao"=>'', "idade"=>'', "pv"=>'', "nivel"=> '', "mascara"=> ''),
            "beemon"=>array( "flecha"=>'', "maldicao"=>'', "idade"=>'', "pv"=>'', "nivel"=> '', "mascara"=> ''),
            "baguera"=>array( "flecha"=>'', "maldicao"=>'', "idade"=>'', "pv"=>'', "nivel"=> '', "mascara"=> ''),
            "bela"=>array( "flecha"=>'', "maldicao"=>'', "idade"=>'', "pv"=>'', "nivel"=> '', "mascara"=> ''),
        );

        $resultado = $conexao->query("SELECT personagem,atributo,valor FROM flecha where personagem in ('barbara','beemon','baguera','bela') and atributo in ('flecha','maldicao','idade','pv','nivel','mascara') order by personagem, atributo");
        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        if ($resultado->num_rows > 0) {
          while($row = $resultado->fetch_assoc()) {
            $retorno[$row["personagem"]][$row["atributo"]] = $row["valor"];
          }
        }

        return $retorno;
    }

    function onering($conexao) {

        $retorno = array(
            "nirah"=>array( "exausto"=>'', "abatido"=>'', "ferido"=>'', "endurance"=>'', "hope"=> '', "shadow"=> ''),
            "idril"=>array( "exausto"=>'', "abatido"=>'', "ferido"=>'', "endurance"=>'', "hope"=> '', "shadow"=> ''),
            "torteck"=>array( "exausto"=>'', "abatido"=>'', "ferido"=>'', "endurance"=>'', "hope"=> '', "shadow"=> ''),
            "bravo"=>array( "fellowship"=>'', "ano"=>'', "era"=>'', "mes"=>'', "dia"=>'', "hora"=>'', "estacao"=>'', "tempo"=>''),
        );

        /*
        INSERT INTO flecha
            (personagem,atributo,valor)
        VALUES
            ('bravo','tempo','Aberto'),
            ('bravo','estacao','lairë'),
            ('bravo','hora','9'),
            ('bravo','dia','1'),
            ('bravo','mes','Narvinyë'),
            ('bravo','era','Terceira Era'),
            ('bravo','ano','2980');

          INSERT INTO flecha
              (personagem,atributo,valor)
          VALUES
              ('nirah','exausto','sim'),
              ('nirah','abatido','sim'),
              ('nirah','ferido','sim'),
              ('nirah','endurance','20'),
              ('nirah','hope','10'),
              ('nirah','shadow','0'),
              ('idril','exausto','sim'),
              ('idril','abatido','sim'),
              ('idril','ferido','sim'),
              ('idril','endurance','21'),
              ('idril','hope','11'),
              ('idril','shadow','1'),
              ('torteck','exausto','sim'),
              ('torteck','abatido','sim'),
              ('torteck','ferido','sim'),
              ('torteck','endurance','21'),
              ('torteck','hope','11'),
              ('torteck','shadow','1'),
              ('bravo','fellowship','20');
        */

        $resultado = $conexao->query("SELECT personagem,atributo,valor FROM flecha where personagem in ('nirah','idril','torteck') and atributo in ('exausto','abatido','ferido','endurance','hope','shadow') order by personagem, atributo");
        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        $resultado2 = $conexao->query("SELECT personagem,atributo,valor FROM flecha where personagem in ('bravo') and atributo in ('fellowship','ano','era','mes','dia','hora','estacao','tempo') order by personagem, atributo");
        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        if ($resultado->num_rows > 0) {
          while($row = $resultado->fetch_assoc()) {
            $retorno[$row["personagem"]][$row["atributo"]] = $row["valor"];
          }
        }

        if ($resultado2->num_rows > 0) {
          while($row = $resultado2->fetch_assoc()) {
            $retorno[$row["personagem"]][$row["atributo"]] = $row["valor"];
          }
        }

        return $retorno;
    }
