
//Liste des paramètres prédifinis dans les sliders pr les différents joueurs
let divi1 = [-1, -1, -1, -1];
let divi2 = [-1, -1, -1, -1];
let divi3 = [-1, -1, -1, -1];
let divi4 = [-1, -1, -1, -1];

//liste des maisons
let home = [];

//liste des créatures par joueurs
let Joueur1 = [];
let Joueur2 = [];
let Joueur3 = [];
let Joueur4 = [];

//liste des predateurs
let predateurs = [];



/**
 * vérification des valeurs entrées par les joueurs
 * @param nbjoueurs nombre de joueurs
 */
function verif(nbjoueurs) {

    ////////////////
    // PARAMETRES //
    ////////////////

    //let nbjoueurs = document.querySelector('input[name="nbjoueurs"]:checked').value;
    let limit = parseInt(document.getElementById("limit").value);       //récuperation de la valeur limite que le joueur principale à remplis
    Divdiv = [divi1, divi2, divi3, divi4];                              //on crée un tableau avec les différents curseurs que les joueurs remplissent


    ///////////////////////////////
    // VERIFICATION DES CURSEURS //
    ///////////////////////////////

    // V1 : La somme des curseurs ne doit pas être plus grand que la limite
    if ((divi1[0] + divi1[1] + divi1[2] + divi1[3] > limit) || (divi2[0] + divi2[1] + divi2[2] + divi2[3] > limit) || (divi3[0] + divi3[1] + divi3[2] + divi3[3] > limit) || (divi4[0] + divi4[1] + divi4[2] + divi4[3] > limit)) {
        alert("au moins un joueur dépasse la limite");      //si jamais c'est le cas on donne une alerte
        return 0;                                           //et on termine
    }

    // V2 : Tous les curseurs doivent être remplit
    for (let i = 0; i < nbjoueurs; i++) {       //parcourt le nombre de joueur
        for (let j = 0; j < 4; j++) {           //parcourt des curseurs
            if (Divdiv[i][j] === -1) {          //si jmais un des curseurs n'a pas été remplit 
                alert("au moins un paramètre n'as pas été renseigné");      //on donne une alerte
                return 0;                                                   //et on termine
            }
        }
    }

    // V3 : Chaquejoueursdoivent avoir une configuration différente
    if (nbjoueurs > 1) {                                //si le nombre de joueur est plus de 1
        for (let i = 0; i < nbjoueurs; i++) {           //parcours des joueurs
            for (let j = 0; j < nbjoueurs; j++) {       //deuxième parcours des joueurs
                if (Divdiv[i][0] === Divdiv[j][0] && Divdiv[i][1] === Divdiv[j][1] && Divdiv[i][2] === Divdiv[j][2]&& Divdiv[i][3] === Divdiv[j][3] && i !== j) {   //si les configuration sonts les mêmes
                    alert("deux joueurs possèdent les mêmes paramètres, veuillez les modifier");    //on donne une alerte
                    return 0;                                                                       //et on termine
                }
            }
        }
    }


    ////////////////////////////
    // GENERATION DE LA CARTE //
    ////////////////////////////

    genereCarte(10, 30, 30);        //génère la carte de 30 cases
    let xmax = parseInt(document.getElementById("carte").firstChild.attributes.width.value)/10 -1;      //case max sur x
    let ymax = parseInt(document.getElementById("carte").firstChild.attributes.height.value)/10 -1;     //case max sur y


    ///////////////////////////*////////////
    // RECUPERATION DES INFOS DE LA CARTE //
    ////////////////////////////////////////
    for (let i = 0; i < nbjoueurs; i++) {               //parcours du nombre de joueurs
        for(let i = 0; i < xmax; i++){                  //parcours de la carte sur x
            for(let j = 0; j < ymax; j++){              //parcours de la carte sur y
                if(getTypeCarre(i,j)==="white"){        //si on a un type blanc
                    home.push([i,j]);                   //alors on ajoute aux différentes maisons la case correspondante
                }
            }
        }

        switch (true) {
            case i === 0:   //le premier joueur
                let creature = new Creature(divi1[0], divi1[1], divi1[2],divi1[3],0,home[i][0],home[i][1],1);   //on crée une créature de genre femelle
                let creature2 = new Creature(divi1[0], divi1[1], divi1[2],divi1[3],1,home[i][0],home[i][1],1);  //on crée une créature de genre male
                Joueur1.push(creature);     //on ajoute donc dans les créatures du joueurs 1 la créature 1 
                Joueur1.push(creature2);    //on ajoute donc dans les créatures du joueurs 1 la créature 2
                break;
            case i === 1:   //le deuxième joueur
                let creature3 = new Creature(divi2[0], divi2[1], divi2[2],divi2[3],0,home[i][0],home[i][1],2);  //on crée une créature de genre femelle
                let creature4 = new Creature(divi2[0], divi2[1], divi2[2],divi2[3],1,home[i][0],home[i][1],2);  //on crée une créature de genre male
                Joueur2.push(creature3);    //on ajoute donc dans les créatures du joueurs 2 la créature 1
                Joueur2.push(creature4);    //on ajoute donc dans les créatures du joueurs 2 la créature 2
                break;
            case i === 2:   //le troisième joueur
                let creature5 = new Creature(divi3[0], divi3[1], divi3[2],divi3[3],0,home[i][0],home[i][1],3);  //on crée une créature de genre femelle
                let creature6 = new Creature(divi3[0], divi3[1], divi3[2],1,divi3[3],home[i][0],home[i][1],3);  //on crée une créature de genre male
                Joueur3.push(creature5);    //on ajoute donc dans les créatures du joueurs 3 la créature 1
                Joueur3.push(creature6);    //on ajoute donc dans les créatures du joueurs 3 la créature 2
                break;
            case i === 3:   //le quatrième joueur
                let creature7 = new Creature(divi4[0], divi4[1], divi4[2],divi4[3],0,home[i][0],home[i][1],4);  //on crée une créature de genre femelle
                let creature8 = new Creature(divi4[0], divi4[1], divi4[2],1,divi4[3],home[i][0],home[i][1],4);  //on crée une créature de genre male
                Joueur4.push(creature7);    //on ajoute donc dans les créatures du joueurs 4 la créature 1
                Joueur4.push(creature8);    //on ajoute donc dans les créatures du joueurs 4 la créature 2
                break;
        }
    }

    ///////////////////////////////
    // GENERATION DES PREDATEURS //
    ///////////////////////////////
    //On genère 2 prédateurs qui vont être chacun aux extrémités de la carte
    let preda1 = new Predateur('preda1',0,0);           //un en haut à gauche
    let preda2 = new Predateur('preda2',xmax,ymax);     //un en bas à droite
    predateurs.push(preda1);    //on ajoute dans le tableau prédateur le prédateur 1
    predateurs.push(preda2);    //on ajoute dans le tableau prédateur le prédateur 2


    ////////////////////////////
    // AFFICHAGE DES JOUEURS //
    //////////////////////////
    JJ = [Joueur1,Joueur2,Joueur3,Joueur4];         //création du tableau des joueurs
    for(let i = 0; i < nbjoueurs; i++){             //parcours des joueurs
        for(let j = 0; j < 2; j++){                 //parcours des deux créatures de base
            console.log(JJ[i][j].toString());       //affichage dans la console des informations des créatures des joueurs
        }
    }
    cache(nbjoueurs);                               //suppression des sliders et affichage de la limite des paramètres choisis par les joueurs
}




