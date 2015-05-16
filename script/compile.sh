#!/bin/sh

MODULES_DIR="modules/"
DESTINATION_DIR="priv/cordova/www/elements/"

PROJ_DIR="/Users/viktorot/SchoolProjects/cabbage-core/"

cd $PROJ_DIR

rm -r $DESTINATION_DIR
mkdir $DESTINATION_DIR

for module in "$@"
do
	echo "Copying module '"$module"'..."
	cp -r $PROJ_DIR$MODULES_DIR$module $PROJ_DIR$DESTINATION_DIR$module
	# echo  $PROJ_DIR$MODULES_DIR$module" "$PROJ_DIR$DESTINATION_DIR$module
done

# cd 'priv/cordova'
# exec cordova build

echo "BUILD SUCCESSFUL"