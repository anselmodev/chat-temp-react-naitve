import React from 'react';
import {Linking} from 'react-native';

const _iskUrl = (chatText) => {
  return chatText.includes('https://');
};

const checkUrlExists = (chatText) => {
  if (_iskUrl(chatText)) {
    const splitUrl = chatText.split('https://');

    // URLs Count exists from string
    // const getUrls = chatText.match(/(https?:\/\/[^\s]+)/g);

    // if (getUrls.length > 1) {
    //   const  replaceText = chatText.replace(/(https?:\/\/[^\s]+)/g, '#LINK#');
    //   console.log(replaceText);
    // } else {
    //   console.log('Mostrar a URL como Imagem, ou Link!');
    // }

    const splitTextFromUrl = splitUrl[1].split(' ');
    const finalText = splitTextFromUrl.slice(1).join(' ');
    const checkType = !!(/\.(gif|jpe?g|png|webp|bmp)$/i).test(splitTextFromUrl[0]) ? 'image' : 'link';

    return {
      type: checkType,
      text: finalText,
    };
  } else {
    return {
      type: 'txt',
      text: chatText
    };
  }
};

export default checkUrlExists;