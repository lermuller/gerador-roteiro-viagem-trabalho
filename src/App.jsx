import { useState } from "react";
import logoSvg from "./logo.svg";

// ── Palette ──────────────────────────────────────────────────────
const C = {
  purpleDark:  "#5D00D7",
  purpleMid:   "#9B4EFF",
  purpleLight: "#F0E6FF",
  purpleBg:    "#F8F2FF",
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
  const destList = destinations.map(d => d.label + " (" + d.code + ")").join(", ");

  return `Você é um especialista em roteiros de viagem corporativa no Brasil com acesso a informações reais de voos.

TAREFA:
1. Pesquise voos reais disponíveis para as rotas abaixo no período informado usando web search
2. Baseado nos horários e disponibilidade reais encontrados, monte o roteiro mais otimizado
3. Priorize: menor tempo total de deslocamento, voos noturnos entre destinos para preservar dias úteis, sem backtracking geográfico
4. Responda SOMENTE com JSON puro — sem markdown, sem blocos de código, sem texto antes ou depois

DADOS DA VIAGEM:
- Origem: ${origin.label} (${origin.code})
- Destinos para reuniões: ${destList}
- Data início: ${startDate} | Data retorno: ${returnDate}
- Companhia preferida: ${airline}
- Horário das reuniões: ${meetingHours}
- Observações: ${departureNote || "Preferir voos noturnos entre destinos"}

REGRAS DE OTIMIZAÇÃO:
1. Pesquise rotas e horários reais de LATAM, GOL e Azul para o período
2. Escolha sequência de cidades que minimize backtracking geográfico
3. Para cada trecho, use o voo real com melhor horário — prefira saídas após 17h (noturnos) para não perder dia útil
4. Reuniões apenas em dias úteis (seg-sex), das ${meetingHours}
5. Voo de retorno obrigatoriamente em ${returnDate}
6. Se não houver voo direto, inclua a melhor conexão disponível com menor escala
7. Mantenha notas com no máximo 1 item e resumo com no máximo 4 itens

FORMATO — responda APENAS este JSON:
{"titulo":"string","subtitulo":"string","dias":[{"data":"YYYY-MM-DD","tipo":"voo_posicionamento ou reuniao_e_voo ou reuniao ou retorno","cidade":"string","badge":"string ex Dom 16 ago","badgeBg":"#hexcolor","badgeColor":"#hexcolor","titulo":"string","subtitulo":"string","reuniao":"string ou null","voos":[{"airline":"string","route":"string ex POA para CWB","time":"string ex 21h00 ate 22h15","duration":"string ex 1h15 direto","fnum":"string ou null","night":true,"aviso":"string ou null"}],"notas":["string"]}],"resumo":["string"]}`;
}

