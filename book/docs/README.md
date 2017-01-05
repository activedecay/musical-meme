# Publishing docs
This documentation was created with gitbook.

## Making changes
Run this server to make live edits to the docs.

    npm run publish:serve

Or, create/edit markdown files under /docs and run the build.

    npm run publish:build

Commit changes to gh-pages branch

    git add
    git commit
    git push origin gh-pages
