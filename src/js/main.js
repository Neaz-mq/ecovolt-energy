import { initNavbar }    from './modules/navbar.js'
import { initHero }      from './modules/hero.js'
import { initMission }   from './modules/mission.js'
import { initPartners }  from './modules/partners.js'
import { initSmartGrid } from './modules/smartgrid.js'
import { initImpact }    from './modules/impact.js'
import { initSgi }       from './modules/sgi.js'
import { initMeasurable } from './modules/measurable.js'
import { initComparison } from './modules/comparison.js'
import { initContact }   from './modules/contact-dropdown.js'
import { initFooter }    from './modules/footer.js'

let ogUrlTag = document.querySelector('meta[property="og:url"]');
if (!ogUrlTag) {
  ogUrlTag = document.createElement('meta');
  ogUrlTag.setAttribute('property', 'og:url');
  document.head.appendChild(ogUrlTag);
}
ogUrlTag.setAttribute('content', window.location.href);

initNavbar();
initHero();
initMission();
initPartners();
initSmartGrid();
initImpact();
initSgi();
initMeasurable();
initComparison();
initContact();
initFooter();