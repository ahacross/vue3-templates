import {useModal, useModalSlot, VueFinalModal} from 'vue-final-modal'
import CmnDialog from './CmnDialog.vue'

const DialogWrap =
  (type) =>
  (options, modalProps = {}) =>
    new Promise((resolve) => {
      const params = {
        component: CmnDialog,
        attrs: {
          type,
          title: options.title || '',
          content: options.msg,
          confirmTxt: options.confirmTxt || '확인',
          cancelTxt: options.cancelTxt || type === 'alert' ? '확인' : '취소',
          ...modalProps
        },
        content: () =>
          h(
            'div',
            {},
            options.msg.split(/<br\s*\/?>/gi).map((text) => h('p', text))
          )
      }

      const { open, close } = useModal({
        component: params.component,
        attrs: {
          ...params.attrs,
          close(value = false) {
            resolve(value instanceof Event ? false : value)
            close()
          }
        },
        slots: {
          default: params.content
        }
      })
      setTimeout(open, 100)
    })

function DialogModal(component, params, modalProps = {}) {
  return new Promise((resolve) => {
    const { open, close } = useModal({
      component: VueFinalModal,
      attrs: {
        contentTransition: 'vfm-slide-down',
        overlayTransition: 'vfm-fade',
        ...modalProps
      },
      slots: {
        default: useModalSlot({
          component,
          attrs: {
            ...params,
            close(value = false) {
              resolve(value instanceof Event ? false : value)
              close()
            }
          }
        })
      }
    })
    setTimeout(open, 100)
  })
}

export const Dialog = {
  alert: DialogWrap('alert'),
  confirm: DialogWrap('confirm'),
  modal: DialogModal
}
