import defaultAva from '../accept/img/defaultAva.png'

const ADD_MESSAGE = 'dialog/ADD-MESSAGE'

const initialState = {
  messages: [
    {
      dialogs: [
        {text: 'hi', data: new Date(), from: 'Daniil', for: 'me', id: 1},
        {text: 'hello', data: new Date(), from: 'me', for: 'Daniil', id: 2},
        {
          text: 'What is yor name',
          data: new Date(),
          id: 3,
          from: 'Daniil',
          for: 'me',
        },
        {
          text: 'Хуй соси',
          data: new Date(),
          from: 'Daniil',
          for: 'me',
          id: 4,
        },
        {
          text: 'Губой тряси',
          data: new Date(),
          from: 'me',
          for: 'Daniil',
          id: 5,
        },
        {
          text: '?',
          data: new Date(),
          from: 'me',
          for: 'Daniil',
          id: 6,
        },
        {
          text: 'Пока',
          data: new Date(),
          from: 'Daniil',
          for: 'me',
          id: 7,
        },
      ],

      key: 1,
      user: 'Daniil',
    },
    {
      dialogs: [
        {
          text: 'i like play compute game',
          data: new Date(),
          from: 'Kiril',
          for: 'me',
          id: 1,
        },

        {text: 'Nice', data: new Date(), from: 'me', for: 'Kiril', id: 2},
        {text: 'bay', data: new Date(), from: 'Kiril', for: 'me', id: 3},
      ],
      key: 2,
      user: 'Kiril',
    },
    {
      dialogs: [
        {text: 'Good day', data: new Date(), from: 'Oleg', for: 'me', id: 1},
        {text: 'bad', data: new Date(), from: 'me', for: 'Oleg', id: 2},
        {text: 'ok', data: new Date(), from: 'Oleg', for: 'me', id: 3},
      ],
      key: 3,
      user: 'Oleg',
    },
  ],
  users: [
    {
      name: 'Daniil',
      ava: 'https://klike.net/uploads/posts/2019-06/1560059274_18.jpg',
      key: 1,
    },
    {
      name: 'Kiril',
      ava: defaultAva,
      key: 2,
    },
    {
      name: 'Oleg',
      ava: 'https://abrakadabra.fun/uploads/posts/2021-12/1640154271_1-abrakadabra-fun-p-samie-krutie-avi-dlya-standoff-3.jpg',
      key: 3,
    },
    {
      name: 'Max',
      ava: 'https://styles.redditmedia.com/t5_2tc6s/styles/communityIcon_vn92glo5ugy51.png',
      key: 4,
    },
  ],
}

const sendNewMessage = (user, messageText) => ({
  type: ADD_MESSAGE,
  user,
  messageText,
})

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      let stateCopy = {...state, messages: [...state.messages]}

      let newMessage = {
        data: +new Date(),
        id: +new Date(),
        text: action.messageText,
        from: 'me',
        for: action.user,
      }
      stateCopy.messages
        .filter((dialog) => {
          return dialog.user === newMessage.for
        })
        .map((dialog) => {
          return dialog.dialogs.push(newMessage)
        })

      return stateCopy
    }
    default:
      return state
  }
}

export {dialogsReducer}

export {sendNewMessage}
