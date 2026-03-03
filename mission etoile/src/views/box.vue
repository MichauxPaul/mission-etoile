<script setup>
import { useRouter } from "vue-router";

const clickSoundUrl = new URL("../audio/bouton-click.mp3", import.meta.url).href;

const router = useRouter();


function sallePrincipal() {
    router.push("/SallePrincipal");
}

function playHoverSound() {
    const hoverSound = new Audio(clickSoundUrl);
    hoverSound.play();
}

//fonction pour ouvrir la video dans un nouvelle onglet
function openVideo() {
    window.open("https://www.youtube.com/watch?v=QkpUkbFlHy8", "_blank", "noopener,noreferrer");
}

</script>

<template>
    <div class="relative min-h-screen p-6 text-white">
        <video class="fixed inset-0 h-full w-full object-cover z-0 pointer-events-none" autoplay loop playsinline>
            <source src="../video/boite.mp4" type="video/mp4" />
        </video>

        <div class="absolute bottom-120 right-180  ">
            <button @mouseenter="playHoverSound" @click="openVideo" class="py-25 px-43 cursor-pointer">
            </button>
        </div>

        <button @click="sallePrincipal"
            class="fixed bottom-6 right-6 bg-violet-600/80 hover:bg-violet-900 text-white px-6 py-3 rounded cursor-pointer">
            Dézoomer
        </button>
    </div>
</template>
