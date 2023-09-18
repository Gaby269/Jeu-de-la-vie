
/**
 * Fonction qui donne un nombre aléatoire
 * @param max Nombre maximum d'élément aléatoire
 * @return {int} Nombre aléatoire
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


/**
 * Fonction qui récupére le type de terrain de la case
 * @param ligne numéro de la ligne de la case
 * @param colonne numéro de la colonne de la case
 * @return {} type de la case c'est à dire la couleur de la case
 */
function getTypeCarre(ligne, colonne){
    let cellCouleur = $('#'+ligne.toString()+'_'+colonne.toString());   //je veux la cellule mise en parametre
    return cellCouleur.attr("fill");                                    //je retourne sa couleur
}



/**
 * Fonction de la mise en place des tanières
 * @param nbLignes nb de lignes de la carte entière
 * @param colonne nb de colonnes de la carte entière
 */
function getTaniere(nbLignes, nbColonnes){

    let select = document.getElementById('ToHide');
    let option = select.options[select.selectedIndex].value;
    var tableauTaniere =[[0,0],[0,0],[0,0],[0,0]];

    nbjoueurs = option; //Récupère le nombre de joueurs du formulaire HTLML

    if (nbjoueurs == 1){
        //JOUEUR 1                                              //si on a un seul joueur
        let x_1 = Math.floor(nbLignes / 2) - 1;                 //on cherche la moitié de la grille
        let y_1 = Math.floor(nbColonnes / 2) - 1;               //de même pour y
        let cell_J1 = $('#'+x_1+'_'+y_1);                       // on affecte les x et y calculer pour former l'id de la case
        //let cell_J1 = $('#49_49');                            //si on a une carte de 100 sur 100 on obtient ceci
        //console.dir(cell_J1);                                 //on affiche dans la console la tanière du joueur 1
        cell_J1.attr("stroke", "write").attr("fill","white").attr("Taniere","J1");    //on lui attribut la couleur blanche pour montrer que c'est une tanière et on dit que c'est une tanière
        tableauTaniere[0][0] = x_1;
        tableauTaniere[0][1] = y_1;
    }

    //On fait de même pour tous les autres joueurs en choisissant de façon équilibrer les emplacements des tanières

    if (nbjoueurs == 2){
        //JOUEUR 1
        let x_1 = Math.floor(nbLignes / 4) - 1;                //le quart de la grille
        let y_1 = Math.floor(nbColonnes / 2) - 1;              //on cherche la moitié de la grille
        let cell_J1 = $('#'+x_1+'_'+y_1);
        //let cell_J1 = $('#24_49');
        //console.dir(cell_J1);
        cell_J1.attr("stroke", "write").attr("fill","white").attr("Taniere","J1");  //on ajoute un contour blanc pour qu'on le vois mieux

        //JOUEUR 2
        let x_2 = nbLignes - (Math.floor(nbLignes / 4));        //on cherche le trois quart de la grille
        let y_2 = Math.floor(nbColonnes / 2) - 1;                   //on cherche la moitié de la grille
        let cell_J2 = $('#'+x_2+'_'+y_2);
        //let cell_J2 = $('#74_49');
        //console.dir(cell_J2);
        cell_J2.attr("stroke", "write").attr("fill","white").attr("Taniere","J2");
    }

    if (nbjoueurs == 3){
        //JOUEUR 1
        let x_1 = Math.floor(nbLignes / 2) - 1;                //on cherche la moitié de la grille
        let y_1 = Math.floor(nbColonnes / 3) - 1;              //on cherche le tiers de la grille (+ 1 car le tier donne un nombre flottant donc on prend le nombre d'après)
        let cell_J1 = $('#'+x_1+'_'+y_1);
        //let cell_J1 = $('#49_34');
        //console.dir(cell_J1);
        cell_J1.attr("stroke", "write").attr("fill","white").attr("Taniere","J1");

        //JOUEUR 2
        let x_2 = nbLignes - (Math.floor(nbLignes / 4));                //on cherche le trois quart de la grille
        let y_2 = nbColonnes - (Math.floor(nbColonnes / 3) + 1);        //on cherche le deux tier de la grille
        let cell_J2 = $('#'+x_2+'_'+y_2);
        //let cell_J2 = $('#74_66');
        //console.dir(cell_J2);
        cell_J2.attr("stroke", "write").attr("fill","white").attr("Taniere","J2");

        //JOUEUR 3
        let x_3 = Math.floor(nbLignes / 4) - 1;                        //on cherche le quart de la grille
        let y_3 = nbColonnes - (Math.floor(nbColonnes / 3) + 1);       //on cherche le deux tier
        let cell_J3 = $('#'+x_3+'_'+y_3);
        //let cell_J3 = $('#24_66');
        //console.dir(cell_J3);
        cell_J3.attr("stroke", "write").attr("fill","white").attr("Taniere","J3");

    }


    if (nbjoueurs == 4){
        //JOUEUR 1
        let x_1 = Math.floor(nbLignes / 2) - 1;                 //on cherche la moitié
        let y_1 = Math.floor(nbColonnes / 4) - 1;               //on cherche le quart
        let cell_J1 = $('#'+x_1+'_'+y_1);
        //let cell_J1 = $('#49_24');
        //console.dir(cell_J1);
        cell_J1.attr("stroke", "write").attr("fill","white").attr("Taniere","J1");

        //JOUEUR 2
        let x_2 = nbLignes - (Math.floor(nbLignes / 4));                //on cherche le 3 quart
        let y_2 = Math.floor(nbColonnes / 2) - 1;                       //on cherche la moitié
        let cell_J2 = $('#'+x_2+'_'+y_2);
        //let cell_J2 = $('#74_49');
        //console.dir(cell_J2);
        cell_J2.attr("stroke", "write").attr("fill","white").attr("Taniere","J2");

        //JOUEUR 3
        let x_3 = Math.floor(nbLignes / 2) - 1;                         //on cherche la moitié
        let y_3 = nbColonnes - (Math.floor(nbColonnes / 4));            //on cherche le 3 quart
        let cell_J3 = $('#'+x_3+'_'+y_3);
        //let cell_J3 = $('#49_74');
        //console.dir(cell_J3);
        cell_J3.attr("stroke", "write").attr("fill","white").attr("Taniere","J3");

        //JOUEUR 4
        let x_4 = Math.floor(nbLignes / 4) - 1;                 //on cherche le quart
        let y_4 = Math.floor(nbColonnes / 2) - 1;               //on cherche la moitié
        let cell_J4 = $('#'+x_4+'_'+y_4);
        //let cell_J4 = $('#24_49');
        //console.dir(cell_J4);
        cell_J4.attr("stroke", "write").attr("fill","white").attr("Taniere","J4");
    }
}





