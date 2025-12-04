export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      cached_weather_data: {
        Row: {
          id: string
          city_name: string
          weather_index: number
          temperature: number
          humidity: number
          precipitation: number | null
          wind_speed: number
          pressure: number
          weather_condition: string
          feels_like: number | null
          visibility: number | null
          uv_index: number | null
          latitude: number
          longitude: number
          // Legacy fields for backward compatibility
          pm25: number | null
          pm10: number | null
          no2: number | null
          so2: number | null
          o3: number | null
          co: number | null
          dominant_pollutant: string | null
          health_level: string
          api_source: string | null
          timestamp: string
          cached_at: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          city_name: string
          weather_index: number
          temperature: number
          humidity: number
          precipitation?: number | null
          wind_speed: number
          pressure: number
          weather_condition: string
          feels_like?: number | null
          visibility?: number | null
          uv_index?: number | null
          latitude: number
          longitude: number
          // Legacy fields
          pm25?: number | null
          pm10?: number | null
          no2?: number | null
          so2?: number | null
          o3?: number | null
          co?: number | null
          dominant_pollutant?: string | null
          health_level: string
          api_source?: string | null
          timestamp: string
          cached_at?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          city_name?: string
          weather_index?: number
          temperature?: number
          humidity?: number
          precipitation?: number | null
          wind_speed?: number
          pressure?: number
          weather_condition?: string
          feels_like?: number | null
          visibility?: number | null
          uv_index?: number | null
          latitude?: number
          longitude?: number
          pm25?: number | null
          pm10?: number | null
          no2?: number | null
          so2?: number | null
          o3?: number | null
          co?: number | null
          dominant_pollutant?: string | null
          health_level?: string
          api_source?: string | null
          timestamp?: string
          cached_at?: string | null
          created_at?: string | null
        }
        Relationships: []
      },
      // Backward compatibility - will be removed after type regeneration
      cached_air_quality: {
        Row: {
          api_source: string | null
          aqi: number
          cached_at: string | null
          city_name: string
          co: number | null
          created_at: string | null
          dominant_pollutant: string | null
          health_level: string
          humidity: number | null
          id: string
          latitude: number
          longitude: number
          no2: number | null
          o3: number | null
          pm10: number | null
          pm25: number | null
          pressure: number | null
          so2: number | null
          temperature: number | null
          timestamp: string
          wind_speed: number | null
        }
        Insert: {
          api_source?: string | null
          aqi: number
          cached_at?: string | null
          city_name: string
          co?: number | null
          created_at?: string | null
          dominant_pollutant?: string | null
          health_level: string
          humidity?: number | null
          id?: string
          latitude: number
          longitude: number
          no2?: number | null
          o3?: number | null
          pm10?: number | null
          pm25?: number | null
          pressure?: number | null
          so2?: number | null
          temperature?: number | null
          timestamp: string
          wind_speed?: number | null
        }
        Update: {
          api_source?: string | null
          aqi?: number
          cached_at?: string | null
          city_name?: string
          co?: number | null
          created_at?: string | null
          dominant_pollutant?: string | null
          health_level?: string
          humidity?: number | null
          id?: string
          latitude?: number
          longitude?: number
          no2?: number | null
          o3?: number | null
          pm10?: number | null
          pm25?: number | null
          pressure?: number | null
          so2?: number | null
          temperature?: number | null
          timestamp?: string
          wind_speed?: number | null
        }
        Relationships: []
      }
      devices: {
        Row: {
          created_at: string | null
          device_id: string
          device_type: string
          id: string
          last_update: string | null
          location: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          device_id: string
          device_type: string
          id?: string
          last_update?: string | null
          location: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          device_id?: string
          device_type?: string
          id?: string
          last_update?: string | null
          location?: string
          status?: string | null
        }
        Relationships: []
      }
      energy_consumption: {
        Row: {
          consumption_kwh: number
          created_at: string | null
          device_id: string
          id: string
          timestamp: string
        }
        Insert: {
          consumption_kwh: number
          created_at?: string | null
          device_id: string
          id?: string
          timestamp: string
        }
        Update: {
          consumption_kwh?: number
          created_at?: string | null
          device_id?: string
          id?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "energy_consumption_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["device_id"]
          },
        ]
      }
      ml_models: {
        Row: {
          accuracy: number | null
          created_at: string | null
          id: string
          last_trained: string | null
          model_name: string
          model_type: string
          parameters: Json | null
          status: string
        }
        Insert: {
          accuracy?: number | null
          created_at?: string | null
          id?: string
          last_trained?: string | null
          model_name: string
          model_type: string
          parameters?: Json | null
          status: string
        }
        Update: {
          accuracy?: number | null
          created_at?: string | null
          id?: string
          last_trained?: string | null
          model_name?: string
          model_type?: string
          parameters?: Json | null
          status?: string
        }
        Relationships: []
      }
      processing_batches: {
        Row: {
          batch_id: string
          created_at: string | null
          end_time: string | null
          id: string
          records_processed: number | null
          start_time: string
          status: string
          worker_id: string | null
        }
        Insert: {
          batch_id: string
          created_at?: string | null
          end_time?: string | null
          id?: string
          records_processed?: number | null
          start_time: string
          status: string
          worker_id?: string | null
        }
        Update: {
          batch_id?: string
          created_at?: string | null
          end_time?: string | null
          id?: string
          records_processed?: number | null
          start_time?: string
          status?: string
          worker_id?: string | null
        }
        Relationships: []
      }
      sensor_readings: {
        Row: {
          created_at: string | null
          device_id: string
          id: string
          sensor_type: string
          timestamp: string
          value: number
        }
        Insert: {
          created_at?: string | null
          device_id: string
          id?: string
          sensor_type: string
          timestamp: string
          value: number
        }
        Update: {
          created_at?: string | null
          device_id?: string
          id?: string
          sensor_type?: string
          timestamp?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "sensor_readings_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["device_id"]
          },
        ]
      }
      service_requests: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          location: string
          priority: string | null
          request_type: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          location: string
          priority?: string | null
          request_type: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          location?: string
          priority?: string | null
          request_type?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      system_events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          severity: string
          source: string
          timestamp: string
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          severity: string
          source: string
          timestamp: string
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          severity?: string
          source?: string
          timestamp?: string
        }
        Relationships: []
      }
      traffic_data: {
        Row: {
          congestion_level: number
          created_at: string | null
          id: string
          location: string
          timestamp: string
          vehicle_count: number
        }
        Insert: {
          congestion_level: number
          created_at?: string | null
          id?: string
          location: string
          timestamp: string
          vehicle_count: number
        }
        Update: {
          congestion_level?: number
          created_at?: string | null
          id?: string
          location?: string
          timestamp?: string
          vehicle_count?: number
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
