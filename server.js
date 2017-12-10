var express = require("express");
var Sequelize = require("sequelize");
var nodeadmin = require("nodeadmin");
var connection = require("express-myconnection");
var mysql = require("mysql2");


//conectare la baza de date

var sequelize = new Sequelize('reading_lists','root', '', {
    dialect: 'mysql',
    host: 'localhost',
    operatorsAliases: false
});


sequelize.authenticate().then(function(){
    console.log('Conectat cu succes!');
});

var Categorie = sequelize.define('categorie', {
    denumire: Sequelize.STRING,
    descriere: Sequelize.STRING
});

var Carte = sequelize.define('carte', {
    titlu_carte: Sequelize.STRING,
    id_categorie: Sequelize.INTEGER,
    autor: Sequelize.STRING,
    descriere_carte: Sequelize.STRING,
    imagine_carte: Sequelize.STRING
});

Carte.belongsTo(Categorie, {foreignKey: 'id_categorie', targetKey: 'id'});

var app = express();
//Create sql connection
app.use(connection( mysql, {
    host: "localhost",
    user: "root",
    password: "root",
    database: "reading_lists"
}, 'request'));

app.use(nodeadmin(app));

app.use(express.static('public'));
app.use('/admin', express.static('admin'));

app.use(express.json());
app.use(express.urlencoded());

//returneaza o lista de categorii
app.get('/categorie', function(request, response) {
    Categorie.findAll().then(function(c){
        response.status(200).send(c);
    });
});

//returneaza o categorie in functie de id
app.get('/categorie/:id', function(request, response) {
    Categorie.findOne({where: {id:request.params.id}}).then(function(c) {
        if(c) {
            response.status(200).send(c);
        } else {
            response.status(404).send();
        }
    });
});

app.post('/categorie', function(request, response) {
    Categorie.create(request.body).then(function(c) {
        response.status(201).send(c);
    });
});

app.put('/categorie/:id', function(request, response) {
    Categorie.findById(request.params.id).then(function(c) {
        if(c) {
            c.update(request.body).then(function(c){
                response.status(201).send(c);
            }).catch(function(error) {
                response.status(200).send(error);
            });
        } else {
            response.status(404).send('Not found');
        }
    });
});

app.delete('/categorie/:id', function(request, response) {
    Categorie.findById(request.params.id).then(function(c) {
        if(c) {
            c.destroy().then(function(){
                response.status(204).send();
            });
        } else {
            response.status(404).send('Not found');
        }
    });
});

app.get('/carte', function(request, response) {
    Carte.findAll(
        {
            include: [{
                model: Categorie,
                where: { id: Sequelize.col('carte.id_categorie') }
            }]
        }
        
        ).then(
            function(book) {
                response.status(200).send(book);
            }
        );
});  

app.get('/carte/:id', function(request, response) {
    Carte.findById(request.params.id).then(
            function(book) {
                response.status(200).send(book);
            }
        );
});

app.post('/carte', function(request, response) {
    Carte.create(request.body).then(function(book) {
        response.status(201).send(book);
    });
});

app.put('/carte/:id', function(request, response) {
    Carte.findById(request.params.id).then(function(book) {
        if(book) {
            book.update(request.body).then(function(book){
                response.status(201).send(book);
            }).catch(function(error) {
                response.status(200).send(error);
            });
        } else {
            response.status(404).send('Not found');
        }
    });
});

app.delete('/carte/:id', function(request, response) {
    Carte.findById(request.params.id).then(function(book) {
        if(book) {
            book.destroy().then(function(){
                response.status(204).send();
            });
        } else {
            response.status(404).send('Not found');
        }
    });
});

app.get('/categorie/:id/carte', function(request, response) {
    Carte.findAll({where:{id_categorie: request.params.id}}).then(
            function(book) {
                response.status(200).send(book);
            }
        );
});

app.listen(8080);


