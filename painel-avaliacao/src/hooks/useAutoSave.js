import { useEffect, useState } from "react";

const STORAGE_KEY = "painel-avaliacao-scrum";

export function useAutoSave(buildDefault) {
  const [data, setData] = useState(() => {
    const salvo = localStorage.getItem(STORAGE_KEY);

    if (salvo) {
      try {
        return JSON.parse(salvo);
      } catch {
        return buildDefault();
      }
    }

    return buildDefault();
  });

  const [salvoEm, setSalvoEm] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  }, [data]);

  function atualizarData(updater) {
    setData(updater);
    setSalvoEm(new Date());
  }

  function salvarAgora() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );

    setSalvoEm(new Date());
  }

  function limpar() {
    const novaData = buildDefault();

    localStorage.removeItem(STORAGE_KEY);
    setData(novaData);
    setSalvoEm(new Date());
  }

  return [
    data,
    atualizarData,
    salvarAgora,
    salvoEm,
    limpar,
  ];
}