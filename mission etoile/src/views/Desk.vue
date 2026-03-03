<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const clickSoundUrl = new URL("../audio/bouton-click.mp3", import.meta.url).href;
const Thoughts = ref("");
let ThoughtsTimeout = null;
let ThoughtsTypingTimeout = null;
let isTyping = false;

function mainRoom() {
  router.push("/SallePrincipal");
}

function openBook() {
  router.push("/livrepage1-2");
}


function pictureDesk() {
  router.push("/photoBureau");
}

function playHoverSound() {
  const hoverSound = new Audio(clickSoundUrl);
  hoverSound.play();
}

function thought() {

  const fullText = "Ces documents sont des documents classifiés...";

  if (isTyping) {
    clearTimeout(ThoughtsTypingTimeout);
    Thoughts.value = fullText;
    isTyping = false;
    return;
  }

  clearTimeout(ThoughtsTimeout);
  clearTimeout(ThoughtsTypingTimeout);

  Thoughts.value = "";
  let index = 0;
  isTyping = true;

  function typeLetter() {
    if (index < fullText.length) {
      Thoughts.value += fullText.charAt(index);
      index++;
      ThoughtsTypingTimeout = setTimeout(typeLetter, 40);
    } else {
      isTyping = false;


      ThoughtsTimeout = setTimeout(() => {
        Thoughts.value = "";
        ThoughtsTimeout = null;
      }, 10000);
    }
  }

  typeLetter();
}

</script>

<template>
  <div class="relative min-h-screen p-6">
    <video class="fixed inset-0 h-full w-full object-cover z-0 pointer-events-none" autoplay loop playsinline>
      <source src="../video/bureau.mp4" type="video/mp4" />
    </video>

    <div class="absolute top-42.5 right-100  ">
      <button @mouseenter="playHoverSound" @click="pictureDesk" class="py-22 px-40 cursor-pointer">
      </button>
    </div>

    <div class="absolute top-97.5 right-82.5  ">
      <button @mouseenter="playHoverSound" @click="openBook" class="py-50 px-45 cursor-pointer">
      </button>
    </div>

    <div class="absolute top-75 right-200  ">
      <button @mouseenter="playHoverSound" @click="thought" class="py-60 px-106 cursor-pointer">
      </button>
    </div>


    <div v-if="Thoughts"
      class="fixed bottom-5 left-1/2 -translate-x-1/2 bg-violet-600/60 backdrop-blur px-5 py-3 rounded-lg text-white text-center">
      {{ Thoughts }}
    </div>



    <button @click="mainRoom"
      class="fixed bottom-6 right-6 bg-violet-600/80 hover:bg-violet-900 text-white px-6 py-3 rounded cursor-pointer">
      Dézoomer
    </button>


  </div>
</template>
