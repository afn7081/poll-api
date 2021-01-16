module.exports.errorHandler=require('./errorHandler').errorHandler
module.exports.notFound=require('./errorHandler').notFound
module.exports.authHandlers=require('./authHandlers')
module.exports.showPolls=require('./poll.js').showPolls
module.exports.createPoll=require('./poll.js').createPoll
module.exports.userPolls=require('./poll.js').userPolls
module.exports.getPoll=require('./poll.js').getPoll
module.exports.deletePoll=require('./poll.js').deletePoll
module.exports.vote=require('./poll.js').vote

