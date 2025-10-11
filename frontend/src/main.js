import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Import our custom CSS (Make sure the file exists at the correct location)
import './scss/styles.scss'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// main.js or App.vue
import 'bootstrap-icons/font/bootstrap-icons.css'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(VueCookies)
// Use Pinia for state management
app.use(createPinia())
// Use Vue Router for navigation
app.use(router)

// Mount the app to the DOM
app.mount('#app')
