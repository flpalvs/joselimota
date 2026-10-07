# Landing Page - Dra. Joseli Mota

Landing page estática (HTML, CSS e JavaScript puros) da Dra. Joseli Mota, Medicina e Odontologia.
O conteúdo segue o documento "Copy Final Landing Page" enviado pela contratante.

```
├── index.html              → estrutura e conteúdo da página
├── css/style.css           → paleta, tipografia, layout e componentes
├── js/main.js              → header on scroll, menu mobile, reveal, FAQ animado, clique WhatsApp
└── assets/images/          → fotografias (hero, sobre, odontologia)
```

## Seções

1. Abertura: título, credenciais e dois botões separados (consulta médica / odontológica)
2. Cards Medicina e Odontologia
3. Medicina: motivos para procurar uma avaliação, "Muito além do peso", "Seu objetivo é o ponto de partida"
4. Como funciona o atendimento (Avaliar, Planejar, Acompanhar, Reavaliar)
5. Sobre a Dra. Joseli Mota
6. Áreas de atuação e condições acompanhadas (Medicina)
7. Odontologia: funções orais, avaliação individualizada, sinais e ressalva
8. Como funciona a consulta odontológica
9. Perguntas frequentes (accordion com abertura suave)
10. Atendimentos: endereços de Águas Claras e Santa Maria
11. Fechamento com os dois botões de agendamento e rodapé

## Como visualizar

```bash
python -m http.server 4599
```

Depois acesse `http://localhost:4599`.

## Observações

- O canal de contato é exclusivamente o WhatsApp. Os botões de consulta médica e odontológica têm mensagens
  próprias ("Olá! Gostaria de informações sobre consulta médica/odontológica com a Dra. Joseli");
  menu, botão do topo e botão flutuante usam uma mensagem genérica.
- O link da Política de Privacidade no rodapé ainda é um placeholder (aviso via JS).
- Há um hook `whatsapp_click` em `js/main.js`, pronto para integração com GA4/GTM.
- O conteúdo clínico não deve ser alterado sem aprovação da Dra. Joseli.
