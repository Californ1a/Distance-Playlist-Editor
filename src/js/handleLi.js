const handleLiDrag = (event) => {
	console.log("Grabbed item", event.target.id);
	// event.target.style.cursor = "grabbing";
	event.dataTransfer.setData("text", event.target.id);
};

const dragOverLi = (event) => {
	console.log("Item in drop zone");
	event.preventDefault();
};

const dropLi = (event) => {
	console.log("Dropped item");
	event.preventDefault();
	const data = event.dataTransfer.getData("text");
	event.target.appendChild(document.getElementById(data));
	event.target.removeChild(document.getElementById(data));

	const index = window.jsonPlaylistData.GameObject.LevelPlaylist[0].LevelPath.indexOf(data);
	window.jsonPlaylistData.GameObject.LevelPlaylist[0].LevelName.splice(index, 1);
	window.jsonPlaylistData.GameObject.LevelPlaylist[0].GameMode.splice(index, 1);
	window.jsonPlaylistData.GameObject.LevelPlaylist[0].LevelPath.splice(index, 1);
};

module.exports = {
	drag: handleLiDrag,
	dragOver: dragOverLi,
	drop: dropLi
};
