const router = require('express').Router();
let Record = require('../models/record.model');

router.route('/').get((req, res) => {
  Record.find()
    .then(record => res.json(record))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const recordname = req.body.recordname;
  const band = req.body.band;
  const genre = req.body.genre;
  const description = req.body.description;
  const released = Date.parse(req.body.released);
  const edition = req.body.edition;
  const price = Number(req.body.price);
  

  const newRecord = new Record({
    recordname,
    band,
    genre,
    description,
    released,
    edition,
    price

  });

  newRecord.save()
  .then(() => res.json('Record added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Record.findById(req.params.id)
    .then(record => res.json(record))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Record.findByIdAndDelete(req.params.id)
    .then(() => res.json('Record deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Record.findById(req.params.id)
    .then(record => {
      record.recordname = req.body.recordname;
      record.band = req.body.band;
      record.genre = req.body.genre;
      record.description = req.body.description;
      record.released = Date.parse(req.body.released);
      record.edition = req.body.edition;
      record.price = Number(req.body.price);

      record.save()
        .then(() => res.json('Record updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;