<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function Desk() {
  router.push("/Bureau")
}

function NextPage() {
  router.push("/livrepage3-4")
}
</script>

<template>
  <audio autoplay>
    <source src="../audio/livrepage1et2.wav" type="audio/wav">
  </audio>

  <div class="relative min-h-screen p-6 text-white">

    <video class="fixed inset-0 h-full w-full object-cover z-0 pointer-events-none" autoplay loop playsinline>
      <source src="../video/page1et2.mp4" type="video/mp4" />
    </video>

    <button @click="Desk"
      class="fixed bottom-6 right-6 bg-violet-600/80 hover:bg-violet-900 text-white px-6 py-3 rounded cursor-pointer">
      Fermer le livre
    </button>

    <button @click="NextPage"
      class="fixed bottom-6 right-70 bg-violet-600/80 hover:bg-violet-900 text-white px-6 py-3 rounded cursor-pointer">
      Page suivante
    </button>

  </div>
</template>
