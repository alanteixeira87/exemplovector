# Funcionalidade: Vídeo de Referência da Jornada

## Resumo

A funcionalidade adiciona à tabela de validação uma coluna discreta com um ícone de vídeo. Ao clicar nesse ícone, o usuário pode visualizar uma gravação de referência da jornada correspondente, sem sair da tela e sem alterar nenhuma resposta da coleta.

O vídeo funciona como um material de apoio para orientar a execução correta da jornada antes ou durante o preenchimento dos critérios de validação.

## Como funciona

Na tabela de validação, foi adicionada uma nova primeira coluna antes de **Macro Jornada**.

Cada linha exibe um ícone de vídeo quando a jornada possui uma gravação associada. Ao clicar no ícone:

- um modal centralizado é aberto;
- o nome da jornada é exibido;
- o vídeo relacionado é carregado no player;
- o usuário pode assistir com controles de reprodução;
- ao fechar o modal, o vídeo é pausado e encerrado.

O vídeo é associado à **Jornada**, não ao critério. Portanto, quando uma mesma jornada aparece em várias linhas da tabela, todas essas linhas acessam o mesmo vídeo de referência.

## Benefícios para a operação

### 1. Padronização da execução

O vídeo mostra como a jornada deve ser realizada, reduzindo interpretações diferentes entre analistas e equipes. Isso ajuda a manter um padrão mais consistente durante as validações.

### 2. Redução de dúvidas durante a coleta

O usuário consegue consultar a gravação diretamente na tela onde está preenchendo os critérios. Isso evita alternância entre ferramentas, documentos externos ou mensagens de apoio.

### 3. Agilidade no preenchimento

Com o material de referência acessível no próprio fluxo de trabalho, o analista tende a localizar mais rapidamente a orientação necessária para responder aos critérios.

### 4. Melhoria na qualidade das respostas

Ao assistir à execução esperada da jornada, o usuário tem mais contexto para avaliar pontos como quantidade de telas, cliques, duração, mensagens de alerta e presença de erro.

### 5. Apoio ao treinamento de novos usuários

A funcionalidade também serve como material de capacitação. Novos analistas podem entender a jornada observando a execução prática, sem depender apenas de instruções textuais.

### 6. Menor dependência de suporte operacional

Como a referência fica disponível na própria tela, parte das dúvidas recorrentes pode ser resolvida pelo próprio usuário, reduzindo acionamentos para coordenação, suporte ou especialistas.

### 7. Preservação do fluxo atual

O recurso não altera respostas, status, filtros, comentários ou regras da tabela. O vídeo é apenas um apoio visual, mantendo a operação atual intacta.

## Impacto esperado

A funcionalidade tende a trazer mais clareza, velocidade e consistência ao processo de validação das jornadas de Open Finance. Ela melhora a experiência do usuário sem modificar a lógica principal da coleta.

Em termos operacionais, o principal ganho é permitir que o analista consulte rapidamente uma referência prática da jornada, reduzindo erros de interpretação e aumentando a confiança no preenchimento dos critérios.

## Evoluções futuras possíveis

No futuro, a mesma estrutura pode ser evoluída para:

- indicar o ponto exato do vídeo relacionado a cada critério;
- cadastrar mais de um vídeo por jornada;
- separar vídeos por plataforma, como Android, iOS ou Browser;
- exibir duração, versão do aplicativo ou data da gravação;
- permitir atualização do vídeo de referência sem alterar a estrutura da tabela.
