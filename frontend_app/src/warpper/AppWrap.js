import React from 'react';

// Wraps a section in the shared container. `idName` is the anchor used by the navbar.
const AppWrap = (Component, idName, classNames = '') => function HOC() {
  return (
    <section id={idName} className={`app__section ${classNames}`}>
      <Component />
    </section>
  );
};

export default AppWrap;
