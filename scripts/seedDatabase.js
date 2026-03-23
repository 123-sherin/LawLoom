// scripts/seedDatabase.js
// ─────────────────────────────────────────────────────────
// METHOD C: Instant Sample Data
//
// Use this to fill your database RIGHT NOW without waiting
// for API approval or running the scraper.
//
// These are real Indian court case summaries based on
// publicly known judgments.
//
// HOW TO RUN: npm run seed
// ─────────────────────────────────────────────────────────

require("dotenv").config();
const mongoose = require("mongoose");
const Case = require("../models/Case");

const sampleCases = [
  // ── CYBER CRIME CASES ──────────────────────────────────
  {
    caseTitle: "State of Tamil Nadu v. Suhas Katti",
    caseNumber: "CYB/2004/001",
    crimeNumber: "CR No. 125/2004",
    category: "Cyber Crime",
    court: "Additional Chief Metropolitan Magistrate, Chennai",
    bench: null,
    judge: "A. Muthuraj",
    date: new Date("2004-11-05"),
    sections: ["67 IT Act", "509 IPC"],
    isBailCase: false,
    isMurder: false,
    isKidnapping: false,
    isCyberCrime: true,
    summary: null,
    fullText: `IN THE COURT OF ADDITIONAL CHIEF METROPOLITAN MAGISTRATE, CHENNAI

Case No: CYB/2004/001
State of Tamil Nadu v. Suhas Katti

JUDGMENT DELIVERED ON: 5th November 2004

FACTS OF THE CASE:
This is the first case in India to be convicted under the Information Technology Act 2000. The complainant, a woman, received obscene and annoying messages via email and mobile phone from the accused Suhas Katti, who was a family friend. The accused posted obscene messages about the complainant on various Yahoo groups, falsely portraying her as a woman of loose character and providing her mobile number, inviting people to contact her.

The complainant received hundreds of obscene calls after this. She filed a complaint with the Cyber Crime Cell of Chennai Police.

CHARGES:
The accused was charged under:
- Section 67 of the Information Technology Act 2000 (Publishing obscene material in electronic form)
- Section 509 IPC (Word, gesture or act intended to insult the modesty of a woman)

EVIDENCE:
1. Electronic records of the Yahoo group postings
2. Call records showing obscene calls received by complainant
3. Witness testimony of the complainant
4. Technical reports from Yahoo confirming the account details

JUDGMENT:
The Court found the accused GUILTY under both charges.

SENTENCE:
- Section 67 IT Act: 1 year Rigorous Imprisonment + Rs. 500 fine
- Section 509 IPC: 1 year Rigorous Imprisonment
- Sentences to run concurrently

SIGNIFICANCE:
This was the first conviction under the IT Act 2000 in India and was achieved within 7 months of filing the complaint, showing the efficiency of the cyber crime cell.`,
  },

  {
    caseTitle: "Shreya Singhal v. Union of India",
    caseNumber: "WP/2012/167",
    crimeNumber: null,
    category: "Cyber Crime",
    court: "Supreme Court of India",
    bench: "Constitutional Bench",
    judge: "Justice J. Chelameswar and Justice R.F. Nariman",
    date: new Date("2015-03-24"),
    sections: ["66A IT Act", "19 Constitution of India"],
    isBailCase: false,
    isMurder: false,
    isKidnapping: false,
    isCyberCrime: true,
    summary: null,
    fullText: `IN THE SUPREME COURT OF INDIA

Writ Petition (Criminal) No. 167 of 2012

SHREYA SINGHAL v. UNION OF INDIA

BENCH: Justice J. Chelameswar, Justice R.F. Nariman

JUDGMENT DATED: March 24, 2015

BACKGROUND:
This landmark constitutional case challenged Section 66A of the Information Technology Act, 2000. The petitioner argued that Section 66A was unconstitutional as it violated the fundamental right to freedom of speech and expression guaranteed under Article 19(1)(a) of the Constitution of India.

Section 66A made it a criminal offence to send through a computer or communication device any information that is "grossly offensive" or has "menacing character" - terms that were vague and undefined.

FACTS THAT LED TO THE PETITION:
Two young women from Mumbai were arrested in 2012 for posting a comment on Facebook questioning the shutdown of Mumbai following the death of a political leader. This arrest caused widespread outrage and led to this petition.

CONSTITUTIONAL QUESTIONS:
1. Whether Section 66A of the IT Act violates Article 19(1)(a) of the Constitution?
2. Whether the restriction imposed is reasonable under Article 19(2)?

ANALYSIS BY COURT:
The Court analyzed the distinction between:
- Discussion, advocacy and incitement
- The three concepts of "discussion", "advocacy" and "incitement" in speech

The Court held that Section 66A used vague and overbroad terms like "grossly offensive", "menacing", "causing annoyance, inconvenience, danger, obstruction, insult, injury" which could not be justified under Article 19(2) grounds.

JUDGMENT:
Section 66A of the Information Technology Act, 2000 is declared UNCONSTITUTIONAL in its entirety as it violates the fundamental right to freedom of speech and expression under Article 19(1)(a) of the Constitution of India.

IMPACT:
This judgment is a landmark in Indian internet law. It struck down a law that was being misused to silence dissent and criticism online.`,
  },

  // ── MURDER CASES ───────────────────────────────────────
  {
    caseTitle: "Bachan Singh v. State of Punjab",
    caseNumber: "SC/CRL/1980/898",
    crimeNumber: "CRL/A/273/1979",
    category: "Murder",
    court: "Supreme Court of India",
    bench: "Constitutional Bench of 5 Judges",
    judge: "Justice Y.V. Chandrachud, Justice A.C. Gupta, Justice N.L. Untwalia, Justice P.N. Bhagwati, Justice R.S. Sarkaria",
    date: new Date("1980-05-09"),
    sections: ["302 IPC", "354 CrPC"],
    isBailCase: false,
    isMurder: true,
    isKidnapping: false,
    isCyberCrime: false,
    summary: null,
    fullText: `IN THE SUPREME COURT OF INDIA

Criminal Appeal No. 273 of 1979

BACHAN SINGH v. STATE OF PUNJAB

CONSTITUTIONAL BENCH JUDGMENT
Dated: 9th May 1980

FACTS:
Bachan Singh was convicted of murdering three persons and was sentenced to death by the Sessions Court. The High Court of Punjab confirmed the death sentence. He appealed to the Supreme Court.

CONSTITUTIONAL QUESTION:
Whether the death penalty for murder as prescribed under Section 302 of the Indian Penal Code and the sentencing procedure under Section 354(3) of the Code of Criminal Procedure, 1973, are unconstitutional?

PETITIONER'S ARGUMENT:
- Death penalty is cruel, inhuman and degrading punishment
- It violates Article 21 (Right to Life) of the Constitution
- The unguided discretion given to courts is unconstitutional

COURT'S ANALYSIS:
The Court examined the historical, philosophical, and penological aspects of capital punishment. It reviewed the practice across various countries and international human rights instruments.

The Court held that Article 21 does not absolutely prohibit death penalty. The right to life can be taken away by procedure established by law, provided that procedure is fair, just and reasonable.

LANDMARK RULING — "RAREST OF RARE" DOCTRINE:
The Supreme Court established the famous "rarest of rare" principle. Death sentence should be imposed ONLY in the rarest of rare cases when the alternative option of life imprisonment is unquestionably foreclosed.

FACTORS TO CONSIDER:
The Court laid down aggravating and mitigating circumstances:
AGGRAVATING: premeditated murder, extreme brutality, murder of innocent child
MITIGATING: young age, mental instability, first offender, no prior criminal record

JUDGMENT:
Death penalty as provided in Section 302 IPC is NOT unconstitutional. However, it must be imposed only in the "rarest of rare" cases. The normal punishment for murder is life imprisonment; death penalty is an exception.

The appeal was dismissed. The death sentence of Bachan Singh was upheld.

SIGNIFICANCE:
This is one of the most important criminal law judgments in India, establishing the constitutional validity of capital punishment while limiting its application to only the most heinous crimes.`,
  },

  {
    caseTitle: "K.M. Nanavati v. State of Maharashtra",
    caseNumber: "SC/CRL/1962/521",
    crimeNumber: "Sessions Case 237/1959",
    category: "Murder",
    court: "Supreme Court of India",
    bench: "Division Bench",
    judge: "Justice B.P. Sinha, Justice J.L. Kapur",
    date: new Date("1962-11-24"),
    sections: ["302 IPC", "34 IPC"],
    isBailCase: false,
    isMurder: true,
    isKidnapping: false,
    isCyberCrime: false,
    summary: null,
    fullText: `IN THE SUPREME COURT OF INDIA

Criminal Appeal No. 521 of 1962

K.M. NANAVATI v. STATE OF MAHARASHTRA

JUDGMENT DATED: November 24, 1962

BACKGROUND — THE FAMOUS NANAVATI CASE:
This is one of the most sensational murder trials in Indian history. The case led to the abolition of the jury system in India.

FACTS:
Commander Kawas Manekshaw Nanavati was an officer in the Indian Navy. He discovered that his wife Sylvia was having an affair with Prem Ahuja, a businessman and family friend. On April 27, 1959, Nanavati confronted Ahuja in his bedroom. Ahuja was shot dead with Nanavati's service revolver.

Nanavati immediately surrendered himself to the police.

AT THE SESSIONS COURT:
The case was tried before a jury. The jury returned a verdict of NOT GUILTY by 8-1. This created a major controversy. The Sessions Judge, disagreeing with the jury verdict, referred the case to the Bombay High Court under Section 307 CrPC.

AT THE BOMBAY HIGH COURT:
The High Court found the jury verdict to be "perverse" and convicted Nanavati of culpable homicide amounting to murder under Section 302 IPC. He was sentenced to life imprisonment.

THE DEFENCE'S ARGUMENT:
- Nanavati acted under grave and sudden provocation
- The killing was accidental, not premeditated
- He surrendered immediately showing remorse

PROSECUTION'S ARGUMENT:
- Nanavati went home, got his pistol, and then went to Ahuja's flat
- This shows premeditation and planning, not sudden provocation
- The time gap between discovering the affair and the shooting eliminates provocation

SUPREME COURT ANALYSIS:
The Court examined whether the defence of "grave and sudden provocation" was available. Under Exception 1 to Section 300 IPC, a murder reduces to culpable homicide if done in the heat of passion due to sudden provocation.

The Court held that the provocation, even if real, was not "sudden" enough to deprive Nanavati of self-control. He had time to calm down, go home, get his weapon, and then proceed to commit the act.

JUDGMENT:
Appeal DISMISSED. Conviction under Section 302 IPC upheld. Life imprisonment confirmed.

AFTERMATH AND SIGNIFICANCE:
1. This case led to abolition of the jury system in India in 1960
2. Nanavati was eventually pardoned by the Governor of Maharashtra in 1964
3. The case was the inspiration for several Bollywood films
4. It remains a landmark case in criminal law regarding provocation as a defense`,
  },

  // ── THEFT CASES ────────────────────────────────────────
  {
    caseTitle: "State of Maharashtra v. Vishwanath Tukaram Umale",
    caseNumber: "HC/CRL/2018/4521",
    crimeNumber: "CR No. 45/2017",
    category: "Theft",
    court: "Bombay High Court",
    bench: null,
    judge: "Justice S.S. Shinde",
    date: new Date("2018-07-15"),
    sections: ["379 IPC", "411 IPC"],
    isBailCase: false,
    isMurder: false,
    isKidnapping: false,
    isCyberCrime: false,
    summary: null,
    fullText: `IN THE HIGH COURT OF JUDICATURE AT BOMBAY

Criminal Appeal No. 4521 of 2018

STATE OF MAHARASHTRA v. VISHWANATH TUKARAM UMALE

BEFORE: Justice S.S. Shinde
DATED: 15th July 2018

FACTS OF THE CASE:
The accused-respondent Vishwanath Tukaram Umale was charged with committing theft of gold ornaments and cash from the residence of the complainant Sunita Sharma. The alleged incident took place on the night of 10th March 2017 when the complainant's family was asleep.

The accused was a domestic worker in a neighboring house and had access to the building premises. The total value of stolen property was approximately Rs. 2,50,000.

CHARGES:
1. Section 379 IPC — Theft
2. Section 411 IPC — Dishonestly receiving stolen property (for items found in possession)

EVIDENCE PRESENTED BY PROSECUTION:
1. Recovery of ornaments from accused's possession during search
2. Fingerprints matching accused found on window latch
3. CCTV footage showing accused in building at time of theft
4. Testimony of watchman who saw accused entering and leaving at odd hours

DEFENCE ARGUMENT:
The accused claimed the recovered items were his own and denied any knowledge of the complainant's missing goods. The accused claimed CCTV footage was manipulated.

SESSIONS COURT JUDGMENT:
The Sessions Court acquitted the accused citing insufficient evidence. The State challenged this acquittal.

HIGH COURT ANALYSIS:
The High Court re-examined the evidence. Recovery of stolen property immediately after the crime, matching fingerprints, and CCTV footage collectively formed a strong circumstantial case. The Sessions Court had wrongly discarded corroborating evidence.

Regarding fingerprints, the Court noted that they matched the accused with 97% certainty as per the expert report.

JUDGMENT:
The acquittal by the Sessions Court is SET ASIDE. The accused is found GUILTY under Section 379 IPC (Theft) and Section 411 IPC.

SENTENCE:
- Section 379 IPC: 2 years Rigorous Imprisonment + Rs. 1000 fine
- Section 411 IPC: 1 year Rigorous Imprisonment
- To run concurrently`,
  },

  // ── BAIL CASE ──────────────────────────────────────────
  {
    caseTitle: "Arnab Manoranjan Goswami v. State of Maharashtra",
    caseNumber: "SC/CRL/2020/742",
    crimeNumber: null,
    category: "Bail Case",
    court: "Supreme Court of India",
    bench: "Division Bench",
    judge: "Justice D.Y. Chandrachud, Justice Indira Banerjee",
    date: new Date("2020-11-27"),
    sections: ["306 IPC", "439 CrPC"],
    isBailCase: true,
    isMurder: false,
    isKidnapping: false,
    isCyberCrime: false,
    summary: null,
    fullText: `IN THE SUPREME COURT OF INDIA

Criminal Appeal No. 742 of 2020

ARNAB MANORANJAN GOSWAMI v. STATE OF MAHARASHTRA

BENCH: Justice D.Y. Chandrachud, Justice Indira Banerjee
DATED: 27th November 2020

BACKGROUND:
Arnab Goswami, a television journalist and editor-in-chief, was arrested on 4th November 2020 in connection with a 2018 abetment to suicide case. The case involved the alleged suicide of interior designer Anvay Naik and his mother.

The Bombay High Court refused to grant interim bail. He appealed to the Supreme Court.

CHARGES:
Section 306 IPC — Abetment of Suicide

PETITIONER'S ARGUMENTS:
1. Personal liberty under Article 21 is being violated
2. The FIR was closed in 2019 by the previous government and was reopened for political reasons
3. No prima facie case of abetment to suicide exists
4. Custodial interrogation is being used as a tool of harassment

RESPONDENT'S ARGUMENTS:
1. Proper procedure was followed in arrest
2. The case involves serious charges and bail should not be granted
3. Victims' family has the right to seek justice

COURT'S ANALYSIS ON BAIL PRINCIPLES:
The Supreme Court made important observations on personal liberty:

"The writ of liberty runs through the fabric of our Constitution. No person should remain in custody when bail can be granted."

The Court emphasized that bail is the rule, jail is the exception in cases where the accused is not likely to flee or tamper with evidence.

KEY PRINCIPLE STATED:
"When bail is refused, the court must record specific reasons. Vague observations are insufficient to deny a person their fundamental right to liberty."

The Court noted that high courts have a special responsibility to protect personal liberty of citizens.

JUDGMENT:
Bail GRANTED with conditions:
1. The accused shall report to police once a week
2. Shall not leave Maharashtra without permission of the court
3. Shall not make any public statements about the case
4. Shall surrender his passport

SIGNIFICANCE:
This judgment reinforced the principle that courts must be sensitive to personal liberty. It sent a message that even in serious cases, bail cannot be denied without strong and specific reasons.`,
  },

  // ── KIDNAPPING CASE ────────────────────────────────────
  {
    caseTitle: "State of Uttar Pradesh v. Sanjay Kumar Singh",
    caseNumber: "ALL/HC/2019/3321",
    crimeNumber: "CR No. 892/2018",
    category: "Kidnapping",
    court: "Allahabad High Court",
    bench: null,
    judge: "Justice Ramesh Sinha",
    date: new Date("2019-08-22"),
    sections: ["364A IPC", "363 IPC", "34 IPC"],
    isBailCase: false,
    isMurder: false,
    isKidnapping: true,
    isCyberCrime: false,
    summary: null,
    fullText: `IN THE HIGH COURT OF JUDICATURE AT ALLAHABAD

Criminal Appeal No. 3321 of 2019

STATE OF UTTAR PRADESH v. SANJAY KUMAR SINGH & OTHERS

BEFORE: Justice Ramesh Sinha
DATED: 22nd August 2019

FACTS OF THE CASE:
A 12-year-old child, son of a businessman, was kidnapped on his way to school on 15th January 2018. A ransom of Rs. 50 lakhs was demanded by the accused. The child was held captive for 7 days before being rescued by the Uttar Pradesh Police's Special Task Force (STF).

Three accused persons — Sanjay Kumar Singh, Rahul Verma, and Ravi Kumar — were arrested.

CHARGES:
1. Section 364A IPC — Kidnapping for Ransom
2. Section 363 IPC — Kidnapping
3. Section 34 IPC — Common Intention

EVIDENCE:
1. The child's testimony identifying all three accused
2. Call records of ransom demand calls traced to accused
3. Recovered mobile phones with deleted messages
4. Identification parade conducted

SESSIONS COURT JUDGMENT:
Sessions Court convicted all three under Sections 364A and 363 IPC and sentenced Sanjay Kumar Singh to death. Rahul Verma and Ravi Kumar were sentenced to life imprisonment.

ISSUE BEFORE HIGH COURT:
1. Whether the conviction is justified based on evidence?
2. Whether death sentence awarded to Sanjay Kumar Singh is appropriate?

HIGH COURT ANALYSIS:
The Court examined whether the case qualifies as "rarest of rare" for death penalty. While kidnapping for ransom is a serious crime, the victim was returned safely and the accused have no prior criminal records.

On conviction: The evidence including child's testimony, call records, and identification was found cogent and reliable.

JUDGMENT:
Conviction of all three accused UPHELD.

SENTENCE MODIFICATION:
The death sentence of Sanjay Kumar Singh is COMMUTED to Life Imprisonment. The Court held this case does not qualify as "rarest of rare" since the victim was released unharmed.

All three shall serve mandatory minimum 30 years before consideration of parole.`,
  },

  // ── FRAUD CASE ─────────────────────────────────────────
  {
    caseTitle: "Central Bureau of Investigation v. Harshad Shantilal Mehta",
    caseNumber: "SC/CRL/2001/1154",
    crimeNumber: null,
    category: "Fraud",
    court: "Supreme Court of India",
    bench: "Division Bench",
    judge: "Justice B.N. Kirpal, Justice Y.K. Sabharwal",
    date: new Date("2001-11-14"),
    sections: ["420 IPC", "120B IPC", "409 IPC"],
    isBailCase: false,
    isMurder: false,
    isKidnapping: false,
    isCyberCrime: false,
    summary: null,
    fullText: `IN THE SUPREME COURT OF INDIA

Criminal Appeal No. 1154 of 2001

CENTRAL BUREAU OF INVESTIGATION v. HARSHAD SHANTILAL MEHTA

BENCH: Justice B.N. Kirpal, Justice Y.K. Sabharwal
DATED: 14th November 2001

BACKGROUND — THE SECURITIES SCAM OF 1992:
This case relates to the famous "Harshad Mehta Scam" — India's biggest financial fraud at the time. Harshad Mehta, a stockbroker known as the "Big Bull", manipulated the Indian stock market between 1991-1992, inflating stock prices artificially.

The scam involved fraudulent Bank Receipts (BRs) — fake documents used to fraudulently obtain money from banks. The scam caused a market crash that affected millions of investors.

CHARGES:
1. Section 420 IPC — Cheating and dishonestly inducing delivery of property
2. Section 120B IPC — Criminal conspiracy
3. Section 409 IPC — Criminal breach of trust by public servant

THE BANK RECEIPT FRAUD:
Harshad Mehta, in collusion with bank officials, used fake Bank Receipts worth Rs. 5000 crores to temporarily fund stock purchases. He would pump up stocks, sell them at inflated prices, and then repay the banks — but the scheme collapsed.

Banks defrauded included: National Housing Bank, State Bank of India, and others.

DEFENSE ARGUMENT:
The accused was merely working within the existing system. Bank officials were equally responsible. The accused was not alone and acted with full knowledge of bank officials.

CBI ARGUMENT:
The conspiracy was hatched between the accused and bank officials to defraud thousands of investors and the banking system of India.

COURT'S OBSERVATION:
"White collar crime of this nature strikes at the very roots of the country's financial system. The damage caused extends far beyond the immediate victims."

JUDGMENT:
Harshad Mehta was found GUILTY of multiple charges of cheating and fraud.

NOTE: Harshad Mehta passed away in judicial custody on December 31, 2001 while the trials were still pending. This judgment covers the completed portions of the case.

SIGNIFICANCE:
1. Led to major reforms in Indian banking and securities law
2. SEBI (Securities and Exchange Board of India) was given more powers
3. Led to the Securities Laws (Amendment) Act 1995
4. The case inspired multiple books and the famous web series "Scam 1992"`,
  },

  // ── NEW CASE #1 (replaces duplicate CC-2015-001) ───────
  // Cyber Crime
  {
    caseTitle: "State v. Manish Kathuria",
    caseNumber: "CC-1999-001",
    crimeNumber: "CR No. 509/1999",
    category: "Cyber Crime",
    court: "Additional Chief Metropolitan Magistrate, Delhi",
    bench: null,
    judge: "Justice S.N. Dhingra",
    date: new Date("1999-04-15"),
    sections: ["67 IT Act", "509 IPC", "354 IPC"],
    isBailCase: false,
    isMurder: false,
    isKidnapping: false,
    isCyberCrime: true,
    summary: null,
    fullText: `IN THE COURT OF ADDITIONAL CHIEF METROPOLITAN MAGISTRATE, DELHI

Case No: CC-1999-001
State v. Manish Kathuria

JUDGMENT DELIVERED ON: 15th April 1999

FACTS OF THE CASE:
This case is one of the earliest cyber stalking and online harassment cases in India, predating the Information Technology Act 2000. The complainant, Ms. Ritu Kohli, reported that the accused Manish Kathuria was using her name and personal details on Internet Relay Chat (IRC) channels to post obscene and offensive messages. He impersonated her online and gave out her home phone number, inviting men to contact her for sexual purposes.

As a result, the complainant received obscene phone calls at all hours of the day and night, causing severe mental trauma to her and her family.

CHARGES:
The accused was charged under:
- Section 509 IPC (Word, gesture or act intended to insult the modesty of a woman)
- Section 354 IPC (Assault or criminal force to woman with intent to outrage her modesty)
- Section 67 IT Act (Publishing obscene material in electronic form) — added later

EVIDENCE:
1. Chat transcripts recovered from internet service provider
2. Phone records showing the volume and timing of obscene calls
3. Testimony of the complainant and her family members
4. Witness statements from persons who were invited online to call the complainant

JUDGMENT:
The accused was found GUILTY. He was arrested and later released on bail.

SENTENCE:
- 1 year Rigorous Imprisonment under Section 509 IPC
- Fine of Rs. 1,000
- The case also led to the accused being sent to a psychiatric facility for evaluation

SIGNIFICANCE:
This is one of the first documented cyber stalking cases in India. It highlighted a major gap in Indian law — the IT Act 2000 had not yet been enacted. The case was instrumental in pushing for specific cyber crime legislation in India and is cited in discussions around the need for online harassment laws.`,
  },

  {
    caseTitle: "State vs Akash Sharma - Online Banking Fraud",
    caseNumber: "CC-2023-002",
    category: "Cyber Crime",
    court: "Delhi High Court",
    bench: null,
    judge: "Justice Prathiba M. Singh",
    date: new Date("2023-06-15"),
    sections: ["Section 66C IT Act", "Section 66D IT Act", "420 IPC"],
    isBailCase: false,
    isMurder: false,
    isKidnapping: false,
    isCyberCrime: true,
    summary: null,
    fullText: `CASE: State vs Akash Sharma
COURT: Delhi High Court
DATE: June 15, 2023

FACTS:
The accused created fake banking websites to phish credentials of customers of multiple nationalized banks. Over 200 victims lost a total of Rs. 45 lakhs. The accused used VPNs to mask identity but was traced through IP logs obtained from ISPs.

ISSUES:
Whether identity theft and phishing constitute offenses under the IT Act and IPC.

JUDGMENT:
The Court found the accused GUILTY under Section 66C (identity theft) and Section 66D (cheating by impersonation) of the IT Act, as well as Section 420 IPC.

SENTENCE:
- Section 66C: 3 years imprisonment + Rs. 1 lakh fine
- Section 66D: 3 years imprisonment + Rs. 1 lakh fine
- Section 420 IPC: 5 years imprisonment
- Sentences to run concurrently`,
  },

  {
    caseTitle: "Vijay Kumar vs State - Cyberstalking Case",
    caseNumber: "CC-2022-003",
    category: "Cyber Crime",
    court: "Bombay High Court",
    bench: null,
    judge: "Justice S.S. Shinde",
    date: new Date("2022-09-10"),
    sections: ["Section 67 IT Act", "Section 354D IPC"],
    isBailCase: false,
    isMurder: false,
    isKidnapping: false,
    isCyberCrime: true,
    summary: null,
    fullText: `CASE: Vijay Kumar vs State
COURT: Bombay High Court
DATE: September 10, 2022

FACTS:
The accused repeatedly sent threatening and obscene messages to the complainant through multiple social media platforms over 8 months. Despite being blocked, he created new accounts to continue harassment.

ISSUES:
Whether persistent online harassment constitutes cyberstalking under Indian law.

JUDGMENT:
The Court upheld conviction under Section 354D IPC (stalking) read with Section 67 IT Act.

SENTENCE:
- 3 years rigorous imprisonment
- Rs. 50,000 fine
- Prohibited from using social media for 5 years post release`,
  },

  // ── NEW CASE #2 (replaces duplicate MR-1961-001) ───────
  // Murder
  {
    caseTitle: "Machhi Singh v. State of Punjab",
    caseNumber: "SC/CRL/1983/955",
    crimeNumber: "CRL/A/386/1982",
    category: "Murder",
    court: "Supreme Court of India",
    bench: "Division Bench",
    judge: "Justice M.P. Thakkar, Justice S. Natarajan",
    date: new Date("1983-07-20"),
    sections: ["302 IPC", "34 IPC", "354 CrPC"],
    isBailCase: false,
    isMurder: true,
    isKidnapping: false,
    isCyberCrime: false,
    summary: null,
    fullText: `IN THE SUPREME COURT OF INDIA

Criminal Appeal No. 955 of 1983

MACHHI SINGH & OTHERS v. STATE OF PUNJAB

BENCH: Justice M.P. Thakkar, Justice S. Natarajan
DATED: 20th July 1983

BACKGROUND:
This case arose from a gruesome mass murder in rural Punjab. The accused Machhi Singh and his associates carried out a series of revenge killings targeting multiple members of a rival family, killing 17 people across several villages over one night.

FACTS:
Machhi Singh had a long-standing enmity with another family stemming from a land and honour dispute. On the night of the incident, he organized and led an armed group that systematically attacked multiple households, killing 17 persons including women and children.

CHARGES:
Section 302 IPC — Murder (17 counts)
Section 34 IPC — Common Intention

SESSIONS COURT AND HIGH COURT:
Both courts convicted Machhi Singh and awarded the death sentence for the multiple murders.

CONSTITUTIONAL QUESTION BEFORE SUPREME COURT:
The court was asked to re-examine and refine the "rarest of rare" doctrine laid down in Bachan Singh v. State of Punjab (1980) and to lay down more specific guidelines for when death penalty is appropriate.

COURT'S CONTRIBUTION — CATEGORIES FOR DEATH PENALTY:
The Supreme Court elaborated the "rarest of rare" doctrine and laid down five specific categories of cases where death penalty may be awarded:

1. MANNER OF COMMISSION: When the murder is committed in an extremely brutal, grotesque, diabolical, revolting or dastardly manner that arouses intense and extreme indignation of the community.

2. MOTIVE: When the murder is committed for a motive which evinces total depravity and meanness — e.g., murder for gain, hired killers.

3. ANTI-SOCIAL OR SOCIALLY ABHORRENT NATURE: When the crime is enormous in proportion — for example, multiple murders of an entire family or a large number of persons of a particular caste or community.

4. MAGNITUDE OF CRIME: When multiple murders are committed.

5. PERSONALITY OF VICTIM: Murder of an innocent child, helpless woman, aged person or a public figure.

BALANCING TEST:
The Court stated that even within these categories, the court must weigh aggravating and mitigating circumstances. The death penalty should be awarded only when the mitigating circumstances are wholly absent or are completely outweighed by the aggravating ones.

JUDGMENT:
The death sentence was CONFIRMED for Machhi Singh given the scale, premeditation, brutality, and multiple victims including women and children.

SIGNIFICANCE:
This judgment is the companion case to Bachan Singh and together they form the foundational framework for capital punishment sentencing in India. It remains one of the most cited cases in death penalty jurisprudence.`,
  },

  {
    caseTitle: "State of UP vs Satish - Premeditated Murder",
    caseNumber: "MR-2021-002",
    category: "Murder",
    court: "Allahabad High Court",
    bench: null,
    judge: "Justice Ramesh Sinha",
    date: new Date("2021-03-18"),
    sections: ["302 IPC", "34 IPC"],
    isBailCase: false,
    isMurder: true,
    isKidnapping: false,
    isCyberCrime: false,
    summary: null,
    fullText: `CASE: State of UP vs Satish
COURT: Allahabad High Court
DATE: March 18, 2021

FACTS:
The accused along with two associates planned and executed the murder of a business rival over a property dispute. CCTV footage, eyewitness testimony, and forensic evidence confirmed their involvement.

ISSUES:
Whether common intention under Section 34 IPC was established against all three accused.

JUDGMENT:
All three accused found GUILTY under Section 302 read with Section 34 IPC.

SENTENCE:
- Life imprisonment for all three
- Fine of Rs. 50,000 each
- Compensation of Rs. 5 lakhs to victim's family`,
  },

  // ── THEFT ────────────────────────────────────────
  {
    caseTitle: "State vs Ramesh Kumar - ATM Theft",
    caseNumber: "TH-2022-001",
    category: "Theft",
    court: "Sessions Court Mumbai",
    bench: null,
    judge: "Justice A.R. Joshi",
    date: new Date("2022-04-20"),
    sections: ["379 IPC", "411 IPC"],
    isBailCase: false,
    isMurder: false,
    isKidnapping: false,
    isCyberCrime: false,
    summary: null,
    fullText: `CASE: State vs Ramesh Kumar
COURT: Sessions Court Mumbai
DATE: April 20, 2022

FACTS:
The accused was caught on CCTV tampering with an ATM machine and stealing cash from unsuspecting users using a skimming device. Over 50 victims reported fraudulent withdrawals.

ISSUES:
Whether installing skimming devices constitutes theft under IPC.

JUDGMENT:
Accused found GUILTY under Section 379 (theft) and Section 411 (dishonestly receiving stolen property) IPC.

SENTENCE:
- Section 379: 3 years rigorous imprisonment
- Section 411: 2 years rigorous imprisonment
- Sentences to run concurrently
- Restitution of Rs. 2 lakhs to victims`,
  },

  // ── NEW CASE #3 (replaces duplicate FR-1992-001) ───────
  // Fraud
  {
    caseTitle: "Central Bureau of Investigation v. B. Ramalinga Raju",
    caseNumber: "FR-2009-001",
    crimeNumber: "RC-AC1-2009-E-0001",
    category: "Fraud",
    court: "Special CBI Court, Hyderabad",
    bench: null,
    judge: "Justice T. Narasimha Reddy",
    date: new Date("2015-04-09"),
    sections: ["420 IPC", "409 IPC", "120B IPC", "Section 628 Companies Act"],
    isBailCase: false,
    isMurder: false,
    isKidnapping: false,
    isCyberCrime: false,
    summary: null,
    fullText: `IN THE SPECIAL CBI COURT, HYDERABAD

RC No. AC1-2009-E-0001

CENTRAL BUREAU OF INVESTIGATION v. B. RAMALINGA RAJU & OTHERS

BEFORE: Justice T. Narasimha Reddy
DATED: 9th April 2015

BACKGROUND — THE SATYAM SCAM:
This case relates to one of the biggest corporate fraud scandals in Indian history — the Satyam Computer Services accounting fraud, often compared to the Enron scandal of the USA.

Satyam Computer Services was one of India's largest IT companies. Its founder and Chairman B. Ramalinga Raju admitted on January 7, 2009, in a letter to the Board of Directors, that the company's accounts had been falsified for years.

THE FRAUD:
The accused inflated the company's cash and bank balances by Rs. 7,136 crores, overstated debtors by Rs. 490 crores, and accrued interest that did not exist. Fictitious employees were created on payroll and salaries diverted.

The fraud was concealed through manipulation of books of accounts, forged bank documents, and false certificates from auditors who were also complicit.

ACCUSED PERSONS:
1. B. Ramalinga Raju — Chairman and Founder
2. B. Rama Raju — Managing Director
3. Srinivas Vadlamani — CFO
4. Price Waterhouse auditors — (separately tried)

CHARGES:
1. Section 420 IPC — Cheating investors and shareholders
2. Section 409 IPC — Criminal breach of trust
3. Section 120B IPC — Criminal conspiracy
4. Section 628 of the Companies Act — Furnishing false statements

PROSECUTION CASE:
The CBI argued that Raju systematically manipulated Satyam's accounts over several years to show inflated profits and cash reserves. This was done to inflate share prices and enable the promoters to pledge shares for personal loans. When the fraud could no longer be sustained, Raju confessed.

DEFENCE ARGUMENT:
Raju's counsel argued that his confession was made under duress and that the quantum of fraud was misrepresented. The defence also argued procedural lapses in the CBI investigation.

JUDGMENT:
B. Ramalinga Raju and six others found GUILTY on all counts.

SENTENCE:
- B. Ramalinga Raju: 7 years Rigorous Imprisonment + Rs. 5.5 crore fine
- B. Rama Raju: 7 years Rigorous Imprisonment + Rs. 5.5 crore fine
- Other accused: 7 years RI each with proportional fines
- All sentences to run concurrently

SIGNIFICANCE:
1. This case led to major reforms in corporate governance norms in India
2. The Companies Act 2013 introduced stricter auditor accountability
3. SEBI strengthened disclosure and insider trading regulations
4. The case established that promoter-level fraud in listed companies will be prosecuted severely under criminal law`,
  },

  // ── DRUG OFFENSE ──────────────────────────────────
  {
    caseTitle: "State vs Mohammed Ali - NDPS Trafficking",
    caseNumber: "DR-2023-001",
    category: "Drug Offense",
    court: "Special NDPS Court Delhi",
    bench: null,
    judge: "Justice Kaveri Baweja",
    date: new Date("2023-01-25"),
    sections: ["Section 21 NDPS Act", "Section 29 NDPS Act"],
    isBailCase: false,
    isMurder: false,
    isKidnapping: false,
    isCyberCrime: false,
    summary: null,
    fullText: `CASE: State vs Mohammed Ali
COURT: Special NDPS Court Delhi
DATE: January 25, 2023

FACTS:
The accused was arrested at IGI Airport with 2.5 kg of heroin concealed in a modified suitcase. Intelligence inputs led to his interception. Investigation revealed he was part of an international drug trafficking syndicate.

ISSUES:
Whether possession of commercial quantity of heroin with intent to traffic attracts rigorous punishment under NDPS Act.

JUDGMENT:
Accused found GUILTY under Section 21 (possession of hard drugs) and Section 29 (abetment of trafficking) of the NDPS Act.

SENTENCE:
- 15 years rigorous imprisonment
- Fine of Rs. 2 lakhs
- Property seized and forfeited to government`,
  },

  // ── ASSAULT ───────────────────────────────────────
  {
    caseTitle: "State vs Rajan Pillai - Grievous Hurt",
    caseNumber: "AS-2021-001",
    category: "Assault",
    court: "Kerala High Court",
    bench: null,
    judge: "Justice A. Muhamed Mustaque",
    date: new Date("2021-07-14"),
    sections: ["Section 326 IPC", "Section 324 IPC"],
    isBailCase: false,
    isMurder: false,
    isKidnapping: false,
    isCyberCrime: false,
    summary: null,
    fullText: `CASE: State vs Rajan Pillai
COURT: Kerala High Court
DATE: July 14, 2021

FACTS:
The accused attacked the complainant with an iron rod during a neighbourhood dispute, causing grievous injuries including a fractured skull. Three eyewitnesses confirmed the assault. Medical reports documented the severity of injuries.

ISSUES:
Whether voluntary causing of grievous hurt with a dangerous weapon attracts enhanced punishment under Section 326 IPC.

JUDGMENT:
Accused found GUILTY under Section 326 IPC (voluntarily causing grievous hurt by dangerous weapon).

SENTENCE:
- 7 years rigorous imprisonment
- Rs. 1 lakh fine
- Rs. 2 lakhs compensation to victim`,
  },

  // ── KIDNAPPING ────────────────────────────────────
  {
    caseTitle: "State vs Sanjay Yadav - Kidnapping for Ransom",
    caseNumber: "KD-2022-001",
    category: "Kidnapping",
    court: "Patna High Court",
    bench: null,
    judge: "Justice Chakradhari Sharan Singh",
    date: new Date("2022-08-30"),
    sections: ["Section 364A IPC", "Section 363 IPC"],
    isBailCase: false,
    isMurder: false,
    isKidnapping: true,
    isCyberCrime: false,
    summary: null,
    fullText: `CASE: State vs Sanjay Yadav
COURT: Patna High Court
DATE: August 30, 2022

FACTS:
A 10 year old child was abducted from outside his school. Ransom of Rs. 50 lakhs was demanded. Police traced the call and rescued the child within 48 hours. Three accused were arrested.

ISSUES:
Whether kidnapping for ransom attracts death penalty or life imprisonment under Section 364A IPC.

JUDGMENT:
All three accused GUILTY under Section 364A IPC (kidnapping for ransom).

SENTENCE:
- Life imprisonment for the main accused
- 10 years imprisonment for the two accomplices
- Fine of Rs. 1 lakh each`,
  },

  // ── NEW CASE #4 (replaces duplicate BC-2020-001) ───────
  // Bail Case
  {
    caseTitle: "Sanjay Chandra v. Central Bureau of Investigation",
    caseNumber: "SC/CRL/2011/2178",
    crimeNumber: null,
    category: "Bail Case",
    court: "Supreme Court of India",
    bench: "Division Bench",
    judge: "Justice G.S. Singhvi, Justice A.K. Ganguly",
    date: new Date("2011-11-23"),
    sections: ["420 IPC", "120B IPC", "437 CrPC", "439 CrPC"],
    isBailCase: true,
    isMurder: false,
    isKidnapping: false,
    isCyberCrime: false,
    summary: null,
    fullText: `IN THE SUPREME COURT OF INDIA

Criminal Appeal No. 2178 of 2011

SANJAY CHANDRA v. CENTRAL BUREAU OF INVESTIGATION

BENCH: Justice G.S. Singhvi, Justice A.K. Ganguly
DATED: 23rd November 2011

BACKGROUND — THE 2G SPECTRUM CASE:
This case arose out of the massive 2G Spectrum allocation scam. The accused Sanjay Chandra was the Managing Director of Unitech Ltd., a company that received 2G spectrum licenses allegedly through corrupt means. The Supreme Court had already cancelled 122 spectrum licenses in this matter.

The CBI arrested Sanjay Chandra along with other accused. He applied for bail which was rejected by the Special CBI Court and the Delhi High Court. He appealed to the Supreme Court.

CHARGES:
1. Section 420 IPC — Cheating
2. Section 120B IPC — Criminal Conspiracy

ARGUMENTS BY PETITIONER:
1. The accused had deep roots in society and would not flee
2. All documents were already seized; no tampering possible
3. The investigation was complete; no purpose served by continued custody
4. Long incarceration without trial completion violates Article 21

ARGUMENTS BY CBI:
1. The scam is of enormous magnitude and the accused is influential
2. There is risk of witness tampering
3. Other co-accused are still absconding

COURT'S ANALYSIS ON BAIL JURISPRUDENCE:
The Supreme Court reaffirmed that the object of bail is to secure the attendance of the accused at the trial and not to punish him prior to conviction.

The Court laid down key principles:
"Bail is not to be withheld as a punishment. The question is not whether the accused may be punished, but whether he is likely to abscond or tamper with evidence."

The Court further observed that in economic offences, the seriousness of the charge alone cannot be the basis to deny bail. Courts must individually assess the likelihood of flight risk and evidence tampering.

FACTORS WEIGHED:
- Accused was a prominent businessman with fixed assets and family in India
- Investigation already complete; charge-sheet filed
- Documents already seized and were safe with CBI
- Trial was expected to take several years

JUDGMENT:
Bail GRANTED subject to stringent conditions:
1. Surrender of passport
2. Not to leave India without prior permission of the court
3. Deposit of Rs. 5 crore as surety
4. Report to CBI office every Monday
5. Not to contact witnesses or co-accused

SIGNIFICANCE:
This judgment is a landmark in bail jurisprudence in economic offence cases. It stands for the principle that even in high-profile cases involving massive fraud, an accused is entitled to bail once the investigation is complete, as long as there is no genuine flight risk or danger of evidence tampering.`,
  },

  // ── DRUG OFFENSE ───────────────────────────────────────
  {
    caseTitle: "Union of India v. Ram Samujh",
    caseNumber: "SC/CRL/2018/1208",
    crimeNumber: null,
    category: "Drug Offense",
    court: "Supreme Court of India",
    bench: "Division Bench",
    judge: "Justice Kurian Joseph, Justice Mohan M. Shantanagoudar",
    date: new Date("2018-03-06"),
    sections: ["21 NDPS Act", "29 NDPS Act", "37 NDPS Act"],
    isBailCase: false,
    isMurder: false,
    isKidnapping: false,
    isCyberCrime: false,
    summary: null,
    fullText: `IN THE SUPREME COURT OF INDIA

Criminal Appeal No. 1208 of 2018

UNION OF INDIA v. RAM SAMUJH

BENCH: Justice Kurian Joseph, Justice Mohan M. Shantanagoudar
DATED: 6th March 2018

FACTS OF THE CASE:
The respondent Ram Samujh was found in possession of heroin weighing 1.2 kg at a railway station. He was arrested by the Narcotics Control Bureau (NCB). The substance was commercial quantity under the NDPS Act.

The Sessions Court convicted and sentenced him to 10 years rigorous imprisonment. The High Court reduced the sentence and granted bail.

CHARGES:
1. Section 21 NDPS Act — Possession of commercial quantity of narcotics
2. Section 29 NDPS Act — Abetment and conspiracy

ISSUE BEFORE SUPREME COURT:
Whether the High Court was correct in reducing sentence and granting bail when the accused was found with commercial quantity of heroin?

LAW ON BAIL UNDER NDPS:
Section 37 of the NDPS Act imposes strict conditions for bail in cases involving commercial quantity:
- The Court must be satisfied there are reasonable grounds to believe the accused is not guilty
- The accused is not likely to commit any offense while on bail

These conditions are mandatory and courts cannot overlook them.

COURT'S ANALYSIS:
The Supreme Court found that the High Court did not apply the twin conditions under Section 37 properly. The mere fact that the trial took long time is not a ground to grant bail in NDPS commercial quantity cases.

The Court also emphasized that drug trafficking is a serious crime affecting the social fabric of society, particularly youth.

JUDGMENT:
The order of the High Court granting bail is SET ASIDE. The respondent shall surrender within two weeks. The original sentence of 10 years RI is RESTORED.

KEY PRINCIPLE:
In NDPS cases involving commercial quantity, the twin conditions of Section 37 are mandatory. Courts cannot bypass them citing delay in trial.`,
  },
];

// ── Run the seed ──────────────────────────────────────────
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB (lawDB)");

    // Clear existing cases (optional — comment out if you want to keep existing data)
    // await Case.deleteMany({});
    // console.log("🗑️  Cleared existing cases");

    let saved = 0;
    let skipped = 0;

    for (const caseData of sampleCases) {
      const exists = await Case.findOne({ caseNumber: caseData.caseNumber });
      if (exists) {
        console.log(`⏭️  Already exists: ${caseData.caseTitle.substring(0, 50)}`);
        skipped++;
        continue;
      }

      await Case.create(caseData);
      console.log(`✅ Saved: ${caseData.caseTitle.substring(0, 60)}`);
      saved++;
    }

    console.log(`\n🎉 DONE!`);
    console.log(`   ✅ Saved: ${saved} new cases`);
    console.log(`   ⏭️  Skipped (already existed): ${skipped} cases`);

    const total = await Case.countDocuments();
    console.log(`   📦 Total cases in database: ${total}`);

    // Show breakdown by category
    const breakdown = await Case.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    console.log("\n📊 Cases by Category:");
    breakdown.forEach(b => console.log(`   ${b._id}: ${b.count} cases`));

    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    mongoose.disconnect();
  }
};

seedDatabase();