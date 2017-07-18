import { Template } from 'meteor/templating';

import './upload_form.html';

import { Images } from '../api/images.js';

Template.uploadForm.onCreated(function () {
    this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
    currentUpload() {
        return Template.instance().currentUpload.get();
    }
});

Template.uploadForm.events({
    'change #fileInput'(e, template) {
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            console.log('upload detected change')
            // We upload only one file, in case
            // multiple files were selected
            const upload = Images.insert({
                file: e.currentTarget.files[0],
                streams: 'dynamic',
                chunkSize: 'dynamic'
            }, false);

            upload.on('start', function () {
                console.log('upload start');
                template.currentUpload.set(this);
            });

            upload.on('end', function (error, fileObj) {
                console.log('upload end');
                if (error) {
                    alert('Error during upload: ' + error);
                } else {
                    alert('File "' + fileObj.name + '" successfully uploaded');
                }
                template.currentUpload.set(false);
            });
            upload.start();
        }
    }
});