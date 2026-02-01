export const runtime = "nodejs";
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, business, city, whatsapp, budget } = body;

        // 1. Log the lead for local visibility
        console.log('--- NEW LEAD CAPTURED ---');
        console.log('Business:', business);
        console.log('City:', city);
        console.log('WhatsApp:', whatsapp);
        console.log('Budget:', budget);
        console.log('-------------------------');

        // 2. Save lead in database if available
        if (supabase) {
            const { data, error } = await supabase
                .from('leads')
                .insert([
                    {
                        name: name || 'Prospect',
                        business,
                        city,
                        whatsapp,
                        budget: budget,
                        source: 'website'
                    },
                ])
                .select();

            if (error) {
                console.error('Supabase error:', error);
            } else {
                console.log('Successfully saved to Supabase');
            }
        }

        // 3. Optional: Send to Webhook (for Google Sheets / Gmail / Zapier)
        const WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL;
        if (WEBHOOK_URL) {
            try {
                await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        business,
                        city,
                        whatsapp,
                        budget,
                        timestamp: new Date().toISOString(),
                        source: 'nexaxotics_website'
                    })
                });
                console.log('Lead sent to external webhook');
            } catch (err) {
                console.error('Webhook error:', err);
            }
        }

        // 4. Success response
        return NextResponse.json({
            success: true,
            message: 'Lead captured successfully',
            devMode: !supabase && !WEBHOOK_URL
        });
    } catch (error: any) {
        console.error('Error capturing lead:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
