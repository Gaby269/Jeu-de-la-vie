////////////////////////////////////////////
// Fonction qui donne un nombre aléatoire //
////////////////////////////////////////////

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


//////////////////////////////////////////////////////////////////
// CLASSE CREATURE : caracteristique et fonctions des creatures //
//////////////////////////////////////////////////////////////////
class Creature {
    hydratation = 50;           //taux d'hydratation
    satiete = 50;               //taux de satiete
    energie = 50;               //taux d'energie
    genre;                      //genrede la creature
    etat = 1;                   //en vie ou non
    mobilite;                   //taux de mobilité
    perception;                 //taux de perception
    reproductivite;             //taux de reproductivité
    force;                      //taux de force
    static nextId = 0;          //prochain identifiant
    x;                          //coordonnée de la creature sur x
    y;                          //coordonnée de la creature sur y
    home = [];                  //coordonnées de la tanière
    joueur;                     //apartient à quel joueur

    /**
     * Constructeur pour donnée à la creature naissance
     * @param reproductivité taux de reproductivité
     * @param perception taux de perception
     * @param mobilite taux de mobilité
     * @param genre male ou femelle
     * @param x coordonnée de la creature à la naissance sur x puis quand il se déplace
     * @param y coordonnée de la creature à la naissance sur y puis quand il se déplace
     * @param joueur le joueur à qui appartient la créature
     */
    constructor(reproductivite, perception, mobilite, force, genre, x, y, joueur) {
        this.reproductivite = reproductivite;
        this.perception = perception;
        this.mobilite = mobilite;
        this.force = force;
        this.genre = genre;
        this.id = ++this.constructor.nextId;
        this.x = x;
        this.y = y;
        this.home = [x,y];      //au départ la creature née dans sa tanière
        this.joueur = joueur;
        if(this.joueur === 1){d3.select("svg").append('circle').attr('id',this.id.toString()).attr('cx', this.x*10+5).attr('cy', this.y*10+5).attr('r', 5).attr('stroke', 'black').attr('fill', '#740dec');}
        else if(this.joueur === 2){d3.select("svg").append('circle').attr('id',this.id.toString()).attr('cx', this.x*10+5).attr('cy', this.y*10+5).attr('r', 5).attr('stroke', 'black').attr('fill', '#ff00f0');}
        else if(this.joueur === 3){d3.select("svg").append('circle').attr('id',this.id.toString()).attr('cx', this.x*10+5).attr('cy', this.y*10+5).attr('r', 5).attr('stroke', 'black').attr('fill', '#fffd00');}
        else {d3.select("svg").append('circle').attr('id',this.id.toString()).attr('cx', this.x*10+5).attr('cy', this.y*10+5).attr('r', 5).attr('stroke', 'black').attr('fill', '#00ffff');}


    }

    /**
     * Méthode pour savoir si la créature est en vie
     * @return {boolean} renvoie l'etat de la créature 1 pour vivante et 0 pour mort
     */
    estEnVie() {
        //si energie = 0 pas forcément mort
        if(this.hydratation <= 0 || this.satiete <= 0){
            this.etat = 0;                                                  //l'état est instantié à 0 car la créature est morte
            let id_creature = $('#'+this.id.toString());                    //récupération de l'identifiant de la créature
            id_creature.attr('fill','transparent').attr('stroke','none');   //on ajoute des attribut pour faire disparaitre l'affichage de la créature
            return this.etat;                                               //retourne l'etat de la créature
        }
        else {return this.etat;}                                            //retourne l'etat dela créature si elle est vivante
    }




    /**
     * Affichage des information de la creature
     * @returns {""} chaine de caractère regroupant les informations sur la créature
     */
    toString() {
        let Sgenre = "";
        if (this.genre === 0) {
            Sgenre = "Male";
        } else {
            Sgenre = "Female";
        }
        return "Creature " + this.id + " avec reproductivité = " + this.reproductivite + ", perception = " + this.perception + ", mobilité= " + this.mobilite + " et de genre: " + Sgenre + " se trouve en (" + this.x + ";" + this.y +")";
    }



