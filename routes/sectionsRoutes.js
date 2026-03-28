const express = require("express");
const router  = express.Router();

// Static legal sections data by crime category
// Called by lawyer dashboard: GET /api/sections/:crimeType
const SECTIONS = {
  "Cyber Crime": [
    { section_code: "Section 66 IT Act",   section_name: "Computer Related Offences",       description: "Dishonestly or fraudulently doing acts causing damage to computer systems",         punishment: "Up to 3 years imprisonment or ₹5 lakh fine" },
    { section_code: "Section 66C IT Act",  section_name: "Identity Theft",                   description: "Fraudulently using another person's electronic signature, password or biometric",   punishment: "Up to 3 years + ₹1 lakh fine" },
    { section_code: "Section 66D IT Act",  section_name: "Cheating by Impersonation",         description: "Cheating by impersonating any person using a computer resource",                    punishment: "Up to 3 years + ₹1 lakh fine" },
    { section_code: "Section 67 IT Act",   section_name: "Publishing Obscene Material",       description: "Publishing or transmitting obscene material in electronic form",                    punishment: "First offence: 3 yrs + ₹5L; Repeat: 5 yrs + ₹10L" },
    { section_code: "Section 354D IPC",    section_name: "Cyberstalking",                     description: "Stalking a woman via internet or electronic communication",                         punishment: "First conviction: up to 3 years; Subsequent: up to 5 years" },
    { section_code: "Section 420 IPC",     section_name: "Cheating",                          description: "Cheating and dishonestly inducing delivery of property",                           punishment: "Up to 7 years + fine" },
  ],
  "Murder": [
    { section_code: "Section 302 IPC",    section_name: "Punishment for Murder",               description: "Whoever commits murder shall be punished",                                         punishment: "Death or life imprisonment + fine" },
    { section_code: "Section 304 IPC",    section_name: "Culpable Homicide (Not Murder)",      description: "Culpable homicide not amounting to murder",                                        punishment: "Up to life imprisonment + fine" },
    { section_code: "Section 34 IPC",     section_name: "Common Intention",                    description: "Acts done by several persons in furtherance of a common intention",                punishment: "Each person liable as if done by them alone" },
    { section_code: "Section 354 CrPC",   section_name: "Sentence of Death (Procedure)",       description: "Court must record special reasons before awarding death penalty",                   punishment: "Procedural safeguard — not a standalone charge" },
  ],
  "Theft": [
    { section_code: "Section 379 IPC",    section_name: "Punishment for Theft",                description: "Dishonestly taking movable property without consent",                              punishment: "Up to 3 years + fine" },
    { section_code: "Section 380 IPC",    section_name: "Theft in Dwelling House",              description: "Theft in any building used as human dwelling",                                     punishment: "Up to 7 years + fine" },
    { section_code: "Section 411 IPC",    section_name: "Receiving Stolen Property",            description: "Dishonestly receiving or retaining stolen property",                              punishment: "Up to 3 years or fine or both" },
    { section_code: "Section 392 IPC",    section_name: "Robbery",                              description: "Theft accompanied by hurt or immediate fear of hurt",                             punishment: "Up to 10 years + fine" },
  ],
  "Fraud": [
    { section_code: "Section 420 IPC",    section_name: "Cheating",                             description: "Cheating and dishonestly inducing delivery of property",                          punishment: "Up to 7 years + fine" },
    { section_code: "Section 409 IPC",    section_name: "Criminal Breach of Trust",             description: "Criminal breach of trust by public servant, banker or agent",                    punishment: "Life imprisonment or up to 10 years + fine" },
    { section_code: "Section 120B IPC",   section_name: "Criminal Conspiracy",                  description: "Agreement between two or more persons to commit a criminal act",                  punishment: "Same as abetment of the underlying offence" },
    { section_code: "Section 468 IPC",    section_name: "Forgery for Cheating",                 description: "Forgery committed for the purpose of cheating",                                   punishment: "Up to 7 years + fine" },
  ],
  "Drug Offense": [
    { section_code: "Section 21 NDPS Act",  section_name: "Manufactured Drug Offences",        description: "Possession/trafficking of heroin, cocaine and other manufactured drugs",          punishment: "Small qty: 1 yr; Intermediate: 10 yrs; Commercial: 10–20 yrs" },
    { section_code: "Section 20 NDPS Act",  section_name: "Cannabis Offences",                 description: "Contravention relating to cannabis plant, ganja or charas",                       punishment: "Small qty: 6 months; Commercial: 10–20 yrs + fine" },
    { section_code: "Section 29 NDPS Act",  section_name: "Abetment / Conspiracy",             description: "Abetting or conspiring to commit an NDPS offence",                               punishment: "Same punishment as the primary offence" },
    { section_code: "Section 37 NDPS Act",  section_name: "Bail Restrictions",                 description: "Dual conditions required before bail in commercial quantity drug cases",           punishment: "N/A — Procedural restriction" },
  ],
  "Kidnapping": [
    { section_code: "Section 363 IPC",    section_name: "Punishment for Kidnapping",            description: "Kidnapping from India or from lawful guardianship",                               punishment: "Up to 7 years + fine" },
    { section_code: "Section 364A IPC",   section_name: "Kidnapping for Ransom",                description: "Kidnapping/abducting with threat of death or hurt for ransom",                   punishment: "Death or life imprisonment + fine" },
    { section_code: "Section 366 IPC",    section_name: "Abducting a Woman",                    description: "Kidnapping a woman to compel marriage or illicit intercourse",                    punishment: "Up to 10 years + fine" },
    { section_code: "Section 34 IPC",     section_name: "Common Intention",                     description: "Shared criminal intent among multiple accused persons",                            punishment: "Equal liability for all participants" },
  ],
  "Bail Case": [
    { section_code: "Section 436 CrPC",   section_name: "Bail — Bailable Offences",             description: "Accused in a bailable offence has a right to bail as a matter of course",        punishment: "N/A — Procedural right" },
    { section_code: "Section 437 CrPC",   section_name: "Bail — Non-Bailable Offences",         description: "Court discretion to grant bail; restricted if facing death/life sentence",        punishment: "N/A — Court discretion" },
    { section_code: "Section 439 CrPC",   section_name: "High Court / Sessions Bail Power",     description: "High Court and Sessions Court have special powers to grant bail in any case",     punishment: "N/A — Superior court power" },
    { section_code: "Article 21",         section_name: "Right to Personal Liberty",             description: "No person shall be deprived of life or personal liberty except by law",          punishment: "N/A — Fundamental Right" },
  ],
  "Assault": [
    { section_code: "Section 323 IPC",   section_name: "Voluntarily Causing Hurt",              description: "Causing bodily pain, disease or infirmity to any person",                         punishment: "Up to 1 year or ₹1,000 fine or both" },
    { section_code: "Section 324 IPC",   section_name: "Hurt by Dangerous Weapons",             description: "Causing hurt using knife, acid, fire or other dangerous weapons",                 punishment: "Up to 3 years or fine or both" },
    { section_code: "Section 325 IPC",   section_name: "Grievous Hurt",                         description: "Permanent damage — loss of eye, ear, fracture, disfiguration",                   punishment: "Up to 7 years + fine" },
    { section_code: "Section 326 IPC",   section_name: "Grievous Hurt by Dangerous Weapon",     description: "Grievous hurt by acid, knife, fire or other dangerous means",                    punishment: "Life imprisonment or up to 10 years + fine" },
  ],
  "Property Dispute": [
    { section_code: "Section 425 IPC",   section_name: "Mischief",                              description: "Causing destruction of or damage to any property",                                punishment: "Varies depending on severity" },
    { section_code: "Section 441 IPC",   section_name: "Criminal Trespass",                     description: "Entering or remaining on property to commit offence or intimidate",               punishment: "Up to 3 months or ₹500 fine or both" },
    { section_code: "Section 447 IPC",   section_name: "Punishment for Criminal Trespass",      description: "Punishment for committing criminal trespass",                                     punishment: "Up to 3 months or ₹500 fine or both" },
    { section_code: "Section 503 IPC",   section_name: "Criminal Intimidation",                 description: "Threatening injury to person, reputation or property",                            punishment: "Up to 2 years or fine or both" },
  ],
};

// GET /api/sections/:crimeType
router.get("/:crimeType", (req, res) => {
  const crimeType = decodeURIComponent(req.params.crimeType);
  const data      = SECTIONS[crimeType] || [];
  res.json({ crime: crimeType, data });
});

module.exports = router;
