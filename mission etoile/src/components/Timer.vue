<script setup>
// Section script: logique et etat du composant
import { computed } from "vue";
import { useTimerStore } from "../stores/timer";
import jaugeImg from "../image/jauge.png";

const timer = useTimerStore();

// Cette fonction sert a calculer le ratio entre le temps écoulé (timer.totalSeconds - timer.remainingTime) et le temps total (timer.totalSeconds). Cette fonction sert pour calculer le "grayscale" de l'image du cervaux qui sert a faire une jaugepour un timer du temps restant
const recolorRatio = computed(() => {
  return (timer.totalSeconds - timer.remainingTime) / timer.totalSeconds;
});
</script>

<template>
  <div class="fixed top-3.5 right-3.5 z-9998 w-56 pointer-events-none select-none">
    <!-- Image du cerveau qui est gris au départ quand il reste tout le temps et se recolorise au fil du temps grâce a la classe CSS "grayscale". ici on fait baisser la valeur en fesant la diffférence entre 1 et la valeur de recolorRatio -->
    <img :src="jaugeImg" alt="Jauge de temps" class="w-full h-auto block"
      :style="{ filter: `grayscale(${1 - recolorRatio})` }" />
  </div>
</template>
