'use client';

import React from 'react';
import CopyButton from '../../pages/CopyButton';
import PrintButton from '../../pages/PrintButton';
import RepoButton from '../../pages/RepoButton';

export default function ButtonGroup({ markdownContent }) {
  return (
    <div className="button-group">
      <PrintButton />
      <CopyButton markdownContent={markdownContent} />
      <RepoButton />
    </div>
  );
}
