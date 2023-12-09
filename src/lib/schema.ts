export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      items: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          is_bought: boolean;
          link: string | null;
          name: string;
          price: number;
          wishlist_id: number | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          is_bought?: boolean;
          link?: string | null;
          name?: string;
          price: number;
          wishlist_id?: number | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          is_bought?: boolean;
          link?: string | null;
          name?: string;
          price?: number;
          wishlist_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'items_wishlist_id_fkey';
            columns: ['wishlist_id'];
            isOneToOne: false;
            referencedRelation: 'wishlists';
            referencedColumns: ['id'];
          },
        ];
      };
      moods: {
        Row: {
          id: number;
          mood_color: string;
          mood_name: string;
        };
        Insert: {
          id?: number;
          mood_color: string;
          mood_name: string;
        };
        Update: {
          id?: number;
          mood_color?: string;
          mood_name?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          date_of_birth: string | null;
          id: string;
          user_name: string;
        };
        Insert: {
          avatar_url?: string | null;
          date_of_birth?: string | null;
          id: string;
          user_name: string;
        };
        Update: {
          avatar_url?: string | null;
          date_of_birth?: string | null;
          id?: string;
          user_name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      shops: {
        Row: {
          id: number;
          link_name: string | null;
          link_url: string;
          user_id: string;
        };
        Insert: {
          id?: number;
          link_name?: string | null;
          link_url: string;
          user_id: string;
        };
        Update: {
          id?: number;
          link_name?: string | null;
          link_url?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'shops_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      wishlists: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          is_shared: boolean;
          owner_id: string;
          title: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          is_shared?: boolean;
          owner_id: string;
          title: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          is_shared?: boolean;
          owner_id?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'wishlists_owner_id_fkey';
            columns: ['owner_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      delete_avatar: {
        Args: {
          avatar_full_url: string;
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
      Database['public']['Views'])
  ? (Database['public']['Tables'] & Database['public']['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
  ? Database['public']['Enums'][PublicEnumNameOrOptions]
  : never;
