import {profileReducer} from './profileReducer'
import {dialogsReducer} from './dialogsReducer'
import {sidebarReducer} from './sidebarReducer'

let store = {
  _state: {
    profilePage: {
      postsData: [
        {id: 1, message: 'Hello world', likesCount: 111},
        {id: 2, message: 'lol', likesCount: 5},
        {id: 3, message: 'This is my first post', likesCount: 0},
        {id: 4, message: 'no', likesCount: 1},
      ],
      newPostText: '',

      profileInfo: {
        description: 'description',
        ava: 'https://img5.goodfon.ru/wallpaper/nbig/0/78/art-pitbull-avatarka-pitbul-angry-dog-zloi-pes-osheinik-s-sh.jpg',
        overWindow:
          'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
      },
    },
    messagesPage: {
      messages: [
        {
          dialogs: [
            {text: 'hi', data: new Date(), from: 'Daniil', for: 'me'},
            {text: 'hello', data: new Date(), from: 'me', for: 'Daniil'},
            {
              text: 'What is yor name',
              data: new Date(),
              from: 'Daniil',
              for: 'me',
            },
            {
              text: 'Хуй соси',
              data: new Date(),
              from: 'Daniil',
              for: 'me',
            },
            {
              text: 'Губой тряси',
              data: new Date(),
              from: 'me',
              for: 'Daniil',
            },
            {
              text: '?',
              data: new Date(),
              from: 'me',
              for: 'Daniil',
            },
            {
              text: 'Пока',
              data: new Date(),
              from: 'Daniil',
              for: 'me',
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
            },

            {text: 'Nice', data: new Date(), from: 'me', for: 'Kiril'},
            {text: 'bay', data: new Date(), from: 'Kiril', for: 'me'},
          ],
          key: 2,
          user: 'Kiril',
        },
        {
          dialogs: [
            {text: 'Good day', data: new Date(), from: 'Oleg', for: 'me'},
            {text: 'bad', data: new Date(), from: 'me', for: 'Oleg'},
            {text: 'ok', data: new Date(), from: 'Oleg', for: 'me'},
          ],
          key: 3,
          user: 'Oleg',
        },
      ],
      newMessage: '',
      users: [
        {
          name: 'Daniil',
          ava: 'https://klike.net/uploads/posts/2019-06/1560059274_18.jpg',
          key: 1,
        },
        {
          name: 'Kiril',
          ava: 'https://ulibky.ru/wp-content/uploads/2019/08/kartinki_na_avu_devushke_31_13182611.jpg',
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
    },
    navig: {
      listNav: [
        {to: '/profile', text: 'Profile', key: 1},
        {to: '/dialogs', text: 'Messages', key: 2},
        {to: '/news', text: 'News', key: 3},
        {to: '/music', text: 'Music', key: 4},
        {to: '/setting', text: 'Setting', key: 5},
        {to: '/friends', text: 'Friends', key: 6},
      ],
    },
  },
  _callSubscriber() {},

  getState() {
    return this._state
  },
  subscribe(observer) {
    this._callSubscriber = observer
  },

  dispatch(action) {
    profileReducer(this._state.profilePage, action)
    dialogsReducer(this._state.messagesPage, action)
    sidebarReducer(this._state.navig, action)
    this._callSubscriber()
  },
}

export {store}
