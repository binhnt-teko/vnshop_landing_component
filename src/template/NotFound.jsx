import React from 'react';

export default function NotFound(props) {
  return (
    <div id="page-404" className={props.className}>
      <section>
        <h1>
          404
        </h1>
        <p>
          The page you are looking for does not exist
          {' '}
          <a href="/">
            Back to homepage
          </a>
        </p>
      </section>
      <style
        dangerouslySetInnerHTML={{
          __html: '#page-404{ height: calc(100% - 199px);}',
        }}
      />
    </div>
  );
}
