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
 * Atualizado: 2026-03-09 — Manifest rewrite: Act 2 (16+CP2), Act 3 (7+CP3+close), ID renames, skeletons
 */

export const slides = [
  // ── Pre-Act ──
  { id: 's-title', file: '00-title.html', act: null, archetype: 'title', sectionTag: null, headline: 'Cirrose Hepatica', panelState: 'hidden', clickReveals: 0, customAnim: null, timing: null, subItems: ['brasao', 'titulo', 'pilares'], narrativeRole: null, tensionLevel: 0, narrativeCritical: false },
  { id: 's-hook', file: '01-hook.html', act: null, archetype: 'hook', sectionTag: null, headline: 'Caso Antonio · Qual a proxima conduta?', panelState: 'neutral', clickReveals: 1, customAnim: 's-hook', timing: 90, subItems: [{ label: 'beat 0: Antonio', beat: 0 }, { label: 'beat 1: labs+pergunta', beat: 1 }], narrativeRole: 'hook', tensionLevel: 3, narrativeCritical: true },

  // ── Act 1: CLASSIFICAR ──
  { id: 's-a1-01', file: '02-a1-continuum.html', act: 'A1', archetype: 'hero-stat', sectionTag: 'ATO 1 — CLASSIFICAR', headline: '1,43 milhao morre por ano', panelState: 'neutral', clickReveals: 0, customAnim: 's-a1-01', timing: 90, narrativeRole: 'setup', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a1-vote', file: '02d-a1-vote.html', act: 'A1', archetype: 'poll', sectionTag: 'ATO 1 — CLASSIFICAR', headline: 'Esse paciente tem cirrose?', panelState: 'neutral', clickReveals: 1, customAnim: 's-a1-vote', timing: 120, narrativeRole: 'setup', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a1-damico', file: '02b-a1-damico.html', act: 'A1', archetype: 'flow', sectionTag: 'ATO 1 — CLASSIFICAR', headline: 'Do CTP ao D\'Amico: prognostico passou de subjetivo a preditivo', panelState: 'neutral', clickReveals: 2, customAnim: 's-a1-damico', timing: 120, narrativeRole: 'setup', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a1-baveno', file: '03-a1-baveno.html', act: 'A1', archetype: 'hero-stat', sectionTag: 'ATO 1 — CLASSIFICAR', headline: 'Baveno VII redefiniu classificacao', panelState: 'neutral', clickReveals: 2, customAnim: 's-a1-baveno', timing: 120, narrativeRole: 'setup', tensionLevel: 1, narrativeCritical: false },
  { id: 's-a1-fib4', file: '03b-a1-fib4calc.html', act: 'A1', archetype: 'hero-stat', sectionTag: 'ATO 1 — CLASSIFICAR', headline: '4 dados. 1 numero. 1 decisao.', panelState: 'neutral', clickReveals: 2, customAnim: 's-a1-fib4', timing: 120, narrativeRole: 'setup', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a1-rule5', file: '03d-a1-rule5.html', act: 'A1', archetype: 'flow', sectionTag: 'ATO 1 — CLASSIFICAR', headline: 'A cada 5 kPa, muda o estagio e a conduta', panelState: 'neutral', clickReveals: 2, customAnim: 's-a1-rule5', timing: 120, narrativeRole: 'setup', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a1-meld', file: '04-a1-meld.html', act: 'A1', archetype: 'hero-stat', sectionTag: 'ATO 1 — CLASSIFICAR', headline: 'MELD-Na: o GPS da fila', panelState: 'neutral', clickReveals: 2, customAnim: 's-a1-meld', timing: 150, narrativeRole: 'setup', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a1-classify', file: '02c-a1-classify.html', act: 'A1', archetype: 'flow', sectionTag: 'ATO 1 — CLASSIFICAR', headline: 'Classificar muda conduta', panelState: 'neutral', clickReveals: 2, customAnim: 's-a1-classify', timing: 90, narrativeRole: 'setup', tensionLevel: 1, narrativeCritical: false },
  { id: 's-cp1', file: '07-cp1.html', act: 'CP', archetype: 'checkpoint', sectionTag: null, headline: 'LSM 21 kPa, plaquetas 112k. Como voce estadia?', panelState: 'caution', clickReveals: 3, customAnim: null, timing: 180, narrativeRole: 'checkpoint', tensionLevel: 3, narrativeCritical: true },

  // ── Act 2: INTERVIR (16 slides + CP2) ──
  // panelState: null = herda último estado registrado (case-panel.js findLatestState)
  // A2 herda 'caution' do CP1. Cascata clínica: compensado → gatilho → descompensações → ACLF → MELD 28.
  { id: 's-a2-01', file: '30-a2-gatilhos.html', act: 'A2', archetype: 'flow', sectionTag: 'ATO 2 — INTERVIR', headline: 'Descompensacao tem gatilho identificavel na maioria dos casos', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'setup', tensionLevel: 1, narrativeCritical: false },
  { id: 's-a2-02', file: '31-a2-ascite-dx.html', act: 'A2', archetype: 'flow', sectionTag: 'ATO 2 — INTERVIR', headline: 'Ascite nova = paracentese <=12h. GASA >1,1 confirma portal', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'setup', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a2-03', file: '32-a2-ascite-manejo.html', act: 'A2', archetype: 'flow', sectionTag: 'ATO 2 — INTERVIR', headline: 'Espironolactona 100-400 + furosemida 40-160: escalonamento e limites', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'setup', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a2-04', file: '05-a1-infeccao.html', act: 'A2', archetype: 'bars', sectionTag: 'ATO 2 — INTERVIR', headline: 'Infeccao precipita 1 em 3 descompensacoes — e a mais prevenivel', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'setup', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a2-05', file: '11-a2-pbe.html', act: 'A2', archetype: 'flow', sectionTag: 'ATO 2 — INTERVIR', headline: 'PBE: PMN >=250 = tratar. Cada hora de atraso custa vidas', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 3, narrativeCritical: false },
  { id: 's-a2-06', file: '33-a2-hda.html', act: 'A2', archetype: 'flow', sectionTag: 'ATO 2 — INTERVIR', headline: 'HDA varicosa: vasoativo + EDA <12h + ATB. Early TIPS em 72h?', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 3, narrativeCritical: false },
  { id: 's-a2-07', file: '08-a2-carvedilol.html', act: 'A2', archetype: 'metrics', sectionTag: 'ATO 2 — INTERVIR', headline: 'NSBBs previnem a primeira descompensacao em cACLD com CSPH', panelState: null, clickReveals: 3, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a2-08', file: '13-a2-he.html', act: 'A2', archetype: 'pillars', sectionTag: 'ATO 2 — INTERVIR', headline: 'Encefalopatia: lactulose + rifaximina NNT 4. Proteina 1,2-1,5 g/kg — NAO restringir', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 3, narrativeCritical: false },
  { id: 's-a2-09', file: '34-a2-nutricao.html', act: 'A2', archetype: 'flow', sectionTag: 'ATO 2 — INTERVIR', headline: 'Sarcopenia em cirrose: prevalencia alta, mortalidade independente de MELD', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a2-10', file: '35-a2-tx.html', act: 'A2', archetype: 'flow', sectionTag: 'ATO 2 — INTERVIR', headline: 'MELD >15 persistente = avaliar transplante', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 4, narrativeCritical: false },
  { id: 's-a2-11', file: '12-a2-hrs.html', act: 'A2', archetype: 'tree', sectionTag: 'ATO 2 — INTERVIR', headline: 'HRS-AKI: albumina challenge primeiro — terlipressina NNT 7, NNH 12', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 4, narrativeCritical: false },
  { id: 's-a2-12', file: '36-a2-refrataria.html', act: 'A2', archetype: 'flow', sectionTag: 'ATO 2 — INTERVIR', headline: 'Ascite refrataria: criterios ICA mudam estrategia', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 3, narrativeCritical: false },
  { id: 's-a2-13', file: '24-app-ccc.html', act: 'A2', archetype: 'criteria', sectionTag: 'ATO 2 — INTERVIR', headline: 'Cardiomiopatia cirrotica: 48% prevalencia — CCC 2019 detecta mais', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 3, narrativeCritical: false },
  { id: 's-a2-14', file: '25-app-pulm.html', act: 'A2', archetype: 'compare', sectionTag: 'ATO 2 — INTERVIR', headline: 'SHP vs HPP: fisiopatologia oposta — manejo diferente', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 3, narrativeCritical: false },
  { id: 's-a2-15', file: '09-a2-tips.html', act: 'A2', archetype: 'timeline', sectionTag: 'ATO 2 — INTERVIR', headline: 'TIPS reduz further decomp de 63 para 48% (IPD n=2338)', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 3, narrativeCritical: false },
  { id: 's-cp2', file: '14-cp2.html', act: 'CP', archetype: 'checkpoint', sectionTag: null, headline: 'Cr 2,8 + Na 126 + ascite tensa. HRS-AKI? O que voce faz?', panelState: 'danger', clickReveals: 0, customAnim: null, timing: 180, narrativeRole: 'checkpoint', tensionLevel: 5, narrativeCritical: true },

  // ── Act 3: REVERTER (cenário hipotético — 7 slides + CP3 + close) ──
  // panelState: null = herda 'danger' do CP2
  { id: 's-a3-01', file: '37-a3-bridge.html', act: 'A3', archetype: 'hero-stat', sectionTag: 'ATO 3 — REVERTER', headline: 'Cura etiologica reduziu nova descompensacao (HR 0,46) e mortalidade (HR 0,35)', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a3-02', file: '15-a3-recompensacao.html', act: 'A3', archetype: 'criteria', sectionTag: 'ATO 3 — REVERTER', headline: 'Recompensacao e real — e Baveno VII a definiu', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a3-03', file: '38-a3-expandido.html', act: 'A3', archetype: 'compare', sectionTag: 'ATO 3 — REVERTER', headline: 'Criterio expandido ampliou para 37,6% — sem pior prognostico', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a3-04', file: '39-a3-etiologia.html', act: 'A3', archetype: 'compare', sectionTag: 'ATO 3 — REVERTER', headline: 'Chance de recompensar muda com etiologia: HBV >50%, HCV ~37%, alcool menor', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a3-05', file: '16-a3-svr.html', act: 'A3', archetype: 'compare', sectionTag: 'ATO 3 — REVERTER', headline: 'SVR cura o virus mas nao a hipertensao portal — CSPH persiste em 53%', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 3, narrativeCritical: false },
  { id: 's-a3-06', file: '17-a3-vigilancia.html', act: 'A3', archetype: 'surveillance', sectionTag: 'ATO 3 — REVERTER', headline: 'Vigilancia a cada 6 meses — nunca dar alta, mesmo apos "cura"', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 2, narrativeCritical: false },
  { id: 's-a3-07', file: '40-a3-fechamento.html', act: 'A3', archetype: 'flow', sectionTag: 'ATO 3 — REVERTER', headline: 'Recompensacao e estado de menor risco — nao certificado de cura estrutural', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'payoff', tensionLevel: 1, narrativeCritical: false },
  { id: 's-cp3', file: '18-cp3.html', act: 'CP', archetype: 'checkpoint', sectionTag: null, headline: 'SVR + abstinencia, LSM 32→18. Pode sair da vigilancia? Da fila?', panelState: 'hope', clickReveals: 0, customAnim: null, timing: 150, narrativeRole: 'checkpoint', tensionLevel: 1, narrativeCritical: true },
  { id: 's-close', file: '19-close.html', act: null, archetype: 'recap', sectionTag: null, headline: '5 numeros classificaram. 3 decisoes salvaram. Cirrose nao e sentenca.', panelState: 'resolved', clickReveals: 0, customAnim: null, timing: null, narrativeRole: 'resolve', tensionLevel: 0, narrativeCritical: true },

  // ── Appendix ──
  { id: 's-app-01', file: '20-app-aclf.html', act: 'APP', archetype: 'table', sectionTag: 'APENDICE', headline: 'ACLF grau 3: mortalidade 28d >70% — limiar de futilidade', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: null, tensionLevel: 0, narrativeCritical: false },
  { id: 's-app-02', file: '21-app-tips.html', act: 'APP', archetype: 'flow', sectionTag: 'APENDICE', headline: 'Early TIPS em 72h: Child C 10-13 ou B com sangramento ativo — NNT 4 (IC 95% 2,1-50)', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: null, tensionLevel: 0, narrativeCritical: false },
  { id: 's-app-03', file: '22-app-abcw.html', act: 'APP', archetype: 'table', sectionTag: 'APENDICE', headline: 'Etiologias raras: ABCW — pista clinica e exame-chave', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: null, tensionLevel: 0, narrativeCritical: false },
  { id: 's-app-04', file: '23-app-nsbb.html', act: 'APP', archetype: 'compare', sectionTag: 'APENDICE', headline: 'Turco 2024 IPD: NSBB >= EVL — carvedilol superior em HVPG', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: null, tensionLevel: 0, narrativeCritical: false },
  { id: 's-app-alb', file: '10-a2-albumina.html', act: 'APP', archetype: 'cards', sectionTag: 'APENDICE', headline: 'Albumina: 3 indicacoes certas, 1 armadilha — repor, nao normalizar', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: null, tensionLevel: 0, narrativeCritical: false },
  { id: 's-app-07', file: '26-app-estatina.html', act: 'APP', archetype: 'compare', sectionTag: 'APENDICE', headline: 'Estatina adjuvante: HVPG -2 mmHg — LIVERHOPE negativo', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: null, tensionLevel: 0, narrativeCritical: false },
  { id: 's-app-08', file: '27-app-cirrox.html', act: 'APP', archetype: 'compare', sectionTag: 'APENDICE', headline: 'CIRROXABAN 2025: p=0,058 NS — aguardar confirmacao', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: null, tensionLevel: 0, narrativeCritical: false },
  { id: 's-app-etio', file: '06-a1-etiologias.html', act: 'APP', archetype: 'table', sectionTag: 'APENDICE', headline: '"Cirrose" nao e uma doenca — sao 10 doencas com final comum', panelState: null, clickReveals: 0, customAnim: null, timing: null, narrativeRole: null, tensionLevel: 0, narrativeCritical: false },
];

export const panelStates = {
  // ── Pre-Act + Act 1 ──
  's-hook': {
    severity: 'neutral',
    values: { fib4: '—', lsm: '—', plq: '112k', meld: '—', albumin: '3,6', stage: '?' },
    visibleFields: ['plq', 'albumin', 'stage'],
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
    values: { fib4: '—', lsm: '—', plq: '112k', meld: '—', albumin: '3,6', stage: '?' },
    visibleFields: ['plq', 'albumin', 'stage'],
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

  // ── Act 2: cascata clínica ──
  // Slides sem panelState explícito herdam o último registrado.
  // Apenas transições significativas são registradas aqui.
  's-a2-01': {
    severity: 'caution',
    values: { fib4: '5,91', lsm: '21 kPa', plq: '108k', meld: '~12', albumin: '3,4', stage: 'cACLD → gatilho' },
    events: ['Etilismo mantido', 'Carvedilol abandonado'],
  },
  's-a2-02': {
    severity: 'warning',
    values: { fib4: '—', lsm: '—', plq: '98k', meld: '~14', albumin: '3,0', stage: 'dACLD' },
    events: ['Ascite nova'],
  },
  's-a2-05': {
    severity: 'warning',
    values: { fib4: '—', lsm: '—', plq: '95k', meld: '~17', albumin: '2,8', stage: 'dACLD' },
    events: ['Ascite', 'PBE (PMN 380)'],
  },
  's-a2-06': {
    severity: 'warning',
    values: { fib4: '—', lsm: '—', plq: '89k', meld: '~18', albumin: '2,6', stage: 'dACLD' },
    events: ['Ascite', 'PBE', 'HDA varicosa'],
  },
  's-a2-08': {
    severity: 'warning',
    values: { fib4: '—', lsm: '—', plq: '89k', meld: '~18', albumin: '2,5', stage: 'dACLD' },
    events: ['Ascite', 'PBE', 'HDA', 'EH'],
  },
  's-a2-10': {
    severity: 'danger',
    values: { fib4: '—', lsm: '—', plq: '89k', meld: '18', albumin: '2,5', stage: 'dACLD' },
    events: ['Ascite', 'PBE', 'HDA', 'EH', 'TX: avaliar'],
  },
  's-a2-11': {
    severity: 'danger',
    values: { fib4: '3,2', lsm: '32 kPa', plq: '89k', meld: '28', albumin: '2,4', stage: 'dACLD/ACLF' },
    events: ['Ascite', 'PBE', 'HDA', 'EH', 'ACLF G2', 'Cr 2,8'],
  },
  's-a2-12': {
    severity: 'danger',
    values: { fib4: '—', lsm: '—', plq: '89k', meld: '24', albumin: '2,6', stage: 'dACLD' },
    events: ['Ascite refratária', 'ACLF resolvido', 'LVP semanal'],
  },
  's-cp2': {
    severity: 'danger',
    values: { fib4: '3,2', lsm: '32 kPa', plq: '89k', meld: '28', albumin: '2,4', stage: 'dACLD' },
    events: ['Ascite +++', 'PBE', 'HRS-AKI', 'Cr 2,8'],
  },

  // ── Act 3 + Close ──
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
