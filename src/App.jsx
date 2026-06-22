import { useState } from "react";

// ── Palette ──────────────────────────────────────────────────────
const C = {
  purpleDark:  "#3C3489",
  purpleMid:   "#7F77DD",
  purpleLight: "#EEEDFE",
  purpleBg:    "#F5F4FF",
  green:       "#27500A",
  greenLight:  "#EAF3DE",
  greenMid:    "#97C459",
  coral:       "#712B13",
  coralLight:  "#FAECE7",
  blue:        "#0C447C",
  blueLight:   "#E6F1FB",
  amber:       "#633806",
  amberLight:  "#FAEEDA",
  amberMid:    "#FAC775",
  gray:        "#444441",
  grayLight:   "#F1EFE8",
  grayMid:     "#B4B2A9",
  border:      "#D3D1C7",
  textMain:    "#1a1a18",
  textSec:     "#5F5E5A",
  textMuted:   "#888780",
  white:       "#ffffff",
};

// ── Brazilian airports ────────────────────────────────────────────
const AIRPORTS = [
  // São Paulo
  { code: "GRU", city: "São Paulo", label: "São Paulo (Guarulhos — GRU)" },
  { code: "CGH", city: "São Paulo", label: "São Paulo (Congonhas — CGH)" },
  { code: "VCP", city: "Campinas", label: "Campinas / Viracopos (VCP)" },
  { code: "SJP", city: "São José do Rio Preto", label: "São José do Rio Preto (SJP)" },
  { code: "RAO", city: "Ribeirão Preto", label: "Ribeirão Preto (RAO)" },
  { code: "BAU", city: "Bauru", label: "Bauru (BAU)" },
  { code: "SOD", city: "Sorocaba", label: "Sorocaba (SOD)" },
  // Rio de Janeiro
  { code: "GIG", city: "Rio de Janeiro", label: "Rio de Janeiro (Galeão — GIG)" },
  { code: "SDU", city: "Rio de Janeiro", label: "Rio de Janeiro (Santos Dumont — SDU)" },
  // Sudeste
  { code: "CNF", city: "Belo Horizonte", label: "Belo Horizonte (Confins — CNF)" },
  { code: "PLU", city: "Belo Horizonte", label: "Belo Horizonte (Pampulha — PLU)" },
  { code: "VIX", city: "Vitória", label: "Vitória (VIX)" },
  { code: "UDI", city: "Uberlândia", label: "Uberlândia (UDI)" },
  { code: "IZA", city: "Juiz de Fora", label: "Juiz de Fora (IZA)" },
  { code: "MOC", city: "Montes Claros", label: "Montes Claros (MOC)" },
  { code: "GVR", city: "Governador Valadares", label: "Governador Valadares (GVR)" },
  // Sul
  { code: "CWB", city: "Curitiba", label: "Curitiba (CWB)" },
  { code: "FLN", city: "Florianópolis", label: "Florianópolis (FLN)" },
  { code: "POA", city: "Porto Alegre", label: "Porto Alegre (POA)" },
  { code: "JOI", city: "Joinville", label: "Joinville (JOI)" },
  { code: "CXJ", city: "Caxias do Sul", label: "Caxias do Sul (CXJ)" },
  { code: "IGU", city: "Foz do Iguaçu", label: "Foz do Iguaçu (IGU)" },
  { code: "LDB", city: "Londrina", label: "Londrina (LDB)" },
  { code: "MGF", city: "Maringá", label: "Maringá (MGF)" },
  { code: "CAC", city: "Cascavel", label: "Cascavel (CAC)" },
  { code: "XAP", city: "Chapecó", label: "Chapecó (XAP)" },
  { code: "BNU", city: "Blumenau", label: "Blumenau (BNU)" },
  { code: "PFB", city: "Passo Fundo", label: "Passo Fundo (PFB)" },
  { code: "PET", city: "Pelotas", label: "Pelotas (PET)" },
  { code: "BGX", city: "Bagé", label: "Bagé (BGX)" },
  { code: "RIA", city: "Santa Maria", label: "Santa Maria (RIA)" },
  // Centro-Oeste
  { code: "BSB", city: "Brasília", label: "Brasília (BSB)" },
  { code: "CGB", city: "Cuiabá", label: "Cuiabá (CGB)" },
  { code: "CGR", city: "Campo Grande", label: "Campo Grande (CGR)" },
  { code: "GYN", city: "Goiânia", label: "Goiânia (GYN)" },
  { code: "PMW", city: "Palmas", label: "Palmas (PMW)" },
  { code: "ROO", city: "Rondonópolis", label: "Rondonópolis (ROO)" },
  // Nordeste
  { code: "FOR", city: "Fortaleza", label: "Fortaleza (FOR)" },
  { code: "SSA", city: "Salvador", label: "Salvador (SSA)" },
  { code: "REC", city: "Recife", label: "Recife (REC)" },
  { code: "NAT", city: "Natal", label: "Natal (NAT)" },
  { code: "MCZ", city: "Maceió", label: "Maceió (MCZ)" },
  { code: "AJU", city: "Aracaju", label: "Aracaju (AJU)" },
  { code: "JPA", city: "João Pessoa", label: "João Pessoa (JPA)" },
  { code: "SLZ", city: "São Luís", label: "São Luís (SLZ)" },
  { code: "THE", city: "Teresina", label: "Teresina (THE)" },
  { code: "JDO", city: "Juazeiro do Norte", label: "Juazeiro do Norte (JDO)" },
  { code: "CPV", city: "Campina Grande", label: "Campina Grande (CPV)" },
  { code: "IOS", city: "Ilhéus", label: "Ilhéus (IOS)" },
  { code: "BPS", city: "Porto Seguro", label: "Porto Seguro (BPS)" },
  { code: "VDC", city: "Vitória da Conquista", label: "Vitória da Conquista (VDC)" },
  { code: "PHB", city: "Parnaíba", label: "Parnaíba (PHB)" },
  { code: "PNZ", city: "Petrolina", label: "Petrolina (PNZ)" },
  // Norte
  { code: "BEL", city: "Belém", label: "Belém (BEL)" },
  { code: "MAO", city: "Manaus", label: "Manaus (MAO)" },
  { code: "BVB", city: "Boa Vista", label: "Boa Vista (BVB)" },
  { code: "PVH", city: "Porto Velho", label: "Porto Velho (PVH)" },
  { code: "RBR", city: "Rio Branco", label: "Rio Branco (RBR)" },
  { code: "STM", city: "Santarém", label: "Santarém (STM)" },
  { code: "MCP", city: "Macapá", label: "Macapá (MCP)" },
  { code: "IMP", city: "Imperatriz", label: "Imperatriz (IMP)" },
  { code: "OAL", city: "Cacoal", label: "Cacoal (OAL)" },
].sort((a, b) => a.city.localeCompare(b.city, "pt-BR"));

