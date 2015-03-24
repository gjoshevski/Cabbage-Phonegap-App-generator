#!/bin/sh

MODULES_DIR="../priv/poly/modules/"
DESTINATION_DIR="../priv/cordova/tmp/elements/"

rm -r $DESTINATION_DIR
mkdir $DESTINATION_DIR

for module in "$@"
do
	echo "Copying module "$module" ..."
	cp -r $MODULES_DIR$module $DESTINATION_DIR$module
	# echo  $MODULES_DIR$module" "$DESTINATION_DIR$module
done

# cd '../../cabbage-mobile/cordova'
# exec cordova build
