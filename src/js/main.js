import '../scss/main.scss'
import { initNavbar } from './modules/navbar.js'

// ✅ Module scripts are deferred by default — no need for DOMContentLoaded
initNavbar()