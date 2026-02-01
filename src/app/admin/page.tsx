"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Table, Database, RefreshCcw, ExternalLink, Loader2, ArrowLeft } from "lucide-react";

export default function AdminDashboard() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchLeads = async () => {
        setLoading(true);
        if (!supabase) {
            setError("Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setLeads(data || []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white pt-40 pb-20 px-8 bg-make-gradient relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
                    <div>
                        <div className="trust-badge mb-4 inline-block">Internal Systems</div>
                        <h1 className="text-4xl md:text-5xl font-black mb-2 flex items-center gap-4 tracking-tighter">
                            <Database className="text-primary w-10 h-10" />
                            Lead Control <span className="text-gradient">Center</span>
                        </h1>
                        <p className="text-muted-foreground text-[10px] uppercase tracking-[0.3em] font-black">
                            NEXAXOTICS Systems v2.8 // Authorized Access Only
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2 px-6 py-2 glass border border-white/5 rounded-full hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-widest">
                            <ArrowLeft className="w-3 h-3" />
                            Back to Website
                        </Link>
                        <button
                            onClick={fetchLeads}
                            className="flex items-center gap-3 px-8 py-3 glass border border-white/10 rounded-full hover:bg-white/5 transition-all text-sm font-black uppercase tracking-widest group"
                        >
                            <RefreshCcw className={`w-4 h-4 text-primary group-hover:rotate-180 transition-transform duration-500 ${loading ? 'animate-spin' : ''}`} />
                            Refresh Data
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="p-8 glass border border-red-500/20 rounded-3xl mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="flex items-center gap-4 text-red-500 mb-4">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <p className="font-black uppercase tracking-widest text-sm">System Error Caught</p>
                        </div>
                        <p className="text-white font-medium mb-4 ml-6">{error}</p>
                        <p className="text-xs text-muted-foreground ml-6 leading-relaxed">
                            Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are active in your `.env.local` file.
                            If you haven't created the table yet, use the SQL: `create table leads (id uuid default uuid_generate_v4() primary key, business text, city text, whatsapp text, budget text, created_at timestamp with time zone default now());`
                        </p>
                    </div>
                )}

                <div className="bento-card p-0 overflow-hidden border-white/5 shadow-navy-glow">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/[0.02]">
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-primary">Pipeline Step</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-primary">Business Entity</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-primary">Location</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-primary">WhatsApp Uplink</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-primary">Target Budget</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-primary">Landed At</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-primary">Direct Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {leads.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-8 py-32 text-center text-muted-foreground italic">
                                            {loading ? (
                                                <div className="flex flex-col items-center gap-4">
                                                    <Loader2 className="w-10 h-10 text-primary animate-spin opacity-50" />
                                                    <p className="text-xs uppercase tracking-[0.2em] font-black not-italic">Syncing with encrypted database...</p>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center gap-4">
                                                    <Table className="w-10 h-10 text-white/5" />
                                                    <p className="text-xs uppercase tracking-[0.2em] font-black not-italic opacity-40">No lead sequence data found.</p>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ) : (
                                    leads.map((lead, idx) => (
                                        <tr key={lead.id} className="hover:bg-white/[0.03] transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-black text-primary">
                                                    {leads.length - idx}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="font-bold text-lg text-white group-hover:text-primary transition-colors">{lead.business}</span>
                                            </td>
                                            <td className="px-8 py-6 text-sm text-muted-foreground tracking-tight font-medium">{lead.city}</td>
                                            <td className="px-8 py-6">
                                                <code className="bg-white/5 px-3 py-1.5 rounded-lg text-xs font-mono text-primary/80 border border-white/5">
                                                    {lead.whatsapp}
                                                </code>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-[10px] font-black text-primary uppercase tracking-widest border border-primary/20">
                                                    {lead.budget}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                                                {new Date(lead.created_at).toLocaleDateString()} // {new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </td>
                                            <td className="px-8 py-6">
                                                <a
                                                    href={`https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, '')}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-primary transition-all group/wa"
                                                >
                                                    WhatsApp Uplink <ExternalLink className="w-4 h-4 group-hover/wa:translate-x-1 group-hover/wa:-translate-y-1 transition-transform" />
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.4em] font-black">
                            Security Protocol: AES-256 Active // System Health: Optimal
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
