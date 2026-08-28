# Trabalho_dw
Turma: 2F
Integrantes: Lara Leticia Jung Appel, Carina Muller e Marya reis

Arquivos prontos aqui:
- `src/data/initialData.js`
- `src/utils/sprintLabel.js` (também usado pela Parte 3 — combinem pra não duplicar)
- `src/components/SetupPanel.jsx`
- `src/components/ScrumMasterPanel.jsx`
- `src/components/OwnerPanel.jsx`
- `src/components/ProductOwnerPanel.jsx`
- `src/components/DevPanel.jsx`

## Dependências da Parte 1 (precisa existir antes de rodar)
- `src/components/campos/SimNaoSelect.jsx` — recebe `{ value, onChange }`, chama `onChange(novoValor)`
- `src/components/campos/ScoreSelect.jsx` — mesmo formato, valores 1 a 5
- `src/components/campos/ObsInput.jsx` — recebe `{ value, onChange, placeholder }`
- Uma função `onFieldChange(path, value)` no `App.jsx`, que atualiza o estado global
  imutavelmente a partir de um "caminho" tipo `"sm.3.nota"` ou `"weights.dev"`
  (é o equivalente ao `setByPath` do app.js original, só que sem mutar o STATE direto)

## Atenção especial no SetupPanel
Trocar o nome da Empresa A ou B (`onRenameEmpresa("A", novoNome)`) não é um campo
comum — o nome da empresa é também chave de `teamNames`, `corrupcao.empresaCorruptora`
etc. Isso precisa de uma função própria no App.jsx (equivalente ao `renameEmpresa`
do app.js original), não do `onFieldChange` genérico. Combinem esse detalhe com
quem fizer a Parte 1 antes de integrar.

## Onde plugar no App.jsx
```jsx
{tab === "setup" && <SetupPanel meta={state.meta} teamNames={state.teamNames} weights={state.weights} onFieldChange={onFieldChange} onRenameEmpresa={onRenameEmpresa} />}
{tab === "sm" && <ScrumMasterPanel rows={state.sm} onFieldChange={onFieldChange} />}
{tab === "owner" && <OwnerPanel rows={state.owner} onFieldChange={onFieldChange} />}
{tab === "po" && <ProductOwnerPanel rows={state.po} onFieldChange={onFieldChange} />}
{tab === "dev" && <DevPanel rows={state.dev} onFieldChange={onFieldChange} />}
```
