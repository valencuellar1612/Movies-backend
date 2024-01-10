const Genre = require('./Genre');
const Actor = require('./Actor');
const Director = require('./Director');
const Movie = require('./Movie');

Movie.belongsToMany(Actor, {through: 'MovieActor'});
Actor.belongsToMany(Movie, {through: 'MovieActor'});

Movie.belongsToMany(Genre, {through: 'MovieGenre'});
Genre.belongsToMany(Movie, {through: 'MovieGenre'});

Movie.belongsToMany(Director, {through: 'MovieDirector'});
Director.belongsToMany(Movie, {through: 'MovieDirector'});