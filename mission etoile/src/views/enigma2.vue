<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useInventoryStore } from "../stores/inventory";

const router = useRouter();
const inventory = useInventoryStore();
const codeSaisi = ref("");



//fonction qui sert a afficher le message quand le joueur se trompe dans le formulaire. Si il y a déjà un timeout de créer, on le détruit sinon on affiche le message pendand 2 secondes puis on vide le texte de message et on supprimer le timeout


//fonction pour valider le code du formulaire, si le code est bon on ajoute l'indice 9 a l'inventaire du joueur sinon on affiche un message lui disant que ce n'est pas le bon code saisi
function validerCode() {
  if (Number(codeSaisi.value) === 9) {
    inventory.addHint("9");
    Message.value = "";
  } else {
    showMessage("Mauvaise valeur");
  }

  codeSaisi.value = "";
}

function sallePrincipal() {
  router.push("/SallePrincipal");
}
</script>

<template>
  <audio autoplay>
    <source src="../audio/post-it.mp3" type="audio/mpeg">
  </audio>

  <audio autoplay loop>
    <source src="../audio/tableau.mp3" type="audio/mpeg">
  </audio>

  <div class="relative min-h-screen p-6 text-white ">
    <video class="fixed inset-0 h-full w-full object-cover z-0 pointer-events-none" autoplay loop playsinline>
      <source src="../video/tableau.mp4" type="video/mp4" />
    </video>

    <div class="postit-form absolute">
      <form @submit.prevent="validerCode" class="flex items-center gap-2">
        <input v-model="codeSaisi" type="number"
          class="postit-input [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
        <button type="submit" class="postit-btn cursor-pointer">
          ok
        </button>
      </form>
    </div>

    <button @click="sallePrincipal"
      class="fixed bottom-6 right-6 bg-violet-600/80 hover:bg-violet-900 text-white px-6 py-3 rounded cursor-pointer">
      Dézoomer
    </button>
  </div>
</template>

<style scoped>
.postit-form {
  top: 39%;
  left: 28%;
  transform: translate(-50%, -50%) rotate(-15deg);
}

.postit-input {
  width: 70px;
  background: transparent;
  border: none;
  border-bottom: 2px solid rgba(20, 20, 20, 0.85);
  color: #131313;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  outline: none;
}

.postit-btn {
  background: transparent;
  border: none;
  color: rgba(20, 20, 20, 0.9);
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: lowercase;
}
</style>
