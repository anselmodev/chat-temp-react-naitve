  const chatHistory = {
  messages: [
    /* ######## Message Structure ########
    {
      id: '1',
      type: 'txt', // deve ser: 'txt', 'img', 'sticker' ou 'file (file types: pdf, doc, xls, others)'
      from: 'other', // deve ser: 'me' ou 'other'
      fileName: 'file.pdf', // nome do arquivo anexado
      stickerFile: 'sticker-3.png', // nome do arquivo anexado
      text: 'Olá tudo bem?', // texto da mensagem
      sent: true, // enviado
      received: true, // recebido
      date: ['2020-06-10', '10:30:33'], // data de envio
      forwarded: false // se a mensagem veio compartilhada de outra conversa (habilitar botão de recompartilhar)
    },
    */
    {
      id: '1',
      type: 'txt',
      from: 'other',
      text: 'Olá tudo bem?',
      sent: true,
      received: true,
      date: ['2020-06-10', '10:00:33'],
      forwarded: false
    },
    {
      id: '2',
      type: 'txt',
      from: 'other',
      text: 'Muito trabalho hoje?',
      sent: true,
      received: true,
      date: ['2020-06-10', '10:01:33']
    },
    {
      id: '3',
      type: 'txt',
      from: 'other',
      text: 'Preciso tirar umas dúvidas',
      sent: true,
      received: true,
      date: ['2020-06-10', '10:01:33']
    },
    {
      id: '4',
      type: 'txt',
      from: 'me',
      text: 'Bom dia!',
      sent: true,
      received: true,
      date: ['2020-06-10', '10:23:33']
    },
    {
      id: '5',
      type: 'txt',
      from: 'me',
      text: 'Eu estava ocupado!',
      sent: true,
      received: true,
      date: ['2020-06-10', '10:23:33']
    },
    {
      id: '6',
      type: 'txt',
      from: 'me',
      text: 'Foi mal...',
      sent: true,
      received: true,
      date: ['2020-06-10', '10:24:33']
    },
    {
      id: '7',
      type: 'txt',
      from: 'me',
      text: 'Quais são suas dúvidas?',
      sent: true,
      received: true,
      date: ['2020-06-10', '10:25:33']
    },
    {
      id: '8',
      type: 'txt',
      from: 'other',
      text: 'Tenho algumas dúvidas sobre os registros de vendas pelo APP!',
      sent: true,
      received: true,
      date: ['2020-06-10', '10:25:33']
    },
    {
      id: '9',
      type: 'txt',
      from: 'other',
      text: 'Gostaria de saber como fico sabendo sobre os pagamentos no final do mês?',
      sent: true,
      received: true,
      date: ['2020-06-10', '10:27:33']
    },
    {
      id: '10',
      type: 'txt',
      from: 'other',
      text: 'Receberei algum aviso por aqui, algum relatótio no fim do mês?',
      sent: true,
      received: true,
      date: ['2020-06-10', '10:28:33']
    },
    {
      id: '11',
      type: 'txt',
      from: 'me',
      text: 'Você será notificada pelo seu APP quando o fechamento do mês for efetuado.',
      sent: true,
      received: true,
      date: ['2020-06-10', '10:31:33']
    },
    {
      id: '12',
      type: 'txt',
      from: 'me',
      text: 'Em seu extrato, também terá detalhes sobre todos os status das vendas.',
      sent: true,
      received: true,
      date: ['2020-06-10', '10:31:33'],
      forwarded: true
    },
    {
      id: '13',
      type: 'txt',
      from: 'me',
      text: 'Após a mudança de status dos registros de vendas, em até 24h você terá o valor transferido na sua conta!',
      sent: true,
      received: true,
      date: ['2020-06-10', '10:32:33']
    },
    {
      id: '14',
      type: 'txt',
      from: 'other',
      text: 'Entendi! Ficou mais claro agora.',
      sent: true,
      received: true,
      date: ['2020-06-10', '10:42:33'],
      forwarded: true
    },
    {
      id: '15',
      type: 'img',
      from: 'me',
      sent: true,
      received: true,
      date: ['2020-06-10', '10:42:33'],
      forwarded: true
    },
    {
      id: '16',
      type: 'img',
      from: 'other',
      text: 'Segue os detalhes do Produto. Notei que no sistema, as informações deste não batem!',
      sent: true,
      received: true,
      date: ['2020-06-10', '10:42:33'],
      forwarded: true
    },
    {
      id: '150',
      type: 'sticker',
      stickerFile: 'sticker-2.png',
      from: 'me',
      sent: true,
      received: true,
      date: ['2020-06-10', '10:42:33'],
      forwarded: true
    },
    {
      id: '17',
      type: 'xls',
      from: 'other',
      fileName: 'planilha.xls',
      sent: true,
      received: true,
      date: ['2020-06-10', '10:42:33'],
      forwarded: true
    },
    {
      id: '18',
      type: 'doc',
      from: 'me',
      fileName: 'documento.doc',
      sent: true,
      received: true,
      date: ['2020-06-10', '10:42:33']
    },
    {
      id: '19',
      type: 'pdf',
      from: 'me',
      fileName: 'documento.pdf',
      text: 'Esse pdf possui toda a relação de produtos da marca. É antigo mas deve servir!',
      sent: true,
      received: true,
      date: ['2020-06-10', '10:42:33']
    },
    {
      id: '20',
      type: 'others',
      from: 'other',
      fileName: 'arquivo.zip',
      text: 'Segue o arquivo para conferência!',
      sent: true,
      received: true,
      date: ['2020-06-10', '10:42:33']
    },
    {
      id: '21',
      type: 'txt',
      from: 'me',
      text: 'Grato!',
      sent: true,
      received: false,
      date: ['2020-07-22', '10:50:33']
    },
  ]
};

export default chatHistory;
