/* eslint-disable strict */
const express = require('express');
const xss = require('xss');
const path = require('path');
const {requireAuth} = require('../middleware/jwt-auth');
const LineService = require('./line-service');

const lineRouter = express.Router();
const jsonBodyParser = express.json();

lineRouter
  .use(requireAuth)

lineRouter
  .get('/', async (req, res, next) => {
    try {
      let line = await LineService.getFullLine(
        req.app.get('db'),
        req.user.id,
      )

      line = line.map(g => {
        return LineService.serializeGuest(g)
      })

      res.json(
        line
      )
      next()
    } catch (error) {
      next(error)
    }
  })
  .post('/', jsonBodyParser, async (req, res, next) => {
    const {guest_name, phone_number, size} = req.body;
    const required = {
      guest_name,
      phone_number,
      size
    }

    for (const [key, value] of Object.entries(required)) 
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    try {
      const newGuest = {
        guest_name,
        phone_number,
        size
      }

      newGuest.user_id = req.user.id

      const guest = await LineService.addNewGuest(
        req.app.get('db'),
        newGuest
      )

      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${guest.id}`))
        .json(LineService.serializeGuest(guest))
    }
    catch (error) {
      next(error)
    }
  });

lineRouter
  .all('/:id', (req, res, next) => {
    LineService.getById(
      req.app.get('db'),
      req.params.id
    )
      .then(guest => {
        if(!guest) {
          return res
            .status(404)
            .json({
              error: `Guest does not exist`
            })
        }
        res.guest = guest
        next()
      })
      .catch(next)
  })
  .get('/:id', async (req, res, next) => {
    try {
      res
        .status(200)
        .json(
          LineService.serializeGuest(res.guest)
        )
      next()
    }
    catch(error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    LineService.deleteGuest(
      req.app.get('db'),
      req.params.id
    )
      .then(numRowsAffected => {
        res
          .status(204)
          .end()
      })
      .catch(next)
  })
  .patch('/:id', jsonBodyParser, (req, res, next) => {
    const {id} = req.params
    const {guest_name, phone_number, size} = req.body
    const updatedGuest = {guest_name, phone_number, size}

    const numberOfValues = Object.values(updatedGuest).filter(Boolean).length
    if (numberOfValues === 0) {
      return res
        .status(400)
        .json({
          error: `Request body must contain guest_name, phone_number, size`
        })
    }

    LineService.updateInfo(
      req.app.get('db'),
      id,
      updatedGuest
    )
      .then(numRowsAffected => {
        res
          .status(204)
          .end()
      })
      .catch(next)
  })

module.exports = lineRouter;