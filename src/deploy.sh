#!user/bin/env sh

set -e

npm run Build

cd dist

git init
git add -A
git commit -m 'App Game'

git push -f 