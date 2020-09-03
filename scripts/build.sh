#!/bin/bash

DIST_DIRECTORY="dist"
TEMP_DIRECTORY="temp-dec"

# Remove current dist and temp directory
rm -rf $DIST_DIRECTORY
rm -rf $TEMP_DIRECTORY

# Build the whole library
rollup -c

# Move TS Declarations out to a temporary folder
for i in $(find "$DIST_DIRECTORY" -type f -name "*.d.ts"); do
    DIRECTORY=$(dirname "${i}")
    if [ "$DIRECTORY" == "dist" ]
    then
        DIRECTORY=""
    else
        DIRECTORY=${DIRECTORY#"$DIST_DIRECTORY/"}
    fi
    mkdir -p "$TEMP_DIRECTORY/$DIRECTORY"

    mv $i "$TEMP_DIRECTORY/$DIRECTORY"
done

# Generate single TS Declaration file
dts-bundle --configJson ./dts-bundle.json

# Remove temp folders
rm -rf $TEMP_DIRECTORY
find $DIST_DIRECTORY -type d -empty -delete
