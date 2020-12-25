#!/usr/bin/env bash
set -e -o pipefail

# Build
npm run build

# Update the package version
lastVersion=$(git describe --tags --abbrev=0)
commitCountSinceLastVersion=$(git rev-list $lastVersion..HEAD --count)
for run in $(seq $commitCountSinceLastVersion); do
    npm version prerelease --preid=next --no-git-tag-version;
done

# Publish
npm publish --tag next

# Undo version changes
git checkout package.json package-lock.json