/**
 * suppression des sliders et affichage de la limite des paramètres choisis par les joueurs
 * @param nbj nombre de joueurs
 */
function cache(nbj){

    ////////////////
    // PARAMETRES //
    ////////////////
    let sliders = document.getElementById("sliders");       // récuperation des sliders
    let limit = document.getElementById("limit");           // récupération de la limite
    let texte = document.getElementById("texte");
    let texte2 = document.getElementById("texte2");
    let nbtour = document.getElementById("nbTours");

    sliders.style.display = "none";
    limit.style.display = "none";
    texte.style.display = "none";
    texte2.style.display = "none";
    nbtour.style.display = "none";

    let div = document.getElementById("affichage");         // recuperation de l'affichage
    let pp = document.createElement("p");                   // creation de l'élément p dans pp pour les infos générales
    let pnb = document.createElement("p");

    pp.innerText = "Limite: " + parseInt(limit.value);                                                   // préparation de l'affichage de la limite
    pnb.innerText = "Nombre de tours: " + parseInt(nbtour.value);                                      // préparation de l'affichage du nombre de tours
    pnb.setAttribute("id","nb");                                                     // ajout d'un identifiant pour l'affichage
    div.appendChild(pp);                                                                                // ajout de l'élément pp dans div
    div.appendChild(pnb);
    nbjoueurs = parseInt(nbj);                                                                          // renvoie le nombre de joueur


    ///////////////////////////////////
    // AFFICHAGE DES INFOS RECUPEREE //
    ///////////////////////////////////

    for (let i = 0; i < nbjoueurs; i++) {                       //parcour du nombre dejoueur

        switch (true) {
            case i === 0:                                       //pour premier joueur
                let p = document.createElement("p");            //creation d'un élément p pour chaque joueur
                p.setAttribute("id",1);                         //modif d'un attribut id du joueur dans p
                p.innerText = "Joueur 1: [" + divi1 +"]";       //text qui permet d'afficher les infos des joueurs avec leurs curseurs
                div.appendChild(p);                             //ajout de l'élément p
                break;
            case i === 1:                                       //pour deuxième joueur
                let p1 = document.createElement("p");
                p1.setAttribute("id",2);
                p1.innerText = "Joueur 2: [" + divi2 +"]";
                div.appendChild(p1);
                break;
            case i === 2:                                       //pour troisième joueur
                let p2 = document.createElement("p");
                p2.setAttribute("id",3);
                p2.innerText = "Joueur 3: [" + divi3 +"]";
                div.appendChild(p2);
                break;
            case i === 3:                                       //pour quatrième joueur
                let p3 = document.createElement("p");
                p3.setAttribute("id",4);
                p3.innerText = "Joueur 4: [" + divi4 +"]";
                div.appendChild(p3);
                break;
        }
    }
}