/**
 * Fonction qui permet d'avoir des zones de terrain
 * @param taille taille de la case
 * @param nbLignes nb de lignes de la carte
 * @param nbColonnes nb de lignes de la case
 */

function getZone(taille, nbLignes, nbColonnes) {

    //TABLEAU POUR RECUPERER LES CASES A MODIFIER
    let modif = [];

    ///////////////////////////
    // Parcours de la grille //
    ///////////////////////////

    let x = 0; //on parcours la grille case par case

    for (let i=0; i < nbColonnes; i++) {        //on parcours la grille indice par indice

        let y = 0; //on parcours la grille case par case

        for (let j=0; j < nbLignes ; j++){      //on parcours la grille indice par indice

            //CELLULE COURANTE
            let cellCourante = $('#'+i+'_'+j);                 //on stocke la cellule courante
            let couleurCourante = cellCourante.attr("fill");   //on stocke la couleur de la cellule courante
            //CELLULE VOISINE
            let cellVoisin;                                    //on crée la cellule voisine

            let couleur = false;   //boolean pour savoir si on doit modifier la couleur de la case voisine ou pas

            //////////////////////////
            // Parcours des voisins //
            //////////////////////////

            for (let u = -1; u<=1; u++){        //on parcours les voisins en largeur
                for (let v = -1; v<=1; v++){    //on parcours les voisins en hauteur

                    //CELLULES VOISINES
                    cellVoisin = $('#'+(i+u)+'_'+(j+v));                //on stocke une cellule voisine
                    let couleurVoisin = cellVoisin.attr("fill");        //on stocke la couleur d'une cellule voisine
                    //console.dir(couleurVoisin);                       //on veut enventuellemtn afficher la vouleur du voisin

                    //LIMITE DE LA GRILLE
                    if ((i + u) < 0 || (i + u) >= nbColonnes || (j + v) < 0 || (j + v) >= nbLignes){
                        continue;
                    }

                    //COMPARAISON DES COULEURS DES CELLULE COURANTE ET VOISINES
                    if (couleurCourante == couleurCourante && couleurVoisin == couleurCourante){
                        //si deux case de même couleur sont a coté
                        couleur = couleur || true;     //on dit que oui il y a deux case de la meme couleur a coté
                    }

                    //si il y a deux case cote à cote de même couleur
                    if (couleur){
                        //On ajoute les cellules voisines avec la couleur courante dans le tableau des modifications
                        modif[cellVoisin.attr("id")] = couleurCourante;
                    }

                }
            } //fin du parcours des voisins

            //SI UN VOISIN PAREIL QUE LA CELLULE COURANTE
            if (couleur){
                modif[cellVoisin.attr("id")] = couleurCourante; //on ajoute au tableau des modifications les cellules voisines de la cellule courante pour les metre à la meme couleur
            }

            y += taille; //on parcours la grille case par case
        }

        x += taille; //on parcours la grille case par case

    } //fin du parcours de la grille


    ///////////////////////////////
    // Modification de la grille //
    ///////////////////////////////

    for(let c in modif){   //on parcour le tableau modif
        //console.dir("indice : "+c);   //on peut afficher l'indice de la cellule a modifier

        let cellCouranteModifie = $('#'+c);  //on stocke la cellule courante à modifier
        //console.dir("couleur avant : "+cellCouranteModifie.attr("fill")); //on peut afficher la couleur avant modification dans la console

        //on verifie que la cellule à modifier n'est pas une tanière
        if (cellCouranteModifie.Taniere == undefined){
            //on donne la couleur associé à la case
            cellCouranteModifie.attr("fill", modif[c]);
        }
        //console.dir("couleur apres : "+cellCourante.attr("fill")); //on peut afficher la couleur après modification

    } //fin parcours de modif


}