    /**
     * Récupération de la position de la créature
     * @return {*[]} tableau des deux coordonnées de la position de la créature
     */
    getPosition(){
        return [this.x, this.y];
    }



    /**
     * Modification de la position de la créature
     * @param newX nouvelle position x
     * @param newY nouvelle position y
     */
    setPosition(newX,newY){
        this.x=newX;
        this.y=newY;
    }



    /**
     * Fonction calculant tous les déplacements possibles de la creature
     * @param x2 coordonnée x de la case à atteindre
     * @param y2 coordonnée y de la case à atteindre
     * @returns {*[]} tableau de tout les mouvements possibles
     */
    totalMouvements(x2,y2) {
        let mouvements = [];                                                    // tableau des mouvements
        mouvements.push({CoordX: this.x, CoordY: this.y, Parent: null});        // ajoute dans le tableau les coordonnées de la créature
        return this.parcours([],mouvements,{CoordX: x2, CoordY: y2});           // on applique parcours pour aller jusqu'à la case voulu
    }




    /**
     * Recherche du chemin entre la position de la créature et sa cible
     * @param chemin le chemin que la créature va emprunter
     * @param mouvements les possibilités de déplacements de la créature
     * @param cible la case à atteindre
     * @returns {null|*} le chemin s'il existe, sinon null
     */
    parcours(chemin,mouvements,cible){

        while(mouvements.length > 0){       //tant que la taille du tableau des mouvements de la creature n'est pas vide

            if(getTypeCarre(cible.CoordX,cible.CoordY) === "navy"){     //si le type de la case cible est une case d'eau
                return null;        //on renvoie null
            }

            if(cible.CoordX < 0 || cible.CoordY < 0){   //si les coordonnées de la cible sont hors carte
                return null;        //on retourne null
            }

            //on définie les extrémités de la carte au maximum
            let xmax = parseInt(document.getElementById("carte").firstChild.attributes.width.value)/10 -1;
            let ymax = parseInt(document.getElementById("carte").firstChild.attributes.height.value)/10 -1;

            if(cible.CoordX > xmax || cible.CoordY > ymax){     //si les coordonnées de la cible sont hors carte
                return null;        //on retourne null
            }

            let caase = mouvements.shift();     //récuperation et suppression de la case qu'on vient de parcourir dans mouvement
            chemin.push(caase);                 //et on l'ajoute dans le chemin
            //console.log(caase);

            if((caase.CoordX === cible.CoordX) && (caase.CoordY === cible.CoordY)){     //si la case courant est la case cible alors
                return chemin;                                                          //on renvoie le chemin
            }

            let Pmouvement = mouvements.concat(this.finalMouvement(caase,this.x,this.y,chemin));    //on ajoute a mouvement les cases navigable en fonction des case x et y
            mouvements = Pmouvement;
            //console.log(mouvements.length);

        }

        let caasePlusProche = [chemin[chemin.length-1]];        //on cherche la case la plus proche de la case ciblr

        for(let i = 0; i < chemin.length; i++){     //parcours du chemin
            //cherche la case la plus proche
            if((caasePlusProche[0].CoordX-cible.CoordX > chemin[i].CoordX-cible.CoordX) && (caasePlusProche[0].CoordY-cible.CoordY > chemin[i].CoordY-cible.CoordY)){
                caasePlusProche = [chemin[i]];  //si c'est l'une des plus proche de la cible, on se base dessus
            }
        }

        mouvements.push({CoordX: this.x, CoordY: this.y, Parent: null});    //on ajoute au mouvements les coordonnées actuelles de la créature
        return this.parcours([],mouvements,caasePlusProche[0]);             //on retourne recursivement la même chose en prenant comme cible la case la plus proche de la cible
    }






