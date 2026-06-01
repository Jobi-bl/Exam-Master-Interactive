export interface Question {
  id: number;
  question: string;
  options: { key: string; text: string }[];
  answer: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question:
      "Following a high-priority security incident, you discover suspicious activity in the logs, including repeated requests attempting to access files and directories outside of the web server's root directory. Some requests appear to be manipulating URL paths to navigate into restricted system files. Which type of web application attack might have caused this incident?",
    options: [
      { key: "A", text: "SQL Injection Attack" },
      { key: "B", text: "Session Attacks / Cookie Poisoning Attacks" },
      { key: "C", text: "Cross-site Scripting (XSS) Attacks" },
      { key: "D", text: "Directory Traversal" },
    ],
    answer: "D",
  },
  {
    id: 2,
    question:
      "You are a SOC analyst working for a leading financial institution developing a comprehensive threat model. Senior management is particularly concerned about high-level risks, geopolitical threats, and emerging cybercriminal strategies that could have long-term implications. Which type of threat intelligence are you seeking to obtain?",
    options: [
      { key: "A", text: "Strategic Threat Intelligence" },
      { key: "B", text: "Tactical Threat Intelligence" },
      { key: "C", text: "Operational Threat Intelligence" },
      { key: "D", text: "Technical Threat Intelligence" },
    ],
    answer: "A",
  },
  {
    id: 3,
    question:
      "Jake Carter, a SOC analyst, is responsible for monitoring network traffic to detect potential data exfiltration attempts. His team uses a security solution that inspects data packets in real time as they traverse the network. During incident response, Jake observes that the solution struggles to analyze encrypted traffic. Which security control, with this known limitation, is the SOC team relying on?",
    options: [
      { key: "A", text: "SSH" },
      { key: "B", text: "IPsec" },
      { key: "C", text: "Packet Filters" },
      { key: "D", text: "VPN" },
    ],
    answer: "C",
  },
  {
    id: 4,
    question:
      "A financial institution suspects an insider threat due to unauthorized access attempts on restricted databases. The SIEM alerts lack sufficient information to differentiate between legitimate and malicious access. The SOC manager recommends integrating contextual data to improve detection. Which contextual data source is required to be integrated in this scenario?",
    options: [
      { key: "A", text: "Location and physical context from GPS sensors" },
      { key: "B", text: "Threat context from external threat intelligence feeds" },
      { key: "C", text: "Vulnerability context" },
      { key: "D", text: "User context from HR systems" },
    ],
    answer: "D",
  },
  {
    id: 5,
    question:
      "A SOC team is implementing a threat intelligence strategy. The CISO emphasized focusing on assigning specific personnel, tools, and time to gather intelligence aligned with the organization's most pressing security concerns. The team must determine who will be responsible for collecting intelligence, what sources will be monitored, and how frequently data should be gathered. What is this process called?",
    options: [
      { key: "A", text: "Prioritization" },
      { key: "B", text: "Resources" },
      { key: "C", text: "Tasking" },
      { key: "D", text: "High-level Requirements" },
    ],
    answer: "C",
  },
  {
    id: 6,
    question:
      "You are a SOC analyst on duty during a high-severity DDoS attack. After identifying unusual traffic patterns and tracing the attack to several command-and-control (C2) servers directing a botnet, your goal is to recommend a mitigation strategy that will sever the attackers' control over the infected devices and halt the attack. Which strategy will your team implement?",
    options: [
      { key: "A", text: "Blocking Potential Attacks" },
      { key: "B", text: "Rate Limiting" },
      { key: "C", text: "Disabling Botnets" },
      { key: "D", text: "Quarantining Endpoints" },
    ],
    answer: "C",
  },
  {
    id: 7,
    question:
      "Lisa Carter is performing a risk assessment following suspicious SIEM alerts. She assesses the likelihood of an attack, the impact on critical business operations, and the value of the assets targeted. Using the standard risk assessment formula, which scenario represents the highest risk to the organization?",
    options: [
      { key: "A", text: "Low Likelihood, High Impact, Low Asset Value" },
      { key: "B", text: "High Likelihood, High Impact, High Asset Value" },
      { key: "C", text: "Low Likelihood, Low Impact, High Asset Value" },
      { key: "D", text: "High Likelihood, Low Impact, High Asset Value" },
    ],
    answer: "B",
  },
  {
    id: 8,
    question:
      "SecureTech Inc. operates its critical infrastructure in AWS. The SOC team has observed unexpected API calls, unusual outbound traffic, and DNS requests to potentially malicious domains. They need a fully managed AWS service that continuously monitors for malicious activity, analyzes CloudTrail logs, VPC Flow Logs, and DNS query logs, and leverages machine learning to identify advanced threats. Which AWS service is best suited?",
    options: [
      { key: "A", text: "Amazon Macie" },
      { key: "B", text: "AWS Config" },
      { key: "C", text: "AWS Security Hub" },
      { key: "D", text: "Amazon GuardDuty" },
    ],
    answer: "D",
  },
  {
    id: 9,
    question:
      "A healthcare organization's SIEM detects unusual HTTP requests using TRACE and OPTIONS methods, which are rarely seen in normal web traffic. The SIEM correlates these events with an increase in reconnaissance activity on other servers within the same subnet. What is the primary security concern with TRACE and OPTIONS requests?",
    options: [
      {
        key: "A",
        text: "They can be used to upload malicious payloads directly to the server",
      },
      {
        key: "B",
        text: "They make Distributed Denial of Service (DDoS) attacks easier",
      },
      {
        key: "C",
        text: "They allow attackers to bypass authentication controls",
      },
      {
        key: "D",
        text: "They expose information about server-supported methods and request headers",
      },
    ],
    answer: "D",
  },
  {
    id: 10,
    question:
      "You are working in the Cyber Security team of Global Solutions Inc. Your analyst team utilizes syslog for centralized logging across its infrastructure. The team is tasked with ensuring that security logs are reliably sent from various remote sites to the central logging server, even across potentially unreliable network connections. Which architectural layer of syslog should your team primarily focus on optimizing and hardening?",
    options: [
      { key: "A", text: "Syslog Management and Filtering" },
      { key: "B", text: "Syslog Transport Layer" },
      { key: "C", text: "Syslog Application Layer" },
      { key: "D", text: "Syslog Content Layer" },
    ],
    answer: "B",
  },
  {
    id: 11,
    question:
      "You are a SOC analyst and notice a sharp increase in CPU utilization on one of your backend servers. An unknown process is running consuming excessive resources. Forensic analysis identifies the presence of an unrecognized scheduled task that triggers a PowerShell script connecting to an unknown IP. What should you do to confirm whether this is an active attack?",
    options: [
      { key: "A", text: "Analyze the system logs for unauthorized changes" },
      {
        key: "B",
        text: "Analyze the network logs to identify external connections",
      },
      { key: "C", text: "Review user access logs for unauthorized activity" },
      {
        key: "D",
        text: "Check file integrity and detect recent unauthorized changes",
      },
    ],
    answer: "B",
  },
  {
    id: 12,
    question:
      "SecureCorp performs millions of financial transactions daily. As part of their SOC team, you need to provide a log storage solution that is scalable to handle increasing log volumes, provides encryption for data security, and should be seamlessly accessible for compliance and regulatory requirements that mandate long-term archival. Which storage solution must you choose?",
    options: [
      { key: "A", text: "Local storage" },
      { key: "B", text: "Hybrid storage system" },
      { key: "C", text: "Cloud storage" },
      { key: "D", text: "Distributed storage system" },
    ],
    answer: "C",
  },
  {
    id: 13,
    question:
      "You are working as a SOC analyst for a cloud-based service provider that relies on PostgreSQL databases. You discover that logs are not being generated for failed authentication attempts, slow queries, or database errors. To ensure that PostgreSQL captures and stores logs for centralized monitoring and forensic analysis, which configuration parameter should you enable?",
    options: [
      { key: "A", text: "log_collector" },
      { key: "B", text: "logging_collector" },
      { key: "C", text: "logging collector" },
      { key: "D", text: "logging-collector" },
    ],
    answer: "B",
  },
  {
    id: 14,
    question:
      "A global security firm wants to integrate real-time threat feeds into its Microsoft Sentinel SIEM. They require a standardized protocol that allows automated threat intelligence sharing, ensuring that their Microsoft Sentinel environment continuously receives updates from external intelligence sources. Which Microsoft Sentinel data connector should they implement?",
    options: [
      { key: "A", text: "Microsoft Defender for Cloud (Legacy) connector" },
      { key: "B", text: "Threat Intelligence Platforms data connector" },
      { key: "C", text: "Syslog connector" },
      { key: "D", text: "CEF data connector" },
    ],
    answer: "B",
  },
  {
    id: 15,
    question:
      "An attacker repeatedly guesses login credentials. The SIEM is configured to generate an alert after 10 consecutive failed login attempts. However, the attacker successfully logs in on the 9th attempt, just before the threshold is reached, bypassing the alert mechanism. Security teams only become aware after detecting suspicious activity post-login. What type of alert classification does this represent?",
    options: [
      { key: "A", text: "True Negative" },
      { key: "B", text: "False Negative" },
      { key: "C", text: "True Positive" },
      { key: "D", text: "False Positive" },
    ],
    answer: "B",
  },
  {
    id: 16,
    question:
      "A SOC analyst is responsible for designing a security dashboard that provides real-time monitoring of security threats. The organization wants to avoid overwhelming analysts with excessive information and focus on the most critical security alerts. Which principle should guide the design of the dashboard?",
    options: [
      {
        key: "A",
        text: "Restrict dashboard access to only network administrators",
      },
      {
        key: "B",
        text: "Use only historical data to avoid real-time inconsistencies",
      },
      {
        key: "C",
        text: "Include as much data as possible to ensure complete visibility",
      },
      {
        key: "D",
        text: "Prioritize critical information and remove unnecessary details",
      },
    ],
    answer: "D",
  },
  {
    id: 17,
    question:
      "A SOC analyst receives a high-priority alert indicating unusual user activity. An employee account is attempting to access company resources from a different country and outside of normal working hours. This raises concerns about potential account compromise. To automate the initial response and quickly restrict access, which SOAR playbook would be relevant to adopt?",
    options: [
      { key: "A", text: "Alert Enrichment SOAR Playbook" },
      { key: "B", text: "Phishing Investigations SOAR Playbook" },
      { key: "C", text: "Malware Containment SOAR Playbook" },
      { key: "D", text: "Deprovisioning Users SOAR Playbook" },
    ],
    answer: "D",
  },
  {
    id: 18,
    question:
      "A large financial services company's SOC aligns with CMM Level 1. The organization aims to reach Level 3. To achieve this, the SOC must enhance incident response procedures, improve threat intelligence integration, establish key performance metrics, and implement behavior-based analytics. Based on the SOC Capability Maturity Model, which should be the first priority in transitioning from Level 1 to Level 3?",
    options: [
      {
        key: "A",
        text: "Outsourcing SOC operations to a Managed Security Service Provider (MSSP) for expertise",
      },
      {
        key: "B",
        text: "Implementing AI-driven automation for real-time threat detection and response",
      },
      {
        key: "C",
        text: "Deploying advanced deception technologies to lure attackers",
      },
      {
        key: "D",
        text: "Establishing well-defined and repeatable incident response processes",
      },
    ],
    answer: "D",
  },
  {
    id: 19,
    question:
      "A manufacturing company deploying a SIEM system uses an output-driven approach, starting with use cases that address unauthorized access to production control systems. They configure data sources and alerts specific to this use case and then move on to additional use cases. Which best describes the primary advantage of using an output-driven approach in SIEM deployment?",
    options: [
      {
        key: "A",
        text: "The company can collect logs from non-critical systems",
      },
      {
        key: "B",
        text: "The company can create more complex use cases with greater scope",
      },
      {
        key: "C",
        text: "The SIEM system can automatically block all unauthorized access attempts",
      },
      {
        key: "D",
        text: "The SOC team can respond to all incidents in real time without delays",
      },
    ],
    answer: "B",
  },
  {
    id: 20,
    question:
      "Sarah Chen is a Level 1 security analyst. The SOC team has detected a potential data breach involving unauthorized access to patient records. Multiple departments need constant updates: Legal needs to assess HIPAA compliance implications, HR needs to coordinate staff training responses, and their managed security service provider requires technical details to assist with containment. Which role effectively serves as the central point of communication between all these stakeholders?",
    options: [
      { key: "A", text: "Incident Manager" },
      { key: "B", text: "Information Security Officer" },
      { key: "C", text: "Public Relations Manager" },
      { key: "D", text: "Incident Coordinator" },
    ],
    answer: "A",
  },
  {
    id: 21,
    question:
      "A ransomware incident affected the organization's email infrastructure. The forensic analysis identifies that the ransomware exploited CVE-2024-21378 in an unpatched mail server. The IRT is now actively applying emergency patches (KB5028244), updating mail filtering rules to block malicious payloads, and implementing additional network segmentation to limit lateral movement. Which phase of the Incident Response process is the SOC currently executing?",
    options: [
      { key: "A", text: "Recovery" },
      { key: "B", text: "Containment" },
      { key: "C", text: "Evidence Gathering and Forensic Analysis" },
      { key: "D", text: "Eradication" },
    ],
    answer: "D",
  },
  {
    id: 22,
    question:
      "A mid-sized hospital's SOC team has detected multiple malware incidents that disrupted access to patient records. The SOC analysts have been tasked with eradicating infections and preventing future attacks by addressing the underlying vulnerabilities. Which eradication step would best address the root causes in the hospital's network infrastructure or system configurations?",
    options: [
      { key: "A", text: "Using Antivirus Tools for quarantine" },
      { key: "B", text: "Fixing Devices" },
      { key: "C", text: "Implementing Blacklist techniques for file execution" },
      { key: "D", text: "Updating Malware Database with vendor signatures" },
    ],
    answer: "B",
  },
  {
    id: 23,
    question:
      "Mark Reynolds is working on the eradication phase after detecting a wave of phishing attacks targeting employees. To ensure attackers cannot reuse their malicious infrastructure, Mark implements a technique that blocks known malicious IP addresses used for sending spam emails at the Domain Name System level. Which technique is best suited for this purpose?",
    options: [
      { key: "A", text: "DNS Blackholing" },
      { key: "B", text: "IP Address Blacklisting at the Firewall" },
      { key: "C", text: "URL Blacklisting on Web Proxies" },
      { key: "D", text: "SMTP Sender Filtering" },
    ],
    answer: "A",
  },
  {
    id: 24,
    question:
      "A manufacturing company deploying a SIEM system uses an output-driven approach, starting with use cases that address unauthorized access to production control systems. They configure data sources and alerts ensuring actionable alerts without excessive false positives. Which best describes the primary advantage of using an output-driven approach in SIEM deployment?",
    options: [
      {
        key: "A",
        text: "The company can create more complex use cases with greater scope",
      },
      {
        key: "B",
        text: "The company avoids the need to collect logs from non-critical systems",
      },
      {
        key: "C",
        text: "The SOC team can respond to all incidents in real time without delays",
      },
      {
        key: "D",
        text: "The SIEM system can automatically block all unauthorized access attempts",
      },
    ],
    answer: "A",
  },
  {
    id: 25,
    question:
      "A SOC analyst detects multiple instances of powershell.exe being launched with the -ExecutionPolicy Bypass and -NoProfile arguments on a domain controller. The parent process is winrm.exe, and the activity occurs during non-business hours. What should be the analyst's primary focus?",
    options: [
      {
        key: "A",
        text: "Search for Event ID 4688 to find similar PowerShell executions within the last 24 hours",
      },
      {
        key: "B",
        text: "Look for Event ID 4625 to check for failed authentication attempts before execution",
      },
      {
        key: "C",
        text: "Investigate Event ID 7045 to determine if a malicious service was created",
      },
      {
        key: "D",
        text: "Review Event ID 5145 to see if unauthorized network shares were accessed",
      },
    ],
    answer: "A",
  },
  {
    id: 26,
    question:
      "At GlobalTech, the SOC team detects a suspicious ransomware outbreak. After successfully isolating infected systems, forensic analyst Maria Martinez deploys a forensic workstation to acquire RAM dumps, extract Windows Event Logs, and collect network PCAP files from the compromised hosts. Which phase of the Incident Response lifecycle is currently underway?",
    options: [
      { key: "A", text: "Evidence Gathering and Forensic Analysis" },
      { key: "B", text: "Recovery" },
      { key: "C", text: "Eradication" },
      { key: "D", text: "Containment" },
    ],
    answer: "A",
  },
  {
    id: 27,
    question:
      "TechSolutions discovered a potential data leak after sensitive customer data was found on a public code repository. Level 2 analysts identified the data was uploaded from an internal network account. The CISO is demanding a comprehensive analysis including the extent of the data breach and timeline of events. Which SOC role is critical in gathering and analyzing the digital evidence?",
    options: [
      { key: "A", text: "Subject Matter Expert" },
      { key: "B", text: "Forensic Analyst" },
      { key: "C", text: "Threat Intelligence Analyst" },
      { key: "D", text: "SOC Manager" },
    ],
    answer: "B",
  },
  {
    id: 28,
    question:
      "A SOC team is investigating a phishing attack targeting multiple employees. During the Containment Phase, they need to determine how users interacted with the malicious email — whether they opened it, clicked on links, downloaded attachments, or entered credentials. Which specific activity helps the SOC team understand user interactions with the phishing email?",
    options: [
      { key: "A", text: "User action verification" },
      { key: "B", text: "Blocking C2 and email traffic" },
      { key: "C", text: "Malware infection check" },
      { key: "D", text: "Monitoring and containment validation" },
    ],
    answer: "A",
  },
  {
    id: 29,
    question:
      "During a routine security audit, analysts discover web servers still using a vulnerable third-party library flagged for a zero-day exploit. Patches were initially deployed but rolled back due to application instability. No alternative mitigations have been put in place. How should the security team classify this risk in the context of web application security?",
    options: [
      { key: "A", text: "Security Logging and Monitoring Failures" },
      { key: "B", text: "Vulnerable and Outdated Components" },
      { key: "C", text: "Software and Data Integrity Failures" },
      { key: "D", text: "Insecure Design" },
    ],
    answer: "B",
  },
  {
    id: 30,
    question:
      "An organization with a complex IT infrastructure is planning to implement a SIEM solution. Due to the scale and complexity, the organization opts for a phased deployment approach. Which of the following should be the first phase in their SIEM deployment strategy?",
    options: [
      {
        key: "A",
        text: "Configure security analytics to identify potential threats",
      },
      {
        key: "B",
        text: "Implement User and Entity Behavior Analytics (UEBA)",
      },
      { key: "C", text: "Automate incident response processes" },
      {
        key: "D",
        text: "Set up the log management component before deploying the SIEM component",
      },
    ],
    answer: "D",
  },
  {
    id: 31,
    question:
      "A health corporation is implementing an SIEM solution to improve its ability to detect and respond to security incidents and comply with HIPAA regulatory requirements. They need the SIEM to efficiently collect, analyze, and correlate security events from network devices, servers, and security applications, and generate timely alerts for potential HIPAA violations. Which capability is needed?",
    options: [
      { key: "A", text: "Log collection through agents" },
      { key: "B", text: "Centralized SIEM implementation" },
      { key: "C", text: "Log management and security analytics" },
      { key: "D", text: "Threat hunting and intelligence" },
    ],
    answer: "C",
  },
  {
    id: 32,
    question:
      "Bob is a SOC analyst who notices that critical financial records stored on a shared server appear to have been altered without authorization. The version history confirms unexpected changes made outside of business hours. He must investigate by inspecting the logs. Which log should he check to determine who accessed the files and when the modifications occurred?",
    options: [
      { key: "A", text: "Authentication logs" },
      { key: "B", text: "Security logs" },
      { key: "C", text: "Network logs" },
      { key: "D", text: "Firewall logs" },
    ],
    answer: "B",
  },
  {
    id: 33,
    question:
      "A SOC analyst detects a sudden and significant spike in failed login attempts targeting multiple critical servers during non-business hours. All attempts are originating from a single external IP address. Some login attempts involve legitimate employee usernames, suggesting the possibility of a credential-stuffing attack. What is the appropriate next step in the threat-hunting process?",
    options: [
      { key: "A", text: "Investigate and Analyze" },
      { key: "B", text: "Rapid Response" },
      { key: "C", text: "Continuous Improvement" },
      { key: "D", text: "Establish a Baseline" },
    ],
    answer: "A",
  },
  {
    id: 34,
    question:
      "You are an L2 SOC analyst and your team detects an adversary attempting to bypass authentication controls and escalate privileges. To counter the threat, you implement credential encryption, behavioral analytics, and process isolation. Your approach follows a structured framework that systematically maps defense techniques to known adversarial tactics. Which framework did you choose to apply?",
    options: [
      { key: "A", text: "MITRE D3FEND Framework" },
      { key: "B", text: "NIST Cybersecurity 2.0" },
      { key: "C", text: "Systems Security Engineering CMM" },
      { key: "D", text: "Cybersecurity Capability Maturity Model" },
    ],
    answer: "A",
  },
  {
    id: 35,
    question:
      "The SOC of a mid-sized financial institution is bombarded with thousands of daily notifications based on IOCs such as suspicious IP addresses, hashes, and domains. These alerts lack critical context about whether they truly pose a threat. Analysts spend excessive time chasing low-priority incidents, while more severe threats may go unnoticed. Alert fatigue is setting in. Which poses the greatest challenge in this environment?",
    options: [
      { key: "A", text: "Malware-centric and CTI are not equivalent" },
      { key: "B", text: "Budget and Enterprise skill" },
      { key: "C", text: "Distinguishing IOC from CTI" },
      { key: "D", text: "Information overload" },
    ],
    answer: "D",
  },
  {
    id: 36,
    question:
      "You are a Threat Hunter and your firm suffered a data breach where confidential client documents were leaked on a dark web forum. Your investigation reveals that the attacker initially bypassed the firm's MFA by masquerading as a legitimate user. Once inside, they moved laterally within the internal network, accessed sensitive client records from a shared file repository, and exfiltrated the data over an extended period. At which Cyber Kill Chain phase was the attack identified?",
    options: [
      { key: "A", text: "Exploitation" },
      { key: "B", text: "Delivery" },
      { key: "C", text: "Command & Control (C2)" },
      { key: "D", text: "Actions on Objectives" },
    ],
    answer: "D",
  },
  {
    id: 37,
    question:
      "As a Threat Hunter, you notice several endpoints experiencing unusual outbound traffic to an unfamiliar IP address. The traffic is encrypted and occurs in small bursts at irregular intervals. There are no known IOCs associated with the destination, and traditional security tools have not flagged it as malicious. You decide to launch a threat-hunting initiative to determine whether this is an advanced persistent threat (APT). What type of threat hunting approach would you choose?",
    options: [
      { key: "A", text: "Structured Hunting" },
      { key: "B", text: "Situational or Entity-driven Hunting" },
      { key: "C", text: "Reactive Hunting" },
      { key: "D", text: "Unstructured Hunting" },
    ],
    answer: "A",
  },
  {
    id: 38,
    question:
      "A large financial institution's SOC identified a sophisticated phishing campaign targeting employees resulting in unauthorized access to sensitive data. The organization uses a SIEM system for log aggregation, an EDR solution for endpoint visibility, XDR for broader threat detection, and XSOAR for security orchestration. As a SOC analyst, which integration strategy would improve real-time threat correlation and streamline incident response workflows?",
    options: [
      { key: "A", text: "Integrate EDR with XSOAR" },
      { key: "B", text: "Integrate EDR with SIEM" },
      { key: "C", text: "Integrate XDR with SIEM" },
      { key: "D", text: "Integrate XDR with XSOAR" },
    ],
    answer: "D",
  },
  {
    id: 39,
    question:
      "Sarah Chen works as a Security Analyst at Midwest Financial. At 1 AM, her SOC team detects unusual data exfiltration patterns and evidence of lateral movement across multiple servers containing sensitive customer data. The activity appears sophisticated and may require forensic analysis and system restoration. Which team should take primary responsibility for managing this complex security incident?",
    options: [
      { key: "A", text: "SOC (Security Operations Center) Team" },
      { key: "B", text: "IRT (Incident Response Team)" },
      { key: "C", text: "Threat Intelligence Team" },
      { key: "D", text: "Security Engineering Team" },
    ],
    answer: "B",
  },
  {
    id: 40,
    question:
      "The SOC team needs to extract specific patterns such as email addresses, IP addresses, and URLs from firewall logs to detect unauthorized access attempts. They use \\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b to match IPv4 addresses. Which regex pattern should the SOC analyst use to extract all hexadecimal color codes found in the logs?",
    options: [
      {
        key: "A",
        text: "[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}",
      },
      { key: "B", text: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b" },
      { key: "C", text: "#[A-Fa-f0-9]{6}" },
      {
        key: "D",
        text: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
      },
    ],
    answer: "C",
  },
  {
    id: 41,
    question:
      "Jennifer, a SOC analyst, initiates an investigation after receiving an alert about potential unauthorized activity on Marcus's workstation. She starts by retrieving EDR logs from the endpoint, analyzing network traffic patterns in the SIEM system, and inspecting email gateway logs for signs of malicious attachments. Her objective is to determine whether this alert represents a legitimate security incident. In which phase of the Incident Response process is Jennifer currently operating?",
    options: [
      { key: "A", text: "Notification" },
      { key: "B", text: "Incident Triage" },
      { key: "C", text: "Incident Recording and Assignment" },
      { key: "D", text: "Evidence Gathering and Forensic Analysis" },
    ],
    answer: "B",
  },
  {
    id: 42,
    question:
      "A major financial institution has strict policies preventing unauthorized data transfers. You detect an employee's workstation initiating large file transfers outside of business hours containing highly sensitive customer financial records. The employee has been remotely accessing the system from an unfamiliar IP address, and an unauthorized USB device is connected to the workstation. Given the data involved and possibility of exfiltration, what will be your first step in responding?",
    options: [
      {
        key: "A",
        text: "Isolate employee's workstation and revoke remote access",
      },
      { key: "B", text: "Disable corporate VPN entirely" },
      { key: "C", text: "Conduct a full forensic analysis first" },
      {
        key: "D",
        text: "Inform employee's department and wait for evidence",
      },
    ],
    answer: "A",
  },
  {
    id: 43,
    question:
      "DNS logs in the SIEM show an internal host sending many DNS queries with long, encoded subdomains to an external domain. The queries predominantly use TXT records and occur during off-business hours. The external domain is newly registered and has no known business association. Which of the following best explains this behavior?",
    options: [
      {
        key: "A",
        text: "Validating DNS records for legitimate business operations",
      },
      {
        key: "B",
        text: "Detecting rogue DNS servers within the internal network",
      },
      { key: "C", text: "Monitoring DNS cache poisoning attempts" },
      { key: "D", text: "Identifying DNS tunneling for data exfiltration" },
    ],
    answer: "D",
  },
  {
    id: 44,
    question:
      "A security analyst observes an unusually high volume of DNS requests directed toward domains that follow patterns commonly associated with Domain Generation Algorithms (DGAs). Recognizing that these automated domain queries could indicate malware attempting to establish communication with its C2 infrastructure, the security team needs to define intelligence requirements. Which stage of the Cyber Threat Intelligence (CTI) process does this scenario align with?",
    options: [
      { key: "A", text: "Intelligence Buy-In" },
      { key: "B", text: "Defining CTI" },
      { key: "C", text: "Requirement Analysis" },
      { key: "D", text: "Automated Tool" },
    ],
    answer: "C",
  },
  {
    id: 45,
    question:
      "A multinational financial institution suspects a security breach and calls in the forensic investigation team. During evidence collection, the forensic team creates a detailed record that tracks every individual who handled the evidence, its storage location, and timestamps of transfers. What is this process called?",
    options: [
      { key: "A", text: "Incident Documentation" },
      { key: "B", text: "Data Imaging" },
      { key: "C", text: "Digital Fingerprinting" },
      { key: "D", text: "Chain of Custody" },
    ],
    answer: "D",
  },
  {
    id: 46,
    question:
      "A security team is configuring a newly deployed SIEM system. With limited resources, they must prioritize specific monitoring scenarios that provide the greatest security benefit. The team understands that an effective SIEM relies on well-defined use cases tailored to the organization's environment. Which factor should guide their selection of use cases?",
    options: [
      {
        key: "A",
        text: "Focus on use cases required to meet industry compliance standards",
      },
      {
        key: "B",
        text: "Select use cases based on the availability and quality of data from existing data sources",
      },
      {
        key: "C",
        text: "Prioritize use cases that address zero day attacks",
      },
      {
        key: "D",
        text: "Implement as many use cases as the SIEM supports to cover all threats",
      },
    ],
    answer: "B",
  },
  {
    id: 47,
    question:
      "At a large healthcare organization, the SOC detects a surge of failed login attempts on employee accounts, indicating a possible brute-force attack. To contain the threat, the team quickly takes action to prevent unauthorized access. They also need to implement a security measure that strengthens account protection beyond just stopping the current attack. During the Containment Phase, which action would best enhance long-term account security against brute-force attacks?",
    options: [
      { key: "A", text: "Notify affected users" },
      { key: "B", text: "Block IP and enforce account lockout policies" },
      { key: "C", text: "Cross-verify false positives" },
      { key: "D", text: "Enable multi-factor authentication (MFA)" },
    ],
    answer: "D",
  },
  {
    id: 48,
    question:
      "A financial services company implemented a SIEM solution, but it fails to detect known attacks or suspicious activities. Although the system generates reports, the team struggles to interpret them effectively. After investigation, they discover that critical logs from firewalls, IDS, and endpoint devices are not reaching the SIEM. What is the reason the SIEM solution is not functioning as expected?",
    options: [
      {
        key: "A",
        text: "Difficulty handling the volume of collected log data",
      },
      {
        key: "B",
        text: "Lack of understanding of SIEM features and capabilities",
      },
      {
        key: "C",
        text: "Delays in log collection and analysis due to system performance issues",
      },
      {
        key: "D",
        text: "Improper configuration or design of the SIEM deployment architecture",
      },
    ],
    answer: "D",
  },
  {
    id: 49,
    question:
      "At 2:30 AM, SOC's Tier-1 Jennifer detects unusual network traffic and confirms an active LockBit ransomware infection targeting systems in the finance department. She escalates the issue to the SOC lead, Sarah, who activates the Incident Response Team (IRT) and instructs the network team to isolate the finance department's VLAN to prevent further spread across the network. Which phase of the Incident Response process is currently being implemented?",
    options: [
      { key: "A", text: "Notification" },
      { key: "B", text: "Containment" },
      { key: "C", text: "Eradication" },
      { key: "D", text: "Evidence Gathering and Forensic Analysis" },
    ],
    answer: "B",
  },
  {
    id: 50,
    question:
      "Your SOC team currently relies on manual log reviews to detect security threats, but the sheer volume of raw, unstructured logs is making this process inefficient, time-consuming, and prone to human error. Your team has decided to improve efficiency by implementing an automated log parsing solution that can transform unstructured logs into a structured format. Which log parsing technique will you implement for this scenario?",
    options: [
      { key: "A", text: "Key-value Extraction" },
      { key: "B", text: "Grok Filters" },
      { key: "C", text: "Semantic Parsing" },
      { key: "D", text: "Delimited Parsing" },
    ],
    answer: "B",
  },
  {
    id: 51,
    question:
      "The SOC team is tasked with enhancing the security of an organization's network infrastructure. The organization's public-facing web servers, which handle customer transactions, need to be isolated from the internal private network containing sensitive employee data. The goal is to create a buffer zone that limits exposure of internal systems if the web servers are compromised. Which network architecture component would you recommend implementing?",
    options: [
      { key: "A", text: "Honeypot" },
      { key: "B", text: "Demilitarized Zone (DMZ)" },
      { key: "C", text: "Intrusion Detection Systems (IDS)" },
      { key: "D", text: "Firewall" },
    ],
    answer: "B",
  },
  {
    id: 52,
    question:
      "You are implementing a centralized logging solution. You are responsible for ensuring that log messages from routers, firewalls, and servers across multiple remote offices are efficiently collected and forwarded to a central syslog server. To streamline this process, an intermediate component is deployed to receive log messages from different devices and forward them to the main syslog server. Which component in the syslog infrastructure performs this function?",
    options: [
      { key: "A", text: "Syslog Listener" },
      { key: "B", text: "Syslog Collector" },
      { key: "C", text: "Syslog Relay" },
      { key: "D", text: "Syslog Database" },
    ],
    answer: "C",
  },
  {
    id: 53,
    question:
      "One week after a ransomware attack disrupted operations, Sarah, a SOC analyst, leads a review meeting with the IT team, security engineers, and business unit representatives. The group reviews the incident timeline, calculates a business impact of $75,000 due to downtime and data loss, and identifies several critical improvements to enhance detection and response processes. Which Incident Response phase is this?",
    options: [
      { key: "A", text: "Recovery" },
      { key: "B", text: "Post-incident Activities" },
      { key: "C", text: "Eradication" },
      { key: "D", text: "Containment" },
    ],
    answer: "B",
  },
  {
    id: 54,
    question:
      "A multinational corporation with strict regulatory requirements (GDPR, PCI-DSS) needs a SIEM solution to monitor its global network. Data residency laws in certain regions prohibit transferring logs outside local jurisdictions. The company requires centralized monitoring with 24/7 SOC operations but has limited in-house SIEM expertise. Which SIEM deployment model is appropriate?",
    options: [
      { key: "A", text: "Hybrid Model, Jointly Managed" },
      { key: "B", text: "Cloud MSSP-Managed" },
      { key: "C", text: "On-Premise, Jointly Managed" },
      { key: "D", text: "Self-Hosted, MSSP-Managed" },
    ],
    answer: "A",
  },
  {
    id: 55,
    question:
      "CyberBank has recently experienced phishing campaigns, insider threats, and attempted data breaches targeting customer financial records. The bank operates across multiple regions, making it vulnerable to regional compliance violations, fraud attempts, and APTs. The CISO proposes a security solution that offers continuous security monitoring, rapid threat detection, and centralized visibility. Which solution will provide automated alerting, digital forensics capabilities, and active threat hunting?",
    options: [
      { key: "A", text: "Implementing Security Operation Center (SOC)" },
      { key: "B", text: "Implementing periodic security audit" },
      {
        key: "C",
        text: "Deploying a standalone SIEM (Security Information and Event Management) system",
      },
      {
        key: "D",
        text: "Implementing SOAR (Security Orchestration, Automation, and Response)",
      },
    ],
    answer: "A",
  },
  {
    id: 56,
    question:
      "You are working as an L1 SOC analyst responsible for investigating web server logs for potential malicious activity. Your team detected multiple failed login attempts and unusual traffic patterns targeting the company's web application. To efficiently analyze the logs and identify key details such as the remote host, timestamp, requested resource, and HTTP status code, you need a structured log format. Which standardized log format would you choose?",
    options: [
      { key: "A", text: "JSON Format" },
      { key: "B", text: "Tab-Separated Format" },
      { key: "C", text: "Extended Log Format (ELF)" },
      { key: "D", text: "Common Log Format (CLF)" },
    ],
    answer: "C",
  },
  {
    id: 57,
    question:
      "David is working as a SOC analyst and detects several unauthorized applications running on a high-privilege Windows server. These applications were not part of any approved software deployment. The installations occurred outside of business hours, and the affected server logs indicate potential configuration changes. He suspects an attacker may have exploited misconfigurations or gained unauthorized access. Which log file should he examine to determine when and how these installations occurred?",
    options: [
      { key: "A", text: "Security Event Log" },
      { key: "B", text: "System Event Log" },
      { key: "C", text: "Application Event Log" },
      { key: "D", text: "Setup Event Log" },
    ],
    answer: "D",
  },
  {
    id: 58,
    question:
      "Katia is responsible for monitoring logs to detect potential security threats in real time. Her team needs to implement a functionality such that the system continuously scans logs for anomalies, identifies suspicious activities, and wants to be notified when predefined security thresholds are reached as well as generate incidents or issue tickets to ensure immediate response. It must provide critical details such as the type of event, duration, affected device, and OS version. Which function should she configure?",
    options: [
      { key: "A", text: "Log parsing" },
      { key: "B", text: "Log collection" },
      { key: "C", text: "Log normalization" },
      { key: "D", text: "Alerting and Reporting" },
    ],
    answer: "D",
  },
  {
    id: 59,
    question:
      "A threat hunter analyzing an infected endpoint finds that malicious processes keep reappearing even after remediation. The system has multiple scheduled tasks executing unknown scripts at specific intervals, along with suspicious registry modifications enabling automatic script execution upon startup. The endpoint has made occasional outbound connections to an unclassified external server, and there have been multiple failed login attempts on privileged accounts from the same subnet. Which signs should the threat hunter look out for to confirm the threat?",
    options: [
      { key: "A", text: "Threat Intelligence & Adversary" },
      { key: "B", text: "Indicators of Attack (IoAs)" },
      { key: "C", text: "Host-Based Artifacts" },
      { key: "D", text: "Network-Based Artifacts" },
    ],
    answer: "B",
  },
  {
    id: 60,
    question:
      "Technoware received an alert about a newly discovered zero-day vulnerability in a widely used web application framework being actively exploited in the wild. No official patch is available. The SOC team needs to stay ahead of emerging threats by monitoring adversary tactics, identifying IOCs, and proactively adjusting security controls. Which SOC technology would be crucial in providing real-time visibility into evolving threat intelligence?",
    options: [
      { key: "A", text: "Endpoint Detection and Response (EDR) Tools" },
      { key: "B", text: "Threat Intelligence Management Tools" },
      {
        key: "C",
        text: "Security Information and Event Management (SIEM) Solutions",
      },
      { key: "D", text: "Vulnerability Management Tools" },
    ],
    answer: "B",
  },
  {
    id: 61,
    question:
      "The HR department receives an urgent email from someone impersonating a high-level executive, requesting immediate transfer of sensitive employee data. The email includes an official-looking document and a phone number for verification. Feeling pressured, the HR manager calls the number and confirms the request. After transfer of the data, your team investigates to discover the email was fraudulent. What type of attack did your HR department face?",
    options: [
      { key: "A", text: "Credential Theft" },
      { key: "B", text: "Web-Based Injection" },
      { key: "C", text: "Application Exploit" },
      { key: "D", text: "Social Engineering Attack" },
    ],
    answer: "D",
  },
  {
    id: 62,
    question:
      "The SOC team discovers a trojan on a compromised government server suspected of engaging in data exfiltration, with concerns about backdoor access and long-term persistence mechanisms. The lead malware analyst is tasked with conducting an in-depth analysis of the trojan to determine its capabilities, persistence mechanisms, and backdoor functionalities. However, due to the sensitive nature and risk of unintended execution, the analyst must analyze the trojan's binary code at the instruction level without actually executing it. Which technique should be used?",
    options: [
      { key: "A", text: "Malware Disassembly" },
      { key: "B", text: "Network Behavior Monitoring" },
      { key: "C", text: "Interactive Debugging" },
      { key: "D", text: "Dynamic Code Injection" },
    ],
    answer: "A",
  },
  {
    id: 63,
    question:
      "Global Bank relies heavily on Microsoft Azure to host its critical banking applications. The security operation center team must ensure continuous monitoring, compliance with financial regulations, and real-time threat detection across all Azure resources. They require a comprehensive solution that can collect, analyze, and visualize telemetry data from various cloud resources, virtual machines, storage accounts, and applications, integrating seamlessly with security tools. Which Azure service is best suited?",
    options: [
      { key: "A", text: "Azure Active Directory" },
      { key: "B", text: "Azure Firewall" },
      { key: "C", text: "Azure Monitor" },
      { key: "D", text: "Azure Policy" },
    ],
    answer: "C",
  },
  {
    id: 64,
    question:
      "During a threat intelligence briefing, a SOC analyst discovers that several breaches began with seemingly innocent conversations — a foreign journalist requesting an interview with a CEO, and a security consultant offering free risk assessments. Attackers socially engineered employees, manipulated trust, and extracted critical security details long before launching technical attacks. The analyst decides to focus on intelligence that involves deception detection and psychological profiling. Which type of intelligence is the analyst leveraging?",
    options: [
      { key: "A", text: "Threat Intelligence Feeds" },
      { key: "B", text: "Human Intelligence" },
      { key: "C", text: "Open-Source Intelligence (OSINT)" },
      { key: "D", text: "Technical Threat Intelligence" },
    ],
    answer: "B",
  },
  {
    id: 65,
    question:
      "James Rodriguez has recently taken over as the lead SOC manager at GlobalTech Dynamics. She is tasked with strengthening the SOC's capabilities. Her team is currently deploying a $2M state-of-the-art SOC facility, creating detailed incident response playbooks, running tabletop exercises to simulate real-world attacks, and building a 5-member incident response team. In the context of the Incident Response Process Flow, which phase best aligns with these activities?",
    options: [
      { key: "A", text: "Incident Recording and Assignment" },
      { key: "B", text: "Preparation" },
      { key: "C", text: "Incident Triage" },
      { key: "D", text: "Recovery" },
    ],
    answer: "B",
  },
  {
    id: 66,
    question:
      "A company's SIEM is generating a high number of alerts, overwhelming the SOC team with false positives and irrelevant notifications. This issue is reducing the team's efficiency, as analysts struggle to identify genuine security incidents. To address this, the security team decides to refine their approach by defining clear threat detection scenarios that align with their environment and risk profile. Which process is the team implementing?",
    options: [
      { key: "A", text: "Security analytics" },
      { key: "B", text: "Log forensics" },
      { key: "C", text: "SIEM Use Case Management" },
      { key: "D", text: "IT compliance" },
    ],
    answer: "C",
  },
  {
    id: 67,
    question:
      "You are working as a SOC analyst in a multinational company with multiple data centers and remote offices. Security logs are stored locally at each site, making it difficult to correlate incidents across different locations. An advanced persistent threat (APT) compromised multiple servers, but due to multiple sources of logs and inconsistent monitoring, the attack was detected only after significant data exfiltration. Which solution will you implement to improve visibility and enable faster incident response?",
    options: [
      { key: "A", text: "Distributed logging" },
      { key: "B", text: "Event tracing" },
      { key: "C", text: "Local logging" },
      { key: "D", text: "Centralized logging" },
    ],
    answer: "D",
  },
  {
    id: 68,
    question:
      "David Reynolds, a SOC analyst, is investigating suspicious login attempts flagged by the SIEM. To mitigate the risk of brute-force attacks on the target endpoints, he collaborates with the IT team to implement an automatic account lockout policy. This policy temporarily disables user accounts after multiple failed login attempts, preventing attackers from repeatedly guessing passwords. Within the SOC's eradication strategy, which category of measures does this action align with?",
    options: [
      { key: "A", text: "Authentication and Authorization Measures" },
      { key: "B", text: "Network Security Measures" },
      { key: "C", text: "Physical Security Measures" },
      { key: "D", text: "Host Security Measures" },
    ],
    answer: "A",
  },
  {
    id: 69,
    question:
      "A rapidly growing ecommerce company wants to implement a SIEM solution to improve its security posture and comply with PCI DSS requirements. They need a solution that offers both the necessary technological features and the expertise to manage the system effectively. They also need to ensure continuous compliance support and data security assistance. Which SIEM solution is appropriate for this company?",
    options: [
      { key: "A", text: "Cloud-based SIEM" },
      { key: "B", text: "On-Premises SIEM" },
      { key: "C", text: "Managed SIEM" },
      { key: "D", text: "Security analytics" },
    ],
    answer: "C",
  },
  {
    id: 70,
    question:
      "Pearl is an L1 SOC analyst who notices multiple failed login attempts from the same IP address, followed by a successful login as a server administrator. She immediately shifts focus to the database server logs to analyze unauthorized access patterns. She uncovers that the attacker successfully brute-forced a privileged user account on the database and gained access to the SQL Server database. Which of the following logs will help her identify if the intruder performed any unauthorized modifications in the database?",
    options: [
      { key: "A", text: "Transaction Log" },
      { key: "B", text: "Security Log" },
      { key: "C", text: "Audit Log" },
      { key: "D", text: "Maintenance Log" },
    ],
    answer: "A",
  },
  {
    id: 71,
    question:
      "A large financial institution receives thousands of security logs daily from firewalls, IDS systems, and user authentication platforms. The SOC team uses an AI-driven SIEM system with NLP capabilities to streamline threat detection. This approach enables faster response times, reduces manual rule creation, and helps detect advanced threats that traditional systems might overlook. Which BEST illustrates the advantage of NLP in SIEM?",
    options: [
      {
        key: "A",
        text: "Enables analysis of text-based data from logs and communications to detect threats",
      },
      {
        key: "B",
        text: "Eliminates the need for data normalization and correlation in SIEM systems",
      },
      {
        key: "C",
        text: "Allows security analysts to write SIEM rules using complex programming languages",
      },
      {
        key: "D",
        text: "Simplifies infrastructure management by reducing hardware dependencies",
      },
    ],
    answer: "A",
  },
  {
    id: 72,
    question:
      "A SOC analyst receives an alert indicating that the system time on a critical Windows server was changed at 3:00 AM. There are no scheduled maintenance tasks at this time. Unauthorized time changes can be used to evade security controls such as altering timestamps to obscure malicious activity. Which Windows Security Event Codes should the analyst review to investigate potential tampering?",
    options: [
      { key: "A", text: "4624 and 4634" },
      { key: "B", text: "4616 and 4688" },
      { key: "C", text: "4635 and 4634" },
      { key: "D", text: "4656 and 4657" },
    ],
    answer: "B",
  },
  {
    id: 73,
    question:
      "At 8:45 AM EST, Marcus Wong, a Financial Operations analyst, contacts the SOC team after noticing that Excel spreadsheets are automatically encrypting themselves with unusual file extensions (.locked or .crypt). The SOC's Tier 1 analyst logs the incident as ticket #INC89277 in the SIEM system and escalates it to Jennifer Park, a Tier 2 SOC analyst, for further investigation. Which phase of the Incident Response process is currently taking place?",
    options: [
      { key: "A", text: "Notification" },
      { key: "B", text: "Incident Triage" },
      { key: "C", text: "Containment" },
      { key: "D", text: "Incident Recording and Assignment" },
    ],
    answer: "D",
  },
  {
    id: 74,
    question:
      "The SOC team at GlobalTech has just finished patching a critical vulnerability exploited during a ransomware attack. The team is now restoring 2.7TB of encrypted data from their Veeam backup system, rebuilding compromised workstations identified through SIEM logs, and re-enabling network access for the finance department after validating the systems are clean. Which Incident Response phase is this?",
    options: [
      { key: "A", text: "Post-Incident Activities" },
      { key: "B", text: "Eradication" },
      { key: "C", text: "Containment" },
      { key: "D", text: "Recovery" },
    ],
    answer: "D",
  },
  {
    id: 75,
    question:
      "A mid-sized healthcare organization is facing frequent phishing and ransomware attacks. They lack an internal SOC and want proactive threat detection and response capabilities. Compliance with HIPAA regulations is essential. The organization seeks a solution that includes both monitoring and rapid response to incidents. Which service best meets their needs?",
    options: [
      {
        key: "A",
        text: "Self-hosted SIEM with in-house SOC analysts",
      },
      {
        key: "B",
        text: "MSSP with 24/7 log monitoring and incident escalation",
      },
      {
        key: "C",
        text: "Cloud-based SIEM with MSSP-managed services",
      },
      {
        key: "D",
        text: "MDR with proactive threat hunting and incident containment",
      },
    ],
    answer: "D",
  },
  {
    id: 76,
    question:
      "During routine monitoring, the SIEM detects an unusual spike in outbound data transfer from a critical database server. The typical outbound traffic for this server is around 5 MB/hour, but in the past 10 minutes, it has sent over 500 MB to an external IP address. No predefined signatures match this activity, but the SIEM raises an alert due to deviations from the server's normal behavior profile. Which detection method is responsible for this alert?",
    options: [
      { key: "A", text: "Anomaly-based detection" },
      { key: "B", text: "Signature-based detection" },
      { key: "C", text: "Heuristic-based detection" },
      { key: "D", text: "Rule-based detection" },
    ],
    answer: "A",
  },
  {
    id: 77,
    question:
      "As a SOC administrator, you noticed intermittent network slowdowns and unexplained high memory usage across multiple critical systems. No traces of malware were found, but a forensic investigation revealed unauthorized scheduled tasks that executed during off-peak hours. These tasks ran obfuscated scripts that connected to an external C2 server. The adversary had gained access months ago through a compromised VPN account using stolen credentials from a phishing campaign. Which phase of the Advanced Persistent Threat (APT) lifecycle does this scenario align with?",
    options: [
      { key: "A", text: "Search and Exploitation" },
      { key: "B", text: "Initial Intrusion" },
      { key: "C", text: "Cleanup" },
      { key: "D", text: "Persistence" },
    ],
    answer: "D",
  },
  {
    id: 78,
    question:
      "The SOC team is investigating a suspected malware incident during the Analysis phase of their incident response process. Their primary goal is to validate the initial detection, ensure the threat is real, and gather critical intelligence to understand the scope of the attack. Which of the following actions should the SOC team take to confirm their initial findings and eliminate false alarms?",
    options: [
      { key: "A", text: "Verify false positives" },
      { key: "B", text: "Identify generated logs" },
      {
        key: "C",
        text: "Scan the enterprise environment and update the scope",
      },
      { key: "D", text: "Root-cause analysis" },
    ],
    answer: "A",
  },
  {
    id: 79,
    question:
      "A government agency responsible for managing sensitive patient health records is subject to strict data sovereignty regulations requiring all data to be stored and processed within the country's borders. Leadership is deeply concerned about risks associated with outsourcing security operations and needs complete control over handling patient data. They also face increasing cyber threats and require 24/7 security monitoring. They have a large budget and in-house security professionals. Which SOC model would be suitable?",
    options: [
      { key: "A", text: "Outsourced SOC Model" },
      { key: "B", text: "Hybrid SOC model assisted by an MSSP" },
      { key: "C", text: "In-house Internal SOC Model" },
      { key: "D", text: "A combination of multiple MSSPs" },
    ],
    answer: "C",
  },
  {
    id: 80,
    question:
      "A security team is designing SIEM use-case logic to detect privilege escalation attempts on Windows servers. They have already identified and validated the necessary event sources (e.g., Active Directory logs, Windows Security logs). What should be their next step in the use case logic development process?",
    options: [
      {
        key: "A",
        text: "Collect historical security logs to confirm the use case is necessary",
      },
      {
        key: "B",
        text: "Implement and test the use case immediately in the production SIEM environment",
      },
      {
        key: "C",
        text: "Define correlation rules and conditions that detect specific privilege escalation patterns",
      },
      {
        key: "D",
        text: "Define response actions for detected incidents before writing the rules",
      },
    ],
    answer: "C",
  },
  {
    id: 81,
    question:
      "A SIEM alert is triggered due to unusual network traffic involving NetBIOS. The system log shows that 'The TCP/IP NetBIOS Helper service entered the running state.' Concurrently, Event Code 4624 'An account was successfully logged on' appears for multiple machines within a short time frame. The logon type is identified as 3 (Network logon). Which security incident is the SIEM detecting?",
    options: [
      { key: "A", text: "A malware infection spreading via SMB protocol" },
      {
        key: "B",
        text: "A user connecting to shared files from multiple workstations",
      },
      {
        key: "C",
        text: "A network administrator conducting routine maintenance",
      },
      {
        key: "D",
        text: "An attacker performing lateral movement within the network",
      },
    ],
    answer: "D",
  },
  {
    id: 82,
    question:
      "In a financial services company, Snort IDS is deployed to monitor HTTP traffic for potential attacks targeting the login page. Snort triggers an alert based on the rule: alert tcp any any -> any 80 (msg:\"SQL Injection attempt detected\"; content:\" OR '1'='1' \"; nocase; sid:1000001; rev:1;). The SIEM, integrated with Snort, receives this alert and correlates it with multiple failed login attempts from the same source IP, triggering an automated response. Which detection method is used by this rule?",
    options: [
      { key: "A", text: "Behavioral-based detection" },
      { key: "B", text: "Statistical-based detection" },
      { key: "C", text: "Anomaly-based detection" },
      { key: "D", text: "Signature-based detection" },
    ],
    answer: "D",
  },
  {
    id: 83,
    question:
      "A large financial organization has experienced an increase in sophisticated cyber threats, including zero-day attacks and advanced persistent threats (APTs). The security team is struggling with traditional detection methods that rely heavily on signature-based detection and manual intervention. The CISO is exploring AI-driven solutions that can automatically analyze vast datasets, detect anomalies, and adapt to evolving threats in real time without predefined signatures. Which key AI technology should the organization focus on?",
    options: [
      { key: "A", text: "Static IP blocking" },
      { key: "B", text: "Heuristic-based Signature Detection" },
      { key: "C", text: "Natural Language Processing (NLP)" },
      { key: "D", text: "Machine Learning (ML)" },
    ],
    answer: "D",
  },
  {
    id: 84,
    question:
      "You are part of a team of SOC analysts processing large volumes of security logs from firewalls, IDS, and authentication servers. Your team realizes they are facing difficulties detecting security incidents because logs from different systems are analyzed in isolation, making it harder to link related events. What approach should you implement for future forensic investigations to automatically match related log events based on predefined rules?",
    options: [
      { key: "A", text: "Log correlation" },
      { key: "B", text: "Log normalization" },
      { key: "C", text: "Log collection" },
      { key: "D", text: "Log transformation" },
    ],
    answer: "A",
  },
  {
    id: 85,
    question:
      "A SOC team notices that malware-related incidents have increased over the past six months, targeting endpoints through phishing campaigns. They need to present a report to the security leadership team to justify investing in advanced email filtering solutions and end-user security training. Which SOC report will best support their case?",
    options: [
      { key: "A", text: "Realtime Monitoring Report" },
      { key: "B", text: "Trend Analysis Report" },
      { key: "C", text: "Monitoring Summary Report" },
      { key: "D", text: "Incident Report" },
    ],
    answer: "B",
  },
  {
    id: 86,
    question:
      "A SOC team at a major financial institution detects unauthorized access attempts on its web application. The security team reviews the logs to find the web application is compromised. To determine the exact attack technique used, forensic investigators assess cookie attributes such as HttpOnly, Secure, and SameSite for security weaknesses, and track anomalous request patterns that deviate from normal user behavior. Which attack vector is the forensic team investigating?",
    options: [
      { key: "A", text: "SQL Injection" },
      { key: "B", text: "Man-in-the-Middle (MITM) Attack" },
      { key: "C", text: "Cross-Site Scripting (XSS)" },
      { key: "D", text: "Session Fixation" },
    ],
    answer: "D",
  },
  {
    id: 87,
    question:
      "Jackson & Co., a mid-sized law firm, is concerned about potential web-based cyber threats targeting their employees. To enhance security, their IT team implements a solution that serves as an intermediary for all HTTP and HTTPS requests. This solution allows the SOC to inspect, filter and control web traffic, helping to detect and block malicious websites, phishing attempts, and other online threats before they reach users. Which containment method is the organization using?",
    options: [
      { key: "A", text: "Proxy Servers" },
      { key: "B", text: "Blacklisting" },
      { key: "C", text: "Whitelisting" },
      { key: "D", text: "Web Content Filtering" },
    ],
    answer: "A",
  },
  {
    id: 88,
    question:
      "A newly hired SOC analyst needs to quickly assess the company's external exposure and identify potential security risks. They consider various techniques including analyzing publicly available information, scanning for exposed services, reviewing DNS records, and gathering intelligence from external sources. However, given the sheer volume of data spanning multiple subsidiaries, cloud environments, and third-party integrations, which technique is less practical for handling large or diverse data sets?",
    options: [
      { key: "A", text: "DNS Lookup" },
      { key: "B", text: "Web Enumeration" },
      { key: "C", text: "OSINT" },
      { key: "D", text: "Cloud Footprinting" },
    ],
    answer: "A",
  },
  {
    id: 89,
    question:
      "The SOC team at Rapid Response Group is facing challenges managing security incidents efficiently in their Microsoft Sentinel environment. With an increasing volume of alerts and security events, the team aims to automate routine security tasks such as log collection, alert triaging, remediation steps, and notifications to stakeholders. By implementing automated workflows, they seek to reduce response times and ensure a standardized approach. Which component of Microsoft Sentinel should they utilize?",
    options: [
      { key: "A", text: "Community" },
      { key: "B", text: "Workspace" },
      { key: "C", text: "Playbooks" },
      { key: "D", text: "Analytics" },
    ],
    answer: "C",
  },
  {
    id: 90,
    question:
      "You are a Threat Hunter and observe that relying solely on traditional security alerts often results in missed detections of sophisticated threats. You decide to incorporate multiple data sources, including external threat intelligence feeds, internal security logs, network traffic data, and endpoint telemetry. You are implementing a new tool that can aggregate, normalize, and correlate threat intelligence with internal telemetry to gain a holistic understanding of emerging threats. What is the key capability of threat detection being leveraged?",
    options: [
      { key: "A", text: "Intelligence Buildup" },
      { key: "B", text: "Data Integration" },
      { key: "C", text: "Threat Reports" },
      { key: "D", text: "Threat Trending" },
    ],
    answer: "B",
  },
  {
    id: 91,
    question:
      "The SOC team found a suspicious document file on a user's workstation. Upon initial inspection, the document appears benign, but deeper analysis reveals an embedded PowerShell script. The team suspects the script is designed to download and execute a malicious payload. They need to understand the script's functionality without triggering it. Which malware analysis technique would be recommended for the SOC team?",
    options: [
      { key: "A", text: "Automated behavioral analysis" },
      { key: "B", text: "Dynamic analysis" },
      { key: "C", text: "Network traffic analysis" },
      { key: "D", text: "Static analysis" },
    ],
    answer: "D",
  },
  {
    id: 92,
    question:
      "Sarah, a financial analyst at a multinational corporation, is suspected of leaking sensitive financial data to an unauthorized external party. The SOC team has observed anomalous data transfer patterns from her account, indicating potential data exfiltration. The incident response team has been tasked with containing the incident swiftly to minimize data loss and protect critical assets. As a SOC analyst, which should be prioritized as the initial containment measure?",
    options: [
      { key: "A", text: "Isolate the Storage" },
      { key: "B", text: "Data Centric Audit and Protection (DCAP)" },
      { key: "C", text: "Access Control" },
      { key: "D", text: "Change Passwords Regularly" },
    ],
    answer: "C",
  },
  {
    id: 93,
    question:
      "At 8:55 AM IST, Marcus Wong contacts the SOC team after noticing that his Excel spreadsheets are automatically encrypting themselves with unusual file extensions (.locked or .crypt). The SOC Tier 1 analyst logs the incident as ticket INC-00271 in the SIEM system and escalates it to Marcus' Tier 2 SOC analyst on the Security Team for further investigation. Which phase of the Incident Response process is currently taking place?",
    options: [
      { key: "A", text: "Notification" },
      { key: "B", text: "Incident Triage" },
      { key: "C", text: "Containment" },
      { key: "D", text: "Incident Reporting and Assignment" },
    ],
    answer: "D",
  },
  {
    id: 94,
    question:
      "You are a SOC analyst at a critical infrastructure provider. Threat actors infiltrated the network and exfiltrated sensitive system blueprints. Before their presence was detected, they executed commands that altered system logs, wiped forensic artifacts, and modified timestamps to mimic normal activity. The adversary also ensured that no unusual login events were logged by manipulating security monitoring tools. Which APT lifecycle phase does this represent?",
    options: [
      { key: "A", text: "Search and Exploitation" },
      { key: "B", text: "Expansion" },
      { key: "C", text: "Cleanup" },
      { key: "D", text: "Initial Intrusion" },
    ],
    answer: "C",
  },
  {
    id: 95,
    question:
      "Daniel Clark is responsible for ensuring secure access to cloud applications while maintaining compliance with regulatory frameworks. His team needs a security solution that can enforce access policies to prevent unauthorized access to cloud-based applications, monitor and restrict data sharing within SaaS, PaaS, and IaaS environments, ensure compliance with government regulations for data security and privacy, and apply security controls to prevent sensitive data exposure in the cloud. Which Cloud SOC technology is Daniel's team using?",
    options: [
      { key: "A", text: "Cloud Access Security Broker" },
      { key: "B", text: "Cloud Workload Protection Platform" },
      { key: "C", text: "Cloud Security Posture Management" },
      { key: "D", text: "Cloud-native anomaly detection" },
    ],
    answer: "A",
  },
  {
    id: 96,
    question:
      "A financial institution's SIEM is generating a high number of false positives causing alert fatigue among SOC analysts. To reduce this burden and improve threat detection accuracy, the organization integrates AI capabilities into the SIEM. After implementation, the SOC team observes a significant decrease in redundant alerts along with faster detection of genuine threats. Which AI capability contributed to this improvement?",
    options: [
      { key: "A", text: "Automated rule generation" },
      { key: "B", text: "Data integration enhancement" },
      { key: "C", text: "Dynamic rule optimization" },
      { key: "D", text: "Rule validation and testing" },
    ],
    answer: "C",
  },
  {
    id: 97,
    question:
      "A government agency needs to monitor its network for unusual data exfiltration attempts. Since traditional log data alone is insufficient to identify suspicious traffic patterns, the SIEM team decides to integrate traffic flow data into their system. This data will help detect anomalies such as large data transfers to unauthorized destinations or unexpected traffic spikes. The team must choose the appropriate protocol to collect IP traffic information from network devices like routers and switches. Which protocol should be used?",
    options: [
      { key: "A", text: "IPFIX (IP Flow Information Export)" },
      { key: "B", text: "SNMP (Simple Network Management Protocol)" },
      { key: "C", text: "Syslog" },
      { key: "D", text: "NetFlow (RFC 3954)" },
    ],
    answer: "D",
  },
  {
    id: 98,
    question:
      "SecureTech Solutions is optimizing its log management architecture. The SOC team needs to ensure that security logs are stored in a structured or semi-structured format, allowing for easy parsing, querying, and correlation of security events. They decide to implement a log storage format that organizes data in a text file in tabular structure with rows and columns. They also require a format that supports easy export to databases or spreadsheet-based analysis while maintaining readability. Which log format should they choose?",
    options: [
      { key: "A", text: "Cloud Storage" },
      { key: "B", text: "Syslog Format" },
      { key: "C", text: "Comma-Separated Values (CSV) Format" },
      { key: "D", text: "Database" },
    ],
    answer: "C",
  },
  {
    id: 99,
    question:
      "As a SOC administrator, you noticed intermittent network slowdowns and unexplained high memory usage across multiple critical systems. Your initial analysis found no traces of malware, but a forensic investigation revealed unauthorized scheduled tasks that executed during off-peak hours. These tasks ran obfuscated scripts that connected to an external C2 server. The adversary had gained access months ago through a compromised VPN account, leveraging stolen credentials from a phishing campaign. Which phase of the Advanced Persistent Threat (APT) lifecycle does this scenario align with?",
    options: [
      { key: "A", text: "Search and Exploitation" },
      { key: "B", text: "Initial Intrusion" },
      { key: "C", text: "Cleanup" },
      { key: "D", text: "Persistence" },
    ],
    answer: "D",
  },
  {
    id: 100,
    question:
      "Amit Raghav, a SOC analyst at a healthcare organization, detects a series of unusual login attempts targeting critical patient data servers. The SOC determines that the threat has a 'Likely' chance of occurring and could cause 'Significant' damage, including operational disruptions, financial loss due to breaches, and regulatory penalties under HIPAA. Using a standard Risk Matrix, how would this risk be categorized in terms of overall severity?",
    options: [
      { key: "A", text: "High" },
      { key: "B", text: "Medium" },
      { key: "C", text: "Low" },
      { key: "D", text: "Very High" },
    ],
    answer: "D",
  },
];
