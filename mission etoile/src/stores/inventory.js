import { ref } from "vue";
import { defineStore } from "pinia";

export const useInventoryStore = defineStore("inventory", () => {
  const storageKey = "mission-etoile-inventory";

  //on créer le tableau des indices
  const Hints = ref([]);

  //on sauvegarde le tableau des indices dans le localstorage du navigateur
  function saveHints() {
    localStorage.setItem(storageKey, JSON.stringify(Hints.value));
  }

  //lecture des indices sauvegardé
  function loadHints() {
    const LSInventory = localStorage.getItem(storageKey);

    //si le tableau retourné est vide, on retourne un tableau vide
    if (LSInventory === null) {
      return [];
    }

    try {
      const parsedData = JSON.parse(LSInventory);
      return parsedData;
    } catch (error) {
      return [];
    }
  }

  //fonction qui vérifie si on a déjà un indice spécifique dans notre inventaire (hintValue), returne soit true si on a déjà l'indice et retourne false si on a pas déjà l'indice
  function hasHint(hintValue) {
    return Hints.value.includes(hintValue);
  }

  //fonction pour ajouter un indice, vérifie d'abord si on a pas déjà l'indice dans notre inventaire, si on a pas l'indice cela l'ajoute au tableau Hints et ça sauvegarde le tableau modifié dans le localstorage et retourne true pour indiquer que l'insertion dans le tableau a réussi.
  function addHint(hintValue) {

    if (hasHint(hintValue)) {
      return false;
    }

    Hints.value.push(hintValue);
    saveHints();

    return true;
  }

  //fonction pour vider l'inventaire, on met le tableau "Hints" a un tableau vide
  function clearInventory() {
    Hints.value = [];
    saveHints();
  }

  //on met le tableau "Hints" aux valeurs stocker dans le localstorage
  Hints.value = loadHints();

  return {
    Hints,
    hasHint,
    addHint,
    clearInventory,
  };
});
