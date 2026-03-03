<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";
import bgVideoUrl from "../video/page presentation_2.mp4";

const router = useRouter();
const clickSoundUrl = new URL("../audio/bouton-click.mp3", import.meta.url).href;

function mainMenu() {
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
  <audio autoplay loop>
    <source src="../audio/MenuPrincipal.mp3" type="audio/mpeg">
  </audio>
  <div class="relative min-h-screen flex items-center justify-center text-white">


    <video
      class="fixed inset-0 h-full w-full object-cover z-0 pointer-events-none transition-transform duration-200 ease-out"
      :style="{ transform: videoTransform }" autoplay loop muted playsinline>
      <source :src="bgVideoUrl" type="video/mp4" />
    </video>

    <div class="relative z-10 flex flex-col items-center gap-10 px-4">


      <img src="../image/logov2.png" alt="logo mission étoile" class="logo-float w-90 drop-shadow-xl" />


      <div class="info-card">

        <h2 class="title">Comment jouer ?</h2>

        <p class="description">
          Cliquez là ou bon vous semble afin de trouver des indices et de résoudre des énigmes.
          Chaque solution vous donnera un indice essentiel pour trouver un code
          permettant d’ouvrir la porte et de vous échapper. Faites attention au temps mais surtout, prêtez bien
          attention aux détails...
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
  width: 600px;
  padding: 30px;
  text-align: center;
  background: linear-gradient(rgba(23, 20, 31, 0.85), rgba(21, 13, 37, 0.85));
  border: 3px solid #2a115e;
  box-shadow: 0 8px #000000;
  border-radius: 20px;
  backdrop-filter: blur(6px);
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
