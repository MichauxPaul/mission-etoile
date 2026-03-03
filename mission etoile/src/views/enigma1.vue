<script setup>
import { computed, ref } from "vue";
import { useInventoryStore } from "../stores/inventory";
import { useRouter } from "vue-router";
import BkgVideo from "@/video/Enigme_1.mp4"
import BkgVideoOpen from "@/video/Enigme_1_Ouvert.mp4"

const inventory = useInventoryStore();
const router = useRouter();
const storageKeySceneOpen = "mission-etoile-enigme1-open";
const clickSoundUrl = new URL("../audio/bouton-click.mp3", import.meta.url).href;
const ThoughtsSound = new URL("../audio/cliquesurboite.wav", import.meta.url).href;
const requiredHints = ["0", "7", "9"];
const Thoughts = ref("");
let ThoughtsTimeout = null;
let ThoughtsTypingTimeout = null;
let isTyping = false;

//on sauvegarde la scène
function saveSceneOpen(value) {
  localStorage.setItem(storageKeySceneOpen, JSON.stringify(value));
}

//on charge la scène depuis le localstorage
function loadSceneOpen() {
  const raw = localStorage.getItem(storageKeySceneOpen);
  if (raw === null) {
    return false;
  }

  try {
    return JSON.parse(raw) === true;
  } catch (error) {
    return false;
  }
}

const gotLamp = ref(inventory.hasHint("lampe_torche"))
const validCode = ref(loadSceneOpen() || gotLamp.value)
const bkgVideoSrc = ref(BkgVideo);
const allHintsFind = computed(() => requiredHints.every((hint) => inventory.hasHint(hint)));

//changer de vidéo de fond en fonction de si le code que l'on a entré dans le formulaire est bon ou pas
if (validCode.value === true) {
  bkgVideoSrc.value = BkgVideoOpen;
} else {
  bkgVideoSrc.value = BkgVideo;
}


const codeEntered = ref(null);

function checkingCode() {
  if (validCode.value) {
    return;
  }

  if (Number(codeEntered.value) === 907 || Number(codeEntered.value) === 709) {
    bkgVideoSrc.value = BkgVideoOpen
    validCode.value = true
    saveSceneOpen(true)

  } else {
    badCodeMessage();
    codeEntered.value = null;
  }
}

function recoverLamp() {
  inventory.addHint("lampe_torche");
  gotLamp.value = true;
}

function playHoverSound() {
  const hoverSound = new Audio(clickSoundUrl);
  hoverSound.play();
}

function sallePrincipal() {
  router.push("/SallePrincipal");
};

function Thought() {

  const fullText = "Il y a un code sur cette boite. Je devrais peut-être trouver quelque chose qui me permettrait de deviner les chiffres.";


  if (isTyping) {
    clearTimeout(ThoughtsTypingTimeout);
    Thoughts.value = fullText;
    isTyping = false;
    return;
  }

  clearTimeout(ThoughtsTimeout);
  clearTimeout(ThoughtsTypingTimeout);

  Thoughts.value = "";
  let index = 0;
  isTyping = true;

  const ThoughtsSoundMessage = new Audio(ThoughtsSound);
  ThoughtsSoundMessage.play();

  function typeLetter() {
    if (index < fullText.length) {
      Thoughts.value += fullText.charAt(index);
      index++;
      ThoughtsTypingTimeout = setTimeout(typeLetter, 35);
    } else {
      isTyping = false;

      ThoughtsTimeout = setTimeout(() => {
        Thoughts.value = "";
        ThoughtsTimeout = null;
      }, 6000);
    }
  }

  typeLetter();
}

function badCodeMessage() {

  const fullText = "Mauvais code";

  if (isTyping) {
    clearTimeout(ThoughtsTypingTimeout);
    Thoughts.value = fullText;
    isTyping = false;
    return;
  }

  clearTimeout(ThoughtsTimeout);
  clearTimeout(ThoughtsTypingTimeout);

  Thoughts.value = "";
  let index = 0;
  isTyping = true;

  function typeLetter() {
    if (index < fullText.length) {
      Thoughts.value += fullText.charAt(index);
      index++;
      ThoughtsTypingTimeout = setTimeout(typeLetter, 40);
    } else {
      isTyping = false;


      ThoughtsTimeout = setTimeout(() => {
        Thoughts.value = "";
        ThoughtsTimeout = null;
      }, 3000);
    }
  }

  typeLetter();
}
</script>

<template>
  <div class="relative min-h-screen p-6 text-white">
    <video :key="bkgVideoSrc" class="fixed inset-0 h-full w-full object-cover z-0 pointer-events-none" autoplay loop
      playsinline>
      <source :src="bkgVideoSrc" type="video/mp4" />
    </video>

    <!--affichage de la div tant que l'on a pas saisi le bon code -->
    <div v-if="!validCode" class="absolute top-110 left-50">
      <!--affichage du bouton tant que l'on a pas rÃ©cupÃ©rÃ© tout les indices et appelle la fonction Thought -->
      <button v-if="!allHintsFind" type="button" @click="Thought" class="px-50 py-30 cursor-pointer">
      </button>

      <!--formulaire pour saisir le code du cadena et qui est affichÃ© quand on a tous les indices dans notre inventaire-->
      <form v-else @submit.prevent="checkingCode">
        <div class="pb-3">
          <label for="codeCadena"></label>
        </div>
        <div class="pb-20 ">
          <!--input sous forme de texte pour ne pas donner d'indice indirect au joueur que l'on attend que des chiffres -->
          <input id="codeCadena" v-model="codeEntered" type="number" name="Cadena"
            class="focus:outline-none  px-1 py-5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-5xl tracking-[2em] w-120" />
        </div>
        <div>
          <button type="submit" class=" p-3 cursor-pointer text-2xl ">OUVRIR</button>
        </div>
      </form>
    </div>

    <!--div qui s'affiche que quand on a validé le bon code et que l'on a pas récupéré la lampe -->
    <div v-if="validCode && !gotLamp" class="absolute top-1 left-90">
      <!--quand on clique sur le bouton cela ajoute la lampe torche a notre inventaire-->
      <button @mouseenter="playHoverSound" @click="recoverLamp" class="py-35 px-33 cursor-pointer text-black font-bold">
      </button>
    </div>

    <button @click="sallePrincipal"
      class="fixed bottom-6 right-6 bg-violet-600/80 hover:bg-violet-900 text-white px-6 py-3 rounded cursor-pointer">
      Dézoomer
    </button>

    <!--affiche le texte des pensées ou le texte du code du cadena-->
    <div v-if="Thoughts"
      class="fixed bottom-5 left-1/2 -translate-x-1/2 bg-violet-600/60 backdrop-blur px-5 py-3 rounded-lg text-white text-center">
      {{ Thoughts }}
    </div>
  </div>
</template>
