import { NextResponse } from "next/server";
import { serverAppPath } from "@/lib/app-url";
import { getStripe } from "@/lib/stripe";
import { createServerSupabaseClient, createAdminSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminSupabaseClient();
  const { data: profile } = await admin
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  if (!profile?.stripe_customer_id) {
    return NextResponse.json({ error: "No billing account found." }, { status: 400 });
  }

  const session = await getStripe().billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: serverAppPath("/account"),
  });

  return NextResponse.json({ url: session.url });
}
