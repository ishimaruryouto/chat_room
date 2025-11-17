// supabase/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://izvuusjevnpdjvljmkxp.supabase.co";
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6dnV1c2pldm5wZGp2bGpta3hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzMjIwMjMsImV4cCI6MjA3ODg5ODAyM30.Ut4XShz9eLB_eltKhXJsl7Qw1nM2NP1UHiOZ7B_xt2c";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);