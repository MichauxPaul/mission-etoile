<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTimerStore } from "./stores/timer";
import monstreImg from "./image/monstre.png";
import Inventory from "./components/Inventory.vue";
import Timer from "./components/Timer.vue";

const router = useRouter();
const route = useRoute();
const timer = useTimerStore();
const showMonster = ref(false);
const cockpitAudioRef = ref(null);
const monsterSoundUrl = new URL("./audio/monstre.mp3", import.meta.url).href;
const monsterSound = new Audio(monsterSoundUrl);
let monsterTimeoutId = null;
let monsterLoopTimeoutId = null;
const cockpitRoutes = new Set([
  "/SallePrincipal",
  "/enigme1",
  "/fenetre",
  "/Bureau",
  "/livrepage1-2",
  "/livrepage3-4",
  "/livrepage5",
  "/livrepage6-7",
  "/boite"
]);

const blockedMonsterPaths = new Set([
  "/",
  "/Synopsis",
  "/CommentJouer",
  "/intro",
  "/Team",
  "/epilogue",
  "/dead",
  "/end"
]);

//création des vue ou l'inventaire est caché
const blockedInventoryPaths = new Set(blockedMonsterPaths);
//création des vue ou le timer est caché
const blockedTimerPaths = new Set(blockedMonsterPaths);
//affichage du monstre seulement si showMonster est true et que la vue dans laquelle on se trouve n'est pas bloqué
const canShowMonster = computed(() => showMonster.value && !blockedMonsterPaths.has(route.path));
//affichage de l'inventaire si la vue dans laquelle on se trouve n'est pas bloqué
const canShowInventory = computed(() => !blockedInventoryPaths.has(route.path));
//affichage du timer si la vue dans laquelle on se trouve n'est pas bloqué
const canShowTimer = computed(() => !blockedTimerPaths.has(route.path));

//faire démarrer/arrêter le timer quand on recharge la page en fonction de la route
function startStopTimerRoute() {
  if (blockedTimerPaths.has(route.path)) {
    timer.stop();
    return;
  }
  if (timer.remainingTime > 0) {
    timer.start();
  }
}

function flashMonster() {
  //vérification que la route est interdite pour ne pas l'afficher sur des page interdite
  if (blockedMonsterPaths.has(route.path)) {
    showMonster.value = false;
    return;
  }
  //si la route n'est pas interdite, on affiche l'image du monstre et on joue son audio
  showMonster.value = true;
  monsterSound.currentTime = 0;
  monsterSound.play();
  //si il existe déjà un timer on l'annule
  if (monsterTimeoutId) {
    clearTimeout(monsterTimeoutId);
  }
  //on affiche l'image du monstre pendant 500ms avant de le cacher
  monsterTimeoutId = setTimeout(() => {
    showMonster.value = false;
    monsterTimeoutId = null;
  }, 500);
}

//calcule de la prochaine apparition du monstre
function nextMonsterDelayMs() {
  //normalisation du temps restant pour faciliter le calcul final
  const ratio = timer.remainingTime / timer.totalSeconds;
  const maxDelay = 60000;
  const minDelay = 40000;
  const totalGap = maxDelay - minDelay;
  //calcul du délais final en ms
  return Math.round(minDelay + totalGap * ratio);
}

function nextMonster() {
  //on evite de laisser plusieurs boucles tourner en meme temps
  if (monsterLoopTimeoutId) {
    clearTimeout(monsterLoopTimeoutId);
    monsterLoopTimeoutId = null;
  }
  //calcule de la prochaine apparition
  const delay = nextMonsterDelayMs();
  //attend le délais nouvellement calculé puis apparition du monstre et recalcule de sa prochaine apparition
  monsterLoopTimeoutId = setTimeout(() => {
    flashMonster();
    nextMonster();
  }, delay);
}

//utilisation d'un seul audio pour l'audio du cockpit
function cockpitAudio() {
  if (!cockpitAudioRef.value) {
    return;
  }

  //si la route est dans le tableau cockpitRoutes alors on joue l'audio
  if (cockpitRoutes.has(route.path)) {
    cockpitAudioRef.value.play();
  } else {
    //sinon on met l'audio en pause
    cockpitAudioRef.value.pause();
  }
}

//surveille le temps restant
watch(
  //source de la valeur observer
  () => timer.remainingTime,
  //appelle exécuté a chaque changement, donc a chaque seconde
  (secondsLeft) => {
    //si le temps restant est inférieur ou égal a 0 et que l'on est pas dÃ©jÃ  dans la vue dead cela va emener le joueur dans la vue dead
    if (secondsLeft <= 0 && route.path !== "/dead") {
      router.push("/dead");
    }
  },
);

//surveille chaque changement de page
watch(
  () => route.path,
  //appelle effectuer a chaque changement de page
  () => {
    //si la nouvelle route est bloquer pour le monstre on désactive le fait qu'il puisse apparaitre
    if (blockedMonsterPaths.has(route.path)) {
      showMonster.value = false;
    }
    //active le timer seulement sur les routes de jeu
    startStopTimerRoute();
    //ajoute l'audio du cockpit selon la nouvelle route
    cockpitAudio();
  },
  { immediate: true }
);
onMounted(() => {
  flashMonster();
  nextMonster();
  startStopTimerRoute();
  cockpitAudio();
});

//quand on ferme le jeu, on arrête tous les timers et touts les sons
onUnmounted(() => {
  //on annule le timeout qui cache le monstre
  if (monsterTimeoutId) {
    clearTimeout(monsterTimeoutId);
    monsterTimeoutId = null;
  }
  //on annule le timeout de la boucle qui donne les prochaines apparitions
  if (monsterLoopTimeoutId) {
    clearTimeout(monsterLoopTimeoutId);
    monsterLoopTimeoutId = null;
  }
  //met en pause l'audio du cockpit
  if (cockpitAudioRef.value) {
    cockpitAudioRef.value.pause();
  }
  //arrêt de l'audio du monstre
  monsterSound.pause();
});
</script>

<template>
  <!--préparation de l'audio-->
  <audio ref="cockpitAudioRef" loop playsinline>
    <source src="./audio/Cockpit_mixage_final_V2.wav" type="audio/wav">
  </audio>
  <!--affichage des vue selon le router-->
  <router-view />
  <!--affichage de l'inventaire seulement sur les routes concerné-->
  <Inventory v-if="canShowInventory" />
  <!--affichage du timer seulement sur les routes concerné-->
  <Timer v-if="canShowTimer" />
  <!--affichage du monstre seulement sur les routes autorisé-->
  <img v-if="canShowMonster" :src="monstreImg" alt="Monstre"
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-9999 pointer-events-none" />
</template>
