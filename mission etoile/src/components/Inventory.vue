<script setup>
import { useInventoryStore } from "../stores/inventory";

const inventory = useInventoryStore();
</script>

<template>
  <div class="fixed bottom-3.5 left-3.5 z-9998 bg-violet-600/80 backdrop-blur px-4 py-2 rounded-lg text-white">
    <p class="font-bold">INVENTAIRE</p>
    <!-- si l'inventaire est vide on affiche le texte "Aucun objet" sinon on affiche les indices et si on a la lampe torche dans notre inventaire on affiche son image -->
    <p v-if="inventory.Hints.length === 0">Aucun objet</p>
    <div v-else class="flex items-center gap-2 flex-wrap">
      <!--on parcour le tableau inventory.Hints et on récupère la valeur des Hints et des index et on créer des clés dynamique-->
      <template v-for="(hint, index) in inventory.Hints" :key="`${hint}-${index}`">
        <img v-if="hint === 'lampe_torche'" src="../image/lampe.png" alt="Lampe torche"
          class="w-8 h-8 object-contain inline-block" />
        <span v-else>{{ hint }}</span>
        <!-- balise span pour afficher un "/" qui sert a séparer visuellement les indices et n'ajoute pas un "/" après le dernier indice -->
        <span v-if="index < inventory.Hints.length - 1">/</span>
      </template>
    </div>
  </div>
</template>
