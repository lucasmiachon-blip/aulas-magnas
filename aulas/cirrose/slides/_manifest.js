/**
 * _manifest.js — Source of truth para ordem, archetypes, panel states, animacoes
 *
 * DERIVADO DE: references/CASE.md (dados do paciente — Reference Hierarchy #1)
 * panelStates valores DEVEM ser identicos a CASE.md §Evolucao do Caso.
 * Validacao: npm run lint:case-sync · npm run lint:narrative-sync
 *
 * NARRATIVE FIELDS (validated by lint:narrative-sync vs narrative.md):
 *   narrativeRole: 'hook'|'setup'|'payoff'|'checkpoint'|'resolve'|null
 *   tensionLevel:  0-5 (matches narrative.md tension dots)
 *   narrativeCritical: true = slide whose h2/structure MUST NOT change without Lucas approval
 *
 * Coautoria: Lucas (decisao clinica) · Opus 4.6 (codigo + governance)
 * Ver: references/coautoria.md
 *
 * Gerado na FASE 0 da refatoracao arquitetural.
 * Atualizado: 2026-03-08
 */

export const slides = [
  // ── Pre-Act ──
  { id: 's-title', file: '00-title.html', act: null, archetype: 'title', sectionTag: null, headline: 'Cirrose Hepatica', panelState: 'hidden', clickReveals: 0, customAnim: null, timing: null, subItems: ['brasao', 'titulo', 'pilares'], narrativeRole: null, tensionLevel: 0, narrativeCritical: false },
  { id: 's-hook', file: '01-hook.html', act: null, archetype: 'hook', sectionTag: null, headline: 'Caso Antonio · Qual a proxima conduta?', panelState: 'neutral', clickReveals: 1, customAnim: 's-hook', timing: 90, subItems: [{ label: 'beat 0: Antonio', beat: 0 }, { label: 'beat 1: labs+pergunta', beat: 1 }], narrativeRole: 'hook', tensionLevel: 3, narrativeCritical: true },

  // ── Act 1: CLASSIFICAR ──
  { id: 's-a1-01', file: '02-a1-continuum.html', act: 'A1', archetype: 'hero-stat', sectionTag: 'ATO 1 — CLASSIFICAR', headline: '1,43 milhao morre por ano', panelState: 'neutral', clickReveals: 0, customAnim: 's-a1-01', timing: 90, narrativeRole: 'setup', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a1-vote', file: '02d-a1-vote.html', act: 'A1', archetype: 'poll', sectionTag: 'ATO 1 — CLASSIFICAR', headline: 'Esse paciente tem cirrose?', panelState: 'neutral', clickReveals: 1, customAnim: 's-a1-vote', timing: 120, narrativeRole: 'setup', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a1-damico', file: '02b-a1-damico.html', act: 'A1', archetype: 'flow', sectionTag: 'ATO 1 — CLASSIFICAR', headline: 'Tres geracoes de escores', panelState: 'neutral', clickReveals: 2, customAnim: 's-a1-damico', timing: 120, narrativeRole: 'setup', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a1-baveno', file: '03-a1-baveno.html', act: 'A1', archetype: 'hero-stat', sectionTag: 'ATO 1 — CLASSIFICAR', headline: 'Baveno VII redefiniu classificacao', panelState: 'neutral', clickReveals: 2, customAnim: 's-a1-baveno', timing: 120, narrativeRole: 'setup', tensionLevel: 1, narrativeCritical: false },
  { id: 's-a1-fib4', file: '03b-a1-fib4calc.html', act: 'A1', archetype: 'hero-stat', sectionTag: 'ATO 1 — CLASSIFICAR', headline: '4 dados. 1 numero. 1 decisao.', panelState: 'neutral', clickReveals: 2, customAnim: 's-a1-fib4', timing: 120, narrativeRole: 'setup', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a1-rule5', file: '03d-a1-rule5.html', act: 'A1', archetype: 'flow', sectionTag: 'ATO 1 — CLASSIFICAR', headline: 'Onde esta o Antonio?', panelState: 'neutral', clickReveals: 2, customAnim: 's-a1-rule5', timing: 120, narrativeRole: 'setup', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a1-meld', file: '04-a1-meld.html', act: 'A1', archetype: 'hero-stat', sectionTag: 'ATO 1 — CLASSIFICAR', headline: 'MELD-Na: o GPS da fila', panelState: 'neutral', clickReveals: 2, customAnim: 's-a1-meld', timing: 150, narrativeRole: 'setup', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a1-classify', file: '02c-a1-classify.html', act: 'A1', archetype: 'flow', sectionTag: 'ATO 1 — CLASSIFICAR', headline: 'Classificar muda conduta', panelState: 'neutral', clickReveals: 2, customAnim: 's-a1-classify', timing: 90, narrativeRole: 'setup', tensionLevel: 1, narrativeCritical: false },
  { id: 's-cp1', file: '07-cp1.html', act: 'CP', archetype: 'checkpoint', sectionTag: null, headline: 'LSM 21 kPa, plaquetas 112k. Como voce estadia?', panelState: 'caution', clickReveals: 3, customAnim: null, timing: 180, narrativeRole: 'checkpoint', tensionLevel: 3, narrativeCritical: true },

  // ── Act 2: INTERVIR ──
  // panelState: null = herda último estado registrado (case-panel.js findLatestState)
  // A2 herda 'caution' do CP1; A3 herda 'danger' do CP2
  { id: 's-a2-01', file: '08-a2-carvedilol.html', act: 'A2', archetype: 'metrics', sectionTag: 'ATO 2 — INTERVIR', headline: 'NSBBs previnem a primeira descompensacao em cACLD com CSPH', panelState: null, clickReveals: 3, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a2-02', file: '09-a2-tips.html', act: 'A2', archetype: 'timeline', sectionTag: 'ATO 2 — INTERVIR', headline: 'Early TIPS salva vidas no sangramento varicoso', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 3, narrativeCritical: false },
  { id: 's-a2-03', file: '10-a2-albumina.html', act: 'A2', archetype: 'cards', sectionTag: 'ATO 2 — INTERVIR', headline: 'Albumina: 3 indicacoes certas, 1 armadilha — repor, nao normalizar', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 4, narrativeCritical: false },
  { id: 's-a2-infec', file: '05-a1-infeccao.html', act: 'A2', archetype: 'bars', sectionTag: 'ATO 2 — INTERVIR', headline: 'Infeccao precipita 1 em 3 descompensacoes — e a mais prevenivel', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'setup', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a2-04', file: '11-a2-pbe.html', act: 'A2', archetype: 'flow', sectionTag: 'ATO 2 — INTERVIR', headline: 'PBE: PMN >=250 = tratar. Cada hora de atraso custa vidas', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 3, narrativeCritical: false },
  { id: 's-a2-05', file: '12-a2-hrs.html', act: 'A2', archetype: 'tree', sectionTag: 'ATO 2 — INTERVIR', headline: 'HRS-AKI: 3 perguntas antes da terlipressina — a 3a decisao', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 4, narrativeCritical: false },
  { id: 's-a2-06', file: '13-a2-he.html', act: 'A2', archetype: 'pillars', sectionTag: 'ATO 2 — INTERVIR', headline: 'Encefalopatia: lactulose + rifaximina + nutricao — NAO restringir proteina', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 2, narrativeCritical: false },
  { id: 's-cp2', file: '14-cp2.html', act: 'CP', archetype: 'checkpoint', sectionTag: null, headline: 'Cr 2,8 + Na 126 + ascite tensa. HRS-AKI? O que voce faz?', panelState: 'danger', clickReveals: 0, customAnim: null, timing: 180, narrativeRole: 'checkpoint', tensionLevel: 5, narrativeCritical: true },

  // ── Act 3: REVERTER ──
  // panelState: null = herda 'danger' do CP2
  { id: 's-a3-01', file: '15-a3-recompensacao.html', act: 'A3', archetype: 'criteria', sectionTag: 'ATO 3 — REVERTER', headline: 'Recompensacao e real — e Baveno VII a definiu', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a3-02', file: '16-a3-svr.html', act: 'A3', archetype: 'compare', sectionTag: 'ATO 3 — REVERTER', headline: 'SVR cura o virus mas nao a hipertensao portal — CSPH persiste em 53%', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 3, narrativeCritical: false },
  { id: 's-a3-03', file: '17-a3-vigilancia.html', act: 'A3', archetype: 'surveillance', sectionTag: 'ATO 3 — REVERTER', headline: 'Vigilancia a cada 6 meses — nunca dar alta, mesmo apos "cura"', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 2, narrativeCritical: false },
  { id: 's-cp3', file: '18-cp3.html', act: 'CP', archetype: 'checkpoint', sectionTag: null, headline: 'SVR + abstinencia, LSM 32→18. Pode sair da vigilancia? Da fila?', panelState: 'hope', clickReveals: 0, customAnim: null, timing: 150, narrativeRole: 'checkpoint', tensionLevel: 1, narrativeCritical: true },
  { id: 's-close', file: '19-close.html', act: null, archetype: 'recap', sectionTag: null, headline: '5 numeros classificaram. 3 decisoes salvaram. Cirrose nao e sentenca.', panelState: 'resolved', clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'resolve', tensionLevel: 0, narrativeCritical: true },

  // ── Appendix ──
  { id: 's-app-01', file: '20-app-aclf.html', act: 'APP', archetype: 'table', sectionTag: 'APENDICE', headline: 'ACLF grau 3: mortalidade 28d >70% — limiar de futilidade', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: null, tensionLevel: 0, narrativeCritical: false },
  { id: 's-app-02', file: '21-app-tips.html', act: 'APP', archetype: 'flow', sectionTag: 'APENDICE', headline: 'Early TIPS em 72h: Child C 10-13 ou B com sangramento ativo — NNT 4 (IC 95% 2,1-50)', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: null, tensionLevel: 0, narrativeCritical: false },
  { id: 's-app-03', file: '22-app-abcw.html', act: 'APP', archetype: 'table', sectionTag: 'APENDICE', headline: 'Etiologias raras: ABCW — pista clinica e exame-chave', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: null, tensionLevel: 0, narrativeCritical: false },
  { id: 's-app-04', file: '23-app-nsbb.html', act: 'APP', archetype: 'compare', sectionTag: 'APENDICE', headline: 'Turco 2024 IPD: NSBB >= EVL — carvedilol superior em HVPG', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: null, tensionLevel: 0, narrativeCritical: false },
  { id: 's-app-05', file: '24-app-ccc.html', act: 'APP', archetype: 'criteria', sectionTag: 'APENDICE', headline: 'Cardiomiopatia cirrotica: 48% prevalencia — CCC 2019 detecta mais', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: null, tensionLevel: 0, narrativeCritical: false },
  { id: 's-app-06', file: '25-app-pulm.html', act: 'APP', archetype: 'compare', sectionTag: 'APENDICE', headline: 'SHP vs HPP: fisiopatologia oposta — manejo diferente', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: null, tensionLevel: 0, narrativeCritical: false },
  { id: 's-app-07', file: '26-app-estatina.html', act: 'APP', archetype: 'compare', sectionTag: 'APENDICE', headline: 'Estatina adjuvante: HVPG -2 mmHg — LIVERHOPE negativo', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: null, tensionLevel: 0, narrativeCritical: false },
  { id: 's-app-08', file: '27-app-cirrox.html', act: 'APP', archetype: 'compare', sectionTag: 'APENDICE', headline: 'CIRROXABAN 2025: p=0,058 NS — aguardar confirmacao', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: null, tensionLevel: 0, narrativeCritical: false },
  { id: 's-app-etio', file: '06-a1-etiologias.html', act: 'APP', archetype: 'table', sectionTag: 'APENDICE', headline: '"Cirrose" nao e uma doenca — sao 10 doencas com final comum', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: null, tensionLevel: 0, narrativeCritical: false },
];

export const panelStates = {
  's-hook': {
    severity: 'neutral',
    values: { fib4: '5,91', lsm: '—', plq: '112k', meld: '—', albumin: '3,6', stage: '?' },
    visibleFields: ['fib4', 'plq', 'albumin', 'stage'],
    events: [],
  },
  's-a1-vote': {
    severity: 'neutral',
    values: { fib4: '—', lsm: '—', plq: '112k', meld: '—', albumin: '3,6', stage: '?' },
    visibleFields: ['plq', 'albumin', 'stage'],
    events: [],
  },
  's-a1-baveno': {
    severity: 'neutral',
    values: { fib4: '5,91', lsm: '—', plq: '112k', meld: '—', albumin: '3,6', stage: '?' },
    visibleFields: ['fib4', 'plq', 'albumin', 'stage'],
    events: [],
  },
  's-a1-fib4': {
    severity: 'neutral',
    values: { fib4: '5,91', lsm: '—', plq: '112k', meld: '—', albumin: '3,6', stage: '?' },
    visibleFields: ['fib4', 'plq', 'albumin', 'stage'],
    events: [],
    calc: 'fib4',
  },
  's-a1-rule5': {
    severity: 'neutral',
    values: { fib4: '5,91', lsm: '—', plq: '112k', meld: '—', albumin: '3,6', stage: '?' },
    visibleFields: ['fib4', 'lsm', 'plq', 'albumin', 'stage'],
    events: [],
    calc: 'fib4',
  },
  's-a1-meld': {
    severity: 'neutral',
    values: { fib4: '5,91', lsm: '—', plq: '112k', meld: '—', albumin: '3,6', stage: '?' },
    visibleFields: ['fib4', 'lsm', 'plq', 'meld', 'albumin', 'stage'],
    events: [],
    calc: 'meld',
  },
  's-a1-classify': {
    severity: 'neutral',
    values: { fib4: '5,91', lsm: '—', plq: '112k', meld: '—', albumin: '3,6', stage: '?' },
    visibleFields: ['fib4', 'lsm', 'plq', 'meld', 'albumin', 'stage'],
    events: [],
    calc: 'meld',
  },
  's-cp1': {
    severity: 'caution',
    values: { fib4: '5,91', lsm: '21 kPa', plq: '112k', meld: '~10', albumin: '3,6', stage: 'cACLD/CSPH' },
    events: ['Elastografia realizada'],
    calc: 'meld',
  },
  's-cp2': {
    severity: 'danger',
    values: { fib4: '3,2', lsm: '32 kPa', plq: '89k', meld: '28', albumin: '2,4', stage: 'dACLD' },
    events: ['Ascite +++', 'PBE', 'HRS-AKI', 'Cr 2,8'],
  },
  's-cp3': {
    severity: 'hope',
    values: { fib4: '2,1', lsm: '18 kPa', plq: '132k', meld: '12', albumin: '3,8', stage: 'Recompensando' },
    events: ['Abstinente 10m', 'Sem ascite 8m', 'SVR confirmado'],
  },
  's-close': {
    severity: 'resolved',
    showTimeline: true,
  },
};
