const entriesRouter = require('express').Router()
const Entry = require('../models/entry')

entriesRouter.get('/', (request, response) => {
  Entry.find({}).then((entry) => {
    response.json(entry)
  })
})

entriesRouter.get('/:id', (request, response, next) => {
  Entry.findById(request.params.id)
    .then((entry) => {
      if (entry) {
        response.json(entry)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

entriesRouter.post('/', (request, response, next) => {
  const body = request.body

  const entry = new Entry({
    content: body.content,
    important: body.important || false,
  })

  entry
    .save()
    .then((savedEntry) => {
      response.json(savedEntry)
    })
    .catch((error) => next(error))
})

entriesRouter.delete('/:id', (request, response, next) => {
  Entry.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

entriesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const entry = {
    content: body.content,
    important: body.important,
  }

  Entry.findByIdAndUpdate(request.params.id, entry, { new: true })
    .then((updatedEntry) => {
      response.json(updatedEntry)
    })
    .catch((error) => next(error))
})

module.exports = entriesRouter
