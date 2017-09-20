# [WIP] Match-Maker
This service implements a basic RESTful API to handle match making requests from a client. A client can perform basic CRUD operations for GameModes, Queues, Parties, and PlayerRankings


## GameModes
GameModes are nothing special. They simply act as a container for different groupings of queues. A GameMode consists of a name, description, whether or not it is enabled, and a unique identifier.

## Queues
Queues are a bit more interesting. They contain the same simple properties as GameModes, and in addition keep track of what parties are currently queued up, or are about to queue up.

When the service is first started, or when a new queue is added, a worker thread is spun up to keep track of parties on that particular queue (Since parties are non-persistent). When an API request dealing with a Party resource comes in, the corresponding Queue thread is contacted, and the request is dealt with accordingly.

## Parties
Parties are non-persistent resources which act as the building blocks for a match. Parties live inside a Queue instead of in a data-base. 

A party can either be queued or unqueued - if unqueued, the containing Queue object will not consider the party when building matches, but more players can join the party.

## PlayerRankings
PlayerRankings keep track of Player information which is relevant to match making, which includes MMR, wins, losses, etc.
