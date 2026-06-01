import type { Question } from "@/data/questions";

export interface Tip {
  flash: string;
  mnemonic: string;
  hook: string;
  topic: string;
}

const TERM_TIPS: Record<string, { flash: string; mnemonic: string }> = {
  "SIEM": { flash: "SIEM = See Everything", mnemonic: "SIEM collects, correlates & alerts — it's your single pane of glass for security events." },
  "SOAR": { flash: "SOAR = Automate & Respond", mnemonic: "SOAR orchestrates responses automatically — when SIEM detects, SOAR reacts via playbooks." },
  "DNS Blackholing": { flash: "DNS = Sink the domain", mnemonic: "DNS Blackholing swallows malicious domains before they resolve — like a black hole at the DNS level." },
  "Chain of Custody": { flash: "Chain = Prove it's untouched", mnemonic: "Chain of Custody = unbroken record of who touched evidence & when. Breaks chain = inadmissible." },
  "MITRE D3FEND": { flash: "D3FEND = Defensive ATT&CK", mnemonic: "MITRE D3FEND maps defense techniques against ATT&CK. ATT&CK = offence, D3FEND = defence." },
  "Eradication": { flash: "Eradicate = Kill the root", mnemonic: "Eradication removes the root cause (patches, fixes). Containment = stop spread. Eradication = kill the infection." },
  "Containment": { flash: "Contain = Stop the spread", mnemonic: "Containment isolates the threat to stop lateral movement — like quarantining a sick patient." },
  "Recovery": { flash: "Recovery = Back to normal", mnemonic: "Recovery restores systems to normal operations after threat is gone. Last IR step before post-incident review." },
  "Preparation": { flash: "Prepare = Before the fire", mnemonic: "Preparation builds the tools, plans, and team BEFORE an incident. It's the IR phase that prevents chaos." },
  "Post-incident Activities": { flash: "Post = Learn from it", mnemonic: "Post-incident = lessons learned meeting. Happens AFTER recovery. Includes timeline review & improvements." },
  "Forensic Analyst": { flash: "Forensics = Digital detective", mnemonic: "Forensic Analyst collects & analyses digital evidence for legal/investigation purposes." },
  "Incident Manager": { flash: "IM = Central comms hub", mnemonic: "Incident Manager is the single point of contact coordinating all departments during an incident." },
  "Amazon GuardDuty": { flash: "GuardDuty = AWS threat radar", mnemonic: "GuardDuty is AWS's managed threat detection — monitors CloudTrail, VPC Flow Logs & DNS automatically." },
  "Azure Monitor": { flash: "Azure Monitor = Azure telemetry", mnemonic: "Azure Monitor collects & visualises telemetry from ALL Azure resources — the observability backbone." },
  "Anomaly-based detection": { flash: "Anomaly = Deviation alarm", mnemonic: "Anomaly-based fires when behaviour deviates from baseline — no prior signature needed. Great for zero-days." },
  "Signature-based detection": { flash: "Signature = Known patterns", mnemonic: "Signature-based matches known attack patterns. Fast & precise but blind to novel threats." },
  "Machine Learning (ML)": { flash: "ML = Learns the normal", mnemonic: "ML learns what's normal and flags what isn't — adapts without predefined rules. Best for zero-day & APTs." },
  "False Negative": { flash: "FN = Missed threat", mnemonic: "False Negative = attack happened but NO alert fired. The dangerous miss. Think: 'false — nothing wrong here' when something WAS wrong." },
  "False Positive": { flash: "FP = Cry wolf", mnemonic: "False Positive = alert fired but no real threat. Causes alert fatigue. Think: alarm going off in an empty house." },
  "Strategic Threat Intelligence": { flash: "Strategic = C-suite level", mnemonic: "Strategic TI is high-level — geopolitical trends, long-term risks for executives. Not technical IOCs." },
  "Tactical Threat Intelligence": { flash: "Tactical = TTPs", mnemonic: "Tactical TI covers adversary TTPs (Tactics, Techniques, Procedures) — how attackers operate." },
  "Technical Threat Intelligence": { flash: "Technical = IOCs & hashes", mnemonic: "Technical TI = specific IOCs: IPs, hashes, domains, URLs — the most actionable & short-lived intel." },
  "Threat Intelligence Platforms": { flash: "TIP = Intel aggregator", mnemonic: "Threat Intelligence Platforms aggregate, normalise & share intel from multiple sources automatically." },
  "Grok Filters": { flash: "Grok = Named regex patterns", mnemonic: "Grok filters parse unstructured logs into structured fields using named regex — built into Logstash & ELK." },
  "Log correlation": { flash: "Correlation = Connect the dots", mnemonic: "Log correlation links related events across different sources — turns isolated logs into an attack narrative." },
  "Centralized logging": { flash: "Central = One place, all logs", mnemonic: "Centralized logging aggregates logs from all sources to one location — enables cross-system correlation." },
  "Actions on Objectives": { flash: "Actions = Final goal achieved", mnemonic: "Kill Chain's last phase — attacker finally does what they came for: steal data, encrypt, destroy. All prior phases led here." },
  "Persistence": { flash: "Persistence = Stay alive", mnemonic: "APT Persistence = attacker maintains long-term access via scheduled tasks, registry keys, backdoors — even after reboots." },
  "Cloud Access Security Broker": { flash: "CASB = Cloud gatekeeper", mnemonic: "CASB sits between users and cloud apps to enforce policies, monitor data, and ensure compliance." },
  "Hybrid Model, Jointly Managed": { flash: "Hybrid = Best of both", mnemonic: "Hybrid SIEM = on-prem + cloud. Jointly managed = team + MSSP. Solves data residency AND expertise gaps." },
  "Managed SIEM": { flash: "Managed = Outsourced expert", mnemonic: "Managed SIEM = vendor manages the SIEM for you — great when you need expertise without building a team." },
  "In-house Internal SOC Model": { flash: "In-house = Full control", mnemonic: "Internal SOC = complete control & data sovereignty. Needed for strict compliance. Requires big budget & talent." },
  "MDR": { flash: "MDR = Managed + Hunt", mnemonic: "MDR (Managed Detection & Response) adds proactive threat hunting + active containment — beyond just monitoring." },
  "IRT": { flash: "IRT = Incident specialists", mnemonic: "IRT (Incident Response Team) manages complex incidents — forensics, containment, legal — beyond SOC's daily monitoring." },
  "Structured Hunting": { flash: "Structured = Hypothesis-driven", mnemonic: "Structured hunting starts with a hypothesis based on TTPs (often from MITRE ATT&CK) — not just reacting to alerts." },
  "Directory Traversal": { flash: "Traversal = Path escape", mnemonic: "Directory Traversal uses ../ to navigate outside web root and access restricted files. Look for path manipulation clues." },
  "Session Fixation": { flash: "Fixation = Cookie trap", mnemonic: "Session Fixation: attacker sets a known session ID before login — then hijacks it after user authenticates." },
  "Deprovisioning Users SOAR Playbook": { flash: "Deprovision = Kill access fast", mnemonic: "Deprovisioning SOAR playbook auto-revokes access for compromised/suspicious accounts — key for insider threats." },
  "Demilitarized Zone (DMZ)": { flash: "DMZ = Buffer zone", mnemonic: "DMZ is a network buffer between public and private — public servers live here, shielding the internal network." },
  "Static analysis": { flash: "Static = No execution", mnemonic: "Static analysis examines malware WITHOUT running it — reads code, strings, headers. Safe but limited." },
  "Dynamic analysis": { flash: "Dynamic = Watch it run", mnemonic: "Dynamic analysis executes malware in a sandbox to observe real behaviour — richer but requires safe environment." },
  "Malware Disassembly": { flash: "Disassembly = Binary reading", mnemonic: "Disassembly converts binary to assembly instructions WITHOUT execution — deepest static analysis method." },
  "Proxy Servers": { flash: "Proxy = Web middleman", mnemonic: "Proxy servers intercept all HTTP/HTTPS traffic — inspect, filter, block before requests reach users." },
  "Access Control": { flash: "Access Control = First containment", mnemonic: "In insider threat/data exfiltration, restrict access FIRST to stop ongoing exfiltration before full forensics." },
  "Vulnerable and Outdated Components": { flash: "Outdated = Known CVEs", mnemonic: "OWASP A06 — using libraries with known unpatched vulnerabilities. If you can't patch → add compensating controls." },
  "NetFlow (RFC 3954)": { flash: "NetFlow = Traffic statistics", mnemonic: "NetFlow (RFC 3954) collects IP flow statistics from routers/switches — ideal for exfiltration & anomaly detection." },
  "Syslog Relay": { flash: "Relay = Log forwarder", mnemonic: "Syslog Relay sits between devices and central server — receives logs from many sources and forwards them onward." },
  "Syslog Transport Layer": { flash: "Transport = Reliable delivery", mnemonic: "Syslog Transport Layer handles how logs travel over the network — focus here for reliability & security of log delivery." },
  "Trend Analysis Report": { flash: "Trend = Over time patterns", mnemonic: "Trend Analysis Report shows patterns over time — perfect for justifying investments based on increasing attack types." },
  "SIEM Use Case Management": { flash: "Use Case = Detection scenario", mnemonic: "SIEM Use Case Management defines specific threat scenarios to detect — reducing false positives by being targeted." },
  "Transaction Log": { flash: "Transaction = DB change record", mnemonic: "Transaction Log records all DB modifications (INSERT/UPDATE/DELETE) — gold for detecting unauthorized database changes." },
  "Human Intelligence": { flash: "HUMINT = People-based intel", mnemonic: "Human Intelligence (HUMINT) comes from people — interviews, social engineering detection, psychological profiling." },
  "Extended Log Format (ELF)": { flash: "ELF = Extra web log fields", mnemonic: "ELF extends CLF with more fields (referer, user-agent, method) — structured web log format for forensic analysis." },
  "Setup Event Log": { flash: "Setup = Installation events", mnemonic: "Setup Event Log records Windows installations & configuration changes — find unauthorized software installs here." },
  "Alerting and Reporting": { flash: "Alert = Threshold + notify", mnemonic: "Alerting & Reporting fires when thresholds are breached and generates tickets — combines detection + notification + ticketing." },
  "Requirement Analysis": { flash: "Requirement = Define the need", mnemonic: "Requirement Analysis in CTI defines WHAT intelligence is needed before collecting it — the planning phase." },
  "Comma-Separated Values (CSV)": { flash: "CSV = Tabular text", mnemonic: "CSV stores data in rows & columns as plain text — easy to import into databases or spreadsheets for analysis." },
  "Indicators of Attack (IoAs)": { flash: "IoA = Behaviour in progress", mnemonic: "IoAs are ACTIVE attack behaviours (intent + action) vs IOCs which are past artefacts. IoAs catch attacks sooner." },
  "Data Integration": { flash: "Integration = Aggregate all sources", mnemonic: "Data Integration in threat hunting combines internal + external sources for a full picture — holistic threat view." },
};

