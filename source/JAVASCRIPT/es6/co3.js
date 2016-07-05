function read(file) {
    return new Promise(function(resolve, reject){
        fs.readFile(file, 'utf8', function(err,result){
            if (err) reject(err);
            else resolve(result);
        });
    });
}