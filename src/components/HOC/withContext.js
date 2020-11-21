import React from "react";

export const withContext = (Provider, getProps = () => {}) => (
  WrapperComponent
) => {
  const WithContext = (props) => (
    <Provider {...getProps(props)}>
      <WrapperComponent {...props} />
    </Provider>
  );

  return WithContext;
};
