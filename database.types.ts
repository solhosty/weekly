export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      games: {
        Row: {
          away_score: number | null
          away_team: string
          date: string
          home_score: number | null
          home_team: string
          id: string
          status: string
          week: number
        }
        Insert: {
          away_score?: number | null
          away_team: string
          date: string
          home_score?: number | null
          home_team: string
          id?: string
          status: string
          week: number
        }
        Update: {
          away_score?: number | null
          away_team?: string
          date?: string
          home_score?: number | null
          home_team?: string
          id?: string
          status?: string
          week?: number
        }
        Relationships: []
      }
      leagues: {
        Row: {
          creator_id: string
          id: string
          name: string
        }
        Insert: {
          creator_id: string
          id?: string
          name?: string
        }
        Update: {
          creator_id?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "leagues_creator_id_fkey"
            columns: ["creator_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      memberships: {
        Row: {
          id: string
          league_id: string
          user_id: string
        }
        Insert: {
          id?: string
          league_id: string
          user_id: string
        }
        Update: {
          id?: string
          league_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "memberships_league_id_fkey"
            columns: ["league_id"]
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "memberships_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      picks: {
        Row: {
          game_id: string
          id: string
          picked_team: string
          result: string | null
          user_id: string
        }
        Insert: {
          game_id: string
          id?: string
          picked_team: string
          result?: string | null
          user_id: string
        }
        Update: {
          game_id?: string
          id?: string
          picked_team?: string
          result?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "picks_game_id_fkey"
            columns: ["game_id"]
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "picks_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          password: string
          profile_picture: string | null
          username: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          password: string
          profile_picture?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          password?: string
          profile_picture?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
