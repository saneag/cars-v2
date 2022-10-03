import mongoose from 'mongoose'

const CarsSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    fuel_type: {
        type: String,
        required: true,
    },
    engine_capacity: {
        type: Number,
        required: true,
    },
    engine_power: {
        type: Number,
        required: true,
    },
    traction_type: {
        type: String,
        required: true,
    },
    gearbox_type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    added_by: {
        type: String,
        required: true,
    },
    added_by_id: {
        type: String,
        required: true,
    }
})

export default mongoose.model('Cars', CarsSchema)