    /**
     * Génération des cases naviguables à l'étape n+1
     * @param mouvements tableau de mouvements
     * @param x position x de départ
     * @param y position y de départ
     * @returns {*[]} tableau de mouvements avec les nouvelles cases naviguables
     */
    finalMouvement(mouvements, x, y,chemin) {
        let final = [];
        if(this.verif(x,y,{CoordX: mouvements.CoordX + 1, CoordY: mouvements.CoordY, Parent: mouvements}) && !this.dedans(chemin,{CoordX: mouvements.CoordX + 1, CoordY: mouvements.CoordY, Parent: mouvements})){
            final.push({CoordX: mouvements.CoordX + 1, CoordY: mouvements.CoordY, Parent: mouvements});
        }
        if(this.verif(x,y,{CoordX: mouvements.CoordX - 1, CoordY: mouvements.CoordY, Parent: mouvements}) && !this.dedans(chemin,{CoordX: mouvements.CoordX - 1, CoordY: mouvements.CoordY, Parent: mouvements})){
            final.push({CoordX: mouvements.CoordX - 1, CoordY: mouvements.CoordY, Parent: mouvements});
        }
        if(this.verif(x,y,{CoordX: mouvements.CoordX, CoordY: mouvements.CoordY+1, Parent: mouvements}) && !this.dedans(chemin,{CoordX: mouvements.CoordX, CoordY: mouvements.CoordY + 1, Parent: mouvements})){
            final.push({CoordX: mouvements.CoordX, CoordY: mouvements.CoordY+1, Parent: mouvements});
        }
        if(this.verif(x,y,{CoordX: mouvements.CoordX, CoordY: mouvements.CoordY-1, Parent: mouvements}) && !this.dedans(chemin,{CoordX: mouvements.CoordX, CoordY: mouvements.CoordY - 1, Parent: mouvements})){
            final.push({CoordX: mouvements.CoordX, CoordY: mouvements.CoordY-1, Parent: mouvements});
        }
        return final;
    }





    /**
     * Fonction vérifiant la naviguabilité de la case (x1,y1)
     * @param x position x de départ
     * @param y position y de départ
     * @param nouvCase positions et parent de la nouvelle case
     * @returns {boolean} retourne si la créature peut passer sur cette case
     */
    verif(x,y,nouvCase){

        ////////////////
        // PARAMETRES //
        ////////////////

        let xmax = parseInt(document.getElementById("carte").firstChild.attributes.width.value)/10 -1;      //case max de la carte sur x
        let ymax = parseInt(document.getElementById("carte").firstChild.attributes.height.value)/10 -1;     //case max de la carte sur y

        let x1 = nouvCase.CoordX;       //coordonnée sur x de la case à vérifier
        let y1 = nouvCase.CoordY;       //coordonnée sur xy de la case à vérifier

        //génération du nombre de mouvements restants
        let move = this.mobilite;

        //Tant que la case n'est aps null
        while(nouvCase !== null){
            //console.log("attente de trouver null");
            //console.log(nouvCase);
            move--;                         //on enleve de la mobilité
            nouvCase = nouvCase.Parent;     //et on change de case
        }

        let tile = getTypeCarre(x1, y1);                 //recuperation du type de la case

        //////////////////
        // VERIFICATION //
        //////////////////

        if((x1 < 0) || (y1 < 0)){                        //si la case est hors carte alors la réponse est fausse
            //console.log("position illégale <0");
            return false;
        }

        if((x1 > xmax) || (y1 > ymax)){                  //si la case est hors carte de meme
            //console.log("position illégale >max");
            return false;
        }

        if(move >= 0){                          //si on peut encore faire des mouvements
            switch (true) {
                case tile === "green":          //si c'est de l'herbe on peut y aller
                    return true;
                    break;
                case tile === "darkkhaki":      //si c'est du sable on peut y aller
                    return true;
                    break;
                case tile === "saddlebrown":    //si c'est de la terre on peut y aller
                    return true;
                    break;
                case tile === "lawngreen":      //si c'est de l'herbe couper on peut y aller
                    return true;
                    break;
                case tile === "white":          //si c'est une tanière on peut y aller
                    return true;
                    break;
                case tile === "dimgrey":        //si c'est des rocher
                    //on doit verifier que le déplacement ne depacera pas la mobilité restante de la créature
                    if (Math.sqrt(Math.pow((x1) - x, 2) + Math.pow((y1) - y, 2)) <= move - 1) {     //parcours la distance entre deux points
                        return true;
                    }
                    break;
            }
        }
        //console.log("pas valide vérif");
        return false;
    }




