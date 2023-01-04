-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 15 déc. 2022 à 16:18
-- Version du serveur : 10.5.16-MariaDB-cll-lve
-- Version de PHP : 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `u989707743_jdr`
--

-- --------------------------------------------------------

--
-- Structure de la table `personnages`
--

CREATE TABLE `personnages` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `titre` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personnages`
--

INSERT INTO `personnages` (`id`, `nom`, `img`, `titre`, `role`, `description`) VALUES
(1, 'Adhemar', '../../divers/img/personnages/conseil/adhemar.png', 'Chef du renseignement', 'Responsable de la formation des roublards', 'test'),
(4, 'Aleksia', '../../divers/img/personnages/conseil/aleksia.png', 'Assistante d\'Alexandra', 'Technique générale de magie.', 'Spécialiste en évocation et invocation.\r\nSouhaite se faire appeler \"Dame Aleksia\", mais ça ne \"prend\" pas vraiment.'),
(5, 'Alexandra', '../../divers/img/personnages/conseil/dameAlexandra.png', 'Chef de la recherche', 'Responsable de la formation des lanceurs de sorts', 'On l\'appelle la \"Dame du Lac\", elle est spécialisée dans la magie du froid, l\'abjuration et la divination. '),
(6, 'Père Ancelin', '../../divers/img/personnages/conseil/pereAncelin.png', 'Chef du conseil', 'Responsable de la formation des soigneurs', 'A l\'exception de Laurain et Jalana, tout le monde appelle Ancelin \"Mon père\", ou \"Père Ancelin\" de manière plus formelle. \r\nC\'est une personne extrèmement calme, et mesurée. Il aimerait pouvoir accompagner Jalana plus souvent hors les murs d\'enceinte de la ville mes ses obligations le retiennent la plupart du temps au château. A plus forte raison depuis quelques mois.'),
(7, 'Jalana', '../../divers/img/personnages/conseil/jalana.png', 'Assistante du Père Ancelin', 'Spécialiste en technique de guérison et de soins', 'Jalana n\'est pas souvent en ville en dehors des périodes de formation. Elle passe la majorité de son temps dans les bois environnants ou à aller aider les nombreuses familles de Valbalafre qui ont besoin de ses compétences.'),
(8, 'Jimmy les mains vives', '../../divers/img/personnages/conseil/jimmy.png', 'Assistant d\'Adhemar', 'Spécialistes des techniques de \"délestage\" ou de \"substitution\"', 'Jimmy est le petit frère de Séleste. On ne sait pas grand chose de leur enfance dans les bas-quartiers de Valbalafre. De nature très avenante et gouailleuse, Jimmy est beaucoup apprécié à la cour pour sa vivacité d\'esprit. Il est très ami avec Précis, le cadet de Laurain. Il lui arrive souvent de disparaitre plusieurs journées voire quelques semaines, mais rarement plus d\'un mois.'),
(9, 'Laurain', '../../divers/img/personnages/conseil/laurainSansreproche.png', 'Chef des armées', 'Responsable de la formation des combattants', 'Laurain est le père de Vaillant, Précis et Ténèbres, ses trois enfants adorés, nés de mère \"inconnue\". C\'est un homme qui fera passer le royaume et sa famille avant tout. La seule question qui se pose à son sujet serait de savoir qui des deux aurait la préséance le cas échéant. Courageux et loyal le binôme qu\'il forme avec le Père Ancelin pour la gestion militaire des environs est une des principales raisons qui ont permis le développement économique sans précédent de la ville de Valbalafre.'),
(10, 'Précis', '../../divers/img/personnages/conseil/precisSansreproche.png', 'Assistant de Laurain', 'Spécialiste des techniques de siège et du combat à distance', 'Précis est le fils cadet de Laurain, grand ami de Jimmy (le second de Adhemar) et Aymeric (cousin de Liansha). Il serait exagéré de dire qu\'il est avare de parole mais il n\'est pas non plus le plus grand boute-en-train de la cour.'),
(11, 'Séleste', '../../divers/img/personnages/conseil/seleste.png', 'Assistante d\'Adhemar', 'Spécialiste des techniques de négociation et d\'intimidation', 'Séleste est la grande sœur de Jimmy, très réservée contrairement à son frère elle réfléchit longuement avant de faire par de son avis, quand elle le donne. Il ne se passe probablement pas une transaction dans Valbalafre sans qu\'elle ou l\'un de ses \"minots\" soient au courant.'),
(12, 'Ténèbres', '../../divers/img/personnages/conseil/tenebresSansreproche.png', 'Assistante de Laurain', 'Spécialiste des techniques d\'approche et de reconnaissance', 'Ténèbres est la benjamine de Laurain, bien que ce dernier soit plus démonstratif qu\'elle il est indéniable que le lien qui les unit ne semble pas pouvoir être rompu par qui ou quoi que ce soit.'),
(13, 'Tharion', '../../divers/img/personnages/conseil/tharion.png', 'Second du Père Ancelin et scribe du conseil', 'Spécialiste des parchemins et des rituels', 'Tharion est une source inépuisable dès qu\'il s\'agit d\'héraldique, d\'étiquette, et plus généralement d\'Histoire et de Géographie.'),
(14, 'Vaillant', '../../divers/img/personnages/conseil/vaillantSansreproche.png', 'Major de Laurain', 'Spécialiste des techniques de cavalerie et du combat rapproché', 'Vaillant ressemble par beaucoup à son père bien qu\'il semble plus mesuré de manière générale. bien que Vaillant soit incontestablement doté d\'un grand cœur et d\'un sens du devoir à toute épreuve son esprit vif et sa grande sagesse malgré son jeune âge fait qu\'il est beaucoup plus difficile d\'anticiper ses réactions que celles de Laurain, cependant même si les chemins empruntés diffèrent parfois, le résultat et souvent très proche.');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `personnages`
--
ALTER TABLE `personnages`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `personnages`
--
ALTER TABLE `personnages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
