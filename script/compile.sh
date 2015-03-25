#!/bin/sh

MODULES_DIR="priv/poly/modules/"
DESTINATION_DIR="priv/cordova/www/elements/"

rm -r $DESTINATION_DIR
mkdir $DESTINATION_DIR

for module in "$@"
do
	echo "Copying module "$module" ..."
	cp -r $MODULES_DIR$module $DESTINATION_DIR$module
	# echo  $MODULES_DIR$module" "$DESTINATION_DIR$module
done

cd 'priv/cordova'
exec cordova build

# echo "BUILD SUCCESSFUL"