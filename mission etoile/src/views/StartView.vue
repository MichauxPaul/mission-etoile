<script setup>
import { useRouter } from "vue-router";
import { useTimerStore } from "../stores/timer";
import { useInventoryStore } from "../stores/inventory";
import bgVideoUrl from "../video/page presentation_2.mp4";
import { ref, onMounted, onUnmounted } from "vue";


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


const router = useRouter();
const timer = useTimerStore();
const inventory = useInventoryStore();
const clickSoundUrl = new URL("../audio/bouton-click.mp3", import.meta.url).href;

function startGame() {
  inventory.clearInventory();
  timer.reset();
  localStorage.removeItem("mission-etoile-enigme4-state");
  router.push("/intro");
}

function howPlay() {
  router.push("/CommentJouer");
}

function goToTeam() {
  router.push("/Team");
}

function goToSynopsis() {
  router.push("/Synopsis");
}

function playHoverSound() {
  const hoverSound = new Audio(clickSoundUrl);
  hoverSound.play();
}


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



    <div class="relative z-10 flex flex-col items-center gap-10">


      <img src="../image/logov2.png" alt="logo" class="logo-float w-120 drop-shadow-xl" />


      <div class="flex flex-col gap-6">

        <button @mouseenter="playHoverSound" @click="startGame" class="main-btn">
          Démarrer le jeu
        </button>

        <button @mouseenter="playHoverSound" @click="howPlay" class="main-btn">
          Comment jouer
        </button>

        <button @mouseenter="playHoverSound" @click="goToSynopsis" class="main-btn">
          Synopsis
        </button>


        <button @mouseenter="playHoverSound" @click="goToTeam" class="main-btn">
          Équipe
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


.main-btn {
  width: 260px;
  padding: 14px 0;
  font-size: 18px;
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



.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