/**
 * Rendre case d'une autre couleur en un click
 * @param ligne numéro de ligne sur la carte
 * @param colonne numéro de la colonne qur la carte
 */

function genereCouleurClick(ligne, colonne){

    //////////////////////////
    // Je prend une cellule //
    //////////////////////////
    let cellCouleur = $('#'+ligne.toString()+'_'+colonne.toString()); //j'ai une cellule

    //////////////////////////
    // Je change la couelur //
    //////////////////////////
    if (getTypeCarre(ligne, colonne) == "green"){           //si la case est une case verte
        cellCouleur.attr("fill","lawngreen");               //on change la couelur en vert clair
        cellCouleur.attr("pousse",3);                       //On adapte le compteur de pousse à 3
    }
    else if (getTypeCarre(ligne, colonne) == "lawngreen"){      //sinon si la case est vert clair
        cellCouleur.attr("fill","saddlebrown");            //on la change en marron case d'epourvu dherbe
        cellCouleur.attr("pousse",0);                        //On adapte le compteur de pousse à 0
    }
}





/**
 * Fonction qui génère la carte
 * @param taille taille de la case
 * @param nbLignes nb de lignes de la carte
 * @param nbColonnes nb de lignes de la case
 */

function genereCarte(taille, nbLignes, nbColonnes) {
    document.getElementById("ToHide").style.display = "none"; //Fait disparaitre le formulaire

    // Création de la balise svg
    let svg = d3.select("#carte")                   //selectionne l'id de la carte
        .append("svg")                      //ajoute la balise svg
        .attr("width", nbColonnes*taille)   //taille en largeur du conteur ici de la carte
        .attr("height", nbLignes*taille);   //taille en hauteur du contour ici de la carte

    let rand = 0;  //attribut qui sert a determiner aléatoirement l'environnement de la carte
    let rand2 = 0; //attribut qui sert à savoir si


    /////////////////////////////////////////////////////
    // Génération de la carte et des différentes cases //
    /////////////////////////////////////////////////////

    let x = 0;    //attribut qui sert a donner l'emplacement dans l'espace sur la largeur de la case

    for (let ligne=0; ligne < nbLignes; ligne++) {  //on parcours les lignes de la carte

        let y = 0;	 //attribut qui sert à donner l'emplacement dans l'espace sur la hauteur de la case

        for (let colonne=0; colonne < nbColonnes; colonne++) { //on parcours les colonnes de la carte

            rand = getRandomInt(101);  //determine les pourcentages des terrains
            rand2 = getRandomInt(101); //determine le fait si c'est de l'herbe ou de la terre

            d3.select("svg")                                      //selectionne la balise svg
                .append("rect")                                       //ajoute un rectangle
                .attr("width", taille)                                //on donne la largeur de la case donnée en paramètre
                .attr("height", taille)	                              //de même pour la longueur
                .attr("x", x)	                                       //coordonnée x
                .attr("y", y)	                                       //coordonnée y
                .attr("stroke", "black")                              //contour de la case est noir
                .attr("fill", function(){
                    //couleur en fonction des valeurs aléatoire
                    //60% d'herbe/terre
                    if (rand < 60) {
                        if (rand2 < 60) return "green";             //si herbe
                        else  return "saddlebrown";                 //si terre
                    }
                    //15% d'eau
                    if (rand < 75) return "navy";                   //si mer
                    //12% de sable
                    if (rand < 87) return "darkkhaki";              //si sable
                    //12%de sable
                    else return "dimgrey";})                        //si rocher
                .attr("id", ligne.toString()+"_"+colonne.toString())  //id de la case devient ligne_colonne

                /////////////////////////////////////////////////////
                // GENERATION DES CASES CHANGEANTES APRES UN CLICK //
                /////////////////////////////////////////////////////
                .on('click', function(){                            //on ajoute une fonction de click pour changer les case de couelurs
                    genereCouleurClick(ligne, colonne);             //et on change les couleurs grace a la focntion
                });

            y += taille;         //on passe a la case suivante en incrémentant de la taille de la case
        }

        x += taille;            //on passe a la case suivante en incrémentant de la taille de la case
    }

    /////////////////////
    // Ajout des zones //
    /////////////////////
    getZone(taille, nbLignes, nbColonnes);

    ///////////////////////
    // Ajout des tanières //
    ///////////////////////
    getTaniere(nbLignes, nbColonnes);

    ////////////////////////////////////////
    // Mise en place de l'attribut pousse //
    ////////////////////////////////////////

    for (let ligne=0; ligne < nbLignes; ligne++) {                                  //on parcours les lignes de la carte
        for (let colonne=0; colonne < nbColonnes; colonne++) {                      //on parcours les colonnes de la carte
            let cellCouleur = $('#'+ligne.toString()+'_'+colonne.toString());       //j'ai une cellule
            if (getTypeCarre(ligne, colonne) == "green"){                           //si la case est une case verte
                cellCouleur.attr("pousse",6);                                       //on change la couelur en vert clair
            }
            else if (getTypeCarre(ligne, colonne) == "saddlebrown"){                //sinon si la case est vert clair
                cellCouleur.attr("pousse",0);                                       //on la change en marron case d'epourvu dherbe
            }
        }
    }

}



