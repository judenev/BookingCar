const db = require('../utils/connections')
let carcollection = 'car'
var ObjectId = require('mongodb').ObjectId

module.exports = {
    getcars: async (resolve, reject) => {
        console.log("haiasldais");
        return await db.get().collection(carcollection).aggregate(
            [
                {
                    '$lookup': {
                        'from': 'brand',
                        'localField': 'brandId',
                        'foreignField': '_id',
                        'as': 'result1'
                    }
                }
                ,
                {
                    '$lookup': {
                        'from': 'location',
                        'localField': 'locationId',
                        'foreignField': '_id',
                        'as': 'result2'
                    }
                }
            ]


        ).toArray()

    },
    getbrands: async (resolve, reject) => {
        return await db.get().collection('brand').find().toArray()
    },
    getlocation: async (resolve, reject) => {
        return await db.get().collection('location').find().toArray()
    },
    addCar: async (mycar) => {
        let Mycar = {
            segment: mycar.segment,
            name: mycar.name,
            brandId: ObjectId(mycar.brandId),
            locationId: ObjectId(mycar.locationId),
            Booked: false,
            Bookings: []


        }

        return await db.get().collection('car').insertOne(Mycar).then((data) => {
            console.log(data);
            return data
        }).catch((err) => {
            console.log(err);
        })
    },
    deletecar: (carid) => {
        console.log(carid);
        return db.get().collection('car').deleteOne({ _id: ObjectId(carid) }).then((resp) => {
            console.log(resp);
            return true
        })

    },
    updatecar: (carid, data) => {
        console.log("ffffffffffff", data);
        let updateMYcar = {
            name: data.name,
            brandId: ObjectId(data.brandId),
            locationId: ObjectId(data.locationId)
        }
        return db.get().collection('car').updateOne({ _id: ObjectId(carid) }, { $set: updateMYcar }).then((resp) => {
            return true
        })

    },
    bookings: (carid, cardate, carlocation) => {
        console.log("ggggggg", carid, carlocation, cardate);
        let currentbooks = {
            location: ObjectId(carlocation),
            date: cardate
        }
        return db.get().collection('car').updateOne({ _id: ObjectId(carid) }, { $push: { Bookings: currentbooks } }).then((f) => {
            console.log(f);
            return true
        })
    }


}



