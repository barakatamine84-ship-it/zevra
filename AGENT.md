# AGENT.md — Mémoire du projet « Site ZÉVRA »

Ce fichier sert de mémoire aux agents IA (Claude) qui modifient ce site. Le lire en entier avant toute modification et le mettre à jour (section « Journal ») après chaque changement notable.

## 1. Le client

- **Entreprise** : ZÉVRA — contractant général en aménagement intérieur (bureaux, retail, hôtellerie).
- **Signature** : « Exécuter avec rigueur. Livrer avec élégance. »
- **Interlocuteur** : Omar Berrada, direction de projet & exécution.
- **Zone** : Casablanca, Rabat, Salé, Marrakech, tout le Maroc.
- **Domaine** : https://zevra.ma
- **E-mail** : o.berrada@zevra.ma
- **Téléphone** :
  - affiché partout : `0661908395` (demande explicite du client, ne pas reformater) ;
  - dans les liens d'appel : `tel:+212661908395` (format international, fonctionne aussi depuis l'étranger) ;
  - dans le JSON-LD : `+212661908395`.
- **Source du contenu** : plaquette PDF « ZEVRA_6_.pdf » (engagements, méthode en 6 phases, gouvernance, process de chiffrage, 8 fiches projets, mur de logos clients).

## 2. Contraintes demandées par le client

1. Site vitrine de 5 pages : Accueil, Méthodes, Réalisations, Chiffrage, Contact.
2. Bouton d'appel direct vers le téléphone, toujours accessible.
3. Responsive.
4. Bien référencé (SEO).
5. Héro de l'accueil dynamique avec effet 3D.

## 3. Arborescence

```
/
├── index.html          Accueil (héro 3D, engagements, domaines, clients, CTA)
├── methodes.html       6 phases + gouvernance (rôles, rituels, livrables)
├── realisations.html   8 projets, filtres par typologie, galerie avec agrandissement
├── chiffrage.html      5 étapes, délai 10–15 jours ouvrés, livrables
├── contact.html        Coordonnées + formulaire (ouvre un mailto pré-rempli)
├── assets/
│   ├── site.css        Feuille de style des 4 pages intérieures (système visuel harmonisé avec l'accueil)
│   ├── site.js         Apparition au scroll, filtres, galerie (<dialog>), formulaire — pages intérieures
│   └── hero3d.js       Héro 3D (Three.js r128) + défilement des références — accueil uniquement (version historique)
├── images/             Photos WebP nommées « projet-ville-sujet.webp » + og-zevra.jpg (partage réseaux)
├── favicon.svg
├── robots.txt
├── sitemap.xml
└── AGENT.md            Ce fichier
```

Site statique pur : pas de build, pas de framework, pas de dépendance npm. Hébergement à la racine de zevra.ma.

## 4. Règles d'édition importantes

- **En-tête, pied de page et barre d'appel mobile sont dupliqués dans les 5 pages HTML.** Toute modification (menu, numéro, e-mail, mentions) doit être faite dans les 5 fichiers. Vérifier avec `grep` après coup.
- Ajouter une page = l'ajouter au menu des 5 pages, au pied de page des 5 pages, et à `sitemap.xml`.
- Chaque page garde : un seul `<h1>`, un `<title>` et une `<meta name="description">` uniques, une `<link rel="canonical">`, les balises Open Graph, et le JSON-LD.
- Toute image a un `alt` descriptif en français (projet + lieu), des attributs `width`/`height`, et `loading="lazy"` sauf l'image principale visible au chargement.
- Nouvelles photos : format WebP, ≤ 1400 px de large, qualité ~80, nom en minuscules avec tirets.
- Langue : français (`lang="fr-MA"`). Ton sobre, phrases courtes, pas de superlatifs vides.

## 5. Design

- **Couleurs** (variables CSS dans `:root`) : `--paper #FFFFFF`, `--mist #F1F1EE` (bandes), `--ink #262624` (texte, boutons), `--stone #6E6C66` (texte secondaire), `--line #D9D7D1` (filets), `--oak #8E6A40` (accent bois, à utiliser avec parcimonie).
- **Typo** : Jost (Google Fonts, graisses 200–500), titres en 300. Repli : Futura, Century Gothic.
- **Signature graphique** : les lignes ondulées « zèbre » du logo. Version SVG animée (`.stripes.draw`) dans les en-têtes de page, version 3D dans le héro de l'accueil.
- Pas d'ombres, pas de coins arrondis, pas de dégradés décoratifs : rester fidèle à la plaquette, minimaliste.
- Le site est volontairement en thème clair uniquement.
- Mobile (< 900 px) : menu burger + barre fixe « Appeler Omar Berrada » en bas de l'écran.

## 6. Héro 3D (index.html + assets/hero3d.js)

- Three.js **r128** chargé depuis cdnjs, uniquement sur `index.html`, en `defer`.
- 34 lignes animées formant une surface ondulante ; la ligne n° 21 est couleur bois (`0x8E6A40`).
- Le pointeur soulève les lignes (bosse gaussienne) et incline la scène.
- Animation d'entrée : les lignes montent pendant ~1,8 s.
- Pause automatique hors écran / onglet masqué (IntersectionObserver + visibilitychange).
- `prefers-reduced-motion` : scène figée, pas de défilement des références.
- Pas de WebGL ou Three.js indisponible : le SVG statique `.stripes` reste affiché.
- La liste des références qui défilent est dans `window.ZEVRA_REFS` (script inline en bas de `index.html`) ; le premier élément est aussi écrit en dur dans le `<p class="ticker">` pour le SEO.
- Sur desktop la scène est en position absolue à droite (`left:47%`) avec un masque en dégradé pour ne pas gêner la lecture du texte.

