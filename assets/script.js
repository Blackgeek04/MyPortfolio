// Menu mobile, année, chargement des projets depuis assets/projets.js, apparition au défilement.
(function () {
    const boutonMenu = document.querySelector('.menu-bouton');
    const menu = document.querySelector('.menu');
    const grille = document.getElementById('grille-projets');

    boutonMenu.addEventListener('click', function () {
        const ouvert = menu.classList.toggle('ouvert');
        boutonMenu.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (lien) {
        lien.addEventListener('click', function () {
            menu.classList.remove('ouvert');
            boutonMenu.setAttribute('aria-expanded', 'false');
        });
    });

    document.getElementById('annee').textContent = new Date().getFullYear();

    // Apparition au défilement
    function activerApparition() {
        const blocs = document.querySelectorAll('.reveal:not(.visible)');
        if (!('IntersectionObserver' in window)) {
            blocs.forEach(function (b) { b.classList.add('visible'); });
            return;
        }
        const observateur = new IntersectionObserver(function (entrees) {
            entrees.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    observateur.unobserve(e.target);
                }
            });
        }, { threshold: 0.12 });
        blocs.forEach(function (b) { observateur.observe(b); });
    }

    // Création d'un élément avec du texte (textContent : pas d'injection HTML possible)
    function creer(balise, classe, texte) {
        const el = document.createElement(balise);
        if (classe) el.className = classe;
        if (texte !== undefined) el.textContent = texte;
        return el;
    }

    function carteProjet(projet) {
        const carte = creer('article', 'carte-projet reveal');

        // Capture d'écran facultative : champ "image" dans projets.js (disparaît si le fichier est introuvable)
        if (projet.image) {
            const img = creer('img', 'capture');
            img.src = projet.image;
            img.alt = 'Capture d’écran de ' + projet.nom;
            img.loading = 'lazy';
            img.addEventListener('error', function () { img.remove(); });
            carte.appendChild(img);
        }
        carte.appendChild(creer('div', 'statut statut-' + projet.statut_type, projet.statut));
        const titre = creer('h3');
        if (projet.id) {
            const a = creer('a', null, projet.nom);
            a.href = 'projet.html?id=' + encodeURIComponent(projet.id);
            titre.appendChild(a);
        } else {
            titre.textContent = projet.nom;
        }
        carte.appendChild(titre);
        carte.appendChild(creer('p', null, projet.description));

        if (projet.points && projet.points.length) {
            const liste = creer('ul', 'points');
            projet.points.forEach(function (point) { liste.appendChild(creer('li', null, point)); });
            carte.appendChild(liste);
        }

        if (projet.tags && projet.tags.length) {
            const tags = creer('div', 'tags');
            projet.tags.forEach(function (tag) { tags.appendChild(creer('span', null, tag)); });
            carte.appendChild(tags);
        }

        // Les liens n'apparaissent que s'ils sont renseignés (lien_demo, lien_code)
        if (projet.lien_demo || projet.lien_code) {
            const liens = creer('div', 'liens');
            [['lien_demo', 'Voir la démo'], ['lien_code', 'Code source']].forEach(function (c) {
                if (!projet[c[0]]) return;
                const lien = creer('a', null, c[1]);
                lien.href = projet[c[0]];
                lien.target = '_blank';
                lien.rel = 'noopener';
                liens.appendChild(lien);
            });
            carte.appendChild(liens);
        }
        if (projet.id) carte.appendChild(creer('p', 'voir', 'Voir le projet →'));
        return carte;
    }

    function afficherProjets(projets) {
        grille.innerHTML = '';
        const visibles = projets
            .filter(function (p) { return p.visible !== false; })
            .sort(function (a, b) { return (a.ordre || 0) - (b.ordre || 0); });

        if (!visibles.length) {
            grille.appendChild(creer('p', 'message-etat', 'Aucun projet à afficher pour le moment.'));
            return;
        }
        visibles.forEach(function (p) { grille.appendChild(carteProjet(p)); });
        activerApparition();
    }

    // Les projets viennent de assets/projets.js (variable window.PROJETS).
    // Chargé par une balise <script> : fonctionne en ouvrant index.html directement (file://) et sur Vercel.
    function chargerProjets() {
        if (window.PROJETS && window.PROJETS.projets) {
            afficherProjets(window.PROJETS.projets);
            return;
        }
        const s = document.createElement('script');
        s.src = 'assets/projets.js';
        s.onload = function () {
            afficherProjets((window.PROJETS && window.PROJETS.projets) || []);
        };
        s.onerror = function () {
            grille.innerHTML = '';
            grille.appendChild(creer('p', 'message-etat',
                'Les projets ne se chargent pas. Vérifie que le fichier assets/projets.js existe.'));
        };
        document.head.appendChild(s);
    }

    chargerProjets();
    activerApparition();
})();
