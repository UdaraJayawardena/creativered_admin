import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {environment} from '../environments/environment';
import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';

// import { s3 } from 'fine-uploader/lib/core/s3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {//implements AfterViewInit
  title = 'adminsideui';

  constructor(@Inject(PLATFORM_ID) private platformId: any, @Inject(DOCUMENT) private document: any) {
  }

  // bucketName = 'creative-red';
  //
  // uploader: any;
  //
  //

  public ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      const bases = this.document.getElementsByTagName('base');

      if (bases.length > 0) {
        bases[0].setAttribute('href', environment.baseHref);
      }
    }

    if (!isPlatformBrowser(this.platformId)) {
      const bases = this.document.getElementsByTagName('base');

      if (bases.length > 0) {
        bases[0].setAttribute('href', environment.baseHref);
      }
    }

    if (!isPlatformBrowser(this.platformId)) {
      const bases = this.document.getElementsByTagName('base');

      if (bases.length > 0) {
        bases[0].setAttribute('href', environment.baseHref);
      }
    }

    if (!isPlatformBrowser(this.platformId)) {
      const bases = this.document.getElementsByTagName('base');

      if (bases.length > 0) {
        bases[0].setAttribute('href', environment.baseHref);
      }
    }
  }

  ngAfterViewInit(): void {
    //   let instance = this;
    //   this.uploader = new s3.FineUploaderBasic({
    //     button: document.getElementById('upload_image'),
    //     debug: false,
    //     autoUpload: true,
    //     multiple: true,
    //     validation: {
    //       allowedExtensions: ['jpeg', 'jpg', 'png', 'gif', 'svg'],
    //       sizeLimit: 5120000 // 50 kB = 50 * 1024 bytes
    //     },
    //     region: 'US East(Ohio)',
    //     request: {
    //       endpoint: 'https://' + instance.bucketName  + '.s3.amazonaws.com/',
    //       accessKey: '4DXuIXzIaukdbIaN6Ys6NnZyf5yHrvWC+uQhEz6x',
    //       params: { 'Cache-Control': 'private, max-age=31536000, must-revalidate' }
    //     },
    //     signature: {
    //       endpoint: 'http://localhost:8000/api/v1/fine_uploader/s3_signature/',
    //     },
    //     iframeSupport: {
    //       localBlankPagePath: '/somepage.html'
    //     },
    //     cors: {
    //       expected: true,
    //       sendCredentials: true
    //     },
    //     objectProperties: {
    //       acl: 'public-read',
    //     },
    //     callbacks: {
    //       onSubmit: function (id, fileName) {
    //         console.log('selected file:', fileName);
    //       },
    //       // onSubmitted: function(id, name) { alert('onSubmitted');},
    //       onComplete: function (id, name, responseJSON, maybeXhr) {
    //         if(responseJSON.success) {
    //           console.log('upload complete', name);
    //           console.log('uploaded image url', 'https://' + instance.bucketName + '.s3.amazonaws.com/' + this.getKey(id));
    //         }
    //       },
    //       // onAllComplete: function (successful, failed) { console.log(failed); },
    //       // onCancel: function (id, name) {},
    //       // onUpload: function(id, name) { alert('onUpload');},
    //       // onUploadChunk: function(id, name, chunkData) { alert('onUploadChunk');},
    //       // onUploadChunkSuccess: function(id, chunkData, responseJSON, xhr) { alert('onUploadChunkSuccess');},
    //       // onResume: function(id, fileName, chunkData) { alert('onResume');},
    //       // onProgress: function (id, name, loaded, total) {},
    //       // onTotalProgress: function(loaded, total) { alert('onTotalProgress');},
    //       // onError: function (id, name, reason, maybeXhrOrXdr) {  },
    //       // onSessionRequestComplete: function (response, success, xhrOrXdr) { }
    //     }
    //   });
    // }

  }


//   sendEmail() {
//     const email 	= require('/node_modules/emailjs/email');
//     const server 	= email.server.connect({
//       user:	'username',
//       password: 'password',
//       host:	'smtp.your-email.com',
//       ssl:		true
//     });
//
//     const message	= {
//       text:	'i hope this works',
//       from:	'you <username@your-email.com>',
//       to:		'someone <someone@your-email.com>, another <another@your-email.com>',
//       cc:		'else <else@your-email.com>',
//       subject:	'testing emailjs',
//       attachment:
//         [
//           {data: '<html>i <i>hope</i> this works!</html>', alternative: true},
//           {path: 'path/to/file.zip', type: 'application/zip', name: 'renamed.zip'}
//         ]
//     };
//
// // send the message and get a callback with an error or details of the message that was sent
//     // tslint:disable-next-line:no-shadowed-variable
//     server.send(message, function(err, message) { console.log(err || message); });
//
// // you can continue to send more messages with successive calls to 'server.send',
// // they will be queued on the same smtp connection
//
// // or you can create a new server connection with 'email.server.connect'
// // to
//   }
}
