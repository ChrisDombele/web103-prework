import { createClient } from "@supabase/supabase-js";

const URL = "https://rogprisnzdjmyyduhihs.supabase.co";

const API_KEY = "sb_publishable_zoUVSprFC9qzkzjtPyXCkw_LcSo0krC";

export const supabase = createClient(URL, API_KEY);