function parseItinerary(json) {
  try {
    // Strip any markdown code fences and surrounding whitespace
    let clean = json.trim();
    clean = clean.replace(/^```json\s*/i, "").replace(/^```\s*/i, "");
    clean = clean.replace(/\s*```$/i, "").trim();
    // Find the outermost JSON object in case there's stray text
    const start = clean.indexOf("{");
    const end = clean.lastIndexOf("}");
    if (start === -1 || end === -1) return null;
    clean = clean.slice(start, end + 1);
    return JSON.parse(clean);
  } catch {
    return null;
  }
}


// ── PDF Generator ─────────────────────────────────────────────────
async function generatePDF(data) {
  // Dynamically load jsPDF from CDN
  if (!window.jspdf) {
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210, MX = 18, CW = W - MX * 2;
  let y = 0;

  const colors = {
    purple: [60, 52, 137], purpleL: [238, 237, 254],
    green: [39, 80, 10],   greenL: [234, 243, 222],
    coral: [113, 43, 19],  coralL: [250, 236, 231],
    blue: [12, 68, 124],   blueL: [230, 241, 251],
    gray: [68, 68, 65],    grayL: [241, 239, 232],
    amber: [99, 56, 6],    amberL: [250, 238, 218],
    border: [211, 209, 199],
    white: [255, 255, 255],
    textMain: [26, 26, 24], textSec: [95, 94, 90], textMuted: [136, 135, 128],
  };

  const setFill = (rgb) => doc.setFillColor(...rgb);
  const setColor = (rgb) => doc.setTextColor(...rgb);
  const setDraw = (rgb) => doc.setDrawColor(...rgb);

  function rr(x, y, w, h, r, fill, stroke) {
    setFill(fill);
    if (stroke) { setDraw(stroke); doc.setLineWidth(0.3); }
    doc.roundedRect(x, y, w, h, r, r, stroke ? "FD" : "F");
  }

  function text(str, x, y, opts = {}) {
    if (opts.bold) doc.setFont("helvetica", "bold");
    else doc.setFont("helvetica", "normal");
    doc.setFontSize(opts.size || 9);
    setColor(opts.color || colors.textMain);
    doc.text(String(str || ""), x, y, { maxWidth: opts.maxWidth });
  }

  function checkPage(needed) {
    if (y + needed > 270) { doc.addPage(); y = 15; }
  }

  // HEADER
  setFill(colors.purple);
  doc.rect(0, 0, W, 28, "F");
  text(data.titulo, MX, 11, { bold: true, size: 14, color: colors.white });
  text(data.subtitulo || "", MX, 18, { size: 8, color: [175, 169, 236] });
  text("Horários sujeitos a confirmação", MX, 24, { size: 7, color: [127, 119, 221] });
  y = 34;

  const dayColors = {
    "Dom": { bg: colors.grayL, fg: colors.gray },
    "Seg": { bg: [192, 221, 151], fg: colors.green },
    "Ter": { bg: colors.blueL, fg: colors.blue },
    "Qua": { bg: colors.coralL, fg: colors.coral },
    "Qui": { bg: colors.purpleL, fg: colors.purple },
    "Sex": { bg: [243, 230, 251], fg: [90, 21, 128] },
  };

  for (const dia of (data.dias || [])) {
    // estimate block height
    const flightCount = dia.voos?.length || 0;
    const hasReuniao = !!dia.reuniao;
    const noteCount = dia.notas?.length || 0;
    const blockH = 14 + (hasReuniao ? 8 : 0) + flightCount * 10 + noteCount * 5 + 6;
    checkPage(blockH + 6);

    // card background
    rr(MX, y, CW, blockH, 3, colors.grayL, colors.border);

    // day badge
    const dayKey = (dia.badge || "").split(",")[0]?.trim();
    const dc = dayColors[dayKey] || { bg: colors.grayL, fg: colors.gray };
    rr(MX + 3, y + 3, 38, 6, 2, dc.bg);
    text(dia.badge || "", MX + 5, y + 7.5, { size: 7, bold: true, color: dc.fg });

    // title
    text(dia.titulo || "", MX + 44, y + 7.5, { size: 9, bold: true, color: colors.textMain });
    text(dia.subtitulo || "", MX + 3, y + 13, { size: 7.5, color: colors.textSec });

    let cy = y + 17;

    // meeting row
    if (hasReuniao) {
      rr(MX + 3, cy, CW - 6, 7, 2, colors.greenL, [151, 196, 89]);
      text("🤝 " + dia.reuniao, MX + 5, cy + 5, { size: 7.5, bold: true, color: colors.green });
      cy += 9;
    }

    if (hasReuniao && flightCount > 0) {
      setDraw(colors.border);
      doc.setLineWidth(0.2);
      doc.line(MX + 3, cy, MX + CW - 3, cy);
      cy += 3;
    }

    // flights
    for (const v of (dia.voos || [])) {
      const flBg = v.night ? colors.purpleL : colors.grayL;
      const flBorder = v.night ? colors.purple : colors.border;
      rr(MX + 3, cy, CW - 6, 8, 2, flBg, flBorder);
      // airline badge
      rr(MX + 5, cy + 1.5, 14, 5, 1, colors.coralL);
      text(v.airline || "", MX + 6, cy + 5.5, { size: 6, bold: true, color: colors.coral });
      text(v.route || "", MX + 22, cy + 5.5, { size: 8, bold: true, color: colors.textMain });
      text(v.time || "", MX + 95, cy + 5.5, { size: 7.5, color: colors.textSec });
      text(v.duration || "", MX + 135, cy + 5.5, { size: 7, color: colors.textMuted });
      cy += 10;
    }

    // notes
    for (const n of (dia.notas || [])) {
      text(n, MX + 5, cy + 4, { size: 7, color: colors.textMuted, maxWidth: CW - 10 });
      cy += 5;
    }

    y += blockH + 5;
  }

  // Summary
  checkPage(30);
  rr(MX, y, CW, 4, 0, colors.purple);
  text("Resumo do roteiro", MX + 3, y + 3, { size: 8, bold: true, color: colors.white });
  y += 7;
  const dotColors = ["#F0997B","#C0DD97","#AFA9EC","#85B7EB","#CECBF6","#D3D1C7"];
  (data.resumo || []).forEach((item, i) => {
    checkPage(7);
    const col = i % 2, row = Math.floor(i / 2);
    const sx = MX + col * (CW / 2);
    const sy = y + row * 6;
    doc.setFillColor(dotColors[i % 6]);
    doc.circle(sx + 3, sy + 1.5, 1.5, "F");
    text(item, sx + 7, sy + 3, { size: 7.5, color: colors.textSec, maxWidth: CW / 2 - 10 });
  });
  y += Math.ceil((data.resumo?.length || 0) / 2) * 6 + 5;

  // Footer
  checkPage(10);
  setDraw(colors.border);
  doc.setLineWidth(0.3);
  doc.line(MX, y + 3, W - MX, y + 3);
  text("Gerador de Roteiro de Viagem · Gerado por Claude · Anthropic", MX, y + 8, { size: 7, color: colors.textMuted });

  const filename = (data.titulo || "roteiro").toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".pdf";
  doc.save(filename);
}

// ── Rendered Itinerary ───────────────────────────────────────────
function ItineraryView({ data, onReset }) {
  const [pdfLoading, setPdfLoading] = useState(false);

  async function handleDownloadPDF() {
    setPdfLoading(true);
    try { await generatePDF(data); } catch(e) { alert("Erro ao gerar PDF: " + e.message); }
    finally { setPdfLoading(false); }
  }

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

      <button
        onClick={handleDownloadPDF}
        disabled={pdfLoading}
        style={{
          width: "100%", padding: "12px", borderRadius: 8, marginTop: 8,
          background: pdfLoading ? C.grayMid : C.purpleDark,
          border: "none", color: C.white, borderRadius: 100,
          fontSize: 13, fontWeight: 700, cursor: pdfLoading ? "not-allowed" : "pointer",
        }}
      >
        {pdfLoading ? "Gerando PDF..." : "⬇ Baixar PDF"}
      </button>

      <button onClick={onReset} style={{
        width: "100%", padding: "10px", borderRadius: 8, marginTop: 8,
        background: C.grayLight, border: `0.5px solid ${C.border}`,
        color: C.textSec, fontSize: 13, cursor: "pointer", fontWeight: 500, borderRadius: 100,
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

  async function callAnthropic(messages, tools, toolChoice, maxTokens = 2000) {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, tools, toolChoice, maxTokens }),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`HTTP ${res.status}: ${txt.slice(0, 120)}`);
    }
    return res.json();
  }

  async function generate() {
    if (!origin || destinations.length === 0 || !startDate || !returnDate || returnDate < startDate) return;
    setLoading(true);
    setStep("loading");
    setError(null);

    try {
      const prompt = buildPrompt({ origin, destinations, startDate, returnDate, airline, meetingHours, departureNote });

      // ── Step 1: try to search real flights (may timeout — that's OK) ──
      let searchContext = "";
      try {
        const searchQuery = `voos disponíveis ${origin.code} para ${destinations.map(d=>d.code).join(", ")} entre ${startDate} e ${returnDate}, companhias ${airline}, LATAM GOL Azul, horários e rotas reais`;
        const step1 = await callAnthropic(
          [{ role: "user", content: `Pesquise voos reais para esta viagem corporativa no Brasil: ${searchQuery}. Liste rotas, horários e companhias encontrados.` }],
          [{ type: "web_search_20250305", name: "web_search" }],
          { type: "tool", name: "web_search" },
          1500
        );
        if (!step1._timeout && !step1.error) {
          searchContext = (step1.content || [])
            .map(b => b.type === "text" ? b.text : "")
            .filter(Boolean).join("\n").slice(0, 1800);
        }
      } catch (searchErr) {
        // Search failed — continue with model knowledge
        console.warn("Busca de voos falhou, usando conhecimento do modelo:", searchErr.message);
      }

      // ── Step 2: generate optimized itinerary JSON (always runs) ──
      const contextNote = searchContext
        ? `\n\nVOOS PESQUISADOS (use estes dados reais):\n${searchContext}`
        : `\n\nUse seu conhecimento sobre rotas e horários típicos de voos domésticos brasileiros para otimizar o deslocamento.`;

      const step2 = await callAnthropic(
        [{ role: "user", content: prompt + contextNote }],
        undefined, undefined, 2500
      );

      if (step2.error) {
        setError(`Erro do servidor: ${step2.error}`);
        setStep("form");
        return;
      }

      const text = (step2.content || []).filter(b => b.type === "text").map(b => b.text).join("");

      if (!text) {
        setError(`Resposta vazia. Stop reason: ${step2.stop_reason || "desconhecido"}`);
        setStep("form");
        return;
      }

      const parsed = parseItinerary(text);
      if (parsed) {
        setItinerary(parsed);
        setStep("result");
      } else {
        setError(`JSON inválido. Início: ${text.slice(0, 300)}`);
        setStep("form");
      }
    } catch (e) {
      setError(`Erro: ${e.message}`);
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
          <img src={logoSvg} alt="logo" style={{ width: 32, height: 32 }} />
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
          <p style={{ color: C.textMuted, fontSize: 12 }}>Pesquisando voos reais e otimizando rota · pode levar até 40 segundos</p>
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
                    cursor: "pointer", transition: "all 0.15s", borderRadius: 100,
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
              width: "100%", padding: "13px", borderRadius: 100,
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
