import {
  BUYERS,
  BUYER_IMAGES,
  TEAM_IMAGES,
} from "../data/initialData";

import CompanyBlock from "./CompanyBlock";

export default function EscalacaoPanel({ data }) {
  const empresas = [data.meta.empresaA, data.meta.empresaB];

  return (
    <div className="panel">
      <h2>Escalação</h2>

      <div className="desc">
        Visão de equipe, com a identidade visual de cada empresa — útil para projetar em sala.
      </div>

      {empresas.map((empresa, index) => {
        const imagemOriginal =
          index === 0
            ? TEAM_IMAGES["Maverick Aviation"]
            : TEAM_IMAGES["SkyForge Ind. Aeronáutica"];

        return (
          <CompanyBlock
            key={empresa}
            empresa={empresa}
            data={data}
            imageSet={imagemOriginal}
          />
        );
      })}

      <h2 style={{ marginTop: "0.4rem" }}>Compradores</h2>

      <div className="buyers-strip">
        {BUYERS.map((b) => {
          const aluno = data.alunos.find(
            (a) => a.papel === "Comprador - " + b
          );

          return (
            <div className="buyer-card" key={b}>
              <img src={BUYER_IMAGES[b]} alt={b} />

              <div className="buyer-body">
                <h3>{b}</h3>

                <div>
                  {aluno ? (
                    aluno.nome
                  ) : (
                    <span className="tag-unassigned">
                      não atribuído
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
