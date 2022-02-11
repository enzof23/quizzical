const general = document.getElementById("general");
const movies = document.getElementById("movies");
const sport = document.getElementById("sport");

const data = {
  category: 0,
  amount: 5,
  difficulty: 0,
};

fetch(
  `https://opentdb.com/api.php?amount=${data.amount}&category=${data.category}&difficulty=${data.difficulty}&type=multiple`
)
  .then((response) => response.json())
  .then((data) => getAPI(data.results));

function getAPI(data) {
  console.log(data);
}

console.log(
  `https://opentdb.com/api.php?amount=${data.amount}&category=${data.category}&difficulty=${data.difficulty}&type=multiple`
);
