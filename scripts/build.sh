#!/bin/bash

DIST_DIRECTORY="dist"

# Remove current dist and temp directory
rm -rf $DIST_DIRECTORY

# Build the whole library
rollup -c

# Generate single TS Declaration file
dts-bundle --configJson ./dts-bundle.json

# dts-bundle leave a bunch of empty directories around
find $DIST_DIRECTORY -type d -empty -delete
