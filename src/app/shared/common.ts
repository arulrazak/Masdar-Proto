import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class Common {
  ToastInfo: any = {
    saved: 'Record Successfully saved',
    updated: 'Record successfully updated',
    deleted: 'The record has been deleted',
    archived: 'The record has been archived',
    wrong: 'Something went wrong',
    success: 'Success',
    failure: 'Failure',
    warning: 'Warning',
    error: 'Error',
    warehouse_no_data: 'No data available, please try later',
    warehouse_error: 'Unable to fetch data, please try later',
    warehouse_title: 'Warehouse'
  };

  Confirmation: any = {
    delete: 'Are you sure you want to delete?'
  };

  appendCopyCount(name) {
    const nameParts = name.split('-');
    const lastPart = +nameParts[nameParts.length - 1];
    if (isNaN(lastPart)) {
      return `${name} - 1`;
    } else {
      nameParts.pop();
      return `${nameParts.join('-')} - ${lastPart + 1}`;
    }
  }
}
