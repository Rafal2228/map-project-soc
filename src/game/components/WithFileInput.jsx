// @flow
import React, { Fragment } from 'react';
import { showError } from '../../shared/utils';

function checkFileType(type: string, allowed: string[]) {
  if (!allowed.length) {
    return true;
  }

  return allowed.reduce((acc, a) => {
    if (acc) {
      return acc;
    }

    if (a.indexOf('*') === -1) {
      return a === type;
    }

    const regexp = new RegExp(a, 'gi');
    return regexp.test(type);
  }, false);
}

export interface FileInputProps {
  accept: string;
  multiple: boolean;
  onSelected: (files: File[]) => void;
}

export function WithFileInput(Component: React$ComponentType<*>) {
  return function(props: FileInputProps) {
    const { onSelected, accept, multiple, ...rest } = props;
    let fileInput = null;
    let acceptCheck = accept && accept.length ? accept.split(',') : [];

    return (
      <Fragment>
        <input
          ref={input => {
            fileInput = input;
          }}
          style={{ display: 'none' }}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={event => {
            let files: File[] = [];

            if (event.target && event.target.files) {
              files = [].slice.call(event.target.files);
            }

            if (!files.length) {
              return;
            }

            if (accept) {
              const allowType = Array.prototype.reduce.call(
                files,
                (acc: boolean, file: File) => {
                  return acc && checkFileType(file.type, acceptCheck);
                },
                true
              );

              if (!allowType) {
                showError('File is too big');
                return;
              }
            }

            props.onSelected(files);

            if (!fileInput) {
              return;
            }

            fileInput.value = '';
          }}
        />

        <Component onClick={() => fileInput && fileInput.click()} {...rest} />
      </Fragment>
    );
  };
}
