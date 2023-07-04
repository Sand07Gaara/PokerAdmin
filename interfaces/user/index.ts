export interface PlayerInfo {
  id: string;
  username: string;
  status: number;
  created_date: Date;
  mail_date: Date;
  spin_date: Date;
  VTD: number;
  country: string;
}

export interface ListRes {
  message: string;
  data: PlayerInfo[];
}
