import { useState } from "react";

import { buildInitialData } from "./data/initialData";

import { useAutoSave } from "./hooks/useAutoSave";

import SetupPanel from "./components/SetupPanel";
import ScrumMasterPanel from "./components/ScrumMasterPanel";
import OwnerPanel from "./components/OwnerPanel";
import ProductOwnerPanel from "./components/ProductOwnerPanel";
import DevPanel from "./components/DevPanel";

import AlunosPanel from "./components/AlunosPanel";
import EscalacaoPanel from "./components/EscalacaoPanel";
import BuyerProfilePanel from "./components/BuyerProfilePanel";
import BuyerProductPanel from "./components/BuyerProductPanel";
import CorrupcaoSabotagemPanel from "./components/CorrupcaoSabotagemPanel";
import ResultPanel from "./components/ResultPanel";

const TABS = [
  { id: "setup", label: "Configuração" },
  { id: "alunos", label: "Alunos" },
  { id: "escalacao", label: "Escalação" },
  { id: "sm", label: "Scrum Master" },
  { id: "owner", label: "Owner" },
  { id: "po", label: "Product Owner" },
  { id: "dev", label: "Developers" },
  { id: "buyerProf", label: "Compradores (Papel)" },
  { id: "buyerProduct", label: "Compradores (Produto)" },
  { id: "corrupsab", label: "Corrupção & Sabotagem" },
  { id: "result", label: "Resultado Final" },
];

const EMPRESA_A = "Maverick Aviation";
const EMPRESA_B = "SkyForge Ind. Aeronáutica";

export default function App() {
  const [data, setData, salvarAgora, salvoEm, limpar] = useAutoSave(
    () => buildInitialData(EMPRESA_A, EMPRESA_B)
  );

  const [tab, setTab] = useState("setup");

  function onFieldChange(path, value) {
    setData((prev) => {
      const next = structuredClone(prev);

      const parts = path.split(".");
      let obj = next;

      for (let i = 0; i < parts.length - 1; i++) {
        obj = obj[parts[i]];
      }

      obj[parts[parts.length - 1]] = value;

      return next;
    });
  }

  function onRenameEmpresa(which, novoNome) {
    setData((prev) => {
      const oldVal =
        which === "A"
          ? prev.meta.empresaA
          : prev.meta.empresaB;

      if (!novoNome || novoNome === oldVal) {
        return prev;
      }

      const rename = (v) =>
        v === oldVal ? novoNome : v;

      const teamNames = { ...prev.teamNames };

      if (teamNames[oldVal]) {
        teamNames[novoNome] = teamNames[oldVal];
        delete teamNames[oldVal];
      }

      return {
        ...prev,

        meta: {
          ...prev.meta,
          [which === "A" ? "empresaA" : "empresaB"]:
            novoNome,
        },

        sm: prev.sm.map((r) => ({
          ...r,
          empresa: rename(r.empresa),
        })),

        owner: prev.owner.map((r) => ({
          ...r,
          empresa: rename(r.empresa),
        })),

        po: prev.po.map((r) => ({
          ...r,
          empresa: rename(r.empresa),
        })),

        dev: prev.dev.map((r) => ({
          ...r,
          empresa: rename(r.empresa),
        })),

        buyerProduct: prev.buyerProduct.map((r) => ({
          ...r,
          empresa: rename(r.empresa),
        })),

        alunos: prev.alunos.map((a) => ({
          ...a,
          empresa: rename(a.empresa),
        })),

        corrupcao: {
          ...prev.corrupcao,
          empresaCorruptora: rename(
            prev.corrupcao.empresaCorruptora
          ),
        },

        sabotagem: {
          ...prev.sabotagem,
          empresaSabotador: rename(
            prev.sabotagem.empresaSabotador
          ),
        },

        teamNames,
      };
    });
  }

  function limparTudo() {
    if (
      !confirm(
        "Isso vai apagar todos os dados salvos e recomeçar do zero. Confirma?"
      )
    ) {
      return;
    }

    limpar();
  }

  function renderPanel() {
    switch (tab) {

      case "setup":
        return (
          <SetupPanel
            meta={data.meta}
            teamNames={data.teamNames}
            weights={data.weights}
            onFieldChange={onFieldChange}
            onRenameEmpresa={onRenameEmpresa}
          />
        );

      case "alunos":
        return (
          <AlunosPanel
            data={data}
            onFieldChange={onFieldChange}
          />
        );

      case "escalacao":
        return <EscalacaoPanel data={data} />;

      case "sm":
        return (
          <ScrumMasterPanel
            rows={data.sm}
            onFieldChange={onFieldChange}
          />
        );

      case "owner":
        return (
          <OwnerPanel
            rows={data.owner}
            onFieldChange={onFieldChange}
          />
        );

      case "po":
        return (
          <ProductOwnerPanel
            rows={data.po}
            onFieldChange={onFieldChange}
          />
        );

      case "dev":
        return (
          <DevPanel
            rows={data.dev}
            onFieldChange={onFieldChange}
          />
        );

      // Parte 3
      case "buyerProf":
        return (
          <BuyerProfilePanel
            rows={data.buyerProf}
            onFieldChange={onFieldChange}
          />
        );

      case "buyerProduct":
        return (
          <BuyerProductPanel
            rows={data.buyerProduct}
            onFieldChange={onFieldChange}
          />
        );

      case "corrupsab":
        return (
          <CorrupcaoSabotagemPanel
            data={data}
            onFieldChange={onFieldChange}
          />
        );

      case "result":
        return <ResultPanel data={data} />;

      default:
        return null;
    }
  }

  return (
    <div>
      <div className="topbar">
        <div>
          <h1>
            Painel de Avaliação — Simulação Scrum Competitiva
          </h1>

          <div className="sub">
            Empresa A: {data.meta.empresaA} · Empresa B:{" "}
            {data.meta.empresaB}

            {salvoEm && (
              <>
                {" "}
                · salvo às{" "}
                {salvoEm.toLocaleTimeString()}
              </>
            )}
          </div>
        </div>

        <div className="topbar-actions">
          <button
            className="btn btn-save"
            onClick={salvarAgora}
          >
            Salvar agora
          </button>

          <button
            className="btn btn-reset"
            onClick={limparTudo}
          >
            Limpar tudo
          </button>
        </div>
      </div>

      <div className="tabs">
        {TABS.map((t) => (
          <div
            key={t.id}
            className={
              "tab" + (tab === t.id ? " active" : "")
            }
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </div>
        ))}
      </div>

      <div className="wrap">
        {renderPanel()}

        <div className="footer-note">
          os dados são salvos automaticamente neste navegador
          a cada alteração.
        </div>
      </div>
    </div>
  );
}