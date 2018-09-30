import {ErrorHandler, Injectable} from '@angular/core';
import {NotifierService} from 'angular-notifier';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private notifierService: NotifierService) {
  }

  handleError(error) {
    this.notifierService.notify('error', 'Something went wrong...');
    // IMPORTANT: Rethrow the error otherwise it gets swallowed
    // throw error;
  }
}
