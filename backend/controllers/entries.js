const entriesRouter = require('express').Router()
const Entry = require('../models/entry')

entriesRouter.get('/', (req, res) => {
  Entry.find({}).then((entry) => {
    res.json(entry)
  })
})

entriesRouter.get('/:id', (req, res, next) => {
  Entry.findById(req.params.id)
    .then((entry) => {
      if (entry) {
        res.json(entry)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

entriesRouter.post('/', (req, res, next) => {
  const body = req.body

  const entry = new Entry({
    date: body.date,
    content: body.content,
  })

  entry
    .save()
    .then((savedEntry) => {
      res.json(savedEntry)
    })
    .catch((error) => next(error))
})

entriesRouter.delete('/:id', (req, res, next) => {
  Entry.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

entriesRouter.put('/:id', (req, res, next) => {
  const body = req.body

  const entry = {
    date: body.date,
    content: body.content,
  }

  Entry.findByIdAndUpdate(req.params.id, entry, { new: true })
    .then((updatedEntry) => {
      res.json(updatedEntry)
    })
    .catch((error) => next(error))
})

module.exports = entriesRouter
