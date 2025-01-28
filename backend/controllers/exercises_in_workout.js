
const { ExercisesInWorkout } = require('../models/exercises_in_workout')
const { Exercise } = require('../models/exercises')

// get all exercises in workout
const getExercisesInWorkout = async (req, res) => {
    try {
        const workout_id = req.params?.id
        const exercises_in_workout = await ExercisesInWorkout.findAll({where: {workout_id}, include: [{model: Exercise}], order: [['exercise_id', 'ASC'], ['set', 'ASC']]})
        res.json(exercises_in_workout)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}



// create exercise
const createExerciseInWorkout = async (req, res) => {
    try {
        const { exercise_id, workout_id, reps, weight, set } = req.body
        const exercise_in_workout = await ExercisesInWorkout.create({ exercise_id, workout_id, reps, weight, set })
        res.status(201).json(exercise_in_workout)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


// update exercise
const updateExerciseInWorkout = async (req, res) => {
    try {
        const { exercise_in_workout_id, exercise_id, workout_id, reps, weight, set } = req.body
        const exercise_in_workout = await ExercisesInWorkout.findByPk(exercise_in_workout_id)
        if (!exercise_in_workout) return res.status(404).send({ message: 'Exercise not found' })
        await exercise_in_workout.update({ exercise_id, workout_id, reps, weight, set })
        return res.status(200).send({ message: 'updated' })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}


// delete exercise
const deleteExerciseInWorkout = async (req, res) => {
    try {
        const exercise_id = req.params?.id
        const exercise_in_workout = await ExercisesInWorkout.findByPk(exercise_id)
        if (!exercise_in_workout) return res.status(404).send({ message: 'Exercise not found' })
        await exercise_in_workout.destroy()
        return res.status(200).send({ message: 'deleted' })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}



module.exports = {
    getExercisesInWorkout,
    createExerciseInWorkout,
    updateExerciseInWorkout,
    deleteExerciseInWorkout
}
