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
├── realisations.html   8 projets en grille immersive, filtres par typologie, vignettes → pages projet
├── chiffrage.html      5 étapes, délai 10–15 jours ouvrés, livrables
├── contact.html        Coordonnées + formulaire (ouvre un mailto pré-rempli)
├── projet-<id>.html    8 pages « étude de cas » (hero photo, fiche, galerie avec agrandissement, pager)
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
Ajouter un projet : créer `projet-<id>.html` (modèle = pages existantes : head SEO + JSON-LD `GeneralContractor`/`BreadcrumbList`, `.case-hero`, `.case-intro`, `.case-gallery` de `.g-cell` avec `data-images`/`data-start`/`data-caption`, pager en boucle), ajouter une vignette lien `<a class="tile" href="projet-<id>.html" id="…" data-cat="bureaux|hotellerie|retail">` dans `realisations.html`, mettre à jour l'`ItemList` JSON-LD (URL `projet-<id>.html`), `sitemap.xml`, et si besoin la section « Projets en vedette » de `index.html`.

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
- **2026-10-16** — Accueil, « Nos engagements » retravaillé en **frise de process** (inspiration site Archigram, adaptée au thème clair + bleu encre de la marque, pas de vert). Chaque engagement est une étape : **pastille ronde numérotée** (01/02/03, fond `--accent`, chiffre blanc, mono) posée sur une **ligne pointillée horizontale** qui relie les pastilles (`.eng>article::after`, `border-top:1.5px dashed var(--line-strong)`, masquée sur la dernière et en mobile), puis titre serif + sous-titre mono en accent + un court paragraphe (les anciennes listes à puces condensées en une phrase). Survol : la pastille grossit légèrement (`scale(1.08)`) avec une ombre teintée accent. Apparition échelonnée (`.reveal` sur chaque `article`). Remplace la version « grille bordée » précédente. CSS + balisage dans `index.html`.
- **2026-10-16** — Accueil, **sections « Nos engagements » et « Domaines d'intervention »** affinées (style Emil Kowalski, sobre). Engagements (`.eng`) : numéros 01/02/03 passés en grand chiffre serif couleur accent, sous-titre en mono, filet de séparation au-dessus de la liste, puces en anneau accent ; au survol d'une colonne, léger fond teinté + barre d'accent 2 px qui se déploie en haut. Domaines (`.domain`) : icône posée dans une **pastille arrondie teintée** (fond accent 7 %, 13 % au survol), carte en colonne flex avec le lien « Voir les réalisations → » **aligné en bas** sur les 3 cartes, rayon et ombre de survol adoucis. CSS uniquement, dans le `<style>` de `index.html`.
- **2026-10-16** — Accueil : la **bande de clients défilante** est déplacée **entre « Nos engagements » et « Domaines d'intervention »**, son titre est supprimé, et elle est posée sur un **bandeau pleine largeur fond encre** (`.marquee-band` : `background:var(--deep)`, noms en blanc à 72 % + points séparateurs à 28 %, survol blanc plein) pour une lecture nette. L'ancienne section `#references` (avec titre) est retirée de l'accueil.
- **2026-10-16** — Accueil : la grille de clients de la section « Références » devient une **bande défilante (marquee)** en continu — une seule ligne de noms en mono, séparés par des points, défilement linéaire infini (`@keyframes marquee` : `translate3d(0)` → `translate3d(-50%)`, 56 s), deux copies identiques pour une boucle sans couture (la 2ᵉ en `aria-hidden`), masque en dégradé sur les bords, pause au survol. Respecte `prefers-reduced-motion` (animation coupée, liste recentrée qui revient à la ligne, copies dupliquées masquées). Remplace l'ancienne grille `.clients` bordée sur l'accueil (CSS `.marquee/.marquee-track/.m-item` + JS de construction dans `index.html` ; la grille `.clients` de `realisations.html` est inchangée). Animation conforme au style Emil Kowalski (sobre, monochrome, transform-only).
- **2026-10-16** — Refonte premium (étape 4) — **Animations au défilement** : (1) **chiffres clés animés** du bandeau `.stats` de l'accueil — compte à rebours vers la valeur au scroll (attributs `data-count`/`data-suffix`, easeOutCubic, déclenché par IntersectionObserver à 45 % de visibilité, formatage avec espaces insécables) ; (2) **parallaxe légère des photos de hero** — la photo plein cadre de l'accueil (`.hero-media img`) et celle des pages projet (`.case-hero .hero-media img`) sont agrandies `scale(1.12)` et translatées jusqu'à ±42 px selon le scroll (rAF, listeners passifs). Les deux respectent `prefers-reduced-motion` (valeurs finales affichées d'emblée, `transform:none`) et dégradent proprement sans JS (texte en dur conservé). Logique accueil : script inline de `index.html` ; pages projet : `assets/site.js`. `will-change:transform` + garde reduced-motion dans le `<style>` de l'accueil et `assets/site.css`. Cache assets `?v=9` (pages intérieures + pages projet).
- **2026-10-16** — Refonte premium (étape 3) — **Pages « étude de cas » par projet** : création de 8 pages statiques `projet-<id>.html` (manpower, pwc, booking, villa-blanca, nike-urban-jungle, fitness-park-sale, fitness-park-rabat, adidas). Chaque page : hero plein cadre avec photo de couverture (`.case-hero`, fil d'Ariane Accueil/Réalisations/Projet, titre, lieu, puces typologie/surface/ville), intro 2 paragraphes + fiche `.case-fiche` (surface, typologie, lieu, rôle ZÉVRA, lots clés), galerie `.case-gallery` (vignettes `.g-cell` ouvrant la visionneuse au bon index via `data-start`), CTA et pager (← Toutes les réalisations / Projet suivant → en boucle). SEO : `<title>`/description/canonical/OG uniques + JSON-LD `GeneralContractor` et `BreadcrumbList` par page. `realisations.html` : les vignettes `.tile` deviennent des **liens** `<a href="projet-<id>.html">` (plus de visionneuse sur cette page, `<dialog>` retiré) ; `ItemList` JSON-LD repointé vers les URLs `projet-<id>.html`. `index.html` : nouvelle section **« Projets en vedette »** (3 tuiles photo 3/4 → pages projet, CSS `.feat` inline) avant « Références ». `assets/site.js` : visionneuse branchée sur `[data-images]` + support `data-start`. `assets/site.css` : bloc CSS `.case-*/.g-cell/.pager`. Cache assets `?v=8` (pages intérieures + pages projet). `sitemap.xml` : 8 URLs projet ajoutées, `lastmod` au 2026-10-16.
- **2026-10-16** — Refonte premium (étape 2) — **Réalisations en grille immersive** : les 8 projets sont désormais des vignettes `.tile` (photo de couverture plein cadre, dégradé bas + légende catégorie/nom/surface, survol zoom) dans `.portfolio` (2 colonnes, 1 sur mobile). Les filtres ciblent `.tile`. Clic sur une vignette → **visionneuse** (`#lightbox`) avec la galerie du projet et navigation ‹ › (data-images), clavier ←/→, compteur. CSS `.portfolio/.tile/.lightbox .nav` dans `assets/site.css`, logique dans `assets/site.js`. Anciens `.project/.meta/.gallery` devenus inutilisés (CSS conservé, inerte). Cache assets ?v=7. Ids projets conservés pour le JSON-LD `ItemList`.
- **2026-10-16** — Refonte premium (étape 1) de l'accueil : hero transformé en **photo plein écran** (`images/pwc-casablanca-open-space.webp`, dégradé sombre pour lisibilité, titre/boutons blancs superposés) à la place de l'illustration au trait ; ajout d'un **bandeau de chiffres clés** `.stats` (8 projets · 10 540 m² · 4 villes · 34 clients). La trame « plan d'architecte » du hero est remplacée par la photo. Reste à faire : grille portfolio immersive (Réalisations) + pages études de cas.
- **2026-10-08** — Favicon : `favicon.svg` redessiné aux couleurs de la marque (tuile bleu encre `#274060` arrondie + lignes « zèbre » blanches, lisible en petit) et **lié sur les 5 pages** — l'accueil `index.html` ne l'avait pas. Référence `/favicon.svg?v=2` (cache-bust).
- **2026-10-07** — Bouton WhatsApp flottant `.wa-fab` ajouté en bas à droite sur les 5 pages (rond vert `#25D366`, SVG blanc, lien `https://wa.me/212661908395` en nouvel onglet). Sur mobile (< 720 px) il remonte au-dessus de la barre d'appel fixe pour ne pas la chevaucher. CSS dans `assets/site.css` et le `<style>` de `index.html`.
- **2026-10-07** — Trame « plan d'architecte » derrière le hero de l'accueil **uniquement** : `.hero::before` (grille 1px tous les 32px via `repeating-linear-gradient`, couleur token `--grid` : `rgba(39,64,96,.05)` clair / `rgba(255,255,255,.045)` sombre), en arrière-plan (`position:absolute;inset:0;z-index:0;pointer-events:none`), estompée vers le bas par un `mask-image`. `.hero{position:relative}` et `.hero>*{z-index:1}` pour garder le contenu au-dessus. Aucune autre section touchée.
- **2026-10-07** — Nouvelle palette « Blanc & bleu encre » (corporate), uniquement les couleurs. Clair : `--paper #fafafa`, `--surface #fff`, `--ink #1b1d21`, `--ink-soft #5b606b`, `--line rgba(27,29,33,.12)`, `--accent #274060`, `--accent-ink #fff`, `--deep #1b1d21`/`--deep-ink #fff`. Sombre (blocs `prefers-color-scheme:dark` / `[data-theme=dark]`, actuellement inertes car `data-theme="light"`) : `--paper #121316`, `--surface #1a1c20`, `--ink #ecedef`, `--ink-soft #9aa0ab`, `--accent #6f93c0`, `--accent-ink #121316`. Boutons principaux (`.btn-primary`) repointés sur `--accent`. Illustrations SVG de l'accueil repassées en `#1b1d21` + accent `#274060`. `theme-color` → `#fafafa` sur les 5 pages. Rien d'autre modifié (mise en page, contenu, polices inchangés).
- **2026-10-07** — Fond du site passé en gris clair : `--paper` `#F4F0E8` → `#F0F0EF`, `--surface` → `#FAFAF9` (dans `assets/site.css` et le `<style>` de `index.html`). `theme-color` mis à `#F0F0EF` sur les 5 pages. Cache-busting des assets des pages intérieures bumpé en `?v=3`.
- **2026-10-07** — Numéro **affiché** passé au format international **+212 661 908 395** sur les 5 pages (demande du client, remplace l'ancien `0661 908 395` ; les liens `tel:` et le JSON-LD restent en `+212661908395`). La barre d'appel mobile garde le libellé « Appeler Omar Berrada ».
- **2026-10-07** — Menu burger mobile ajouté sur les 5 pages : bouton `.menu-toggle` (visible < 720 px) qui ouvre les liens de navigation en panneau déroulant (`header.site.open nav.main`). Toggle JS dans `assets/site.js` (pages intérieures) et dans le script inline de `index.html`. Corrige l'absence de menu visible sur mobile.
- **2026-10-07** — Barre d'appel fixe mobile « Appeler Omar Berrada » rétablie sur les 5 pages (`.call-bar`, visible < 720 px, avec `env(safe-area-inset-bottom)` et `padding-bottom` du body). Répond au cahier des charges (bouton d'appel toujours accessible) et aligne le mobile sur les maquettes Figma.
- **2026-10-07** — Intégration de la maquette Figma : hero de l'accueil en deux colonnes avec illustration SVG vectorielle (scène d'intérieur au trait + lignes zèbre, accent doré) dans un panneau `surface`, et icônes SVG au trait sur les 3 cartes « Domaines » (bureaux / hôtellerie / retail). Styles `.hero-grid`, `.hero-visual`, `.domain .ic` ajoutés dans le `<style>` de `index.html`.
- **2026-10-07** — Thème clair forcé sur tout le site (`data-theme="light"` sur `<html>` des 5 pages, suppression du `theme-color` sombre). Le mode sombre introduit par la refonte de l'accueil est désactivé : le site reste clair même si l'appareil est en mode sombre, conformément à la section 5 (« thème clair uniquement »). Les tokens sombres restent dans le CSS mais sont inertes.
