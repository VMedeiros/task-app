export enum AlertType {
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning'
}

export enum AlertDuration {
  Success = 5000,
  Danger = 10000,
  Warning = 7000
}

export enum AlertMessage {
  Added = 'Item added successfully!',
  Finished = 'Item finished successfully!',
  Updated = 'Item updated successfully!',
  Deleted = 'Item deleted successfully!',
  Error = 'An error occurred!',
  ErrorAdd = 'An error occurred while adding the item!',
  ErrorUpdate = 'An error occurred while updating the item!',
  ErrorDelete = 'An error occurred while deleting the item!',
  ConfirmationDelete = 'Are you sure you want to delete this item?',
}
