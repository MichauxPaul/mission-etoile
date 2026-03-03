<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const videoFinished = ref(false);

function backStart() {
  router.push("/");
}

//signaler quand la vidéo est terminer
function onVideoEnded() {
  videoFinished.value = true;
};

</script>

<template>
  <div class="relative min-h-screen">
    <video class="fixed inset-0 h-full w-full object-cover z-0 pointer-events-none" autoplay @ended="onVideoEnded">
      <source src="../video/CockpitDead.mp4" type="video/mp4" />
    </video>

    <div class="relative min-h-screen flex justify-center items-center">
      <!--afficher le bouton quand la vidéo est terminer-->
      <button v-if="videoFinished" class="bg-violet-500/80 hover:bg-violet-900 p-10 cursor-pointer text-2xl rounded-2xl"
        @click="backStart">
        RECOMMENCER LE JEU
      </button>
    </div>
  </div>
</template>
