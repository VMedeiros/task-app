import { AlertType, AlertDuration, AlertMessage } from '../enum/alert.enum';
import { Alert } from '../models/alert.model';

export const ADD_SUCESS: Alert = {
  type: AlertType.Success,
  duration: AlertDuration.Success,
  message: AlertMessage.Added,
  show: true
};

export const ADD_ERROR: Alert = {
  type: AlertType.Danger,
  duration: AlertDuration.Danger,
  message: AlertMessage.ErrorAdd,
  show: true
};

export const EDIT_SUCESS: Alert = {
  type: AlertType.Success,
  duration: AlertDuration.Success,
  message: AlertMessage.Finished,
  show: true
};

export const EDIT_WARN: Alert = {
  type: AlertType.Warning,
  duration: AlertDuration.Warning,
  message: AlertMessage.Updated,
  show: true
};

export const EDIT_ERROR: Alert = {
  type: AlertType.Danger,
  duration: AlertDuration.Danger,
  message: AlertMessage.ErrorUpdate,
  show: true
};

export const DELETE_SUCESS: Alert = {
  type: AlertType.Success,
  duration: AlertDuration.Success,
  message: AlertMessage.Deleted,
  show: true
};

export const DELETE_ERROR: Alert = {
  type: AlertType.Danger,
  duration: AlertDuration.Danger,
  message: AlertMessage.ErrorDelete,
  show: true
};

export const GET_ERROR: Alert = {
  type: AlertType.Danger,
  duration: AlertDuration.Danger,
  message: AlertMessage.Error,
  show: true
};
