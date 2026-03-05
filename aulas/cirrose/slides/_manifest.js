/**
 * _manifest.js — Source of truth para ordem, archetypes, panel states, animações
 * Gerado na FASE 0 da refatoração arquitetural.
 * Atualizado: 2026-02-27
 */

export const slides = [
  { id: 's-title', file: '00-title.html', act: null, archetype: 'title', sectionTag: null, headline: 'Cirrose Hepática', panelState: 'hidden', clickReveals: 0, customAnim: null, timing: null, subItems: ['brasão', 'título', 'pilares'] },
  { id: 's-hook', file: '01-hook.html', act: null, archetype: 'hook', sectionTag: null, headline: 'Caso Antônio · Qual a próxima conduta?', panelState: 'neutral', clickReveals: 1, customAnim: 's-hook', timing: 90, subItems: [{ label: 'beat 0: Antônio', beat: 0 }, { label: 'beat 1: labs+pergunta', beat: 1 }] },
  { id: 's-a1-01', file: '02-a1-continuum.html', act: 'A1', archetype: 'hero-stat', sectionTag: 'ATO 1 — CLASSIFICAR', headline: 'Cirrose mata 1,32 milhão por ano — e a epidemia silenciosa está crescendo', panelState: 'neutral', clickReveals: 0, customAnim: 's-a1-01', timing: 90 },
  { id: 's-a1-damico', file: '02b-a1-damico.html', act: 'A1', archetype: 'flow', sectionTag: 'ATO 1 — CLASSIFICAR', headline: 'De Child a MELD 3.0 — cada geração corrigiu o que a anterior não via', panelState: 'neutral', clickReveals: 5, customAnim: 's-a1-damico', timing: 180 },
  { id: 's-a1-screening', file: '02c-a1-screening.html', act: 'A1', archetype: 'flow', sectionTag: 'ATO 1 — CLASSIFICAR', headline: 'Cirrose compensada é silenciosa — o rastreio chegou antes dos sintomas', panelState: 'neutral', clickReveals: 4, customAnim: 's-a1-screening', timing: 90 },
  { id: 's-a1-02', file: '03-a1-fib4.html', act: 'A1', archetype: 'flow', sectionTag: 'ATO 1 — CLASSIFICAR', headline: 'De "cirrose" a cACLD/dACLD — testes não invasivos substituem a biópsia', panelState: 'neutral', clickReveals: 0, customAnim: 's-a1-02', timing: 120 },
  { id: 's-a1-03', file: '04-a1-meld.html', act: 'A1', archetype: 'interactive', sectionTag: 'ATO 1 — CLASSIFICAR', headline: 'MELD-Na é o GPS do cirrótico — e tem um semáforo', panelState: null, clickReveals: 0, customAnim: null, timing: null },
  { id: 's-a1-04', file: '05-a1-infeccao.html', act: 'A1', archetype: 'bars', sectionTag: 'ATO 1 — CLASSIFICAR', headline: 'Infecção precipita 1 em 3 descompensações — e é a mais prevenível', panelState: null, clickReveals: 0, customAnim: null, timing: null },
  { id: 's-a1-05', file: '06-a1-etiologias.html', act: 'A1', archetype: 'table', sectionTag: 'ATO 1 — CLASSIFICAR', headline: '"Cirrose" não é uma doença — são 10 doenças com final comum', panelState: null, clickReveals: 0, customAnim: null, timing: null },
  { id: 's-cp1', file: '07-cp1.html', act: 'CP', archetype: 'checkpoint', sectionTag: null, headline: 'LSM 21 kPa, plaquetas 118k. Como você estadia?', panelState: 'caution', clickReveals: 3, customAnim: null, timing: 180 },
  { id: 's-a2-01', file: '08-a2-carvedilol.html', act: 'A2', archetype: 'metrics', sectionTag: 'ATO 2 — INTERVIR', headline: 'Carvedilol previne a primeira descompensação — comece antes da ascite', panelState: null, clickReveals: 3, customAnim: null, timing: null },
  { id: 's-a2-02', file: '09-a2-tips.html', act: 'A2', archetype: 'timeline', sectionTag: 'ATO 2 — INTERVIR', headline: 'Early TIPS salva vidas no sangramento varicoso', panelState: null, clickReveals: 0, customAnim: null, timing: null },
  { id: 's-a2-03', file: '10-a2-albumina.html', act: 'A2', archetype: 'cards', sectionTag: 'ATO 2 — INTERVIR', headline: 'Albumina: 3 indicações certas, 1 armadilha — repor, não normalizar', panelState: null, clickReveals: 0, customAnim: null, timing: null },
  { id: 's-a2-04', file: '11-a2-pbe.html', act: 'A2', archetype: 'flow', sectionTag: 'ATO 2 — INTERVIR', headline: 'PBE: PMN ≥250 = tratar. Cada hora de atraso custa vidas', panelState: null, clickReveals: 0, customAnim: null, timing: null },
  { id: 's-a2-05', file: '12-a2-hrs.html', act: 'A2', archetype: 'tree', sectionTag: 'ATO 2 — INTERVIR', headline: 'HRS-AKI: 3 perguntas antes da terlipressina — a 3ª decisão', panelState: null, clickReveals: 0, customAnim: null, timing: null },
  { id: 's-a2-06', file: '13-a2-he.html', act: 'A2', archetype: 'pillars', sectionTag: 'ATO 2 — INTERVIR', headline: 'Encefalopatia: lactulose + rifaximina + nutrição — NÃO restringir proteína', panelState: null, clickReveals: 0, customAnim: null, timing: null },
  { id: 's-cp2', file: '14-cp2.html', act: 'CP', archetype: 'checkpoint', sectionTag: null, headline: 'Cr 2,8 + Na 126 + ascite tensa. HRS-AKI? O que você faz?', panelState: 'danger', clickReveals: 0, customAnim: null, timing: 180 },
  { id: 's-a3-01', file: '15-a3-recompensacao.html', act: 'A3', archetype: 'criteria', sectionTag: 'ATO 3 — REVERTER', headline: 'Recompensação é real — e Baveno VII a definiu', panelState: null, clickReveals: 0, customAnim: null, timing: null },
  { id: 's-a3-02', file: '16-a3-svr.html', act: 'A3', archetype: 'compare', sectionTag: 'ATO 3 — REVERTER', headline: 'SVR cura o vírus mas não a hipertensão portal — CSPH persiste em 53%', panelState: null, clickReveals: 0, customAnim: null, timing: null },
  { id: 's-a3-03', file: '17-a3-vigilancia.html', act: 'A3', archetype: 'surveillance', sectionTag: 'ATO 3 — REVERTER', headline: 'Vigilância a cada 6 meses — nunca dar alta, mesmo após "cura"', panelState: null, clickReveals: 0, customAnim: null, timing: null },
  { id: 's-cp3', file: '18-cp3.html', act: 'CP', archetype: 'checkpoint', sectionTag: null, headline: 'SVR + abstinência, LSM 32→18. Pode sair da vigilância? Da fila?', panelState: 'hope', clickReveals: 0, customAnim: null, timing: 150 },
  { id: 's-close', file: '19-close.html', act: null, archetype: 'recap', sectionTag: null, headline: '5 números classificaram. 3 decisões salvaram. Cirrose não é sentença.', panelState: 'resolved', clickReveals: 0, customAnim: null, timing: null },
  { id: 's-app-01', file: '20-app-aclf.html', act: 'APP', archetype: 'table', sectionTag: 'APÊNDICE', headline: 'ACLF grau 3: mortalidade 28d >70% — limiar de futilidade', panelState: null, clickReveals: 0, customAnim: null, timing: null },
  { id: 's-app-02', file: '21-app-tips.html', act: 'APP', archetype: 'flow', sectionTag: 'APÊNDICE', headline: 'Early TIPS em 72h: Child C 10–13 ou B com sangramento ativo — NNT 4 (IC 95% 2,1–50)', panelState: null, clickReveals: 0, customAnim: null, timing: null },
  { id: 's-app-03', file: '22-app-abcw.html', act: 'APP', archetype: 'table', sectionTag: 'APÊNDICE', headline: 'Etiologias raras: ABCW — pista clínica e exame-chave', panelState: null, clickReveals: 0, customAnim: null, timing: null },
  { id: 's-app-04', file: '23-app-nsbb.html', act: 'APP', archetype: 'compare', sectionTag: 'APÊNDICE', headline: 'Turco 2024 IPD: NSBB ≥ EVL — carvedilol superior em HVPG', panelState: null, clickReveals: 0, customAnim: null, timing: null },
  { id: 's-app-05', file: '24-app-ccc.html', act: 'APP', archetype: 'criteria', sectionTag: 'APÊNDICE', headline: 'Cardiomiopatia cirrótica: 48% prevalência — CCC 2019 detecta mais', panelState: null, clickReveals: 0, customAnim: null, timing: null },
  { id: 's-app-06', file: '25-app-pulm.html', act: 'APP', archetype: 'compare', sectionTag: 'APÊNDICE', headline: 'SHP vs HPP: fisiopatologia oposta — manejo diferente', panelState: null, clickReveals: 0, customAnim: null, timing: null },
  { id: 's-app-07', file: '26-app-estatina.html', act: 'APP', archetype: 'compare', sectionTag: 'APÊNDICE', headline: 'Estatina adjuvante: HVPG −2 mmHg — LIVERHOPE negativo', panelState: null, clickReveals: 0, customAnim: null, timing: null },
  { id: 's-app-08', file: '27-app-cirrox.html', act: 'APP', archetype: 'compare', sectionTag: 'APÊNDICE', headline: 'CIRROXABAN 2025: p=0,058 NS — aguardar confirmação', panelState: null, clickReveals: 0, customAnim: null, timing: null },
];

export const panelStates = {
  's-hook': {
    severity: 'neutral',
    values: { fib4: '—', lsm: '—', plq: '112k', meld: '—', albumin: '3,5', stage: '?' },
    events: [],
  },
  's-cp1': {
    severity: 'caution',
    values: { fib4: '5,10', lsm: '21 kPa', plq: '118k', meld: '~10', albumin: '3,6', stage: 'cACLD/CSPH' },
    events: ['Elastografia realizada'],
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
