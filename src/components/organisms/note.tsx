/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import { TextField } from '@material-ui/core';
import { Button } from '../atoms';

const noteStyle = css`
  padding: 0 1rem 0.75rem;
  display: flex;
  flex-flow: column;
`;

const headerStyle = css`
  position: relative;
  padding: 0 0.75rem;
  justify-content: space-between;
  display: flex;
  align-items: center;
  flex: 0 1 3rem;
`;

const commonInputStyle = css`
  margin-bottom: 0.5rem;
`;

const contentStyle = css`
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
  padding-bottom: 0.75rem;
`;

const firstContent = css`
  flex: 1 1 auto;
`;

const tagStyle = css`
  font-size: 0.75rem;
  flex: 0 1 1.5rem;
`;
export default function Note(): JSX.Element {
  return (
    <main css={noteStyle}>
      <header css={headerStyle}>
        <FontAwesomeIcon icon={faExpandAlt} />
        <Button color="secondary" variant="contained">
          Upload
        </Button>
      </header>
      <div css={commonInputStyle}>
        <TextField
          id="title"
          label="Recipe title..."
          color="secondary"
          fullWidth
        />
      </div>
      <div css={commonInputStyle}>
        <TextField
          id="title"
          label="Ingredients..."
          color="secondary"
          fullWidth
        />
      </div>
      <div css={contentStyle} contentEditable="true">
        <div css={firstContent}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio
          nec dui condimentum tincidunt sed sed leo. Sed luctus condimentum
          nisi, a tincidunt nisl dignissim ac. Vivamus non quam eu quam aliquam
          ullamcorper quis ut sem. Donec ac velit interdum, auctor libero in,
          feugiat velit. Quisque vel velit nec dolor sollicitudin varius. Ut
          dignissim id dui nec porta. Donec efficitur eu sem nec blandit.
          Phasellus bibendum lacus vitae nibh dignissim, eleifend lacinia magna
          volutpat. Sed ligula mauris, mattis et tristique at, pellentesque a
          nunc. Sed semper bibendum ex, id varius dui imperdiet quis. Sed
          ultricies dui at orci venenatis, eget maximus erat euismod. Ut eget
          magna mattis, viverra quam vehicula, placerat eros. Duis laoreet,
          justo sit amet iaculis finibus, lectus elit scelerisque elit, et
          tempor mi purus id diam. Nulla nec eleifend enim. In vel elit vitae
          justo interdum pulvinar in id felis. Morbi rhoncus nisl sed urna
          venenatis, a sollicitudin felis gravida. Nulla dictum erat non mi
          tempor auctor. Integer consequat dui quis cursus auctor. Sed auctor
          malesuada maximus. Suspendisse pulvinar ante urna, ac porttitor sem
          accumsan non. Integer maximus pellentesque ante efficitur euismod.
          Praesent magna quam, mollis eget iaculis in, semper at erat. Vivamus
          lacinia ut diam nec finibus. Vivamus mattis orci eu ultrices porta.
          Aenean lobortis erat vitae nunc cursus, a imperdiet leo porta. Morbi
          sed ligula metus. Integer turpis metus, dapibus id lorem vitae,
          pulvinar gravida erat. Vivamus tristique quis tellus eget lobortis.
          Vestibulum quis pellentesque nulla. Praesent blandit aliquet
          ullamcorper. Sed rhoncus et purus eleifend tincidunt. Nunc ultrices
          nibh in egestas faucibus. Phasellus semper lectus blandit, venenatis
          urna nec, imperdiet lectus. Quisque at maximus odio. Proin id purus ut
          libero fermentum feugiat eu a neque. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae;
        </div>
        <div css={tagStyle}>
          <TextField id="tag" label="Add tag..." fullWidth />
        </div>
      </div>
    </main>
  );
}
