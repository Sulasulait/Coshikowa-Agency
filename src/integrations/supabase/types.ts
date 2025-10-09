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
      job_openings: {
        Row: {
          id: string
          created_at: string
          title: string
          company: string
          location: string
          description: string
          requirements: string
          salary_range: string | null
          employment_type: string
          category: string
          status: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          company: string
          location: string
          description: string
          requirements: string
          salary_range?: string | null
          employment_type: string
          category: string
          status?: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          company?: string
          location?: string
          description?: string
          requirements?: string
          salary_range?: string | null
          employment_type?: string
          category?: string
          status?: string
        }
      }
      payments: {
        Row: {
          id: string
          payment_type: string
          amount_kes: number
          amount_usd: number
          paypal_order_id: string | null
          paypal_payer_id: string | null
          payment_status: string
          form_data: Json
          email: string
          created_at: string | null
          updated_at: string | null
          completed_at: string | null
          payment_method: string
          payment_proof_url: string | null
          admin_notes: string | null
          reviewed_by: string | null
          reviewed_at: string | null
        }
        Insert: {
          id?: string
          payment_type: string
          amount_kes: number
          amount_usd: number
          paypal_order_id?: string | null
          paypal_payer_id?: string | null
          payment_status?: string
          form_data: Json
          email: string
          created_at?: string | null
          updated_at?: string | null
          completed_at?: string | null
          payment_method?: string
          payment_proof_url?: string | null
          admin_notes?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
        }
        Update: {
          id?: string
          payment_type?: string
          amount_kes?: number
          amount_usd?: number
          paypal_order_id?: string | null
          paypal_payer_id?: string | null
          payment_status?: string
          form_data?: Json
          email?: string
          created_at?: string | null
          updated_at?: string | null
          completed_at?: string | null
          payment_method?: string
          payment_proof_url?: string | null
          admin_notes?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
        }
      }
      payment_proofs: {
        Row: {
          id: string
          payment_id: string
          file_url: string
          file_name: string
          file_size: number | null
          uploaded_at: string | null
        }
        Insert: {
          id?: string
          payment_id: string
          file_url: string
          file_name: string
          file_size?: number | null
          uploaded_at?: string | null
        }
        Update: {
          id?: string
          payment_id?: string
          file_url?: string
          file_name?: string
          file_size?: number | null
          uploaded_at?: string | null
        }
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
  }
}
