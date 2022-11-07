import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
// import AsyncStorage from "@react-native-community/async-storage";
// import { AsyncStorage } from "react-native";
const supabaseUrl = "https://ymrnbnvfyemszijmmxax.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltcm5ibnZmeWVtc3ppam1teGF4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NDYwMjAwNywiZXhwIjoxOTgwMTc4MDA3fQ.SnaBO_LWxhzZkVATIcQ9OpcVjI2L9yfa-vgGD668LwQ";
export const supabase = createClient(supabaseUrl, supabaseKey, {
  // localStorage: AsyncStorage,
  detectSessionInUrl: false,
});
