// Initialisation connection Parse
Parse.serverURL = "http://90.89.42.199:8080/parse";
// Initialisation
Parse.initialize(
  "first-parse-server-2017-07" // Application ID
);
console.log("Attempt to create an article")
const Article = Parse.Object.extend("Article");
const article = new Article();

article.set("content", "ABCDE");

article.save()
.then((article) => {
  console.log('New object created with objectId: ' + article.id);
}, (error) => {
  console.log('Failed to create new object, with error code: ' + error.message);
});
