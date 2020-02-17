import { AbstractControl } from '@angular/forms';
import { Observable, observable, Observer } from 'rxjs';

// All validators are function

export const mimeType = (control: AbstractControl):
    Promise<{ [key: string] }> | Observable<{ [key: string] }> => {
    const file = control.value as File;
    const fileReader = new FileReader();
    const fobs = Observable.create((observer: Observer<{ [key: string]: any }>) => { // create own observable , observable has an observer
        fileReader.addEventListener('loadend', () => {
            const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
            let header = '';
            let isValid = false;
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < arr.length; i++) {
                header += arr[i].toString(16); //hexADECIMAL CONVERSION
            }
            switch (header) {
                case '89504e47':
                    isValid = true;
                    break;
                case 'ffd8ffe0':
                case 'ffd8ffe1':
                case 'ffd8ffe2':
                case 'ffd8ffe3':
                case 'ffd8ffe8':
                    isValid = true;
                    break;
                default:
                    isValid = false; // Or you can use the blob.type as fallback
                    break;
            }
            if (isValid) {
                observer.next(null);
            } else {
                observer.next({ invalidMimeType: true });
            }
            observer.complete();
        });
        fileReader.readAsArrayBuffer(file);
    });
    return fobs;
};

