import { useState, useEffect } from "react";

const STORAGE_KEY = "painel-avaliacao-scrum";


export function useAutoSave(buildDefault) {
  const [data, setData] = useState(() => {
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (salvo) {
      try {
        return JSON.parse(salvo);
      } catch {

      }
    }
    return buildDefault();
  });
  const [salvoEm, setSalvoEm] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setSalvoEm(new Date());
  }, [data]);

  function salvarAgora() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setSalvoEm(new Date());
  }

  function limpar() {
    localStorage.removeItem(STORAGE_KEY);
    setData(buildDefault());
  }

  return [data, setData, salvarAgora, salvoEm, limpar];
}
