<script setup>
import { useRouter } from "vue-router";
import bgVideoUrl from "../video/page presentation_2.mp4";

const router = useRouter();
const clickSoundUrl = new URL("../audio/bouton-click.mp3", import.meta.url).href;

const mainMenu = () => {
  router.push("/");
};

function playHoverSound() {
  const hoverSound = new Audio(clickSoundUrl);
  hoverSound.play();
}
</script>

<template>
  <audio autoplay loop>
    <source src="../audio/MenuPrincipal.mp3" type="audio/mpeg">
  </audio>
  <div class="relative min-h-screen flex flex-col items-center justify-center text-white">


    <video class="fixed inset-0 h-full w-full object-cover z-0 pointer-events-none" autoplay loop muted playsinline>
      <source :src="bgVideoUrl" type="video/mp4" />
    </video>


    <div class="relative z-10 flex flex-col items-center gap-12">


      <img src="../image/logov2.png" alt="logo" class="logo-float w-110" />





      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">

        <div class="team-card">
          <img src="../image/paul.png" alt="Paul" class="team-img" />
          <h3>Paul</h3>
          <p>Développeur web. Programmeur.</p>
        </div>



        <div class="team-card">
          <img src="../image/lola.png" alt="Membre 2" class="team-img" />
          <h3>Lola</h3>
          <p>Conception Scénarisation.</p>
        </div>


        <div class="team-card">
          <img src="../image/mada.png" alt="Membre 3" class="team-img" />
          <h3>Madalina</h3>
          <p>Design visuel Ambiance sonore.</p>
        </div>

      </div>


      <button @mouseenter="playHoverSound" @click="mainMenu" class="main-btn">
        Retour au menu principal
      </button>

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


.team-card {
  width: 240px;
  padding: 20px;
  text-align: center;

  background: linear-gradient(rgba(0, 0, 0, 0.39),
      rgba(23, 14, 44, 0.85));

  border: 3px solid #2a115e;
  box-shadow: 0 6px #000000;

  transition: all 0.1s ease;
  cursor: default;
}



.team-card:hover {
  background: linear-gradient(#4c2f91, #1f0e4481);
  transform: translateY(4px);
  box-shadow: 0 2px #29115e7c;
}


.team-img {
  width: 120px;
  height: 170px;
  object-fit: cover;
  margin: 0 auto 15px auto;
  display: block;
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
