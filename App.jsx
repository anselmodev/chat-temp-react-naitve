import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useRef, useState} from 'react';
import {
  AppState,
  Alert,
  Button,
  Clipboard,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Vibration,
  View
} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import {Ionicons} from '@expo/vector-icons';
import * as numberCode from 'numerical-code-generator';
import * as _ from 'lodash';
import styles from "./styles";
import chatHistory from "./mocks/chatHistory";

moment.locale('pt-br');

const screenWidth = Dimensions.get('window').width;

export default function App() {
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const textBoxRef = useRef(false);
  const [chatStatus, setChatStatus] = useState(false);
  const [userText, setUserText] = useState(null);
  const [chatMessages, setChatMessages] = useState({messages: []});
  const [messagesReceived, setMessagesReceived] = useState(false);
  const [openModalAction, setOpenModalAction] = useState(false);

  const [messageCapture, setMessageCapture] = useState(null);
  const [messageID, setMessageId] = useState(null);
  const [messageDate, setMessageDate] = useState(null);

  const _checkLastMessage = (type) => {
    const updMessages = [...chatMessages.messages];
    const [lastItem] = updMessages.slice(-1);
    const newCode = numberCode.set(10);
    const dateHourNow = [moment().format('YYYY-MM-DD'), moment().format('HH:mm:ss')];

    if (lastItem.from === 'me') {
      updMessages.push({
        id: newCode,
        type: type || 'txt',
        from: 'me',
        text: userText,
        sent: true,
        received: false,
        date: dateHourNow
      });
    } else {
      updMessages.push({
        id: newCode,
        type: type || 'txt',
        from: 'me',
        name: 'Anselmo',
        text: userText,
        sent: true,
        received: false,
        date: dateHourNow
      });
    }
    return updMessages;

  };
  const _removeMessageObject = async (msgID) => {
    const getHistoric = [...chatMessages.messages];
    const getIndexMessage = _.findIndex(getHistoric, ['id', msgID]);
    getHistoric.splice(getIndexMessage, 1);

    setChatMessages({messages: getHistoric})
  };
  const _checkHourMessageBeforeDelete = (dateMessage) => {
    const messageToRemove = moment(`${dateMessage[0]} ${dateMessage[1]}`).add(30, 'seconds');
    const dateNow = moment();

    return moment(messageToRemove).isBefore(dateNow);
  };

  const sendMessage = () => {
    if (userText && userText.length) {

      setChatMessages({
        messages: _checkLastMessage()
      });
      setUserText(null);
    }
  };
  const onScroll = (heightScroll) => {
    scrollRef.current.scrollTo({animated: false, y: heightScroll || 99999})
  };
  const openModalActions = (msgID, date) => {
    const formatDate = moment(date).format('LL');
    textBoxRef.current = false;

    setOpenModalAction(!openModalAction);
    setMessageDate(formatDate);
    setMessageId(msgID);

    if (!openModalAction) {
      Vibration.vibrate(50);
      textBoxRef.current = true;
    }
  };
  const copyTextMessage = async () => {
    if (messageID) {
      const getMessage = _.find(chatMessages.messages, ['id', messageID]);
      await Clipboard.setString(getMessage.text);

      openModalActions();
    }
  };
  const forwardTextMessage = async () => {

    if (messageID) {
      const getMessage = _.find(chatMessages.messages, ['id', messageID]);
      const forwardMessage = {
        ...getMessage,
        from: 'me',
        id: numberCode.set(10),
        received: false,
        forwarded: true,
        date: [moment().format('YYYY-MM-DD'), moment().format('HH:mm:ss')]
      };

      openModalActions();
      setMessageCapture(() => forwardMessage);
    }
  };
  const deleteMessage = async () => {
    // 1 - Recebe evento IO para remoção de mensagem:
    // apagar mensangem do historico local

    // 2 - Ação para remoção de mensagem:
    // apagar mensangem local (remetente)
    // apagar mensangem local (destino) - evento IO


    const findMessage = _.find(chatMessages.messages, ['id', messageID]);
    if (!_checkHourMessageBeforeDelete(findMessage.date)) {
      await _removeMessageObject(findMessage.id);

      openModalActions();
    } else {
      Alert.alert('Exclusão Negada', 'Mensagens enviadas após 60 segundos não podem ser removidas!');
    }
  };

  useEffect(() => {
    // load historic
    setChatMessages((prevState) => ({
      ...prevState,
      ...chatHistory
    }));

    // app state
    AppState.addEventListener("change", () => {
      inputRef.current.blur();
    });

    // const keyboardDidShowListener = Keyboard.addListener(
    //   'keyboardDidShow',
    //   () => {
    //     setTimeout(() => onScroll(), 300);
    //   }
    // );
    // const keyboardDidHideListener = Keyboard.addListener(
    //   'keyboardDidHide',
    //   () => {
    //     setTimeout(() => onScroll(), 300);
    //   }
    // );

    return () => {
      // keyboardDidHideListener.remove();
      // keyboardDidShowListener.remove();
      AppState.addEventListener("change", () => {
      });
    };
  }, []);

  // forward message
  useEffect(() => {

    if (messageCapture) {
      console.log('Mensagem capturada para encaminhar: ', messageCapture);
    }

  }, [messageCapture]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1, justifyContent: 'flex-start'}}
    >
      <View style={styles({chatStatus}).container}>
        <StatusBar style="auto"/>

        <Text>
          Status: <Text style={styles({chatStatus}).status}>{!!chatStatus ? 'Online' : 'Offline'}</Text>
        </Text>

        <View style={styles({}).box}>

          {
            // chat history
            chatMessages.messages.length ?
              <ScrollView
                ref={scrollRef}
                contentContainerStyle={{
                  width: screenWidth,
                  paddingBottom: 20,
                  backgroundColor: '#EEE9E5',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
                onContentSizeChange={(contentWidth, contentHeight) => {
                  onScroll(contentHeight);
                }}
                keyboardDismissMode={'none'}
                keyboardShouldPersistTaps={Platform.OS === 'ios' ? 'never' : 'always'}
                directionalLockEnabled={true}
                bounces={false}
              >
                {
                  chatMessages.messages.map((item, indx) => (
                    <TouchableWithoutFeedback
                      key={indx}
                      onLongPress={() => {
                        openModalActions(item.id, item.date[0]);
                      }}
                      delayLongPress={200}
                    >

                      <View
                        ref={textBoxRef}
                        style={styles({userBox: item.from}).chatTextItem}
                      >
                        <View style={styles({userBox: item.from}).chatBalloonContainer}>
                          {
                            // IS TEXT
                            item.type === 'txt' ?
                              <View style={styles({userBox: item.from}).chatBalloonText}>
                                <Text style={styles({}).message}>
                                  {item.text}
                                </Text>
                              </View>
                              :

                              // IS STICKER
                              item.type === 'sticker' ?
                                <View style={styles({userBox: item.from}).chatBalloonSticker}>
                                  <Image
                                    style={styles({}).imageSticker}
                                    source={{
                                      uri: `https://byefive-chat.s3-us-west-1.amazonaws.com/stickers/${item.stickerFile}`
                                    }}
                                  />
                                  {
                                    item.text && item.text.length > 0 &&
                                    <Text style={styles({}).message}>
                                      {item.text}
                                    </Text>
                                  }
                                </View>
                                :

                                // IS IMAGE FROM DEVICE
                                item.type === 'img' ?
                                  <View style={[
                                    styles({userBox: item.from}).chatBalloonText,
                                    styles({userBox: item.from}).chatBalloonAttach
                                  ]}>
                                    <View style={styles({}).imageView}>
                                      <Image
                                        style={styles({}).imageItem}
                                        source={{
                                          uri: 'https://byefive-chat.s3-us-west-1.amazonaws.com/images/48398917302_a7cc5d6619_k.jpg'
                                        }}
                                      />
                                    </View>
                                    {
                                      item.text && item.text.length > 0 &&
                                      <Text style={styles({}).message}>
                                        {item.text}
                                      </Text>
                                    }
                                  </View>
                                  :

                                  // IS FILE FROM DEVICE
                                  item.type === 'pdf' || item.type === 'doc' || item.type === 'xls' || item.type === 'others' ?
                                    <View style={[
                                      styles({userBox: item.from}).chatBalloonText,
                                      styles({userBox: item.from}).chatBalloonAttach
                                    ]}>
                                      <View style={styles({typeFile: item.type}).fileView}>
                                        <Text style={styles({}).fileLabel}>
                                          {
                                            item.type === 'pdf' ? 'PDF' :
                                              item.type === 'doc' ? 'DOC' :
                                                item.type === 'xls' ? 'XLS' :
                                                  'FILE'
                                          }
                                        </Text>
                                      </View>
                                      {item.fileName && item.fileName.length &&
                                      <Text style={styles({}).fileName}>
                                        {item.fileName}
                                      </Text>
                                      }
                                      {
                                        item.text && item.text.length > 0 &&
                                        <Text style={styles({}).message}>
                                          {item.text}
                                        </Text>
                                      }
                                    </View>
                                    :
                                    <View/>
                          }

                          {
                            // Shared message
                            !!item.forwarded &&
                            <TouchableHighlight
                              onPress={() => alert('Encaminhar Mensagem - mostrar contatos!')}
                              style={styles({userBox: item.from}).shareMessage}
                              underlayColor="rgba(116,155,169,0.3)"
                            >
                              <Ionicons name="md-share-alt" size={20} color="#749BA9"/>
                            </TouchableHighlight>
                          }
                        </View>

                        {/*hour and checks*/}
                        <View style={styles({}).hourCheckContainer}>
                          {
                            item.from === 'me' &&
                            <View style={styles({}).checkedContainer}>
                              {
                                !!item.received &&
                                <Ionicons
                                  name="md-checkmark"
                                  size={15}
                                  color="#A71680"
                                  style={styles({}).checkReceived}
                                />
                              }
                              {
                                !!item.sent &&
                                <Ionicons name="md-checkmark" size={15} color="#A71680" style={styles({}).checkSent}/>
                              }
                            </View>
                          }
                          <Text style={styles({}).hour}>{item.date[1].slice(0, -3)}</Text>
                        </View>

                      </View>

                    </TouchableWithoutFeedback>
                  ))
                }
              </ScrollView>
              :
              <View/>
          }
        </View>

        {/* INPUT */}
        <View style={styles({}).boxInput}>
          <TextInput
            ref={inputRef}
            style={styles({}).input}
            value={userText}
            onChange={(event) => setUserText(event.nativeEvent.text)}
            multiline={true}
          />
          <Button
            title={'>'} color={'green'}
            onPress={() => sendMessage()}
          />
        </View>

        {/* MODAL BOX */
          !!openModalAction &&
          <TouchableWithoutFeedback onPress={() => openModalActions()}>
            <View style={styles({}).modalBox}>
              <View style={styles({}).modalBoxContent}>
                <Text style={styles({}).modalBoxDate}>
                  Em {messageDate}
                </Text>

                <TouchableHighlight
                  onPress={() => forwardTextMessage()}
                  style={styles({}).btnSmall}
                  underlayColor="rgba(116,155,169,0.5)"
                >
                  <View>
                    <Text style={styles({}).btnLabel}>ENCAMINHAR</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => copyTextMessage()}
                  style={styles({}).btnSmall}
                  underlayColor="rgba(116,155,169,0.5)"
                >
                  <View>
                    <Text style={styles({}).btnLabel}>COPIAR TEXTO</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => deleteMessage()}
                  style={styles({}).btnSmall}
                  underlayColor="rgba(116,155,169,0.5)"
                >
                  <View>
                    <Text style={styles({}).btnLabel}>APAGAR MENSAGEM</Text>
                  </View>
                </TouchableHighlight>

              </View>
            </View>

          </TouchableWithoutFeedback>
        }
      </View>
    </KeyboardAvoidingView>
  );
}
