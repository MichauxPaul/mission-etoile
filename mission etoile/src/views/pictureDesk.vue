<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function backDesk() {
  router.push("/Bureau");
};


</script>

<template>
  <audio autoplay loop playsinline>
    <source src="../audio/photobureau.mp3" type="audio/mpeg">
  </audio>

  <div class="relative min-h-screen p-6 text-white">

    <video class="fixed inset-0 h-full w-full object-cover z-0 pointer-events-none" autoplay loop playsinline>
      <source src="../video/photobureau.mp4" type="video/mp4" />
    </video>

    <button @click="backDesk"
      class="fixed bottom-6 right-6 bg-violet-600/80 hover:bg-violet-900 text-white px-6 py-3 rounded cursor-pointer">
      Retour au bureau
    </button>
  </div>
</template>
