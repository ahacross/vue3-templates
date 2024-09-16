import {h} from 'vue'
import {useModal, useModalSlot, VueFinalModal} from 'vue-final-modal'
import CmnDialog from './CmnDialog.vue'

interface DialogOptions {
  title?: string
  msg: string
  confirmTxt?: string
  cancelTxt?: string
}

interface ModalProps {
  [key: string]: any
}

const getParams = (type: 'alert' | 'confirm', options: DialogOptions, modalProps: ModalProps) => {
  return {
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
}

function DialogAlert(options: DialogOptions, modalProps: ModalProps = {}): Promise<boolean> {
  return new Promise((resolve) => {
    const params = getParams('alert', options, modalProps)
    const { open, close } = useModal({
      component: params.component,
      attrs: {
        ...params.attrs,
        onCancel() {
          resolve(false)
          close()
        }
      },
      slots: {
        default: params.content
      }
    })
    setTimeout(open, 100)
  })
}

function DialogConfirm(options: DialogOptions, modalProps: ModalProps = {}): Promise<boolean> {
  return new Promise((resolve) => {
    const params = getParams('confirm', options, modalProps)
    const { open, close } = useModal({
      component: params.component,
      attrs: {
        ...params.attrs,
        onCancel(value: boolean = false) {
          resolve(value)
          close()
        }
      },
      slots: {
        default: params.content
      }
    })
    setTimeout(open, 100)
  })
}

function DialogModal(
  component: any,
  params: Record<string, any>,
  modalProps: ModalProps = {}
): Promise<any> {
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
            onCancel(value: any) {
              resolve(value)
              close()
            }
          }
        })
      }
    })
    setTimeout(open, 100)
  })
}

export const useModalClose = (emits: Function) => {
  return {
    onClose: (value: boolean | object = false) => {
      emits('cancel', value.constructor.name.includes('Event') ? false : value)
    }
  }
}

export const Dialog = {
  alert: DialogAlert,
  confirm: DialogConfirm,
  modal: DialogModal
}