    /**
     * Fonction retournant si la nouvelle case est dans les cases du chemin
     * @returns {boolean} vrai si la nouvelle case est dans le chemin false sinon
     */
    dedans(chemin, nouvCase){
        //parcours du chemin
        for(let i = 0; i < chemin.length; i++){
            //si la case du chemin est la nouvelle case
            if(chemin[i].CoordX === nouvCase.CoordX && chemin[i].CoordY === nouvCase.CoordY){
                //console.log("la case est dans chemin");
                return true;    //renvoie true
            }
        }
        //console.log("la case n'est pas dans chemin");
        return false;
    }




    /**
     * Fonction retournant toutes les cases perçues par la créature
     * @returns {*[]} vision de la créature ce qu'elle voit
     */
    champDeVision(){
        let vision = [];                                                            //tableau de toutes les cases perçues par la créature
        let Pvision = vision;                                                       //Pvision est un intermediaire pour calculer vision
        vision.push({CoordX: this.x, CoordY: this.y, Parent: null});                //on ajoute à la vision les coordonnées de la créature

        for(let i = this.perception; i > 0; i--){                                   //on parcourt la taille de la perception de la crature

            Pvision = vision.concat(this.casesSuivantes(vision, this.x, this.y));   //on ajoute a vision les cases suivantes de la vision par rapport à la position de la créature
            vision = Pvision;

            for(let i = 0; i < vision.length; i++){                                 //on parcourt la taille de la vision
                for(let j = 1; j < vision.length; j++){                             //de meme

                    if((j!==i) && (vision[i].CoordX === vision[j].CoordX) && (vision[i].CoordY === vision[j].CoordY)){  //pour un i ou j différent, si deux cases sont les mêmes dans vision
                        vision.splice(j,1);                                         //supprime l'une des deux cases ici celle a partir de j
                    }

                }
            }
        }
        return vision;  //on retourne le tableau de vision
    }



    /**
     * génération des cases perçues à l'étape n+1
     * @param vision tableau des cases perçues
     * @param x position x
     * @param y position y
     * @returns {*[]} tableau de mouvements avec les nouvelles cases perçues
     */
    casesSuivantes(vision, x, y){
        let final = [];

        for (let i = 0; i < vision.length; i++) {       //parcour la visiond de la creature

            //Parcourt des voisins en verifiant si les cases abordé existe
            if(this.verif2(vision[i].CoordX+1,vision[i].CoordY)){
                final.push({CoordX: vision[i].CoordX+1, CoordY: vision[i].CoordY, Parent: vision[i]});  //ajoute la case avec comme parents la vision générale de la creature
            }
            if(this.verif2(vision[i].CoordX-1,vision[i].CoordY)){
                final.push({CoordX: vision[i].CoordX-1, CoordY: vision[i].CoordY, Parent: vision[i]});
            }
            if(this.verif2(vision[i].CoordX,vision[i].CoordY+1)){
                final.push({CoordX: vision[i].CoordX, CoordY: vision[i].CoordY+1, Parent: vision[i]});
            }
            if(this.verif2(vision[i].CoordX,vision[i].CoordY-1)){
                final.push({CoordX: vision[i].CoordX, CoordY: vision[i].CoordY-1, Parent: vision[i]});
            }
        }
        return final;
    }




