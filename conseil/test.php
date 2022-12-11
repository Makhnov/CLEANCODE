<!DOCTYPE html>

<html lang="fr">

<head>
    <title>Exo Nico</title>

    <meta name="author" content="Nico M">
    <meta name="description" content="TP#_LANGAGE">

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="./css/style.css">
    <link rel="icon" type="image/x-icon" href="./img/favicon.ico">

</head>

<body>

    <?php
        header ("Access-Control-Allow-Origin: *");
        include './utils/connectBdd.php';

        function showAllArticle($bdd){
            try {
                $requete = "SELECT * from personnages";
                $req = $bdd->prepare($requete);
                $req->execute();
                $data = $req->fetchAll(PDO::FETCH_ASSOC);
                return $data;
            }    
            catch (Exception $e) 
            {
                //affichage d'une exception en cas d’erreur
                die('Erreur : '.$e->getMessage());
            }
        }
        
        $data = showAllArticle($bdd);
    ?>

    <h1>php : </h1>
    <div id ="data">    
        <?php
        echo json_encode($data);
        ?>
    </div>

    <script src="./js/script.js"></script>

</body>

</html>


