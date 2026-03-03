<script setup>
import { ref } from "vue";
import { useInventoryStore } from "../stores/inventory";
import { useRouter } from "vue-router";

const inventory = useInventoryStore();
const router = useRouter();
const isHintZeroCollected = ref(inventory.hasHint("0"));

function Desk() {
  router.push("/Bureau")
}

function PreviousPage() {
  router.push("/livrepage5")
}

function AddHint() {
  inventory.addHint("0");
  isHintZeroCollected.value = true;
}


function playHoverSound() {
  const hoverSound = new Audio(clickSoundUrl);
  hoverSound.play();
}


</script>

<template>
  <audio autoplay>
    <source src="../audio/page6.wav" type="audio/wav">
  </audio>

  <div class="relative min-h-screen p-6 text-white">

    <video class="fixed inset-0 h-full w-full object-cover z-0 pointer-events-none" autoplay loop playsinline>
      <source src="../video/page6et7.mp4" type="video/mp4" />
    </video>

    <div v-if="!isHintZeroCollected" class="absolute top-105 left-200  ">
      <button @mouseenter="playHoverSound" @click="AddHint" class="py-8 px-12 cursor-pointer">
      </button>
    </div>

    <button @click="Desk"
      class="fixed bottom-6 right-6 bg-violet-600/80 hover:bg-violet-900 text-white px-6 py-3 rounded cursor-pointer">
      Fermer le livre
    </button>

    <button @click="PreviousPage"
      class="fixed bottom-6 right-70 bg-violet-600/80 hover:bg-violet-900 text-white px-6 py-3 rounded cursor-pointer">
      Page précedente
    </button>
  </div>
</template>
