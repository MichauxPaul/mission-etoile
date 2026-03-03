<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const typingSoundUrl = new URL("../audio/boutonTexte.mp3", import.meta.url).href;
const typingSound = new Audio(typingSoundUrl);
typingSound.loop = true;
typingSound.volume = 0.2;

function epilogue() {
  router.push("/epilogue");
}


//array pr le texte
const paragraphs = [
  `Tes yeux s’ouvrent lentement. Tout est flou autour de toi, comme si le temps s’était arrêté.
Tu n’as aucun souvenir à part la chaise sur laquelle tu es assis. Peu à peu, tu réalises où
tu te trouves : dans un vaisseau spatial. Mais pire encore… tu en es le capitaine.`,

  `Avant même d’avoir le temps de reprendre tes esprits, un bourdonnement envahit le cockpit.
Des alarmes retentissent, des messages d’erreur s’affichent partout sur le tableau de bord.
Quelque chose ne va pas.`,

  `Tu tends la main vers un des boutons. Un écran s’allume et t’explique ce que tu dois faire :
quitter le cockpit immédiatement. Si tu restes, le vaisseau explosera avec toi à l’intérieur.
Tu dois absolument rejoindre la salle d’urgence afin de réactiver l’alimentation du vaisseau.`,

  `Super.`,

  `Comment suis-je censé sortir de là ?`
];

const displayedParagraphs = ref([]);
const showButton = ref(false);
const isTyping = ref(true);

let timeoutId = null;
let pIndex = 0;
let charIndex = 0;


function type() {
  if (!isTyping.value) return;

  if (!displayedParagraphs.value[pIndex]) {
    displayedParagraphs.value[pIndex] = "";
  }

  if (charIndex < paragraphs[pIndex].length) {
    if (typingSound.paused) {
      typingSound.play();
    }

    displayedParagraphs.value[pIndex] += paragraphs[pIndex].charAt(charIndex);
    charIndex++;
    timeoutId = setTimeout(type, 45);
  } else {
    isTyping.value = false;
    //stopper le son quand les lettres ne s'affiche plus
    typingSound.pause();
    //on remet la lecture du son a 0 seconde donc au début
    typingSound.currentTime = 0;
  }
}

function nextStep() {
  if (isTyping.value) {
    clearTimeout(timeoutId);
    displayedParagraphs.value[pIndex] = paragraphs[pIndex];
    isTyping.value = false;
    //stopper le son
    typingSound.pause();
    //on remet la lecture du son a 0 seconde donc au début
    typingSound.currentTime = 0;
    return;
  }

  // fonction pour passer au paragraphe suivant
  if (pIndex < paragraphs.length - 1) {
    pIndex++;
    charIndex = 0;
    isTyping.value = true;
    type();
  } else {
    showButton.value = true;
  }
}

onMounted(() => {
  type();
});

onUnmounted(() => {
  clearTimeout(timeoutId);
  typingSound.pause();
  typingSound.currentTime = 0;
});

</script>

<template>
  <div @click="nextStep"
    class="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center gap-6 p-6 cursor-pointer">

    <h1 class="text-5xl font-bold">INTRODUCTION</h1>

    <div v-for="(text, index) in displayedParagraphs" :key="index"
      class="max-w-2xl text-center text-lg whitespace-pre-line"
      :class="{ cursor: index === displayedParagraphs.length - 1 && isTyping }">
      <p v-if="index === 4" class="text-xl italic">
        {{ text }}
      </p>
      <p v-else-if="index === 3" class="text-xl">
        {{ text }}
      </p>
      <p v-else>
        {{ text }}
      </p>
    </div>

    <button v-if="showButton" @click.stop="epilogue"
      class="bg-violet-500/80 hover:bg-violet-900 text-white px-6 py-3 rounded cursor-pointer transition-all duration-300 animate-fadeIn">
      Continuer
    </button>

  </div>
</template>
