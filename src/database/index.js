import mongoose from 'mongoose'

mongoose.connect('mongodb://cgamadev:cgama123@ds115154.mlab.com:15154/dbusers', {
    useNewUrlParser: true
})

mongoose.Promise = global.Promise

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no Banco de Dados:'));

db.once('open', () => {
    console.log(`Conectado no MongoDB: ${new Date()}`)
});

export default mongoose