/**
 * Raffraichir la carte pour mettre à jour l'attribut pousse des cases d'herbes
 * @param nbLignes nb de lignes que la carte comporte
 * @param nbColonnes nb de colonnes que la carte comporte
 */
function refreshCarte(nbLignes, nbColonnes){
    for (let ligne=0; ligne < nbLignes; ligne++) {                      //on parcours les lignes de la carte
        for (let colonne=0; colonne < nbColonnes; colonne++) {          //on parcours les colonnes de la carte

            let cell = $('#'+ligne.toString()+'_'+colonne.toString());  //j'ai une cellule

            ///////////////////////////////////////
            // Modification de l'attribut pousse //
            ///////////////////////////////////////

            if (cell.attr("pousse") == 0){cell.attr("pousse",1);}
            else if (cell.attr("pousse") == 1){cell.attr("pousse",2);}
            else if (cell.attr("pousse") == 2){cell.attr("pousse",3); cell.attr("fill","lawngreen");}   //après 3 pousses, on rend l'herbe vert clair
            else if (cell.attr("pousse") == 3){cell.attr("pousse",4);}
            else if (cell.attr("pousse") == 4){cell.attr("pousse",5);}
            else if (cell.attr("pousse") == 5){cell.attr("pousse",6); cell.attr("fill","green");}       //après 6 pousses, on rend l'herbe vert foncé

        }
    }
}



