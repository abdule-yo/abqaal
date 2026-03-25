export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          slug: string
          title: string
          description: string
          long_description: string
          location: string
          partner: string
          images: string[]
          year: number
          category: string
          impact: string[]
          duration: string
          status: 'Completed' | 'Ongoing' | 'Upcoming'
          cover_image: string
          cover_color: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          slug: string
          title: string
          description: string
          long_description?: string
          location: string
          partner: string
          images?: string[]
          year: number
          category: string
          impact?: string[]
          duration: string
          status?: 'Completed' | 'Ongoing' | 'Upcoming'
          cover_image?: string
          cover_color?: string
        }
        Update: {
          id?: string
          updated_at?: string
          slug?: string
          title?: string
          description?: string
          long_description?: string
          location?: string
          partner?: string
          images?: string[]
          year?: number
          category?: string
          impact?: string[]
          duration?: string
          status?: 'Completed' | 'Ongoing' | 'Upcoming'
          cover_image?: string
          cover_color?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          slug: string
          description: string
          category: string
          category_id: string | null
          image: string
          price: string
          featured: boolean
          highlights: string[]
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          slug: string
          description: string
          category: string
          category_id?: string | null
          image?: string
          price: string
          featured?: boolean
          highlights?: string[]
        }
        Update: {
          id?: string
          updated_at?: string
          name?: string
          slug?: string
          description?: string
          category?: string
          category_id?: string | null
          image?: string
          price?: string
          featured?: boolean
          highlights?: string[]
        }
        Relationships: []
      }
      categories: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          slug: string
          description: string
          sort_order: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          slug: string
          description?: string
          sort_order?: number
        }
        Update: {
          id?: string
          updated_at?: string
          name?: string
          slug?: string
          description?: string
          sort_order?: number
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          key: string
          value: Json
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          key: string
          value: Json
        }
        Update: {
          id?: string
          updated_at?: string
          key?: string
          value?: Json
        }
        Relationships: []
      }
      gallery: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          image_url: string
          alt_text: string
          category: string
          sort_order: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          image_url: string
          alt_text?: string
          category?: string
          sort_order?: number
        }
        Update: {
          id?: string
          updated_at?: string
          image_url?: string
          alt_text?: string
          category?: string
          sort_order?: number
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          role: string
          quote: string
          rating: number
          sort_order: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          role?: string
          quote: string
          rating?: number
          sort_order?: number
        }
        Update: {
          id?: string
          updated_at?: string
          name?: string
          role?: string
          quote?: string
          rating?: number
          sort_order?: number
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          email: string
          name: string
          role: 'super_admin' | 'admin' | 'editor'
          created_by: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          email: string
          name?: string
          role?: 'super_admin' | 'admin' | 'editor'
          created_by?: string | null
        }
        Update: {
          id?: string
          updated_at?: string
          user_id?: string
          email?: string
          name?: string
          role?: 'super_admin' | 'admin' | 'editor'
          created_by?: string | null
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      project_status: 'Completed' | 'Ongoing' | 'Upcoming'
      admin_role: 'super_admin' | 'admin' | 'editor'
    }
    CompositeTypes: Record<string, never>
  }
}
