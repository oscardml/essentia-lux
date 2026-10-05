"use server";

import { createAdminClient } from "@/lib/supabase/admin";

export async function validateDiscountCode(codeInput: string) {
  if (!codeInput) return null;
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("discount_codes")
    .select("code, percent, is_used")
    .eq("code", codeInput.trim().toUpperCase())
    .single();

  if (error || !data || data.is_used) {
    return null;
  }
  return { code: data.code, percent: data.percent };
}
