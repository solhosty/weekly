export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			games: {
				Row: {
					away_score: number | null;
					away_team: string;
					date: string;
					home_score: number | null;
					home_team: string;
					id: string;
					status: string;
					week: number;
				};
				Insert: {
					away_score?: number | null;
					away_team: string;
					date: string;
					home_score?: number | null;
					home_team: string;
					id?: string;
					status: string;
					week: number;
				};
				Update: {
					away_score?: number | null;
					away_team?: string;
					date?: string;
					home_score?: number | null;
					home_team?: string;
					id?: string;
					status?: string;
					week?: number;
				};
				Relationships: [];
			};
			invites: {
				Row: {
					email: string;
					id: number;
					league_id: string;
					status: string;
				};
				Insert: {
					email: string;
					id?: number;
					league_id: string;
					status?: string;
				};
				Update: {
					email?: string;
					id?: number;
					league_id?: string;
					status?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'invites_league_id_fkey';
						columns: ['league_id'];
						referencedRelation: 'leagues';
						referencedColumns: ['id'];
					}
				];
			};
			leagues: {
				Row: {
					creator_id: string;
					id: string;
					name: string;
				};
				Insert: {
					creator_id: string;
					id?: string;
					name?: string;
				};
				Update: {
					creator_id?: string;
					id?: string;
					name?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'leagues_creator_id_fkey';
						columns: ['creator_id'];
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					}
				];
			};
			memberships: {
				Row: {
					creator: boolean;
					id: string;
					league_id: string;
					user_id: string;
				};
				Insert: {
					creator: boolean;
					id?: string;
					league_id: string;
					user_id: string;
				};
				Update: {
					creator?: boolean;
					id?: string;
					league_id?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'memberships_league_id_fkey';
						columns: ['league_id'];
						referencedRelation: 'leagues';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'memberships_user_id_fkey';
						columns: ['user_id'];
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					}
				];
			};
			picks: {
				Row: {
					game_id: string;
					id: string;
					league: string;
					picked_team: string;
					result: string | null;
					user_id: string;
				};
				Insert: {
					game_id: string;
					id?: string;
					league: string;
					picked_team: string;
					result?: string | null;
					user_id: string;
				};
				Update: {
					game_id?: string;
					id?: string;
					league?: string;
					picked_team?: string;
					result?: string | null;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'picks_game_id_fkey';
						columns: ['game_id'];
						referencedRelation: 'games';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'picks_league_fkey';
						columns: ['league'];
						referencedRelation: 'leagues';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'picks_user_id_fkey';
						columns: ['user_id'];
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					}
				];
			};
			profiles: {
				Row: {
					avatar_url: string | null;
					id: string;
					updated_at: string | null;
					username: string | null;
				};
				Insert: {
					avatar_url?: string | null;
					id: string;
					updated_at?: string | null;
					username?: string | null;
				};
				Update: {
					avatar_url?: string | null;
					id?: string;
					updated_at?: string | null;
					username?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'profiles_id_fkey';
						columns: ['id'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			delete_avatar: {
				Args: {
					avatar_url: string;
				};
				Returns: Record<string, unknown>;
			};
			delete_storage_object: {
				Args: {
					bucket: string;
					object: string;
				};
				Returns: Record<string, unknown>;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
