import isNumeric from 'validator/lib/isNumeric'

const validateAddGames = (req, res, next) => {
  if (!req.body.title.trim()) {
    return res.status(400).send({ message: 'Title cannot be empty' })
  }
  if (!req.body.genres.trim()) {
    return res.status(400).send({ message: 'Genres cannot be empty' })
  }
  if (!isNumeric(req.body.year)) {
    return res.status(400).send({ message: 'Year must be a number' })
  }
  next()
}

export default validateAddGames
