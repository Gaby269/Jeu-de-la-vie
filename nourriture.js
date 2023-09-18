//////////////////////////////////////////////////////////////////////
// CLASSE NOURRITURE : caracteristiques des différentes nourritures //
//////////////////////////////////////////////////////////////////////

class Nourrriture{
    nom;
    calorie;
    nourissant;
    hydratant;
    x;
    y;

    /**
     * Constructeur pour donnée à la nourriture existante
     * @param nom nom de la nouriture
     * @param x coordonnée de la nourriture qui existe
     * @param y coordonnée de la nourriture qui existe
     */
    constructor(nom, x, y){
        this.nom = nom;
        this.x = x;
        this.y = y;
    }


    //prendre en compte apports hydratants

    /**
     * Récupération de l'apport hydratant de la nourriture
     */
    get getHydratant(){
        return this.hydratant;
    }

    /**
     * Récupération de l'apport nourrisant de la nourriture
     */
    get getNourissant(){
        return this.nourrissant;
    }

    /**
     * Récupération de l'apport calorique de la nourriture
     */
    get getCalorie(){
        return this.calorie;
    }

    //eau -> seulement de l'eau
    //herbe -> seulement nourriture

}