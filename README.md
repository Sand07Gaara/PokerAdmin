# Poker Game Admin Side Server

This server provides APIs for managing tournaments, games, users, and hand history for the Poker game admin side.

# Getting Started

To set up the development environment, follow these steps:

1. Clone the repository to your local machine.
2. Install NodeJS and npm on your machine.
3. Navigate to the project directory in your terminal.
4. Run npm install to install the required dependencies.
5. Create a .env file in the root directory and add the necessary environment variables (e.g. database connection string, JWT secret key).
6. Run npm start to start the server.

# APIs

The following APIs are available:

1. Authentication

   - POST /api/auth/login: Logs in a user and returns a JWT token.
   - POST /api/auth/forgotpassword: Sends a otp email to the user's email address.

2. Tournaments

   - POST /api/tournament/getlist: Returns a list of all tournaments.
   - POST /api/tournament/detail: Returns details of a specific tournament.
   - POST /api/tournament/create: Creates a new tournament.
   - PUT /api/tournament/update: Updates an existing tournament.
   - DELETE /api/tournament/:id: Deletes a tournament.

3. Tournament Types

   - GET /api/tournament/type/getlist: Returns a list of all tournament types.
   - POST /api/tournament/type/detail: Returns details of a specific tournament type.
   - POST /api/tournament/type/create: Creates a new tournament type.
   - PUT /api/tournament/type/update: Updates an existing tournament type.
   - DELETE /api/tournament/type/:id: Deletes a tournament type.

4. Game Types

   - GET /api/game/type/getlist: Returns a list of all game types.
   - POST /api/game/type/detail: Returns details of a specific game type.
   - POST /api/game/type/create: Creates a new game type.
   - PUT /api/game/type/update: Updates an existing game type.
   - DELETE /api/game/type/:id: Deletes a game type.

5. Users

   - GET /api/user/getcounts: Returns numbers of user who registered in today, this week, this month and this year.
   - POST /api/user/detail: Returns details of a specific user.
   - POST /api/users/list: Returns the list of users.

6. Hand History
   - POST /api/handhistory/getlist: Returns a list of all hand history records.
   - POST /api/handhistory/detail: Returns details of a specific history.
   - DELETE /api/handhistory/:id : Deletes a hand history.

# Data Stores

The server stores tournament data in a Cosmos DB NoSQL database. User data are being stored in Cosmos MongoDB by user side.

```
  Tournament

  {
    "name": string,
    "tournament_type_id":        string(objectID),
    "game_type_id":              string(objectID),
    "buy_in_amount":             number,
    "registration_start":        Date and Time
    "registration_end":          Date and Time
    "player_limit":              number,
    "starting_chip_count":       number,
    "prize_structure":           number,
    "tournament_start_time":     Date and Time,
    "level_duration":            number,
    "starting_blinds":           number,
    "blind_increase_schedule":   number,
    "late_registration":         number,
    "breaks":                    number,
    "is_rebuyable":              boolean,
    "blind_increase_interval":   number,
    "registered_user":           Array of string,
    "admin_user_id":             string(objectID),
  }
```

```
  Tournament Type

  {
    "name":       string,
    "descrition": string,
  }
```

```
  Game Type

  {
    "name":       string,
    "descrition": string,
  }
```

```
   Hand History

   {
      tournament_id :   string (objectID),
      user_id :         string (objectID) (winner),
      cards_dealt :     Array of Strings,
      actions_taken :   Array of Strings,
      start_time :      Date and Time,
      end_time :        Date and Time
   }
```
