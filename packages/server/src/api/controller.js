import service from './service'

const controller = {}

controller.getSummonerByName = (req, res) => {
  const data = {
    summonerName: req.params.summonerName.toLowerCase().replace(/^\s+/g, ''),
    region: req.params.region,
  }
  service.getSummonerByName(data, (error, results) => {
    if (error) {
      console.error(error)
      res.status(500).send()
    } else {
      res.json(results)
    }
  })
}

controller.getLiveGameBySummonerID = (req, res) => {
  const data = {
    summonerId: req.params.summonerId,
    region: req.params.region,
  }
  service.getLiveGameBySummonerID(data, (error, results) => {
    if (error) {
      res.status(500).send()
    } else {
      res.json(results)
    }
  })
}

export default controller
