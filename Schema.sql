-- ═══════════════════════════════════════════════════
--  LawLoom — MySQL Database Schema
--  Run this file once to create all required tables.
--  Command: mysql -u root -p < schema.sql
-- ═══════════════════════════════════════════════════

CREATE DATABASE IF NOT EXISTS lawloom CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE lawloom;

-- ── Users ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    full_name    VARCHAR(150)                    NOT NULL,
    email        VARCHAR(255)                    NOT NULL UNIQUE,
    password     VARCHAR(255)                    NOT NULL,
    role         ENUM('lawyer','user') DEFAULT 'user',
    bar_council  VARCHAR(100)                    DEFAULT NULL,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Legal Sections ────────────────────────────────────
CREATE TABLE IF NOT EXISTS legal_sections (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    crime_type     VARCHAR(100)  NOT NULL,
    section_code   VARCHAR(50)   NOT NULL,
    section_name   VARCHAR(255)  NOT NULL,
    description    TEXT          NOT NULL,
    punishment     VARCHAR(255)  DEFAULT NULL,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_crime_type (crime_type)
);

-- ── Cases ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cases (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    case_id      VARCHAR(50)   NOT NULL UNIQUE,
    title        VARCHAR(500)  NOT NULL,
    crime_type   VARCHAR(100)  NOT NULL,
    year         YEAR          DEFAULT NULL,
    court        VARCHAR(255)  DEFAULT NULL,
    judge        VARCHAR(255)  DEFAULT NULL,
    sections     JSON          DEFAULT NULL,
    full_text    LONGTEXT      DEFAULT NULL,
    pdf_path     VARCHAR(255)  DEFAULT NULL,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_crime_type (crime_type),
    INDEX idx_year       (year)
);

-- ── AI Summaries Cache ────────────────────────────────
CREATE TABLE IF NOT EXISTS summaries (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    case_id       VARCHAR(50)   NOT NULL UNIQUE,
    summary_text  LONGTEXT      NOT NULL,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES cases(case_id) ON DELETE CASCADE
);

-- ═══════════════════════════════════════════════════
--  SAMPLE DATA — Cybercrime sections
-- ═══════════════════════════════════════════════════
INSERT IGNORE INTO legal_sections (crime_type, section_code, section_name, description, punishment) VALUES
('Cybercrime', 'IT Act §66',  'Computer Related Offences',    'Dishonestly receiving stolen computer resource or communication device.',                   'Up to 3 years & ₹5 lakh fine'),
('Cybercrime', 'IT Act §66C', 'Identity Theft',               'Punishment for identity theft using electronic signature, password or unique identification.','Up to 3 years & ₹1 lakh fine'),
('Cybercrime', 'IT Act §66D', 'Cheating by Personation',      'Cheating by personation using a computer resource.',                                         'Up to 3 years & ₹1 lakh fine'),
('Cybercrime', 'IPC §420',    'Cheating & Dishonesty',        'Cheating and dishonestly inducing delivery of property.',                                     'Up to 7 years & fine'),
('Theft',      'IPC §378',    'Theft',                        'Whoever intending to take dishonestly any moveable property out of possession of any person without consent.', 'Imprisonment & fine'),
('Theft',      'IPC §379',    'Punishment for Theft',         'Punishment for the offence of theft.',                                                        'Up to 3 years & fine'),
('Murder',     'IPC §302',    'Punishment for Murder',        'Whoever commits murder shall be punished with death or imprisonment for life.',                'Death or Life Imprisonment & fine'),
('Murder',     'IPC §300',    'Definition of Murder',         'Culpable homicide is murder if done with intention of causing death.',                        'N/A — definitional section'),
('Fraud',      'IPC §420',    'Cheating & Dishonesty',        'Cheating and dishonestly inducing delivery of property.',                                     'Up to 7 years & fine'),
('Fraud',      'IPC §406',    'Criminal Breach of Trust',     'Punishment for criminal breach of trust.',                                                    'Up to 3 years & fine');

-- ═══════════════════════════════════════════════════
--  SAMPLE DATA — Cases
-- ═══════════════════════════════════════════════════
INSERT IGNORE INTO cases (case_id, title, crime_type, year, court, judge, sections, full_text) VALUES
('case-001',
 'State vs. Rajesh Kumar - Online Banking Fraud',
 'Cybercrime', 2024,
 'High Court of Delhi',
 'Hon\'ble Justice P.K. Sharma',
 '["IT Act §66","IT Act §66D","IPC §420"]',
 'JUDGMENT\n\nIN THE HIGH COURT OF DELHI\nCriminal Appeal No. 1234/2024\n\nState vs. Rajesh Kumar\n\nFACTS: The accused created phishing websites mimicking major banks targeting elderly citizens.\n\nJUDGMENT: Accused found guilty. Sentenced to 5 years under IT Act §66 and fine of ₹10,00,000.'
),
('case-002',
 'People vs. Sharma Brothers - Corporate Data Theft',
 'Cybercrime', 2023,
 'Sessions Court Mumbai',
 'Hon\'ble Judge R.K. Verma',
 '["IT Act §43","IT Act §66"]',
 'JUDGMENT\n\nIN THE SESSIONS COURT MUMBAI\n\nFACTS: Accused exfiltrated trade secrets worth ₹50 Crore over 18 months.\n\nJUDGMENT: Both accused convicted. Sentenced to 3 years each.'
),
('case-003',
 'State vs. Tech Solutions Ltd - Data Breach',
 'Cybercrime', 2024,
 'High Court of Karnataka',
 NULL,
 '["IT Act §43"]',
 'JUDGMENT\n\nFACTS: Company failed to secure personal data of 2 million customers.\n\nJUDGMENT: Company directed to pay ₹100 Crore compensation and implement court-monitored cybersecurity.'
);