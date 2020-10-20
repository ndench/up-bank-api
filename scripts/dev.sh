#!/bin/bash

DIST_DIRECTORY="dist"

# Remove current dist
rm -rf $DIST_DIRECTORY

# Build the whole library
rollup -cw
