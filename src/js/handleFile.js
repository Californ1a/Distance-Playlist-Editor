const rq = require("electron-require");
const toBlob = require("stream-to-blob");
const dialog = rq.electron("dialog");
const fs = require("fs");
const manageFile = rq("./js/readFile.js");

const removeDragData = (event) => {
	console.log("Removing drag data");

	if (event.dataTransfer.items) {
		// Use DataTransferItemList interface to remove the drag data
		event.dataTransfer.items.clear();
	} else {
		// Use DataTransfer interface to remove the drag data
		event.dataTransfer.clearData();
	}
};

const handleFileDragOver = (event) => {
	console.log("File(s) in drop zone");

	// Prevent default behavior (Prevent file from being opened)
	event.preventDefault();
};

const handleLoadFileClick = () => {
	console.log("Open File dialog");
	dialog.showOpenDialog({
		filters: [{
			name: "Playlist",
			extensions: ["xml"]
		}],
		properties: ["openFile"]
	}, (filepaths) => {
		console.log(filepaths);
		if (!filepaths) {
			return console.log("No file selected");
		}
		toBlob(fs.createReadStream(filepaths[0]), "text/xml", (err, blob) => {
			if (err) {
				return console.error(err);
			}
			blob.name = filepaths[0];
			console.log("blob", blob);
			manageFile(blob);
		});
	});
};

const handleLoadFileDrop = (event) => {
	console.log("File(s) dropped");

	// Prevent default behavior (Prevent file from being opened)
	event.preventDefault();

	if (event.dataTransfer.items && event.dataTransfer.items.length === 1) {
		// Use DataTransferItemList interface to access the file(s)
		for (let i = 0; i < event.dataTransfer.items.length; i++) {
			// If dropped items aren't files, reject them
			if (event.dataTransfer.items[i].kind === "file") {
				const file = event.dataTransfer.items[i].getAsFile();
				console.log(`file[${i}].name = ${file.name}`);
				console.log(`file[${i}].type = ${file.type}`);
				manageFile(file);
			}
		}
	} else if (event.dataTransfer.files.length === 1) {
		// Use DataTransfer interface to access the file(s)
		for (let i = 0; i < event.dataTransfer.files.length; i++) {
			console.log(`file[${i}].name = ${event.dataTransfer.files[i].name}`);
			console.log(`file[${i}].type = ${event.dataTransfer.files[i].type}`);
			manageFile(event.dataTransfer.files[i]);
		}
	} else {
		console.log("More than 1 file");
	}

	// Pass event to removeDragData for cleanup
	removeDragData(event);
};

module.exports = {
	drop: handleLoadFileDrop,
	click: handleLoadFileClick,
	dragOver: handleFileDragOver
};
