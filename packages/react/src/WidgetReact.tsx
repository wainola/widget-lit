import { Widget } from '@wainola/lit-widget';
import { createComponent } from '@lit-labs/react';
import React from 'react';

const WidgetReact = createComponent({
  tagName: 'widget-test',
  elementClass: Widget,
  react: React
});

export default WidgetReact;