const AIRLINES = ["LATAM", "GOL", "Azul", "Qualquer"];

const DAYS_PT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS_PT = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

function fmtDate(d) {
  const dt = new Date(d + "T12:00:00");
  return `${DAYS_PT[dt.getDay()]}, ${dt.getDate()} ${MONTHS_PT[dt.getMonth()]}`;
}

// ── Sub-components ───────────────────────────────────────────────
function Badge({ text, bg, color, size = 11 }) {
  return (
    <span style={{
      background: bg, color, fontSize: size, fontWeight: 600,
      padding: "2px 9px", borderRadius: 5, whiteSpace: "nowrap",
      display: "inline-block",
    }}>{text}</span>
  );
}

function Card({ children, highlight }) {
  return (
    <div style={{
      background: C.white,
      border: `${highlight ? "1.5px" : "0.5px"} solid ${highlight ? C.purpleMid : C.border}`,
      borderRadius: 10, padding: "16px 18px", marginBottom: 10,
    }}>{children}</div>
  );
}

function FlightRow({ airline, route, time, duration, fnum, night }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "8px 12px", borderRadius: 7,
      background: night ? C.purpleLight : C.grayLight,
      border: `0.5px solid ${night ? C.purpleMid : C.border}`,
      marginBottom: 5,
    }}>
      <Badge text={airline} bg={C.coralLight} color={C.coral} size={10} />
      <span style={{ flex: 1, fontWeight: 600, fontSize: 13, color: C.textMain }}>{route}</span>
      <span style={{ fontSize: 12, color: C.textSec, whiteSpace: "nowrap" }}>{time}</span>
      <span style={{ fontSize: 11, color: C.textMuted, whiteSpace: "nowrap" }}>{duration}</span>
    </div>
  );
}

