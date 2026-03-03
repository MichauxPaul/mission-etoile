import { ref } from "vue";
import { defineStore } from "pinia";

export const useTimerStore = defineStore("timer", () => {
  const totalSeconds = 8 * 60;
  const remainingTime = ref(totalSeconds);
  let intervalId = null;
  const storageKey = "mission-etoile-timer";

  // sauvegarde du temps restant dans le localStorage
  function saveRemainingTime() {
    localStorage.setItem(storageKey, String(remainingTime.value));
  }

  // lecture du temps restant depuis le localStorage et retourne le temps restant en nombre
  function loadRemainingTime() {
    const raw = localStorage.getItem(storageKey);
    if (raw === null) return null;
    return Number(raw);
  }

  //dÃ©marrer le compte a rebour
  function start() {
    //si un interval existe on en crÃ©er pas un autre
    if (intervalId) {
      return;
    } else {
      //crÃ©er une boucle qui s'exÃ©cute toutes les seconde
      intervalId = setInterval(() => {
        //si remainingTime.value > 0 donc qu'il reste du temps, on retire 1 Ã  remainingTime (qui contient totalSeconds, donc on retire 1 au rÃ©sultat initial de la multiplication de totalSeconds) et on sauvegarde la nouvelle valeur de remainingTime
        if (remainingTime.value > 0) {
          remainingTime.value -= 1;
          saveRemainingTime();
        } else {
          //si remainingTime est infÃ©rieure ou Ã©gal a 0, cela arrÃªte le compte a reboug
          stop();
        }
      }, 1000);
    }
  }

  //fonction pour arrÃªter le compte a rebourg
  function stop() {
    //arrÃªte la boucle crÃ©er par setInterval
    clearInterval(intervalId);
    //signifier qu'il n'y a plus aucun interval actif
    intervalId = null;
  }

  //fonction pour remettre le compte a rebourg a sa valeur initial
  function reset() {
    //on appele la fonction "stop" pour arrÃªter le compte a rebourg
    stop();
    //on remet remainingTime a sa valeur par dÃ©faut
    remainingTime.value = totalSeconds;
    //on sauvegarde dans le localstorage
    saveRemainingTime();
  }

  //lecture du temps restantdepuis le localstorage
  const saved = loadRemainingTime();
  //vÃ©rification qu'il existe bien une valeur et que c'est un nombre
  if (saved !== null && !Number.isNaN(saved)) {
    //met la valeur du localstorage dans remainingTime
    remainingTime.value = saved;
  }

  return { totalSeconds, remainingTime, start, stop, reset };
});

