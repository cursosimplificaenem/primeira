# 🌌 Antigravity: Guia de Automação n8n

Tudo pronto! Seu ambiente foi configurado com sucesso. Agora eu sou um especialista em n8n e estou pronto para criar, validar e gerenciar seus fluxos de trabalho.

---

## ✅ Status da Instalação

1.  **Node.js**: Instalado (v20.12.0).
2.  **n8n-mcp**: Servidor instalado globalmente.
3.  **n8n-skills**: 7 habilidades especialistas instaladas globalmente.
4.  **AGENTS.md**: Instruções de operação configuradas na raiz do projeto.

---

## 🛠️ Configuração Final do MCP

Para ativar as ferramentas, você só precisa adicionar o servidor na sua configuração do Antigravity.

1.  No chat, clique nos três pontos `...` -> **MCP Servers** -> **Manage MCP Servers** -> **View raw config**.
2.  Adicione este bloco de código (ou atualize o existente) no arquivo `mcp_config.json`:

```json
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "node",
      "args": [
        "C:\\Users\\bflor\\AppData\\Roaming\\npm\\node_modules\\n8n-mcp\\dist\\mcp\\index.js"
      ],
      "env": {
        "MCP_MODE": "stdio",
        "LOG_LEVEL": "error",
        "DISABLE_CONSOLE_OUTPUT": "true",
        "N8N_API_URL": "http://localhost:5678",
        "N8N_BASE_URL": "http://localhost:5678",
        "N8N_API_KEY": "<SUA_API_KEY>"
      }
    }
  }
}
```

> [!IMPORTANT]
> Lembre-se de substituir `<SUA_API_KEY>` pela sua chave da API do n8n.
> Após salvar, clique em **Refresh** no gerenciador de MCP.

---

## 🚀 Como Operaremos a partir de agora

Eu já possuo as seguintes habilidades carregadas:
*   **Workflow Patterns**: Conheço as melhores arquiteturas para webhooks, APIs e IA.
*   **Expression Syntax**: Sei escrever expressões complexas sem erros.
*   **Validation Expert**: Consigo interpretar qualquer erro do n8n e corrigi-lo.
*   **Node Configuration**: Sei exatamente quais campos são obrigatórios para cada nó.

---

*Configuração finalizada com sucesso! Vamos automatizar?*
