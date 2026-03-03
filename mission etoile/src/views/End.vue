<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const displayedText = ref("");
const showButton = ref(false);
const fullText = "La porte s’ouvre. Elle.. était jamais fermée. Mes mains tremblent. Mon cœur bat trop fort, somme s’il voulait m’empêcher de comprendre. C’était ca depuis le début. Je me souviens maintenant. (rire sec et douloureux) Tout ce temps passé à chercher un code de merde.. Un signe, une issue de secours.. Alors que j’étais libre. Tout me revient maintenant, mon suivi, la photo, les pilules, mon nom que j’ai écris encore et encore comme si j’avais peur de disparaître. Frenia. Sa voix. Ça a toujours été la mienne. Il n’y a jamais rien eu derrière cette porte que la vérité, celle que j’ai toujours voulu évité. Combien de temps je suis resté enfermé dans le cockpit à tout oublié, à tout recommencer..? Je suis prisonnier de ma putain de tête. Je l’ai toujours été… Ma schizophrénie m’a tué, depuis tout ce temps. J’étais déjà mort.";

let timeoutId = null;
let charIndex = 0;
let isTyping = true;

const videoTransform = ref("translate(0px, 0px) scale(1.1)");

const handleMouseMove = (e) => {
  const { innerWidth, innerHeight } = window;

  const x = (e.clientX - innerWidth / 2) / 40;
  const y = (e.clientY - innerHeight / 2) / 40;

  videoTransform.value = `
    translate(${-x}px, ${-y}px)
    scale(1.1)
  `;
};

onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
});


function returnStart() {
  router.push("/");
}

function type() {
  if (charIndex < fullText.length) {
    displayedText.value += fullText.charAt(charIndex);
    charIndex++;
    timeoutId = setTimeout(type, 60);
  } else {
    isTyping = false;
  }
}

function nextStep() {
  if (isTyping) {
    return;
  }

  showButton.value = true;
}

onMounted(() => {
  type();
});

onUnmounted(() => {
  clearTimeout(timeoutId);
});
</script>

<template>
  
  
  

  
  <div @click="nextStep"
    class="min-h-screen w-full text-white flex flex-col items-center justify-center gap-8 p-6">
    <video class="fixed inset-0 h-full w-full object-cover z-0 pointer-events-none" :style="{ transform: videoTransform }" autoplay loop playsinline>
      <source src="../video/FIN.mp4" type="video/mp4" />
    </video>

    <audio autoplay>
    <source src="../audio/win-music.mp3" type="audio/mpeg">
  </audio>

  <audio autoplay>
    <source src="../audio/Monologue-fin1.wav" type="audio/wav">
  </audio>

    <p class=" bg-black/60 rounded-4xl  p-5 max-w-2xl z-10 text-center text-lg mt-50">
      {{ displayedText }}
    </p>

    <button v-if="showButton" @click.stop="returnStart"
      class="bg-black/80 z-10 hover:bg-violet-900 text-white px-6 py-3 rounded cursor-pointer">
      Retour au debut
    </button>
  </div>
</template>
