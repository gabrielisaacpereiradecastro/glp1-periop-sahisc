import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

/**
 * Documento HTML raiz da versão web (expo-router). É aqui que ficam as tags
 * que fazem o Safari do iOS tratar o site como um "app instalado" quando a
 * pessoa usa Compartilhar > Adicionar à Tela de Início — abre em tela cheia,
 * sem a barra do navegador, com o ícone da SAHISC.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover, maximum-scale=1"
        />
        <title>GLP-1 PeriOp — SAHISC</title>
        <meta
          name="description"
          content="Apoio à decisão sobre manejo perioperatório de GLP-1/GIP, baseado na Nota SBA C.SBA-01744/2026."
        />
        <meta name="theme-color" content="#0F766E" />

        {/* iOS: instalar na tela de início, abrir em tela cheia sem barra do Safari */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="GLP-1 PeriOp" />
        <link rel="apple-touch-icon" href="/glp1-periop/apple-touch-icon.png" />

        {/* Android/Chrome: mesmo recurso de instalação (o favicon já é injetado
            automaticamente pelo Expo a partir de app.json) */}
        <link rel="manifest" href="/glp1-periop/manifest.json" />

        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  );
}
