<?php
    header ("Access-Control-Allow-Origin: *");
    include './utils/connectBdd.php';
    

    if (isset($_GET['id']) AND isset($_GET['description'])) {
        $id = $_GET['id'];
        $description = $_GET['description'];
        descriptionEdit($bdd, $description, $id);
        header('location: '.$_SERVER['HTTP_REFERER'].'');
    }
    $data = showAllArticle($bdd);
    echo json_encode($data);

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

    function descriptionEdit($bdd, $description, $id) {
        try {
            $requete = "UPDATE personnages set description = '$description' where id = '$id'";
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
?>