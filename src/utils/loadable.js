import Loadable from 'react-loadable';
import React from 'react';

const Loading = () => null;
export const createLoadableComponent = (
  Component,
  LoadingComponent = Loading
) => {
  return Loadable({
    loader: () => Component,
    loading: LoadingComponent
  });
};
