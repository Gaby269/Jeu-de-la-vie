////////////////////////////////////////////
// Fonction qui donne un nombre aléatoire //
////////////////////////////////////////////

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


///////////////////////////////////////////////////////////////////
// CLASSE PREDATEUR : caracteristiques des différents prédateurs //
///////////////////////////////////////////////////////////////////
class Predateur {
    id;
    x;
    y;
    force = 3;

    /**
     * Constructeur pour créer un prédateur
     * @param id identifiant de la créature
     * @param x coordonnée de la nourriture qui existe
     * @param y coordonnée de la nourriture qui existe
     */
    constructor(id,x,y) {
        this.id = id;
        this.x = x;
        this.y = y;
        //ajouter un cercle pour représenter la créature sur la carte
        d3.select("svg").append('circle').attr('id',this.id.toString()).attr('cx', this.x*10+5).attr('cy', this.y*10+5).attr('r', 5).attr('stroke', 'black').attr('fill', 'red');
    }


    /**
     * Fonction qui fait attaquer le prédateur sur la créature
     * @param cible cible du prédateur qui représente une créature
     */
    attaque(cible){
        console.log(this.force);        //affichage sur la console de la force du prédateur
        console.log(cible.force);       //affichage sur la console de la force de la créature

        //Si la force du prédateur + un nombre aléatoire est plus grand que la force de la créature + un nombre aléatoire
        if(this.force + getRandomInt(6) > cible.force + getRandomInt(6)){
            cible.mort();           //la créature meurt
            console.log("miam");    //affichage dans la console que la créature est mangee
        }
        else{console.log("snif");}  //si ce n'est pas le cas, affichage de l'échec de l'attaque du prédateur
    }


    /**
     * Fonction qui indique ce que fait le prédateur pendant un tour
     */
    tour(){

        //Récupération d'un entier en fonction des éléments sur la carte qui vont représenter le bout de la carte
        let xmax = parseInt(document.getElementById("carte").firstChild.attributes.width.value)/10 -1;
        let ymax = parseInt(document.getElementById("carte").firstChild.attributes.height.value)/10 -1;

        //Récupération d'un nombre aléatoire entre 0 et 1 pour qu'on puisse choisir si le prédateur avance ou recule
        let moveX = getRandomInt(2);
        let moveY = getRandomInt(2);


        if(moveX === 0){        //Si le mouvement sur X est a 0 alors on diminue la position sur x de la créature
            this.x -= 1;
        }
        else{                   //sinon on augmente le mouvement sur x de 1
            this.x += 1;
        }

        if(moveY === 0){        //Si le mouvement sur Y est a 0 alors on diminue la position sur y de la créature
            this.y -= 1;
        }
        else{                   //sinon on augmente le mouvement sur y de 1
            this.y += 1;
        }

        if (this.x  < 0){       //Si la position de x est plus petite que 0 alors on la met à 0
            this.x = 0;
        }
        if(this.x > xmax){      //si la position sur x est hors la carte alors on la met à la position x maximale
            this.x = xmax;
        }
        if(this.y < 0 ){        //si la position de y est plus petite que 0 alors on la met à 0
            this.y = 0;
        }
        if(this.y > ymax){      //si la position sur y est hors la carte alors on la met à la position y maximale
            this.y = ymax;
        }

        //Si la position du prédateur est sur une tanière alors on change de place en diminuant x et y de 1
        if(getTypeCarre(this.x,this.y) === "white"){this.x -= 1; this.y -= 1;}


        //AFFICHAGE sur la carte
        let preda = $('#'+this.id.toString());                      //On récupère les informations du prédateur à l'aide de toString
        preda.attr('cx',this.x*10 +5).attr('cy',this.y*10+5);       //on ajoute au prédateur un attribut cx et cy qui représente la position de la créature 10 étant la largeur d'une case et 5 pour faire le centre de la case


        //Interaction avec les créatures
        JJ.forEach(Joueur => {                                          //pour chaque joueur

            for(let i = 0; i<Joueur.length; i++){                       //parcourt de la taille des joueurs pour pouvoir avoir le joueur i

                let posProie = Joueur[i].getPosition();                 //on récupère la position de la créature

                if (posProie[0] === this.x && posProie[1] === this.y){  //si sa position est sur la même case que le prédateur
                    this.attaque(Joueur[i]);                            //on applique la fonction attaque
                }
            }

        });
    }

}
