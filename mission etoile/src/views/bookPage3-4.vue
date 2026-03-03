<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function Desk() {
  router.push("/Bureau")
}

function NextPage() {
  router.push("/livrepage5")
}

function PreviousPage() {
  router.push("/livrepage1-2")
}





</script>

<template>
  <audio autoplay>
    <source src="../audio/page3.wav" type="audio/wav">
  </audio>

  <div class="relative min-h-screen p-6 text-white">

    <video class="fixed inset-0 h-full w-full object-cover z-0 pointer-events-none" autoplay loop playsinline>
      <source src="../video/page3et4.mp4" type="video/mp4" />
    </video>

    <button @click="Desk"
      class="fixed bottom-6 right-6 bg-violet-600/80 hover:bg-violet-900 text-white px-6 py-3 rounded cursor-pointer">
      Fermer le livre
    </button>

    <button @click="NextPage"
      class="fixed bottom-6 right-70 bg-violet-600/80 hover:bg-violet-900 text-white px-6 py-3 rounded cursor-pointer">
      Page suivante
    </button>

    <button @click="PreviousPage"
      class="fixed bottom-6 right-130 bg-violet-600/80 hover:bg-violet-900 text-white px-6 py-3 rounded cursor-pointer">
      Page précedente
    </button>

  </div>
</template>