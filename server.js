// Importation des modules requis pour notre application et le rendering des templates
const http = require('http');
const url = require('url');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

// Création du serveur http
const server = http.createServer((req, res) => {

    // Récupération du chemin à partir de l'url de la requête en cours
    const pathname = url.parse(req.url, true).pathname;

    console.log(pathname)

    // Indiquer que le status code (code HTTP) de la réponse (res) est 200 (OK)
    res.statusCode = 200;

    // Définir le type de contenu en text/html
    res.setHeader('Content-Type', 'text/html');

    if (pathname.endsWith('.css')) {
        // Récupérer le chemin d'accès du fichier CSS
        const cssPath = path.join(__dirname, pathname);
        fs.readFile(cssPath, (err, data) => {
            if(err) {
                // Si erreur, renvoi un 404, fichier non-trouvé
                res.statusCode = 404;
                res.end('Erreur : file not found');
            } else {
                // Sinon, on défini le Content-Type de la réponse comme étant du text/css et on envoi le contenu du fichier
                res.setHeader('Content-Type', 'text/css');
                res.end(data);
            }
        })
    } else {
    // Traiter les différentes routes (conditionnement des templating a afficher selon la route active)
    switch (pathname) {
        case '/':
            // Render de la vue home
            ejs.renderFile('views/home.ejs', {}, {}, (err, str) => {
                if (err) {
                    // Si erreur, affiche l'erreur dans la console
                    console.error(err);
                    return;
                }

                // Sinon clôture de la réponse -> envoi de l'html
                res.end(str);
            })
            break;
        case '/courses': 
            const coursesDatas = {
                courses: [
                    {id: 1, name: 'Nodejs'},
                    {id: 2, name: 'Javascript'},
                    {id: 3, name: 'Nestjs'},
                    {id: 4, name: 'Angular'},
                    {id: 5, name: 'SQL procédural'},
                ]
            };

            ejs.renderFile('views/courses.ejs', coursesDatas, {}, (err, str) => {
                if (err) {
                    // Si erreur, affiche l'erreur dans la console
                    console.error(err);
                    return;
                }

                // Sinon clôture de la réponse -> envoi de l'html
                res.end(str);
            })
            break;
        case '/students': 
            const studentsData = {
                students: [
                    { id : 1, firstname : "Héloïse", lastname : "Andelhofs", gender : 'f' },
                    { id : 2, firstname : "Timothy", lastname : "Beek", gender : 'm'},
                    { id : 3, firstname : "Mathilde", lastname : "Bouckaert",  gender : 'f'},
                    { id : 4, firstname : "Romain", lastname : "Bourgeois", gender : 'm'},
                    { id : 5, firstname : "Jean-Christophe", lastname : "Cartiaux", gender : 'm'},
                    { id : 6, firstname : "Tom", lastname : "Colin", gender : 'm'},
                    { id : 7, firstname : "Nicolas", lastname : "Gemine", gender : 'm'},
                    { id : 8, firstname : "Tony", lastname : "Jadoulle", gender : 'm'},
                    { id : 9, firstname : "Vanessa", lastname : "Lutgen", gender : 'f'},
                    { id : 10, firstname : "Alain", lastname : "Roos", gender : 'm'},
                    { id : 12, firstname : "Kevser", lastname : "SARUHAN", gender : 'f'},
                    { id : 11, firstname : "Maxime", lastname : "Turla", gender : 'm'},
                ]
            }

            ejs.renderFile('views/students.ejs', studentsData, {}, (err, str) => {

            if (err) {
                    // Si erreur, affiche l'erreur dans la console
                    console.error(err);
                    return;
                }

                // Sinon clôture de la réponse -> envoi de l'html
                res.end(str);
            })
            break;
        default: 
            res.statusCode = 404;
            res.end('Page not found');
    }
}
})

server.listen(8080, () => {
    console.log('Server is running on port : 8080')
});