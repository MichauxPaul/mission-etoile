<script setup>
import { ref } from "vue";
import { useTimerStore } from "../stores/timer";
import { useInventoryStore } from "../stores/inventory";
import { useRouter } from "vue-router";


const timer = useTimerStore();
const inventory = useInventoryStore();
const router = useRouter();
const ButtonDoorMessage = ref("");
const clickSoundUrl = new URL("../audio/bouton-click.mp3", import.meta.url).href;
const ThoughtSound = new URL("../audio/porteFermer.wav", import.meta.url).href;
let ButtonDoorMessageTimeout = null;
let ButtonDoorTypingTimeout = null;
let isTyping = false;


function enigme1() {
  router.push("/enigme1")
}

function enigme2() {
  router.push("/enigme2")
}

function fenetre() {
  router.push("/fenetre")
}

function enigme4() {
  router.push("/enigme4");
}

function redButtom() {
  router.push("/boutonRouge")
}

function Bureau() {
  router.push("/Bureau");
}

function boite() {
  router.push("/boite");
}

//fonction qui regarde si on peut ouvrir la porte et accèder a la fin
function tryOpenEnd() {
  //si on possède la lampe torche on peut accèder a la scène de fin
  if (inventory.hasHint("lampe_torche")) {
    //on affiche rien dans le message de la porte
    ButtonDoorMessage.value = "";
    //on arrête le timer car le joueur a terminer la partie
    timer.stop();
    //on l'envoie dans la scène de fin
    router.push("/end");
    return;
  }

  //si le joueur ne possède pas la lampe torche, on fait jouer le son des pensées et on affiche le texte des penssées
  const thoughtSoundMessage = new Audio(ThoughtSound);
  thoughtSoundMessage.play();

  const fullText = "Je sais déjà que la porte est fermée, je dois absolument trouver comment sortir.";


  if (isTyping) {
    clearTimeout(ButtonDoorTypingTimeout);
    ButtonDoorMessage.value = fullText;
    isTyping = false;
    return;
  }


  clearTimeout(ButtonDoorMessageTimeout);
  clearTimeout(ButtonDoorTypingTimeout);

  ButtonDoorMessage.value = "";
  let index = 0;
  isTyping = true;

  function typeLetter() {
    if (index < fullText.length) {
      ButtonDoorMessage.value += fullText.charAt(index);
      index++;
      ButtonDoorTypingTimeout = setTimeout(typeLetter, 35);
    } else {
      isTyping = false;


      ButtonDoorMessageTimeout = setTimeout(() => {
        ButtonDoorMessage.value = "";
        ButtonDoorMessageTimeout = null;
      }, 2000);
    }
  }

  typeLetter();
}

function playHoverSound() {
  const hoverSound = new Audio(clickSoundUrl);
  hoverSound.play();
}


</script>

<template>
  <div class="relative min-h-screen p-6 text-white">

    <video class="fixed inset-0 h-full w-full object-cover z-0 pointer-events-none" autoplay loop playsinline>
      <source src="../video/Cockpit.mp4" type="video/mp4" />
    </video>

    <div class="absolute top-42.5 right-137.5  ">
      <button @mouseenter="playHoverSound" @click="enigme2" class="py-15 px-35 cursor-pointer">
      </button>
    </div>

    <div class="absolute top-127.5 right-175  ">
      <button @mouseenter="playHoverSound" @click="enigme1" class="py-9 px-9 cursor-pointer">
      </button>
    </div>

    <div class="absolute top-40 left-187.5  ">
      <button @mouseenter="playHoverSound" @click="tryOpenEnd" class="py-50 px-30 cursor-pointer">
      </button>
    </div>

    <div class="absolute bottom-px right-42.5  ">
      <button @mouseenter="playHoverSound" @click="boite" class="py-15 px-20 cursor-pointer">
      </button>
    </div>

    <div class="absolute bottom-50 right-15  ">
      <button @mouseenter="playHoverSound" @click="enigme4" class="py-40 px-23 cursor-pointer">
      </button>
    </div>

    <div class="absolute bottom-45 left-32  ">
      <button @mouseenter="playHoverSound" @click="redButtom" class="py-18 px-17 cursor-pointer">
      </button>
    </div>

    <div class="absolute bottom-125 left-41  ">
      <button @mouseenter="playHoverSound" @click="fenetre" class="py-25 px-30 cursor-pointer">
      </button>
    </div>

    <div class="absolute top-85 right-135  ">
      <button @mouseenter="playHoverSound" @click="Bureau" class="py-10 px-35 cursor-pointer">
      </button>
    </div>

    <!--div qui est a afficher le texte des pensés quand on clique sur le bouton de la porte-->
    <div v-if="ButtonDoorMessage"
      class="fixed bottom-5 left-1/2 -translate-x-1/2 bg-violet-600/60 backdrop-blur px-5 py-3 rounded-lg text-white text-center">
      {{ ButtonDoorMessage }}
    </div>

  </div>
</template>
