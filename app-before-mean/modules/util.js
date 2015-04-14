function serverRootPath() {
	return __dirname.split("/").slice(0, -1).join("/");
}

module.exports.serverRootPath = serverRootPath;