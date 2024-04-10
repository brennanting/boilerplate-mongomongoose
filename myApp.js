require('dotenv').config();
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  var heJiong = new Person({name: "He Jiong", age: 49, favoriteFoods: ["Mango", "Xiang Cuisine"]})
  heJiong.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

var arrayOfPeople = [
  {name: "Song Yuqi", age: 24, favoriteFoods: ["Jokbal", "Pickled Radish"]},
  {name: "Justin Huang", age: 22, favoriteFoods: ["Hotpot", "Orange", "Konjac Shuang", "Mango", "Tomato"]},
  {name: "Johnny Huang", age: 31, favoriteFoods: ["Tomato", "Hot Sour Noodles", "Hotpot"]},
  {name: "Tan Weiwei", age: 41, favoriteFoods: ["Mango", "Salad"]},
  {name: "Ella Chen", age: 42, favoriteFoods: ["Mango", "Bak Kut Teh"]},
  {name: "Qi Sijun", age: 29, favoriteFoods: ["Mango", "Xiang Cuisine"]}
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, foodFound){
    if (err) return console.log(err);
    done(null, foodFound);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, personFound){
    if (err) return console.log(err);
    done(null, personFound);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, personFound) {
    if (err) return console.log(err);
    personFound.favoriteFoods.push(foodToAdd);
    personFound.save(function(err, updatedPerson) {
      if (err) return console.log(err);
      done(null, updatedPerson);
    }) 
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, updatedPerson){
    if (err) return console.log(err);
    done(null, updatedPerson);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, removedPerson) {
    if (err) return console.log(err);
    done(null, removedPerson);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, removedPeople) {
    if (err) return console.log(err);
    done(null, removedPeople);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
        .sort({name: "asc"})
        .limit(2)
        .select("-age")
        .exec((err, data) => {
          if (err) return console.log(err);
          done(null, data);
        })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
