<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";
import bgVideoUrl from "../video/page presentation_2.mp4";

const router = useRouter();
const clickSoundUrl = new URL("../audio/bouton-click.mp3", import.meta.url).href;

const mainMenu = () => {
  router.push("/");
};



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

function playHoverSound() {
  const hoverSound = new Audio(clickSoundUrl);
  hoverSound.play();
}

onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
});
</script>

<template>
  <!-- Section template: structure visuelle du composant -->
  <div class="relative min-h-screen flex items-center justify-center text-white">


    <video
      class="fixed inset-0 h-full w-full object-cover z-0 pointer-events-none transition-transform duration-200 ease-out"
      :style="{ transform: videoTransform }" autoplay loop muted playsinline>
      <source :src="bgVideoUrl" type="video/mp4" />
    </video>


    <audio autoplay loop>
      <source src="../audio/MenuPrincipal.mp3" type="audio/mpeg">
    </audio>


    <div class="relative z-10 flex flex-col items-center gap-10 px-4">


      <img src="../image/logov2.png" alt="logo mission étoile" class="logo-float w-90 drop-shadow-xl" />


      <div class="info-card">

        <h2 class="title">SYNOPSIS</h2>

        <br>
        Vous êtes capitaine d’un vaisseau spatial à la dérive. <br>
        <br>
        Vous vous réveillez dans votre cockpit, sans aucun souvenir de ce qu’il vous est arrivé avant votre réveil. Les
        alarmes hurlent, les écrans clignotent… et quelque chose rôde à l’extérieur. Une présence inconnue, derrière la
        vitre fissurée, vous observe. Le cockpit est verrouillé et son système est instable. Soit vous trouvez un moyen
        de vous échapper, soit le vaisseau explose.
        <br>
        <br>
        À travers des énigmes et des messages cachés, vous devrez reconstituer ce qui s’est passé, comprendre comment
        sortir de cet endroit, découvrir qui vous êtes réellement, et vous préparer à ce qui vous attend de l’autre
        côté. Le temps presse.<br>
        <br>
        Chaque décision vous rapprochera soit de la sortie… soit du néant.


        <p class="description">

        </p>

        <button @mouseenter="playHoverSound" @click="mainMenu" class="main-btn">
          Retour au menu principal
        </button>

      </div>

    </div>
  </div>
</template>

<style>
@keyframes floatLogo {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-8px);
  }

  100% {
    transform: translateY(0px);
  }
}

.logo-float {
  animation: floatLogo 3s ease-in-out infinite;
}


.info-card {
  width: 800px;
  padding: 20px;
  text-align: center;
  background: linear-gradient(rgba(23, 20, 31, 0.85), rgba(21, 13, 37, 0.85));
  border: 3px solid #2a115e;
  box-shadow: 0 8px #000000;
  border-radius: 20px;
  backdrop-filter: blur(6px);
  margin-bottom: 40px;
}

.title {
  font-size: 22px;
  margin-bottom: 20px;
  text-transform: uppercase;
}

.description {
  margin-bottom: 25px;
  line-height: 1.6;
}


.main-btn {
  width: 260px;
  padding: 14px 0;
  font-size: 16px;
  background: linear-gradient(#6b46c1, #3b1e7a);
  border: 3px solid #2a115e;
  box-shadow: 0 6px #2a115e;
  text-transform: uppercase;
  transition: all 0.1s ease;
  cursor: pointer;
}

.main-btn:hover {
  background: linear-gradient(#4c2f91, #2a115e);
  transform: translateY(4px);
  box-shadow: 0 2px #2a115e;
}

.main-btn:active {
  transform: translateY(6px);
  box-shadow: 0 0 #2a115e;
}
</style>
