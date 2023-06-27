export interface Tournament {
    name : string;
    type : string;
    gameType : string;
    buyInAmount : number;
    registrationStart : Date;
    registrationEnd : Date;
    playerLimit : number;
    startingChipCount : number;
    prizeStructure : number;
    tournamentStartTime : Date;
    levelDuration : number;
    startingBlinds : number;
    blindIncreaseSchedule : number;
    lateRegistration : number;
    isRebuyable : boolean;
    breaks : number;
    blindincreaseInterval : number;
}

export interface CreateTournamentRes {
    message : string;
    data : object;
}