// Variables globales
let tour=0;
let timeline;
let nbtour = document.getElementById("nbTours")



/**
 * Savoir le nombre de créature en vie
 * @param tab tableau des créatures du joueur
 * @return {} Informations sur le nombre de créatures en vie d'un joueur par la tab
 */
function nbEnVie(tab){
    let nb = 0;
    //parcours du tableau des créatures d'un joueur
    for(let num = 0; num < tab.length; num++){
        if(tab[num].etat === 1){
            nb++;               //incrémentation si la créature à l'emplacement tab[num] est en vie
        }
    }
    let result = "nombre de créatures en vie: " + nb + "/" + tab.length;    //string pour l'affichage
    return result;  //renvoie du string
}




/**
 * Fonction pour afficher les informations des joueurs et faire commencer les tours au créatures et prédateurs
 * @param nbLignes nb de lignes que la carte comporte
 * @param nbColonnes nb de colonnes que la carte comporte
 */
function sequence(nbLignes,nbColonnes){

    JJ.forEach(Joueur => (Joueur.forEach( creature => creature.tour())));   //en parcourant les joueurs, puis par joueur les créatures applique les tour par créature
    predateurs[0].tour();   //applique le tour pour le prédateur 1
    predateurs[1].tour();   //applique le tour pour le prédateur 2

    let div = document.getElementById("affichage"); //récupération de l'élément div pour l'affichage
    let child = div.childNodes;                     //on construit child regroupant les enfants de div

    child.forEach( p => {       //on parcourt les enfants de  div
        if(p.id === "1"){   //pour le joueur 1
            p.innerText = "Joueur 1: [" + divi1 + "] " + nbEnVie(JJ[0]);    //on affichera les informations sur le joueurs ainsi que les créatures en vie
        }
        if(p.id === "2"){   //pour le joueur 2
            p.innerText = "Joueur 2: [" + divi2 + "] " + nbEnVie(JJ[1]);
        }
        if(p.id === "3"){   //pour le joueur 3
            p.innerText = "Joueur 3: [" + divi3 + "] " + nbEnVie(JJ[2]);
        }
        if(p.id === "4"){   //pour le joueur 4
            p.innerText = "Joueur 4: [" + divi4 + "] " + nbEnVie(JJ[3]);
        }
        if(p.id === "nb"){ //affichage du nombre de tour
            p.innerText = "Tour n°" + tour + "/" + parseInt(nbtour.value);
        }
    });

    refreshCarte(nbLignes,nbColonnes);      //applique la mise a jour de pousse
    //console.log(tour);
    tour++;                                    //incrémentation du nombre de tours
    if (tour > parseInt(nbtour.value)) clearInterval(timeline);
}



/**
 * Fonction qui démarre le jeu à l'aide de la fonction sequence
 * @param taille taille de la case
 * @param nbLignes nb de lignes de la carte
 * @param nbColonnes nb de lignes de la case
 */
function start(taille, nbLignes, nbColonnes){
    timeline = setInterval(sequence, 2000, nbLignes, nbColonnes);   //on definie la timeline
}
