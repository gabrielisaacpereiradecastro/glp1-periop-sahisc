import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FatorRisco } from "@/types";
import { cores, espacamento, raio } from "@/theme";

interface Props {
  itens: FatorRisco[];
  selecionados: string[];
  onAlternar: (id: string) => void;
}

export function Checklist({ itens, selecionados, onAlternar }: Props) {
  return (
    <View style={estilos.lista}>
      {itens.map((item) => {
        const marcado = selecionados.includes(item.id);
        return (
          <Pressable
            key={item.id}
            onPress={() => onAlternar(item.id)}
            style={[estilos.item, marcado && estilos.itemMarcado]}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: marcado }}
            accessibilityLabel={item.descricao}
          >
            <View style={[estilos.caixa, marcado && estilos.caixaMarcada]}>
              {marcado && <Text style={estilos.check}>✓</Text>}
            </View>
            <Text style={estilos.texto}>{item.descricao}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const estilos = StyleSheet.create({
  lista: {
    gap: espacamento.sm,
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: espacamento.sm,
    borderRadius: raio.sm,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.branco,
    gap: espacamento.sm,
  },
  itemMarcado: {
    borderColor: cores.primaria,
    backgroundColor: cores.primariaClara,
  },
  caixa: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: cores.textoSecundario,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  caixaMarcada: {
    borderColor: cores.primaria,
    backgroundColor: cores.primaria,
  },
  check: {
    color: cores.branco,
    fontSize: 14,
    fontWeight: "700",
  },
  texto: {
    flex: 1,
    color: cores.texto,
    fontSize: 14,
    lineHeight: 20,
  },
});