const TOPIC_MAP: [string, string[]][] = [
  ["Incident Response", ["incident", "contain", "eradicat", "recover", "forensic", "triage", "irt", "ir phase", "chain of custody", "post-incident", "notif"]],
  ["SIEM & Logging", ["siem", "log", "correlat", "alert", "syslog", "grok", "elk", "parsing", "normali", "centraliz", "logging_collector", "sentinel", "splunk"]],
  ["Threat Intelligence", ["threat intel", "cti", "ioc", "ioa", "indicator", "mitre", "kill chain", "apt lifecycle", "ttps", "strategic", "tactical", "operational", "technical intel"]],
  ["Network Security", ["network", "firewall", "packet", "dns", "dmz", "ids", "ips", "ddos", "netflow", "botnet", "syslog relay", "transport"]],
  ["Cloud Security", ["cloud", "aws", "azure", "saas", "paas", "iaas", "guarduty", "casb", "cspm"]],
  ["SOAR & Automation", ["soar", "playbook", "automat", "orchestrat", "xsoar"]],
  ["Malware Analysis", ["malware", "ransomware", "trojan", "virus", "static analysis", "dynamic analysis", "disassembly", "sandbox", "reverse"]],
  ["Web Security", ["web application", "sql injection", "xss", "csrf", "http", "session", "cookie", "directory traversal", "owasp"]],
  ["SOC Operations", ["soc", "analyst", "tier ", "capability maturity", "cmm", "soc model", "mssp", "mdr", "in-house", "outsourc"]],
  ["APT & Threat Hunting", ["apt", "persist", "lateral", "hunt", "structured hunting", "unstructured", "adversary", "c2", "command and control"]],
  ["Risk & Compliance", ["risk", "compliance", "hipaa", "pci", "gdpr", "maturity model", "risk matrix", "vulnerability"]],
];