function MeetingRow({ text }) {
  return (
    <div style={{
      padding: "8px 12px", borderRadius: 7,
      background: C.greenLight, border: `0.5px solid ${C.greenMid}`,
      fontWeight: 600, fontSize: 13, color: C.green, marginBottom: 5,
    }}>🤝 {text}</div>
  );
}

function WarnRow({ text }) {
  return (
    <div style={{
      padding: "8px 12px", borderRadius: 7,
      background: C.amberLight, border: `0.5px solid ${C.amberMid}`,
      fontSize: 11, color: C.amber, marginBottom: 6,
    }}>⚠ {text}</div>
  );
}

function Note({ text }) {
  return <p style={{ fontSize: 11, color: C.textMuted, margin: "2px 0 8px 4px" }}>{text}</p>;
}

function NightLabel() {
  return <p style={{ fontSize: 11, fontWeight: 600, color: C.purpleDark, margin: "6px 0 5px" }}>🌙 Voo noturno</p>;
}

function SectionHeader({ dateBadge, badgeBg, badgeColor, title, subtitle }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <Badge text={dateBadge} bg={badgeBg} color={badgeColor} size={10} />
        <span style={{ fontWeight: 600, fontSize: 14, color: C.textMain }}>{title}</span>
      </div>
      <span style={{ fontSize: 12, color: C.textSec }}>{subtitle}</span>
    </div>
  );
}

// ── Itinerary logic ──────────────────────────────────────────────
function buildPrompt({ origin, destinations, startDate, returnDate, airline, meetingHours, departureNote }) {
  return `Você é um especialista em roteiros de viagem corporativa no Brasil.

Gere um roteiro de viagem detalhado com as seguintes informações:
- Cidade de origem: ${origin.label} (${origin.code})
- Destinos para reuniões: ${destinations.map(d => `${d.label} (${d.code})`).join(", ")}
- Data de início: ${startDate}
- Data de retorno à origem: ${returnDate} — o último dia do roteiro deve ser o voo de volta para ${origin.label} (${origin.code})
- Companhia aérea preferida: ${airline}
- Horário das reuniões: ${meetingHours}
- Preferência de voos: noturnos entre destinos quando possível
- ${departureNote ? `Nota adicional: ${departureNote}` : ""}

Regras:
1. Otimize a rota geográfica (sem backtracking)
2. Use voos noturnos entre destinos para não perder dias úteis
3. Priorize a companhia aérea indicada
4. Cada reunião deve ser em um dia útil (seg–sex)
5. Sugira voos reais operados por companhias brasileiras (LATAM, GOL, Azul)
6. Para retorno, considere conexões em GRU se necessário
7. O voo de retorno deve obrigatoriamente ocorrer na data de retorno informada

Responda APENAS com JSON válido, sem markdown, sem texto fora do JSON. Estrutura:
{
  "titulo": "string",
  "subtitulo": "string",
  "dias": [
    {
      "data": "YYYY-MM-DD",
      "tipo": "voo_posicionamento" | "reuniao_e_voo" | "reuniao" | "retorno",
      "cidade": "string",
      "badge": "string (ex: Dom, 16 ago · noite)",
      "badgeBg": "hex color",
      "badgeColor": "hex color",
      "titulo": "string",
      "subtitulo": "string",
      "reuniao": "string ou null (ex: Reunião em Curitiba · 09h00 – 17h00)",
      "voos": [
        {
          "airline": "string",
          "route": "string (ex: POA → CWB)",
          "time": "string (ex: 21h00 → 22h15)",
          "duration": "string (ex: 1h15 · direto)",
          "fnum": "string ou null",
          "night": true | false,
          "aviso": "string ou null"
        }
      ],
      "notas": ["string"]
    }
  ],
  "resumo": ["string"]
}`;
}

