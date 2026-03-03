<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useTimerStore } from "../stores/timer";

const router = useRouter();
const timer = useTimerStore();
const typingSoundUrl = new URL("../audio/boutonTexte.mp3", import.meta.url).href;
const typingSound = new Audio(typingSoundUrl);
typingSound.loop = true;
typingSound.volume = 0.2;

function startFromEpilogue() {
  timer.start();
  router.push("/SallePrincipal");
}

//array avec les diff textes

const paragraphs = [
  `Tu observes autour de toi. L’endroit te semble familier… mais pas totalement.
Les lumières clignotent. Il y a quelque chose juste derrière la porte.`,

  `Il te regarde. Il te fixe, comme s’il te connaissait, comme s’il voyait à travers toi.
Un frisson te parcourt dans le dos. Ton corps refuse de bouger.
Tu n’as jamais eu aussi peur de toute ta vie.
Le vide dans son regard te glace le sang, tu peux à peine distinguer sa forme.`,

  `Pas de temps pour trop y réfléchir..
Il faut que tu sortes d’ici.`
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
    typingSound.pause();
    typingSound.currentTime = 0;
  }
}

function nextStep() {


  if (isTyping.value) {
    clearTimeout(timeoutId);
    displayedParagraphs.value[pIndex] = paragraphs[pIndex];
    isTyping.value = false;
    typingSound.pause();
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

    <div v-for="(text, index) in displayedParagraphs" :key="index"
      class="max-w-2xl text-center text-lg whitespace-pre-line"
      :class="{ cursor: index === displayedParagraphs.length - 1 && isTyping }">
      <p>
        {{ text }}
      </p>
    </div>

    <button v-if="showButton" @click.stop="startFromEpilogue"
      class="bg-violet-500/80 hover:bg-violet-900 text-white px-6 py-3 rounded cursor-pointer transition-all duration-300 animate-fadeIn">
      Démarrer
    </button>

  </div>
</template>