    /**
     * Vérification de la validité de la case (est-ce que cette case peut exister sur le plateau)
     * @param x1 position x de la case
     * @param y1 position y de la case
     * @returns {boolean} validité de la case
     */
    verif2(x1,y1){
        let xmax = parseInt(document.getElementById("carte").firstChild.attributes.width.value)/10 -1;      //case max de la carte sur x
        let ymax = parseInt(document.getElementById("carte").firstChild.attributes.height.value)/10 -1;     //case max de la carte sur y

        if((x1 < 0) || (y1 < 0)){           //si les coordonnées sont hors la carte
            return false;                   //renvoyer faux
        }
        if((x1 > xmax) || (y1 > ymax)){     //si les coordonnées sont hors carte
            return false;                   //renvoyer faux
        }
        return true;                        //sinon ok
    }




    /**
     * Cherche le besoin voulu par la créature
     * @param besoin le besoin voulu par la créature
     * @return case correspondante au besoin de al créature
     */
    cherche(besoin){

        let res = null;                         //resultat qui sera une case
        let distance = 999;                     //distance entre la créature et la case qu'on cherche démare à 999 pour verifier que la distance est faisable
        let vision = this.champDeVision();      //champ de vision de la créature
        let tile = "";                          //type de la case

        for (let i = 0; i < vision.length; i++) {                       //parcours de la vision

            tile = getTypeCarre(vision[i].CoordX, vision[i].CoordY);    //donne le type de la case courante

            if(tile === besoin){        //si la type correspond

                if ( (Math.abs(this.x - vision[i].CoordX ) + Math.abs(this.y - vision[i].CoordY)) < distance){  //si la vrai distance est plus petite que celle d'avant
                    distance = (Math.abs(this.x - vision[i].CoordX ) + Math.abs(this.y - vision[i].CoordY));    //on calcul la distance entre la case courante donc la position de la créature avec la case ou il y a le beosoin
                    res = vision[i];        //le resultat correspond a la case du besoin
                }

            }
        }

        return res; //on retourne la case qu'on cherche
    }


    /**
     * Cherche le besoin voulu par la créature qui est le plus proche parmis sa vision
     * @param besoin1 un des besoins de la créature
     * @param besoin2 un des besoins de la créature
     * @return {} case correspondante au besoin le plus proche de la créature
     */
    cherche2(besoin1, besoin2){

        //parmatres identique a cherche
        let res = null;
        let distance = 999;
        let vision = this.champDeVision();
        let tile = "";

        for (let i = 0; i < vision.length; i++) {   //parcourt de la vision

            tile = getTypeCarre(vision[i].CoordX, vision[i].CoordY);    //type de la case

            if(tile === besoin1 || tile === besoin2){   //si une des deux cases correspond

                //on fait pareil
                if ( (Math.abs(this.x - vision[i].CoordX ) + Math.abs(this.y - vision[i].CoordY)) < distance){
                    distance = (Math.abs(this.x - vision[i].CoordX ) + Math.abs(this.y - vision[i].CoordY));
                    res = vision[i];
                }

            }

        }
        return res; //et on renvoie la case
    }



    /**
     * Fonction qui modélise la reproduction de deux créature
     */
    reproduction(){
        let trouve = this.joueur-1;     //

        for(let i = 0; i < JJ[trouve].length; i++){     //parcours des joueurs

            //si la créature est au meme endroit qu'une autre créature du meme jeu et quil est de genre différent et que les deux créatures sont vivante et qu'elles ont assez d'énergie
            if(this.x === JJ[trouve][i].x && this.y === JJ[trouve][i].y && this.genre !== JJ[trouve][i].genre && JJ[trouve][i].etat === 1 && JJ[trouve][i].energie >= 50){

                this.energie -= 45;                     //leurs énergie baisse
                JJ[trouve][i].energie -= 45;            //celle de l'autre joueur aussi
                let fertilite = getRandomInt(101);      //on prend un nombre aleatoire

                if(fertilite <= (25 + 10 * this.reproductivite)){   //si le nombre est plus petit que
                    JJ[trouve].push(new Creature(this.reproductivite, this.perception, this.mobilite,this.force,getRandomInt(2),this.x,this.y,trouve+1));
                    console.log("Nouveau née !");   //affichage dans la console
                }
            }
        }
    }