## 7. SEO en place

- Mots-clés visés : contractant général Casablanca, aménagement de bureaux Casablanca, aménagement boutique / retail Maroc, aménagement hôtel Maroc, entreprise d'aménagement Rabat.
- JSON-LD : `GeneralContractor` sur toutes les pages, `BreadcrumbList` sur les pages internes, `HowTo` (méthodes), `ItemList` (réalisations).
- `sitemap.xml` : mettre à jour `<lastmod>` à chaque modification de contenu.

## 8. Réalisations (données)

| Projet | Lieu | Surface | Typologie |
|---|---|---|---|
| ManpowerGroup | Casa Anfa, Casablanca | 900 m² | Bureaux |
| PwC | Casanearshore, Casablanca | 1 000 m² | Bureaux |
| Booking.com | Marina, Casablanca | 840 m² | Bureaux |
| Villa Blanca | Aïn Diab, Casablanca | 800 m² | Hôtellerie |
| Nike / Urban Jungle | Marina, Casablanca | 700 m² | Retail |
| Fitness Park | Salé | 2 100 m² | Retail / loisirs |
| Fitness Park | Rabat | 2 000 m² | Retail / loisirs |
| adidas | Casablanca, Marrakech, Rabat | 2 200 m² | Retail |

Pour chaque projet : rôle ZÉVRA = pilotage d'exécution, planning, qualité, réception ; lots = cloisons, faux plafonds, sols, peinture, menuiserie, MEP.
Ajouter un projet : nouvel `<article class="project" id="…" data-cat="bureaux|hotellerie|retail">` dans `realisations.html`, mettre à jour l'`ItemList` JSON-LD et, si besoin, `ZEVRA_REFS` dans `index.html`.

Clients cités (liste texte, pas de logos) : 34 noms. « f.com » et un logo manuscrit illisible de la plaquette ont été volontairement omis.

## 9. À faire / points ouverts

- [ ] Remplacer les photos par les originaux haute définition (mêmes noms de fichiers) — celles du PDF sont en basse résolution.
- [ ] Brancher le formulaire de contact sur un service d'envoi (ex. Formspree) ; aujourd'hui il ouvre la messagerie du visiteur.
- [ ] Confirmer que le 0661908395 est bien sur WhatsApp (lien `wa.me` sur la page Contact), sinon supprimer ce lien.
- [ ] Déclarer le site dans Google Search Console et soumettre `sitemap.xml`.
- [ ] Créer la fiche Google Business Profile (même nom, même numéro, même site).
- [ ] Éventuellement : page mentions légales, adresse postale précise dans le JSON-LD.

## 10. Journal des modifications

- **2026-10-04** — Création du site (5 pages) à partir de la plaquette PDF. SEO, responsive, barre d'appel mobile.
- **2026-10-04** — Héro de l'accueil refait : surface de lignes 3D interactive (Three.js) + défilement des références.
- **2026-10-04** — Numéro affiché changé en `0661908395` (liens `tel:` conservés en `+212661908395`).
- **2026-10-04** — Ajout de ce fichier AGENT.md (+ CLAUDE.md qui l'importe).
- **2026-10-07** — `index.html` remplacé par une refonte autonome (style intégré, polices Instrument Serif / Hanken Grotesk / IBM Plex Mono, mode sombre, apparitions au scroll). Elle n'utilise plus `assets/style.css`.
- **2026-10-07** — Harmonisation des 4 pages intérieures sur le nouveau design de l'accueil : nouvelle feuille `assets/site.css` et `assets/site.js` (même système visuel, mode sombre, cartes arrondies, micro-interactions, reveal au scroll). En-tête/pied de page refaits. Anciens `assets/style.css` et `assets/main.js` supprimés (devenus inutilisés). `sitemap.xml` : `lastmod` au 2026-10-07.
- **2026-10-07** — Menu burger mobile ajouté sur les 5 pages : bouton `.menu-toggle` (visible < 720 px) qui ouvre les liens de navigation en panneau déroulant (`header.site.open nav.main`). Toggle JS dans `assets/site.js` (pages intérieures) et dans le script inline de `index.html`. Corrige l'absence de menu visible sur mobile.
- **2026-10-07** — Barre d'appel fixe mobile « Appeler Omar Berrada » rétablie sur les 5 pages (`.call-bar`, visible < 720 px, avec `env(safe-area-inset-bottom)` et `padding-bottom` du body). Répond au cahier des charges (bouton d'appel toujours accessible) et aligne le mobile sur les maquettes Figma.
- **2026-10-07** — Intégration de la maquette Figma : hero de l'accueil en deux colonnes avec illustration SVG vectorielle (scène d'intérieur au trait + lignes zèbre, accent doré) dans un panneau `surface`, et icônes SVG au trait sur les 3 cartes « Domaines » (bureaux / hôtellerie / retail). Styles `.hero-grid`, `.hero-visual`, `.domain .ic` ajoutés dans le `<style>` de `index.html`.
- **2026-10-07** — Thème clair forcé sur tout le site (`data-theme="light"` sur `<html>` des 5 pages, suppression du `theme-color` sombre). Le mode sombre introduit par la refonte de l'accueil est désactivé : le site reste clair même si l'appareil est en mode sombre, conformément à la section 5 (« thème clair uniquement »). Les tokens sombres restent dans le CSS mais sont inertes.
