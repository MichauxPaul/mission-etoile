<script setup>
import { ref } from "vue";
import { useTimerStore } from "../stores/timer";
import { useInventoryStore } from "../stores/inventory";
import { useRouter } from "vue-router";


const timer = useTimerStore();
const inventory = useInventoryStore();
const router = useRouter();
const Thoughts = ref("");
let ThoughtsTimeout = null;
const ThoughtVoice = new URL("../audio/voix-fenetre-espace.wav", import.meta.url).href;
let typingTimeout = null;
let isTyping = false;


function sallePrincipal() {
    router.push("/SallePrincipal");
}

function thought() {

    const fullText = "Il n'y a rien d'autre que le vide.";
    const thoughtVoice = new Audio(ThoughtVoice);
    thoughtVoice.play();


    if (isTyping) {
        clearTimeout(typingTimeout);
        Thoughts.value = fullText;
        isTyping = false;
        return;
    }


    Thoughts.value = "";
    let index = 0;
    isTyping = true;

    function typeLetter() {
        if (index < fullText.length) {
            Thoughts.value += fullText.charAt(index);
            index++;
            typingTimeout = setTimeout(typeLetter, 40);
        } else {
            isTyping = false;

            ThoughtsTimeout = setTimeout(() => {
                Thoughts.value = "";
                ThoughtsTimeout = null;
            }, 2000);
        }
    }

    typeLetter();
}



</script>

<template>
    <div class="min-h-screen w-full">
        <video class="fixed inset-0 h-full w-full object-cover z-0 pointer-events-none" autoplay loop playsinline>
            <source src="../video/fenetre.mp4" type="video/mp4" />
        </video>


        <div class="absolute bottom-40 right-60  ">
            <button @click="thought" class=" py-100 px-170 cursor-pointer">
            </button>
        </div>


        <div v-if="Thoughts"
            class="fixed bottom-5 left-1/2 -translate-x-1/2 bg-violet-600/60 backdrop-blur px-5 py-3 rounded-lg text-white text-center">
            {{ Thoughts }}
        </div>



        <button @click="sallePrincipal"
            class="fixed bottom-6 right-6 bg-violet-600/80 hover:bg-violet-900 text-white px-6 py-3 rounded cursor-pointer">
            Dézoomer
        </button>


    </div>
</template>