function parseItinerary(json) {
  try {
    const clean = json.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch {
    return null;
  }
}

// ── Rendered Itinerary ───────────────────────────────────────────
function ItineraryView({ data, onReset }) {
  const badgeMap = {
    "Dom": [C.grayLight, C.gray],
    "Seg": ["#C0DD97", C.green],
    "Ter": [C.blueLight, C.blue],
    "Qua": [C.coralLight, C.coral],
    "Qui": [C.purpleLight, C.purpleDark],
    "Sex": ["#F3E6FB", "#5A1580"],
  };

  return (
    <div>
      {/* Header */}
      <div style={{
        background: C.purpleDark, borderRadius: 12,
        padding: "20px 20px 16px", marginBottom: 16,
      }}>
        <h2 style={{ color: C.white, margin: "0 0 4px", fontSize: 18, fontWeight: 700 }}>{data.titulo}</h2>
        <p style={{ color: "#AFA9EC", margin: 0, fontSize: 12 }}>{data.subtitulo}</p>
      </div>

      {/* Days */}
      {data.dias.map((dia, i) => {
        const dayKey = dia.badge?.split(",")[0]?.trim();
        const [bg, fg] = badgeMap[dayKey] || [C.grayLight, C.gray];
        return (
          <Card key={i}>
            <SectionHeader
              dateBadge={dia.badge}
              badgeBg={dia.badgeBg || bg}
              badgeColor={dia.badgeColor || fg}
              title={dia.titulo}
              subtitle={dia.subtitulo}
            />
            {dia.reuniao && <MeetingRow text={dia.reuniao} />}
            {dia.reuniao && dia.voos?.length > 0 && (
              <hr style={{ border: "none", borderTop: `0.5px solid ${C.border}`, margin: "10px 0" }} />
            )}
            {dia.voos?.map((v, j) => (
              <div key={j}>
                {v.aviso && <WarnRow text={v.aviso} />}
                {v.night && <NightLabel />}
                <FlightRow {...v} />
              </div>
            ))}
            {dia.notas?.map((n, j) => <Note key={j} text={n} />)}
          </Card>
        );
      })}

      {/* Summary */}
      <Card>
        <p style={{ fontWeight: 600, fontSize: 13, color: C.textMain, margin: "0 0 10px" }}>Resumo do roteiro</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {data.resumo?.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 12, color: C.textSec }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%", flexShrink: 0, marginTop: 3,
                background: ["#F0997B","#C0DD97","#AFA9EC","#85B7EB","#CECBF6","#D3D1C7"][i % 6],
                display: "inline-block",
              }} />
              {item}
            </div>
          ))}
        </div>
      </Card>

      <p style={{ fontSize: 10, color: C.textMuted, textAlign: "center", marginTop: 8 }}>
        Horários sujeitos a confirmação · Verifique disponibilidade em latam.com antes de comprar
      </p>

      <button onClick={onReset} style={{
        width: "100%", padding: "10px", borderRadius: 8, marginTop: 8,
        background: C.grayLight, border: `0.5px solid ${C.border}`,
        color: C.textSec, fontSize: 13, cursor: "pointer", fontWeight: 500,
      }}>← Novo roteiro</button>
    </div>
  );
}

// ── Form ─────────────────────────────────────────────────────────
function DestinationTag({ dest, onRemove }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: C.purpleLight, color: C.purpleDark,
      borderRadius: 6, padding: "3px 9px", fontSize: 12, fontWeight: 500,
    }}>
      {dest.code} · {dest.city}
      <button onClick={onRemove} style={{
        background: "none", border: "none", cursor: "pointer",
        color: C.purpleMid, fontSize: 14, padding: 0, lineHeight: 1,
      }}>×</button>
    </span>
  );
}

