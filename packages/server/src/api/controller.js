import service from './service'

const controller = {}

controller.getSummonerByName = (req, res) => {
  const data = {
    name: req.params.name.toLowerCase().replace(/^\s+/g, ''),
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

controller.upadteSummoner = (req, res) => {
  const data = {
    name: req.params.name.toLowerCase().replace(/^\s+/g, ''),
    region: req.params.region,
  }
  service.updateSummonerFromRiot(data, (error, results) => {
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
      if (error.message === 'NOT IN A GAME') {
        res.status(404).send()
      } else {
        res.status(500).send()
      }      
    } else {
      res.json(results)
    }
  })
}

export default controller
