# Spica testiranje



## Pripravimo Angular in Node
Projekt bomo zagnali s pomočjo NPM-ja. 
Odpremo ukazno vrstico in poženemo ukaz `npm install -g @angular/cli`. V primeru, da nimamo naloženega Node.js, ali pa imamo starejšo verzijo, jo je potrebno posodobiti na vsaj verzijo 18.13. To lahko storimo na več načinov, lahko obiščemo spletno stran od [Node.js](https://nodejs.org/en) in naložimo na računalnik priporočljivo verzijo Noda. Sledimo instalacijskim navodilom.
Ob uspešni instalaciji ponovno zaženemo zgornji ukaz.

## Naložimo projekt
Sedaj je potrebno skopirati oziroma klonirati projekt iz githuba. Če slučajno nimamo gita instaliranega na računalniku, je potrebno to storiti sedaj. Odpremo spletno stran od [Gita](https://git-scm.com/) in naložimo git na računalnik ter sledimo instalacijskim navodilom.
Ob uspešni instalaciji lahko odpremo komandno vrstico in se pomaknemo v željeno datoteko, kamor želimo naložiti projekt iz Githuba. V vrstico napišemo `git clone <link-do-projekta>`, kjer moramo `<link-do-projekta>` zamenjati z dejanskim linkom do projekta. Tega dobimo na github strani od projekta in sicer klikniti je potrebno zelen gumb, kjer piše `<> code`. Tam pa se zgolj skopira link in zamenja z `<link-do-projekta>`. Potem poženemo ukaz in projekt se naloži v izbrano datoteko.

## Poženemo projekt

Premaknemo se v novo nastalo datoteko od našega git projekta (spica). Najprej še za vsak slučaj poženemo ukaz `npm install`, potem pa lahko poženemo ukaz `npm start`. S tem bi se moral naš projekt zagnati. V brskalniku ga lahko vidimo, če dostopamo do `http://localhost:4200/`.