    /**
     * Action de la créature lors d'un tour
     */
    tour(){

        if (this.estEnVie()){                               // Si la créature est en vie

            //Si la créature est AMORPHE (si il n'a plus d'energie)
            if (this.energie <= 2){
                this.energie += 25;                             // on ajoute l'énergie de 25 car on a augmenter un tour
            }

            //Si la créature est DESHYDRATEE, elle cherche de l'eau mais qu'il a tjs de l'énergie
            else if (this.hydratation < 75){                    // on considère que la créature est désydraté si elle est de moins de 75

                let cherche = this.cherche("navy");             // on trouve une case d'eau avec ses coordonnées

                if (cherche !== null){                          // si on trouve une case d'eau dans son champ de vision

                    let parent = cherche.Parent;                // on recupere la case précédente de la case cherché

                    if(parent.coordX === this.x && parent.coordY === this.y){   //si la position de la créature correspond à la position du parent (donc que le parent est la meme case)
                        this.hydratation += 25;                 // on augmente l'hdratation de la créaature de 25
                    }
                    else{                                       //si jamais c'est pas le cas

                        let mouvements = this.totalMouvements(parent.CoordX, parent.CoordY);    //on recupere les mouvements a partir du parents de la case courante
                        let i = 0;                                                              //on a un compteur

                        while(this.energie >= 2 && i < mouvements.length){                      //tant que la créature est non amorphe et que le nombre de mouvements restant est plus grand que i
                            this.energie -= 2;                                                  //on enelve de l'energie pour se deplacer
                            i += 1;                                                             //on incremente i
                        }

                        this.setPosition(mouvements[i-1].CoordX,mouvements[i-1].CoordY);        // on se déplace à l'endroit de la case courante
                        let id_creature = $('#'+this.id.toString());
                        id_creature.attr('cx',this.x*10 +5).attr('cy',this.y*10+5);             //on rajoute pour l'affichage des creature sur la carte sont identifiant en fonction de ses coordonnées

                        if(cherche.Parent.CoordX === this.x && cherche.Parent.CoordY === this.y){   //si on retombe sur une case d'eau on se réhydrate
                            this.hydratation += 25;
                        }
                    }
                }

                else{                                           //si on ne trouve pas de case eau
                    let xmax = parseInt(document.getElementById("carte").firstChild.attributes.width.value)/10 -1;      //xmax de la carte
                    let ymax = parseInt(document.getElementById("carte").firstChild.attributes.height.value)/10 -1;     //ymax de la carte
                    let moveX = getRandomInt(2);    //on avance ou on recule sur x
                    let moveY = getRandomInt(2);    //on avance ou on recule sur y
                    let depX = 0;                   //deplacement sur x
                    let depY = 0;                   //deplacement sur y

                    if(moveX === 0){                                        //si le mouvement est a 0 on va reculer
                        depX = this.x - getRandomInt(this.mobilite+1);      //en fonction de sa mobilité on se deplace
                    }
                    else{                                                   //si le mouvement est a 1 on va avancer
                        depX = this.x + getRandomInt(this.mobilite+1);      //en fonction de sa mobilité on se deplace
                    }
                    if(moveY === 0){                                        //si le mouvement est a 0 on va reculer
                        depY = this.y - getRandomInt(this.mobilite+1);      //en fonction de sa mobilité on se deplace
                    }
                    else{                                                   //si le mouvement est a 1 on va avancer
                        depY = this.y + getRandomInt(this.mobilite+1);      //en fonction de sa mobilité on se deplace
                    }

                    while(this.totalMouvements(depX,depY) === null){    //tant que le total des mouvements possible de la creature est null
                        moveX = getRandomInt(2);    //on avance ou on recule sur x
                        moveY = getRandomInt(2);    //on avance ou on recule sur y

                        if(moveX === 0){                                        //si le mouvement est a 0 on va reculer
                            depX = this.x - getRandomInt(this.mobilite+1);      //en fonction de sa mobilité on se deplace
                        }
                        else{                                                   //si le mouvement est a 1 on va avancer
                            depX = this.x + getRandomInt(this.mobilite+1);      //en fonction de sa mobilité on se deplace
                        }
                        if(moveY === 0){                                        //si le mouvement est a 0 on va reculer
                            depY = this.y - getRandomInt(this.mobilite+1);      //en fonction de sa mobilité on se deplace
                        }
                        else{                                                   //si le mouvement est a 1 on va avancer
                            depY = this.y + getRandomInt(this.mobilite+1);      //en fonction de sa mobilité on se deplace
                        }

                    }

                    let mouvements = this.totalMouvements(depX, depY);                      //on recupere les mouvements a partir du deplacement
                    let i = 0;                                                              //on a un compteur

                    while(this.energie >= 2 && i < mouvements.length){                      //tant que la créature est non amorphe et que le nombre de mouvements restant est plus grand que i
                        this.energie -= 2;                                                  //on enelve de l'energie pour se deplacer
                        i += 1;                                                             //on incremente i
                    }

                    this.setPosition(depX,depY);                                    //on se deplace
                    let id_creature = $('#'+this.id.toString());                    //on recupere les infos de la créature
                    id_creature.attr('cx',this.x*10 +5).attr('cy',this.y*10+5);     //on ajoute l'attribut d'affichage
                }
            }


            //Si satiete, cherche de la nourriture
            else if (this.satiete < 75){

                let chercheG = this.cherche2("green","lawngreen");      //on cherche de l'herbe

                if(chercheG !== null){                                  //si on trouve une case verte

                    let parent = chercheG.Parent;

                    if(parent === null){                    //si c'est la bonne case
                        genereCouleurClick(this.x,this.y);  //la case diminue
                        this.satiete += 25;                 //on mange et on aumgente le taux
                    }
                    else{           //sinon

                        let mouvements = this.totalMouvements(chercheG.CoordX, chercheG.CoordY);

                        if (mouvements === null){   //si il n'y a plus de mouvements

                            //De la meme manière
                            let xmax = parseInt(document.getElementById("carte").firstChild.attributes.width.value)/10 -1;
                            let ymax = parseInt(document.getElementById("carte").firstChild.attributes.height.value)/10 -1;
                            let moveX = getRandomInt(2);
                            let moveY = getRandomInt(2);
                            let depX = 0;
                            let depY = 0;

                            if(moveX === 0){
                                depX = this.x - getRandomInt(this.mobilite+1);
                            }
                            else{
                                depX = this.x + getRandomInt(this.mobilite+1);
                            }
                            if(moveY === 0){
                                depY = this.y - getRandomInt(this.mobilite+1);
                            }
                            else{
                                depY = this.y + getRandomInt(this.mobilite+1);
                            }

                            while(this.totalMouvements(depX,depY) === null){

                                moveX = getRandomInt(2);
                                moveY = getRandomInt(2);

                                if(moveX === 0){
                                    depX = this.x - getRandomInt(this.mobilite+1);
                                }
                                else{
                                    depX = this.x + getRandomInt(this.mobilite+1);
                                }
                                if(moveY === 0){
                                    depY = this.y - getRandomInt(this.mobilite+1);
                                }
                                else{
                                    depY = this.y + getRandomInt(this.mobilite+1);
                                }
                            }

                            let mouvements = this.totalMouvements(depX,depY);
                            let i = 0;

                            while(this.energie >= 2 && i < mouvements.length){
                                this.energie -= 2;
                                i++;
                            }

                            this.setPosition(depX,depY);
                            let id_creature = $('#'+this.id.toString());
                            id_creature.attr('cx',this.x*10 +5).attr('cy',this.y*10+5);
                        }

                        else{
                            let i = 0;

                            while(this.energie >= 2 && i < mouvements.length){
                                this.energie -= 2;
                                i++;
                            }

                            this.setPosition(mouvements[i-1].CoordX,mouvements[i-1].CoordY);    //modifie la position

                            //AFFICHAGE
                            let id_creature = $('#'+this.id.toString());
                            id_creature.attr('cx',this.x*10 +5).attr('cy',this.y*10+5);

                            //si la créature est au memeendroit du parent de la case qu'on cherche
                            if(chercheG.Parent.CoordX === this.x && chercheG.Parent.CoordY === this.y){
                                genereCouleurClick(this.x,this.y);  //on change la pousse de l'herbe
                                this.satiete += 25;                 //on  mange
                            }
                        }
                    }
                }

                else{

                    //de la meme manière
                    let xmax = parseInt(document.getElementById("carte").firstChild.attributes.width.value)/10 -1;
                    let ymax = parseInt(document.getElementById("carte").firstChild.attributes.height.value)/10 -1;
                    let moveX = getRandomInt(2);
                    let moveY = getRandomInt(2);
                    let depX = 0;
                    let depY = 0;

                    if(moveX === 0){
                        depX = this.x - getRandomInt(this.mobilite+1);
                    }
                    else{
                        depX = this.x + getRandomInt(this.mobilite+1);
                    }
                    if(moveY === 0){
                        depY = this.y - getRandomInt(this.mobilite+1);
                    }
                    else{
                        depY = this.y + getRandomInt(this.mobilite+1);
                    }


                    while(this.totalMouvements(depX,depY) === null){

                        moveX = getRandomInt(2);
                        moveY = getRandomInt(2);

                        if(moveX === 0){
                            depX = this.x - getRandomInt(this.mobilite+1);
                        }
                        else{
                            depX = this.x + getRandomInt(this.mobilite+1);
                        }
                        if(moveY === 0){
                            depY = this.y - getRandomInt(this.mobilite+1);
                        }
                        else{
                            depY = this.y + getRandomInt(this.mobilite+1);
                        }
                    }

                    let mouvements = this.totalMouvements(depX,depY);
                    let i = 0;

                    while(this.energie >= 2 && i < mouvements.length){
                        this.energie -= 2;
                        i++;
                    }

                    this.setPosition(depX,depY);

                    let id_creature = $('#'+this.id.toString());
                    id_creature.attr('cx',this.x*10 +5).attr('cy',this.y*10+5);
                }
            }

            //si toute les stats >= 75 donc si EN FORME, retourne à la base
            else if (this.hydratation >= 75 && this.satiete >= 75 && this.energie >= 75){

                let cheminMaison = this.totalMouvements(this.home[0],this.home[1]);         //on cherche la maison de la créature en récuperant toutes les cases navigables

                if(this.x === this.home[0] && this.y === this.home[1]){     //si la créature est à la maison on applique reproduction
                    this.reproduction();
                }
                else{       //sinon
                    let i = 0;      //on prend un compteur

                    while(this.energie >= 2 && i < cheminMaison.length){    //tant que lacréature n'est pas épuisé et que le compteur plus petit que la taille du chemin vers la maison
                        this.energie -= 2;  //tu perd de l'energie en te déplacant
                        i++;                //on augmente le compteur
                    }

                    this.setPosition(cheminMaison[i-1].CoordX,cheminMaison[i-1].CoordY);    //on change de position

                    //AFFICHAGE
                    let id_creature = $('#'+this.id.toString());
                    id_creature.attr('cx',this.x*10 +5).attr('cy',this.y*10+5);

                    //si la créature est à la maison
                    if(this.home[0] === this.x && this.home[1] === this.y){
                        this.reproduction();    //applique reproduction
                    }
                }
            }
            //Sinon il se REPOSE
            else{this.energie += 25;}

            this.satiete -= 3;          //Fin de journée, il/elle perd de la satiete
            this.hydratation -= 5;      //Fin de journée, il/elle perd de l'hydratation
        }
    }


    /**
     * Fonction qui représente le fait de faire mourir une créature
     */
    mort(){
        this.etat = 0;                                                  //on met l'etat de la créature à 0
        let id_creature = $('#'+this.id.toString());                    //on récupere l'id de la créature
        id_creature.attr('fill','transparent').attr('stroke','none');   //on fait disparaitre la créature sur la carte
    }

}
