export interface TexasHoldem {
    table_name: string,
    admin_user_id: string,
    game_type_id: string,
    buy_in: number,
    small_blind: number,
    big_blind: number,
    auto_start: boolean
    private_table: boolean
    table_visiblity: boolean // ??
    rake_percentage: number,
    number_players: number
  }
  