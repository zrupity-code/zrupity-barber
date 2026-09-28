# Zrupity Barber · notes pour Claude

## Contexte

Projet de **Zrupity Développement** (portfolio : https://zrupity-developpement.vercel.app/, compte GitHub : `zrupity-code`). Deux sites vitrines **fictifs** ont été créés pour montrer ce savoir-faire à des clients :

- Zrupity Construction : https://github.com/zrupity-code/zrupity-construction, en ligne sur https://zrupity-code.github.io/zrupity-construction/
- Zrupity Barber : https://github.com/zrupity-code/zrupity-barber, en ligne sur https://zrupity-code.github.io/zrupity-barber/

## Règles

- Entreprise **imaginaire** : adresse, téléphone, chiffres, avis, équipe et tarifs sont inventés. Ne jamais les remplacer par des données présentées comme réelles.
- Garder visibles les mentions « site fictif » : titre de l'onglet, badge en bas à gauche vers le portfolio, pied de page, et la balise `noindex`.
- Chaque push sur `main` redéploie le site sur GitHub Pages en 1 à 2 minutes.
- Pas de tiret cadratin (—) dans les textes. Répondre en français.

## Ce projet

- Barbershop fictif, Paris 11e. React + TypeScript + Vite + Tailwind v4 + Framer Motion + Leaflet. `npm install` puis `npm run dev`. En build, `base: '/zrupity-barber/'` (voir `vite.config.ts`).
- **Accueil** : prisme 3D à 4 faces (une coupe sous 4 angles). Il tourne à l'infini à la molette uniquement dans la « Zone 360° » à droite (ligne pointillée), au glisser gauche/droite sur mobile, et lentement au repos. Ailleurs, la page défile normalement. Statut ouvert/fermé et prochain créneau libre calculés en direct (`src/lib/schedule.ts`).
- **Services** : clic = photo (panneau à droite sur ordinateur, accordéon sur mobile), aucun renvoi vers le rendez-vous.
- **Galerie** et « Nos réalisations » : photos noir et blanc agrandissables en plein écran (`Lightbox`).
- **Rendez-vous** en 4 étapes (prestation, barbier fictif, créneau, coordonnées) : rien n'est enregistré.
- **Contact** : carte Leaflet/OpenStreetMap assombrie, zoom molette sans Ctrl, pincement sur mobile. Marqueur sur le square Maurice-Gardette (lieu public, pour ne pas pointer un vrai commerce). Bouton « Itinéraire » vers Google Maps.
- Termes de coiffure en français (dégradé haut, dégradé bas, dégradé à blanc, coupe rase, banane, motifs rasés…), sauf **« taper » gardé en anglais**.
- Curseur personnalisé : simple rond sans texte ni retard. Pas de sous-titres numérotés au-dessus des titres.
- Logo : sceau cuivre (`src/assets/logo-zrupity-barber.png`). Photos Unsplash (licence libre), sans marque d'un autre salon.
- **Important** : ce site vient à l'origine du site d'un vrai salon (« Kwaik Barber »). Tout a été renommé et l'historique publié est propre. Ne jamais réintroduire de nom, adresse, téléphone ou photo de ce salon.

## Tâche en attente : ajout au portfolio

Dans le projet du portfolio (Next.js, déployé sur Vercel), ajouter **les deux projets** dans la section réalisations, au même format que les autres cartes (Le Valentino, Neven Horlogerie, Cupper, Crée ton CV IA), avec un badge « Site fictif de démonstration » :

- Vignettes 1200×750 à télécharger dans `public/` et afficher avec `next/image` :
  https://zrupity-code.github.io/zrupity-construction/images/apercu-portfolio.jpg et
  https://zrupity-code.github.io/zrupity-barber/apercu-portfolio.jpg
- Lien direct vers le site en ligne (nouvel onglet) et lien « Code source » vers GitHub.
- Vérifier le rendu sur ordinateur et mobile, puis commit et déploiement Vercel.
