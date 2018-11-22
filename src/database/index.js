import mongoose from 'mongoose'

mongoose.connect('mongodb://cgamadev:cgamadev123@ds115154.mlab.com:15154/db-users', {
    useMongoClient: true
})

mongoose.Promise == global.Promise

export default mongoose