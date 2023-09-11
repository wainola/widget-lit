import type { Widget } from '@wainola/lit-widget';
import React from 'react';

export default function WidgetReact(
  props: JSX.IntrinsicElements['widget-test']
) {
  return <widget-test {...props} />;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'widget-test': Partial<Widget>;
    }
  }
}