function detectTopic(q: Question): string {
  const text = (q.question + " " + q.options.map((o) => o.text).join(" ")).toLowerCase();
  for (const [topic, keywords] of TOPIC_MAP) {
    if (keywords.some((k) => text.includes(k))) return topic;
  }
  return "General Security";
}

function extractHook(qText: string): string {
  const sentences = qText.split(/\.\s+/);
  const lastQ = sentences[sentences.length - 1] || sentences[0];
  const words = lastQ.split(/\s+/).slice(-12);
  const hook = words.join(" ").replace(/\?$/, "").trim();
  return hook.charAt(0).toUpperCase() + hook.slice(1);
}

export function generateTip(q: Question, chosenKey: string): Tip {
  const correct = q.options.find((o) => o.key === q.answer)!;
  const topic = detectTopic(q);
  const hook = extractHook(q.question);

  for (const [term, tip] of Object.entries(TERM_TIPS)) {
    if (correct.text.toLowerCase().includes(term.toLowerCase())) {
      return { flash: tip.flash, mnemonic: tip.mnemonic, hook, topic };
    }
  }

  const acronyms = correct.text.match(/\b[A-Z]{2,6}\b/g);
  if (acronyms && acronyms.length > 0) {
    const acronym = acronyms[0];
    return {
      flash: `Remember: ${acronym}`,
      mnemonic: `${correct.text} — look for the acronym ${acronym} as the key identifier in similar questions.`,
      hook,
      topic,
    };
  }

  const irPhases = ["Preparation", "Notification", "Incident Triage", "Incident Recording", "Containment", "Evidence Gathering", "Eradication", "Recovery", "Post-incident"];
  for (const phase of irPhases) {
    if (correct.text.includes(phase)) {
      return {
        flash: `IR: ${phase}`,
        mnemonic: `"${phase}" in the IR lifecycle — focus on what specific actions the scenario describes, not the outcome.`,
        hook,
        topic,
      };
    }
  }

  const keyWords = correct.text.split(/\s+/).filter((w) => w.length > 4 && !/^(with|that|this|from|when|which|their|they|using|after|before|during)$/i.test(w));
  const flashKey = keyWords.slice(0, 3).join(" ") || correct.text;

  return {
    flash: `Key: ${flashKey}`,
    mnemonic: `"${correct.text}" — connect the question scenario to this specific concept. Re-read the question stem for clues.`,
    hook,
    topic,
  };
}

export function getTopicBreakdown(
  questions: Question[],
  wrongAnswers: { q: Question; chosen: string }[]
): { topic: string; total: number; wrong: number; pct: number }[] {
  const wrongIds = new Set(wrongAnswers.map((w) => w.q.id));
  const topicMap = new Map<string, { total: number; wrong: number }>();

  for (const q of questions) {
    const topic = detectTopic(q);
    const cur = topicMap.get(topic) ?? { total: 0, wrong: 0 };
    cur.total++;
    if (wrongIds.has(q.id)) cur.wrong++;
    topicMap.set(topic, cur);
  }

  return [...topicMap.entries()]
    .map(([topic, { total, wrong }]) => ({
      topic,
      total,
      wrong,
      pct: Math.round(((total - wrong) / total) * 100),
    }))
    .sort((a, b) => a.pct - b.pct);
}
