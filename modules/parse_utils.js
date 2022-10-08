export const ParseClasse = (nomClasse, callback) => {
    const nomDeClasse = Parse.Object.extend(nomClasse);
    const query = new Parse.Query(nomDeClasse);
    query.limit(6);
    query.find().then(rep => {
        callback(rep)
    });
}
