const routes = (app) => {

    app.route('/')
    .get((req, res) => {
        res.send('This is the Get Method')
    })
    
    .post((req, res) =>{
        res.send('This is the Post Method')
    })
    
    .put((req, res) =>{
        res.send('This is the Put Method')
    })
    
    app.delete((req, res) =>{
        res.send('This is the Delete Method')
    })
}

module.exports = routes;