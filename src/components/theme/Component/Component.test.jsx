import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Component from './Component';
import config from '@plone/volto/registry';

config.set('components', {
  Toolbar: { component: (props) => <div>this is the Toolbar component</div> },
  'Toolbar.Types': {
    component: ({ teststring }) => (
      <div>this is the Toolbar component with a prop {teststring} in it</div>
    ),
  },
});

describe('Component component :P', () => {
  it('Render a Component in the registry', () => {
    const { container } = render(<Component name="Toolbar" />);
    expect(container).toMatchSnapshot();
  });
  it('Renders a Fallback Component that does not exists in the registry', () => {
    const { container } = render(<Component name="Toolbar.Foo" />);
    expect(container).toMatchSnapshot();
  });
  it('Renders a Component in the registry - passes props correctly', () => {
    const { container } = render(
      <Component name="Toolbar.Types" teststring="Hi!" />,
    );
    expect(container).toMatchSnapshot();
  });
});
