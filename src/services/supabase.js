import { createClient } from "@supabase/supabase-js";

const url = "https://ymssvogefaetxpvuwlqi.supabase.co";
const supabase = createClient(
  url,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltc3N2b2dlZmFldHhwdnV3bHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYxODc5ODEsImV4cCI6MjAyMTc2Mzk4MX0.9NEKrxrYl01hJ0IHUwXWDVlS1j8OHABVR_-vwWqjIHo"
);

export default supabase;