const inputStyle = {
  width: "100%", padding: "9px 12px", borderRadius: 7,
  border: `0.5px solid ${C.border}`, background: C.white,
  fontSize: 13, color: C.textMain, outline: "none",
  boxSizing: "border-box",
};

const labelStyle = {
  fontSize: 11, fontWeight: 600, color: C.textSec,
  textTransform: "uppercase", letterSpacing: "0.05em",
  display: "block", marginBottom: 5,
};

// ── Main App ─────────────────────────────────────────────────────
export default function App() {
  const [origin, setOrigin] = useState(AIRPORTS.find(a => a.code === "POA"));
  const [destinations, setDestinations] = useState([
    AIRPORTS.find(a => a.code === "CWB"),
    AIRPORTS.find(a => a.code === "GIG"),
    AIRPORTS.find(a => a.code === "FOR"),
  ]);
  const [startDate, setStartDate] = useState("2026-08-16");
  const [returnDate, setReturnDate] = useState("2026-08-19");
  const [airline, setAirline] = useState("LATAM");
  const [meetingHours, setMeetingHours] = useState("09h00 – 17h00");
  const [departureNote, setDepartureNote] = useState("Saída domingo à noite, voos noturnos entre destinos, retorno na quarta-feira");
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);
  const [step, setStep] = useState("form"); // form | loading | result

  function addDestination(code) {
    const ap = AIRPORTS.find(a => a.code === code);
    if (ap && !destinations.find(d => d.code === code) && code !== origin?.code) {
      setDestinations([...destinations, ap]);
    }
  }

  function removeDestination(code) {
    setDestinations(destinations.filter(d => d.code !== code));
  }

  async function generate() {
    if (!origin || destinations.length === 0 || !startDate || !returnDate || returnDate < startDate) return;
    setLoading(true);
    setStep("loading");
    setError(null);

    const prompt = buildPrompt({ origin, destinations, startDate, returnDate, airline, meetingHours, departureNote });

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      const parsed = parseItinerary(text);
      if (parsed) {
        setItinerary(parsed);
        setStep("result");
      } else {
        setError("Não foi possível gerar o roteiro. Tente novamente.");
        setStep("form");
      }
    } catch (e) {
      setError("Erro de conexão. Tente novamente.");
      setStep("form");
    } finally {
      setLoading(false);
    }
  }

  // ── Render ──────────────────────────────────────────────────────
  return (
    <div style={{
      fontFamily: "'Inter', system-ui, sans-serif",
      maxWidth: 560, margin: "0 auto", padding: "20px 16px 40px",
      color: C.textMain, background: C.white, minHeight: "100vh",
    }}>
      {/* Logo / Title */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: C.purpleDark, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 16,
          }}>✈</div>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: C.purpleDark, margin: 0 }}>
            Gerador de Roteiro
          </h1>
        </div>
        <p style={{ fontSize: 12, color: C.textMuted, margin: 0 }}>
          Roteiros corporativos otimizados para voos domésticos brasileiros
        </p>
      </div>

      {step === "loading" && (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            border: `3px solid ${C.purpleLight}`,
            borderTop: `3px solid ${C.purpleDark}`,
            animation: "spin 0.8s linear infinite",
            margin: "0 auto 20px",
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: C.purpleDark, fontWeight: 600, fontSize: 14 }}>Gerando seu roteiro...</p>
          <p style={{ color: C.textMuted, fontSize: 12 }}>Otimizando rota e verificando voos · pode levar até 30 segundos</p>
        </div>
      )}

      {step === "result" && itinerary && (
        <ItineraryView data={itinerary} onReset={() => { setStep("form"); setItinerary(null); }} />
      )}

      {step === "form" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {error && (
            <div style={{
              background: "#FEE2E2", border: "0.5px solid #FCA5A5",
              borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#991B1B",
            }}>{error}</div>
          )}

          {/* Origem */}
          <div>
            <label style={labelStyle}>Cidade de origem</label>
            <select
              value={origin?.code || ""}
              onChange={e => setOrigin(AIRPORTS.find(a => a.code === e.target.value))}
              style={inputStyle}
            >
              {AIRPORTS.map(a => <option key={a.code} value={a.code}>{a.label}</option>)}
            </select>
          </div>

          {/* Destinos */}
          <div>
            <label style={labelStyle}>Destinos das reuniões</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
              {destinations.map(d => (
                <DestinationTag key={d.code} dest={d} onRemove={() => removeDestination(d.code)} />
              ))}
            </div>
            <select
              value=""
              onChange={e => { if (e.target.value) addDestination(e.target.value); }}
              style={{ ...inputStyle, color: C.textMuted }}
            >
              <option value="">+ Adicionar destino...</option>
              {AIRPORTS
                .filter(a => a.code !== origin?.code && !destinations.find(d => d.code === a.code))
                .map(a => <option key={a.code} value={a.code}>{a.label}</option>)}
            </select>
          </div>

          {/* Datas */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={labelStyle}>Início da viagem</label>
              <input
                type="date"
                value={startDate}
                onChange={e => {
                  setStartDate(e.target.value);
                  if (returnDate && e.target.value > returnDate) setReturnDate(e.target.value);
                }}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Retorno à origem</label>
              <input
                type="date"
                value={returnDate}
                min={startDate}
                onChange={e => setReturnDate(e.target.value)}
                style={{
                  ...inputStyle,
                  borderColor: returnDate && returnDate < startDate ? "#FCA5A5" : C.border,
                }}
              />
              {returnDate && returnDate < startDate && (
                <p style={{ fontSize: 10, color: "#991B1B", margin: "3px 0 0 2px" }}>
                  Data de retorno deve ser após o início
                </p>
              )}
            </div>
          </div>

          {/* Companhia */}
          <div>
            <label style={labelStyle}>Companhia aérea preferida</label>
            <div style={{ display: "flex", gap: 8 }}>
              {AIRLINES.map(a => (
                <button
                  key={a}
                  onClick={() => setAirline(a)}
                  style={{
                    flex: 1, padding: "8px 4px", borderRadius: 7, fontSize: 12, fontWeight: 500,
                    cursor: "pointer", transition: "all 0.15s",
                    background: airline === a ? C.purpleDark : C.grayLight,
                    color: airline === a ? C.white : C.textSec,
                    border: `0.5px solid ${airline === a ? C.purpleDark : C.border}`,
                  }}
                >{a}</button>
              ))}
            </div>
          </div>

          {/* Horário de reuniões */}
          <div>
            <label style={labelStyle}>Horário das reuniões</label>
            <input
              type="text"
              value={meetingHours}
              onChange={e => setMeetingHours(e.target.value)}
              placeholder="ex: 09h00 – 17h00"
              style={inputStyle}
            />
          </div>

          {/* Observações */}
          <div>
            <label style={labelStyle}>Preferências e observações</label>
            <textarea
              value={departureNote}
              onChange={e => setDepartureNote(e.target.value)}
              placeholder="ex: prefiro voos noturnos, saída domingo à noite, retorno quarta..."
              rows={3}
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
            />
          </div>

          {/* Submit */}
          <button
            onClick={generate}
            disabled={!origin || destinations.length === 0 || !startDate || !returnDate || returnDate < startDate}
            style={{
              width: "100%", padding: "13px", borderRadius: 9,
              background: (!origin || destinations.length === 0 || !returnDate || returnDate < startDate) ? C.grayMid : C.purpleDark,
              color: C.white, fontSize: 14, fontWeight: 700,
              border: "none", cursor: (!origin || destinations.length === 0) ? "not-allowed" : "pointer",
              transition: "opacity 0.15s",
            }}
          >
            Gerar roteiro →
          </button>

          <p style={{ fontSize: 11, color: C.textMuted, textAlign: "center", margin: "-4px 0 0" }}>
            Roteiro gerado por IA · confirme horários antes de comprar passagens
          </p>
        </div>
      )}
    </div>
  );
}
