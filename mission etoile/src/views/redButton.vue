<script setup>
import { ref } from "vue";
import { useTimerStore } from "../stores/timer";
import { useInventoryStore } from "../stores/inventory";
import { useRouter } from "vue-router";


const timer = useTimerStore();
const inventory = useInventoryStore();
const router = useRouter();
const clickSoundUrl = new URL("../audio/bouton-click.mp3", import.meta.url).href;
let numberClics = 0;
const redButtomMessage = ref("");
let redButtomMessageTimeout = null;

function sallePrincipal() {
    router.push("/SallePrincipal");
}

const playHoverSound = () => {
    const hoverSound = new Audio(clickSoundUrl);
    hoverSound.play();
}

//fonction qui fait en sorte que quand on clique 2 fois sur le bouton cela tue le joueur
function redButtom() {
    //on augmente la variable numberClics de 1 a chaque appele de la fonction redButtom
    numberClics++;
    //si on a cliqué qu'une seule fois sur le bouton on affiche un texte pendant 5 secondes
    if (numberClics == 1) {
        redButtomMessage.value = "..."
        redButtomMessageTimeout = setTimeout(() => {
            redButtomMessage.value = "";
            redButtomMessageTimeout = null;
        }, 5000);
    }

    //si il y a eut 2 click sur le bouton on arrête le timer et on tue le joueur
    if (numberClics == 2) {
        timer.stop();
        router.push("/dead");
        numberClics = 0;
    }
}
</script>

<template>
    <audio autoplay loop>
        <source src="../audio/bouton-rouge.mp3" type="audio/mpeg">
    </audio>


    <div class="relative min-h-screen p-6 text-white">
        <video class="fixed inset-0 h-full w-full object-cover z-0 pointer-events-none" autoplay loop playsinline>
            <source src="../video/boutonRouge.mp4" type="video/mp4" />
        </video>

        <div class="absolute top-62.5 right-172.5">
            <button @mouseenter="playHoverSound" @click="redButtom" class=" px-65 py-55 rounded-full cursor-pointer">
            </button>
        </div>


        <div v-if="redButtomMessage"
            class="fixed bottom-5 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur px-5 py-3 rounded-lg text-white text-center">
            {{ redButtomMessage }}
        </div>


        <button @click="sallePrincipal"
            class="fixed bottom-6 right-6 bg-violet-600/80 hover:bg-violet-900 text-white px-6 py-3 rounded cursor-pointer">
            Dézoomer
        </button>
    </div>
</template>
