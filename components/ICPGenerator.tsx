"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export default function ICPGenerator() {
  const [industry, setIndustry] = useState("");
  const [persona, setPersona] = useState("");
  const [region, setRegion] = useState("");
  const [goals, setGoals] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ output: string; docUrl: string } | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "https://your-n8n-webhook-url.com";
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry, persona, region, goals })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error generating ICP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">🎯 ICP Generator</h1>

      <Card className="mb-6">
        <CardContent className="space-y-4 py-6">
          <Input
            placeholder="Industry (e.g. SaaS, FMCG)"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
          <Input
            placeholder="Target Persona (e.g. Marketing Manager)"
            value={persona}
            onChange={(e) => setPersona(e.target.value)}
          />
          <Input
            placeholder="Region / Market (e.g. US, APAC)"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
          <Textarea
            placeholder="Optional: Goals, challenges, key details"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
          />

          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
            ) : (
              "Generate ICP"
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardContent className="py-6 space-y-3">
            <h2 className="text-xl font-semibold">🎯 ICP Output</h2>
            <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-4 rounded-xl">
              {result.output || "No result found"}
            </pre>
            <a
              href={result.docUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 text-sm"
            >
              View Full Document
            </a>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 