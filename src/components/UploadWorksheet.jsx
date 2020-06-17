import React from 'react';
import { FiUpload } from 'react-icons/fi';

const UploadWorksheet = ({ name, method, user }) => {
  return (
    <>
      {
        user.role === 'user'
          ? (
            <form onChange={method} className="youth__worksheets--buttons-container--form">
              <div className="file">
                <label className="file-label">
                  <input className="file-input" type="file" name={name} accept=".pdf"/>
                  <span className="file-cta">
                    <FiUpload />
                    <span className="file-label">
                      &nbsp;Upload
                    </span>
                  </span>
                </label>
              </div>
            </form>
          ) : null
      }
    </>
  );
};

export default UploadWorksheet;
