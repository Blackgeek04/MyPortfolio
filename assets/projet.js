// Page d'un projet : lit ?id=... dans l'adresse et affiche le projet correspondant de assets/projets.js.
(function () {
    const zone = document.getElementById('detail');
    document.getElementById('annee').textContent = new Date().getFullYear();

    function creer(balise, classe, texte) {
        const el = document.createElement(balise);
        if (classe) el.className = classe;
        if (texte !== undefined) el.textContent = texte;
        return el;
    }

    const id = new URLSearchParams(window.location.search).get('id');
    const projets = (window.PROJETS && window.PROJETS.projets) || [];
    const p = projets.find(function (x) { return x.id === id && x.visible !== false; });

    if (!p) {
        zone.appendChild(creer('p', 'message-etat', 'Projet introuvable.'));
        return;
    }

    document.title = p.nom + ' · Black_Geek';
    zone.appendChild(creer('div', 'statut statut-' + p.statut_type, p.statut));
    zone.appendChild(creer('h1', null, p.nom));
    zone.appendChild(creer('p', 'lead', p.description));

    if (p.tags && p.tags.length) {
        const tags = creer('div', 'tags');
        p.tags.forEach(function (t) { tags.appendChild(creer('span', null, t)); });
        zone.appendChild(tags);
    }

    if (p.points && p.points.length) {
        const bloc = creer('section', 'detail-bloc');
        bloc.appendChild(creer('h2', null, 'Points clés'));
        const liste = creer('ul', 'points');
        p.points.forEach(function (x) { liste.appendChild(creer('li', null, x)); });
        bloc.appendChild(liste);
        zone.appendChild(bloc);
    }

    // Démo : une page HTML affichée dans un cadre (assets/demos/xxx.html)
    if (p.demo) {
        const bloc = creer('section', 'detail-bloc');
        bloc.appendChild(creer('h2', null, 'Démo'));
        const cadre = creer('iframe', 'cadre-demo');
        cadre.src = p.demo;
        cadre.title = 'Démo de ' + p.nom;
        cadre.loading = 'lazy';
        cadre.setAttribute('sandbox', 'allow-scripts allow-forms');
        bloc.appendChild(cadre);
        const ouvrir = creer('a', 'bouton', 'Ouvrir la démo en plein écran');
        ouvrir.href = p.demo;
        ouvrir.target = '_blank';
        ouvrir.rel = 'noopener';
        bloc.appendChild(ouvrir);
        zone.appendChild(bloc);
    }

    if (p.captures && p.captures.length) {
        const bloc = creer('section', 'detail-bloc');
        bloc.appendChild(creer('h2', null, 'Captures d’écran'));
        const grille = creer('div', 'captures');
        p.captures.forEach(function (src) {
            const lien = creer('a');
            lien.href = src; lien.target = '_blank'; lien.rel = 'noopener';
            const img = creer('img');
            img.src = src; img.alt = 'Capture de ' + p.nom; img.loading = 'lazy';
            img.addEventListener('error', function () { lien.remove(); });
            lien.appendChild(img);
            grille.appendChild(lien);
        });
        bloc.appendChild(grille);
        zone.appendChild(bloc);
    }

    if (!p.demo && !(p.captures && p.captures.length)) {
        const bloc = creer('section', 'detail-bloc');
        bloc.appendChild(creer('p', 'message-etat', 'La démo de ce projet arrive bientôt.'));
        zone.appendChild(bloc);
    }

    if (p.lien_demo || p.lien_code) {
        const liens = creer('div', 'actions');
        [['lien_demo', 'Voir la version en ligne'], ['lien_code', 'Code source']].forEach(function (c) {
            if (!p[c[0]]) return;
            const a = creer('a', 'bouton', c[1]);
            a.href = p[c[0]]; a.target = '_blank'; a.rel = 'noopener';
            liens.appendChild(a);
        });
        zone.appendChild(liens);
    }
})();
