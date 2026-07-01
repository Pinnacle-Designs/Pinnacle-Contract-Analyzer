import { NextRequest, NextResponse } from "next/server";
import { serverAppPath } from "@/lib/app-url";
import { getStripe } from "@/lib/stripe";
import { createServerSupabaseClient, createAdminSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { priceId, mode } = await req.json();
    if (!priceId || !mode) {
      return NextResponse.json({ error: "Missing priceId or mode." }, { status: 400 });
    }

    const admin = createAdminSupabaseClient();
    const { data: profile } = await admin
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
      const customer = await getStripe().customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;
      await admin
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }

    const session = await getStripe().checkout.sessions.create({
      customer: customerId,
      mode,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${serverAppPath("/dashboard")}?success=true`,
      cancel_url: serverAppPath("/pricing"),
      metadata: { supabase_user_id: user.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Checkout failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
