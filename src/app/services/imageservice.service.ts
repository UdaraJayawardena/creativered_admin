import {Injectable} from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
// @ts-ignore
import * as key from './key.json';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ImageserviceService {

  aid: string = key.accessKeyId;
  skey: string = key.secretAccessKey;
  regn: string = key.region;

  constructor() {
  }

  //function of upload image to the server
  uploadfile(file, fname) {
    const bucket = new S3(
      {
        accessKeyId: this.aid,
        secretAccessKey: this.skey,
        region: this.regn
      }
    );

    const params = {
      Bucket: 'e-com-site',
      Key: fname,
      Body: file
    };

    //get respond of the server
    bucket.upload(params, function (err, data) {
      if (err) {
        Swal.fire(
          'Error',
          'There was an error uploading your image!' + err,
          'error'
        );
        return false;
      }

      Swal.fire(
        'Success',
        'Successfully uploaded image!',
        'success'
      );
      return true;
    });
  }
}
