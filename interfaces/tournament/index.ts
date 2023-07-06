export interface Tournament {
  name: string;
  admin_user : string;
  type: string;
  gameType: string;
  buyInAmount: number;
  registrationStart: Date;
  registrationEnd: Date;
  playerLimit: number;
  startingChipCount: number;
  prizeStructure: number;
  tournamentStartTime: Date;
  levelDuration: number;
  startingBlinds: number;
  blindIncreaseSchedule: number;
  lateRegistration: number;
  isRebuyable: boolean;
  breaks: number;
  blindincreaseInterval: number;
}

export interface CreateTournamentRes {
  message: string;
  data: object;
}

export interface updateTournamentRes {
  message: string;
  data: object;
}

export interface DeleteTournamentRes {
  message: string;
  data: object;
}

export interface GetTournamentListRes {
  message: string;
  data: Tournament[];
}

export interface TournamentType {
  name : string,
  description : string
}

export interface GameType {
  name : string,
  description : string
}