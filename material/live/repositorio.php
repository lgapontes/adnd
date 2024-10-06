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
    
    function relogio($conexao) {

        $retorno = array(
            "calendario-dnd"=>array(
                "tempo"=>'tempo01c',
                "calendario"=>'CV',
                "definir-hora"=>'1',
                "definir-dia"=>'1',
                "definir-mes"=>'Hammer',
                "definir-ano"=>'1380',
                "tempo-barovia"=>'nao',
            ),
        );

        $resultado = $conexao->query("SELECT `id`, `personagem`, `atributo`, `valor` FROM `flecha` WHERE `personagem` = 'calendario-dnd' and atributo in ('tempo','calendario','definir-hora','definir-dia','definir-mes','definir-ano','tempo-barovia') order by personagem, atributo");
        
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
    
    function twd($conexao) {

        $retorno = array(
            "twd"=>array(
                "grupo"=>'twd1',
                "calendario"=>'2010-08-20T12:00:00',
                "tempo"=>'Tempo Aberto',
                "contador"=>'0',
            ),
            "twd1"=>array(
                "swarm-size"=>'0',
                "threat-level"=>'0',
                "swarm-threat"=>'0',
            ),
            "twd2"=>array(
                "swarm-size"=>'0',
                "threat-level"=>'0',
                "swarm-threat"=>'0',
            ),
            "twd3"=>array(
                "swarm-size"=>'0',
                "threat-level"=>'0',
                "swarm-threat"=>'0',
            ),
            "twd4"=>array(
                "swarm-size"=>'0',
                "threat-level"=>'0',
                "swarm-threat"=>'0',
            ),
            "twd-oneill"=>array(
                "nome"=>'Vini Sky',
                "arquetipo"=>'BIKER',
            ),
            "twd-ana"=>array(
                "nome"=>'Sara Almeida',
                "arquetipo"=>'NOBODY',
            ),
            "twd-jairo"=>array(
                "nome"=>'Mary-Kate',
                "arquetipo"=>'HOMEMAKER',
            ),
            "twd-vicenzo"=>array(
                "nome"=>'Largo Lis',
                "arquetipo"=>'SCIENTIST',
            ),
        );

        $resultado = $conexao->query("SELECT `id`, `personagem`, `atributo`, `valor` FROM `flecha` WHERE `personagem` in ('twd','twd1','twd2','twd3','twd4','twd-oneill','twd-ana','twd-jairo','twd-vicenzo') and atributo in ('grupo','swarm-size','threat-level','swarm-threat','calendario','tempo','contador','nome','arquetipo') order by personagem, atributo");
        
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
    
    function resident($conexao) {

        $retorno = array(
            "personagens"=>array(
                "val"=>array(
                    "nome"=>'Ciara Harper',
                    "condition"=>'img/bom.webp',
                ),
                "cesar"=>array(
                    "nome"=>'Catherine Regnard',
                    "condition"=>'img/bom.webp',
                ),
                "yan"=>array(
                    "nome"=>'Toddy Sschh',
                    "condition"=>'img/bom.webp',
                ),
                "thiago"=>array(
                    "nome"=>'Jayce Romero',
                    "condition"=>'img/bom.webp',
                ),
                "saurinha"=>array(
                    "nome"=>'Michelle Gray',
                    "condition"=>'img/bom.webp',
                ),
                "miguel"=>array(
                    "nome"=>'Pierre-Antoine',
                    "condition"=>'img/bom.webp',
                ),
                "vicenzo"=>array(
                    "nome"=>'Conrad Dipple',
                    "condition"=>'img/bom.webp',
                ),
            ),
            "status"=>array(
                "swarm-size"=>'0',
                "threat-level"=>'0',
                "swarm-threat"=>'0',
            ),
        );

        $resultado = $conexao->query("SELECT `valor` FROM `flecha` WHERE `personagem` = 'resident-evil' and atributo in ('todos') order by personagem, atributo");
        
        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        if ($resultado->num_rows > 0) {
          while($row = $resultado->fetch_assoc()) {
            $retorno = json_decode($row["valor"]);
          }
        }

        return $retorno;
    }

    function onering($conexao) {

        $retorno = array(
            "nirah"=>array( "exausto"=>'', "abatido"=>'', "ferido"=>'', "endurance"=>'', "hope"=> '', "shadow"=> ''),
            "idril"=>array( "exausto"=>'', "abatido"=>'', "ferido"=>'', "endurance"=>'', "hope"=> '', "shadow"=> ''),
            "torteck"=>array( "exausto"=>'', "abatido"=>'', "ferido"=>'', "endurance"=>'', "hope"=> '', "shadow"=> ''),
            "bravos"=>array( "exausto"=>'', "abatido"=>'', "ferido"=>'', "endurance"=>'', "hope"=> '', "shadow"=> ''),
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

        $resultado = $conexao->query("SELECT personagem,atributo,valor FROM flecha where personagem in ('nirah','idril','torteck','bravos') and atributo in ('exausto','abatido','ferido','endurance','hope','shadow') order by personagem, atributo");
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
