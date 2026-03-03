import { createRouter, createWebHistory } from 'vue-router'

import Start from '../views/StartView.vue'
import mainRoom from '../views/mainRoom.vue'
import HowPlay from '@/views/HowPlay.vue'
import enigme1 from '@/views/enigma1.vue'
import enigme2 from '@/views/enigma2.vue'
import enigme4 from '@/views/enigma4.vue'
import End from '@/views/End.vue'
import Dead from '@/views/dead.vue'
import redButton from '@/views/redButton.vue'
import window from '@/views/window.vue'
import Synopsis from '@/views/Synopsis.vue'
import Team from '@/views/Team.vue'
import Desk from '@/views/Desk.vue'
import Intro from '@/views/Intro.vue'
import Epilogue from '@/views/epilogue.vue'
import pictureDesk from '@/views/pictureDesk.vue'
import bookPage12 from '@/views/bookPage1-2.vue'
import bookPage34 from '@/views/bookPage3-4.vue'
import bookPage5 from '@/views/bookPage5.vue'
import bookPage67 from '@/views/bookPage6-7.vue'
import box from '@/views/box.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Start },
    { path: '/SallePrincipal', component: mainRoom },
    { path: '/CommentJouer', component: HowPlay },
    { path: '/enigme1', component: enigme1 },
    { path: '/enigme2', component: enigme2 },
    { path: '/enigme4', component: enigme4 },
    { path: '/boutonRouge', component: redButton },
    { path: '/end', component: End },
    { path: '/dead', component: Dead },
    { path: '/fenetre', component: window },
    { path: "/Team", name: "Team", component: Team},
    { path: "/Synopsis",name: "Synopsis", component: Synopsis},
    { path: "/Bureau", component: Desk},
    { path: "/intro", component: Intro},
    { path: "/epilogue", component: Epilogue},
    { path: "/photoBureau", component: pictureDesk},
    { path: "/livrepage1-2", component: bookPage12},
    { path: "/livrepage3-4", component: bookPage34},
    { path: "/livrepage5", component: bookPage5},
    { path: "/livrepage6-7", component: bookPage67},
    { path: "/boite", component: box}
  ],
})

export default router
