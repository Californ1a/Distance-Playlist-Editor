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
	const Li = document.getElementById(data);
	const index = Array.from(document.getElementsByClassName("mapitem")).map(m => m.id).indexOf(data);
	event.target.appendChild(Li);
	// event.target.removeChild(Li);
	Li.remove();

	// const index = document.getElementById().indexOf(data);
	window.jsonPlaylistData.GameObject.LevelPlaylist[0].LevelName.splice(index, 1);
	window.jsonPlaylistData.GameObject.LevelPlaylist[0].GameMode.splice(index, 1);
	window.jsonPlaylistData.GameObject.LevelPlaylist[0].LevelPath.splice(index, 1);
};

module.exports = {
	drag: handleLiDrag,
	dragOver: dragOverLi,
	drop: dropLi
};
