# Supplementary Material for ARES 2026 Submission

**Submission Title:** Beyond Theory: Investigating Barriers to Applied GDPR Compliance Using a Privacy Range

## About the Project

The "Privacy Range" is a fictitious web shop with 13 intentionally implemented privacy-related problems. Inspired by the concept of a cyber range and particularly the OWASP Juice Shop, the web shop can be used for practicing and reviewing practical privacy knowledge application. There is a separate walkthrough page that explains all implemented problems and possible solutions in detail.

The training environment targets developers and service operators who want to improve their privacy skills and knowledge. It requires previous knowledge about privacy, especially about the GDPR.

**Implemented privacy problems:** The problems vary in difficulty to find and can be divided into three groups: problems that are visible to the trainee (V1–V6), problems that result from something that is missing (M1–M2), and problems that are hidden and only visible in the source code or with the browser's developer tools (H1–H5).

**Archived page:** https://web.archive.org/web/20260304133114/https://private-piranha.pics/ - the page as it was used in the study.

## Repository Structure

### Study Instruments
| File | Description |
|------|-------------|
| `session_procedure.pdf` | Full study protocol with participant instructions and interview questions. Facilitator notes distinguished from participant-facing text. |
| `hints.pdf` | Graduated hint sheets (German original and English translation) used during the hint phase. Includes hint escalation criteria. |
| `problems_and_rubric.pdf` | Complete descriptions of all 13 problems with legal references, and the recognition rubric used for coding problem recognition outcomes. |

### Analysis
| File | Description |
|------|-------------|
| `codebook.pdf` | Final thematic analysis codebook with code definitions and illustrative quotes for all four themes (Braun & Clarke, 2022). |
| `framework-chart_recognition_exploration.xlsx` | Framework analysis chart: problem recognition outcomes per participant during the exploration phase. |
| `framework-chart_recognition_hints-phase.xlsx` | Framework analysis chart: problem recognition outcomes per participant during the hint phase. |
| `framework-chart_translation_failures.xlsx` | Framework analysis chart: theory-practice translation failures indexed by participant, failure category, and session phase. |

### Inter-Coder Reliability
| File | Description |
|------|-------------|
| `intercoder_recognition_R1_R2.xlsx` | Independent recognition coding by R1 and R2 for the 40% subset. Supports κ_w = .78 (quadratic weighted Cohen's kappa). |
| `intercoder_qca_R1_R2.xlsx` | Independent QCA coding by R1 and R2 for half of the interview transcripts, including the code system provided to R2. Supports κ = .76. |

### Provided Resources (Screenshots)
| File | Description |
|------|-------------|
| `GDPR-handout.pdf` | Screenshots of the GDPR reference handout provided to participants during all session phases. |
| `problem_walkthrough.pdf` | Screenshots of the walkthrough page used during the walkthrough phase. |

### Environment
| File / Folder | Description |
|---------------|-------------|
| `environment/` | Source code and deployment configuration for the Privacy Range training environment. |
| `environment/README.md` | Installation and deployment instructions. |
| `environment/problems_and_solutions.md` | Full descriptions of all 13 implemented problems with suggested solutions (as provided on the walkthrough page). |

The Privacy Range environment is provided for reproducibility and potential reuse. It is built on Nuxt, Strapi, and Docker. See `environment/README.md` for setup instructions and system requirements.

## Notes

- The study was conducted in German. Study instruments are provided in English translation; German originals are included where the exact wording is methodologically relevant (hint sheets).
- All qualitative data analysis was conducted using [MAXQDA](https://www.maxqda.com/). Inter-coder reliability was computed on independently coded subsets exported from MAXQDA.
- Participant quotes in the codebook and paper were translated into English after analysis was completed.# Supplementary Material for ARES 2026 Submission 

**Submission Title: Beyond Theory: Investigating Barriers to Applied GDPR Compliance Using a Privacy Range**

## About the Project
The "Privacy Range" is a fictitious web shop with 13 intentionally implemented privacy-related problems. Inspired by the concept of a cyber range and particularly the OWASP juice shop, the web shop can be used for practicing and reviewing practical privacy knowledge application. There is however a separate walkthrough page that explains all implemented problems and possible solutions in detail. 

The training environment targets developers and service operators who want to improve their privacy skills and knowledge. That means it requires previous knowledge about privacy, especially about the GDPR.

**Implemented privacy problems:**
The problems vary in difficulty to find and can be divided into three different groups:  I problems that are visible to the trainee (V1–V6),  I problems that result from something that is missing (M1–M2), and  I problems that are hidden and only visible in the source code or with the browser’s developer tools (H1–H5).

Archived page url: https://web.archive.org/web/20260304133114/https://private-piranha.pics/ - the page as it was used in the study. 


