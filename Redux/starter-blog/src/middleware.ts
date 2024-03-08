import { AnyAction, Middleware, MiddlewareAPI, isRejected, isRejectedWithValue } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

// css
import 'react-toastify/dist/ReactToastify.css'

const isPayloadActionError = (
  payload: unknown
): payload is {
  status: number
  data: {
    error: string
  }
} => {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'data' in payload &&
    typeof (payload as any).data?.error === 'string'
  )
}

export const rtkQueryErrorMessage: Middleware = (api: MiddlewareAPI) => (next) => (action: AnyAction) => {
  if (isRejected(action)) {
    if (action.error.name === 'CustomError') {
      toast.warn(action.error.message)
    }
  }

  if (isRejectedWithValue(action)) {
    if (isPayloadActionError(action.payload)) {
      toast.warn(action.payload.data.error)
    }
  }
  return next(action)
}
