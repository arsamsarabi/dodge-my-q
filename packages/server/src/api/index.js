import express from 'express'
import moment from 'moment'
import controller from './controller'

const api = express.Router()

api.use((req, res, next) => {
  console.log(`Log ${moment(new Date()).format('hh:mma - Do/MMM/YYYY')}`)
  next()
})

api.get('/getSummonerByName/:region/:name', controller.getSummonerByName)
api.get('/getLiveGameBySummonerID/:region/:summonerId', controller.getLiveGameBySummonerID)


export default api