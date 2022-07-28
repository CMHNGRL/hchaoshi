const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/pyk', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

mongoose.connection.on('connected', () => {
    console.log('MoogoDB connect success')
});

mongoose.connection.on('error', () => {
    console.log('MoogoDB connect fail')
});

mongoose.connection.on('disconnected', () => {
    console.log('MoogoDB connect disconnected')
});

mongoose.connection.once('open', () => {})