/**
 * vérification des paramètres et chargement de la carte
 * @param nbjoueurs nombre de joueurs
 */
function charge(nbjoueurs){
    verif(nbjoueurs);           //verification des paramètres des joueurs
    start(10,30,30);            //démarage de la carte
}




/**
 * création des sliders permettant aux joueurs de créer leurs créatures
 * @param nbj nombre de joueurs
 */
function makeSliders(nbj) {

    ////////////////
    // PARAMETRES //
    ////////////////

    //let nbjoueurs = document.querySelector('input[name="nbjoueurs"]:checked').value;
    let div = document.getElementById("sliders");   //div devient les éléments sliders
    nbjoueurs = parseInt(nbj);                      //le nombre de joueur que tu récupère


    for (let i = 0; i < nbjoueurs; i++) {                                   //parcours des joueurs

        let idDiv = i;                                                      //on récupère l'identifiant de la div des curseurs
        let div2 = document.createElement("div");                           //on réécupère la div dans div2
        div2.setAttribute("class", "slidecontainer");                       //on ajoute à div2 un attribut class qui definie les slide

        for (let j = 0; j < 4; j++) {                                       //parcours des 4 curseurs

            let id = "myRange" + i + j;                                     //on calcul l'id du curseur
            let slider = document.createElement("input");                   //on définit le slider du joueur avec l'élément input
            slider.setAttribute("type", "range");                           //dans slider on ajoute le type de slide
            slider.setAttribute("min", 1);                                  //le minimum
            slider.setAttribute("max", 5);                                  //le maximum
            slider.setAttribute("class", "slider");                         //et la class

            if (i === 0) {      //premier joueur                            
                slider.setAttribute("style", `background: #740dec; `);      //affichage sur la carte d'une certaine couleur
            }
            if (i === 1) {      //deuxième joueur  
                slider.setAttribute("style", `background: #ff00f0; `);
            }
            if (i === 2) {      //troisième joueur  
                slider.setAttribute("style", `background: #fffd00; `);
            }
            if (i === 3) {      //quatrième joueur  
                slider.setAttribute("style", `background: #00ffff; `);
            }

            let span = document.createElement("span");      //on ajoute un élément de porté
            let p = document.createElement("p");            // et un élément p

            switch (true) {
                case j === 0:       //pour premier joueur
                    p.innerHTML = "Reproductivité: ";   //on ajoute dans HTML un texte de reproductivité
                    p.innerText = "Reproductivité: ";   //on ajoute dans text un text de reproductivité
                    //console.log("repro");
                    break;
                case j === 1:       //pour deuxième joueur
                    p.innerHTML = "Perception: ";       //on ajoute dans HTML un texte de perception
                    p.innerText = "Perception: ";       //on ajoute dans text un text de perception
                    //console.log("perc");
                    break;
                case j === 2:       //pour troisème joueur
                    p.innerHTML = "Mobilité: ";     //on ajoute dans HTML un texte de mobilité
                    p.innerText = "Mobilité: ";     //on ajoute dans text un text de mobilité
                    //console.log("mobil");
                    break;
                case j === 3:       //pour quatrième joueur
                    p.innerHTML = "Force: ";        //on ajoute dans HTML un texte de force
                    p.innerText = "Force: ";        //on ajoute dans text un text de force
                    break;
            }


            ////////////////////:////////////////////
            // RECUPERATION DES VALEURS DES SLIDES //
            /////////////////////////////////////////
            slider.oninput = function () {

                span.innerHTML = this.value;
                span.innerText = this.value;

                if (idDiv === 0) {  //pour le joueur 1
                    switch (true) {
                        case j === 0:   //pour la reproductivité
                            divi1[j] = parseInt(this.value);    //on récupère la valeur
                            break;
                        case j === 1:   //pour la perception
                            divi1[j] = parseInt(this.value);
                            break;
                        case j === 2:   //pour la mobilité
                            divi1[j] = parseInt(this.value);
                            break;
                        case j === 3:   //pour laforce
                            divi1[j] = parseInt(this.value);
                            break;
                    }
                } else if (idDiv === 1) {   //pour le joueur 2
                    switch (true) {
                        case j === 0:   //pour la reproductivité
                            divi2[j] = parseInt(this.value);
                            break;
                        case j === 1:   //pour la perception
                            divi2[j] = parseInt(this.value);
                            break;
                        case j === 2:   //pour la mobilité
                            divi2[j] = parseInt(this.value);
                            break;
                        case j === 3:   //pour laforce
                            divi2[j] = parseInt(this.value);
                            break;
                    }
                } else if (idDiv === 2) {   //pour le joueur 3
                    switch (true) {
                        case j === 0:   //pour la reproductivité
                            divi3[j] = parseInt(this.value);
                            break;
                        case j === 1:   //pour la perception
                            divi3[j] = parseInt(this.value);
                            break;
                        case j === 2:   //pour la mobilité
                            divi3[j] = parseInt(this.value);
                            break;
                        case j === 3:   //pour laforce
                            divi3[j] = parseInt(this.value);
                            break;
                    }
                } else {
                    switch (true) { //pour le joueur 4
                        case j === 0:  //pour la reproductivité
                            divi4[j] = parseInt(this.value);
                            break;
                        case j === 1:   //pour la perception
                            divi4[j] = parseInt(this.value);
                            break;
                        case j === 2:   //pour la mobilité
                            divi4[j] = parseInt(this.value);
                            break;
                        case j === 3:   //pour laforce
                            divi4[j] = parseInt(this.value);
                            break;
                    }
                }
            };
            div2.appendChild(slider);   //on ajoute a div2 les sliders
            p.appendChild(span);        //et à p span
            div2.appendChild(p);        //on ajoute aussi a div2, p
        }
        div2.setAttribute("style", "border:1px solid black;");
        div.appendChild(div2);  //on ajoute a div div2
    }

    let button = document.createElement("button");      //creation du bouton de validation
    button.setAttribute("type", "button");              //son type
    button.innerHTML = "Valider choix";                 //ce qu'on écrit dedans
    button.setAttribute("onclick","charge(nbjoueurs)")  //on ajoute sa fonction
    div.appendChild(button);                            //et on l'ajoute a div
}
