#!/bin/bash

DIST_DIRECTORY="dist"
TEMP_DIRECTORY="temp-dec"

# Remove current dist and temp directory
rm -rf $DIST_DIRECTORY
rm -rf $TEMP_DIRECTORY

# Build the whole library
rollup -cw
