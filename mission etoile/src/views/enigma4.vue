<script setup>
import { onMounted, ref } from "vue";
import { useInventoryStore } from "../stores/inventory";
import { useRouter } from "vue-router";

const mouthRemoved = ref(false);
const HintAdd = ref(false);
const storageKeySceneState = "mission-etoile-enigme4-state";
const inventory = useInventoryStore();
const router = useRouter();
const mouthSound = new URL("../audio/expiration-mirroir.mp3", import.meta.url).href;

//on sauvegarde l'état de la scène pour que quand le joueur sort et rerentre il la retrouve comme quand il l'avais quitter
function saveSceneState() {
  const sceneState = {
    boucheRetiree: mouthRemoved.value,
    hintAdd: HintAdd.value
  };
  localStorage.setItem(storageKeySceneState, JSON.stringify(sceneState));
}

//on charge la scène depuis le localstorage
function loadSceneState() {
  const raw = localStorage.getItem(storageKeySceneState);
  if (raw === null) {
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    mouthRemoved.value = parsed.boucheRetiree === true;
    HintAdd.value = parsed.hintAdd === true;
  } catch (error) {
    // on ignore les état invalide
  }
}

function removeMouth() {
  mouthRemoved.value = true;
  const clickMouth = new Audio(mouthSound);
  clickMouth.play();
  saveSceneState();
}

function addHint() {
  inventory.addHint("7");
  HintAdd.value = true;
  saveSceneState();
}

function sallePrincipal() {
  router.push("/SallePrincipal");
}

onMounted(() => {
  loadSceneState();
});
</script>

<template>
  <audio autoplay>
    <source src="../audio/voixMirroir.wav" type="audio/wav">
  </audio>

  <audio autoplay loop playsinline>
    <source src="../audio/music-tension.mp3" type="audio/mpeg">
  </audio>
  <div class="min-h-screen w-full p-6 ">
    <video class="fixed inset-0 h-full w-full object-cover z-0 pointer-events-none" autoplay loop playsinline>
      <source src="../video/miroir.mp4" type="video/mp4" />
    </video>

    <!--bouton affiché tant que le joueur n'a pas appuyer dessus-->
    <button v-if="!mouthRemoved" @click="removeMouth" class="absolute bottom-40 left-200 px-40 py-30 cursor-pointer">
    </button>

    <!--bouton affiché une fois que le joueur a cliquer sur le bouton pécédent et disparait une fois que le joueur a cliquer dessus, ce bouton ajoute l'indice 7 a l'inventaire -->
    <div v-else-if="!HintAdd" @click="addHint"
      class="absolute bottom-70 left-230  text-black text-5xl px-6 cursor-pointer ">
      7
    </div>

    <button @click="sallePrincipal"
      class="fixed bottom-6 right-6 bg-violet-600/80 hover:bg-violet-900 text-white px-6 py-3 rounded cursor-pointer">
      Dézoomer
    </button>
  </div>
</template>
